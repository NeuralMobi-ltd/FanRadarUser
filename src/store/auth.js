import { defineStore } from 'pinia'
import AuthService from '@/services/authService'
import API_CONFIG from '@/config/api'
import { setCookie, getCookie, deleteCookie } from '@/utils/cookies'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  token: localStorage.getItem('token') || getCookie('auth_token') || null,
  hydrated: false,          // indicates initialization finished
  pendingProfile: false,    // network profile fetch in flight
    userStats: {
  followers: 0,
  following: 0,
  posts: 0
    },
    posts: []
  }),

  getters: {
  // Authenticated when we have both a token and a user object (user is loaded from cache immediately on init)
  isAuthenticated: (state) => !!state.token && !!state.user,
  hasToken: (state) => !!state.token,
  isHydrated: (state) => state.hydrated,
    userName: (state) => state.user?.userName,
    userEmail: (state) => state.user?.userEmail,
    userAvatar: (state) => state.user?.avatar,
    userBio: (state) => state.user?.bio,
    userCoverPhoto: (state) => state.user?.coverPhoto,
    userVerified: (state) => state.user?.verified || false,
    userPosts: (state) => state.posts,
    postsCount: (state) => state.posts.length
  },
  
  actions: {
    // Initialize auth store - called on app startup
    async initialize() {
      if (this.hydrated) return
      // Always attempt to load cached user first for instant state
      if (!this.user) {
        this.initializeUser()
      }
      if (this.token) {
        this.pendingProfile = true
        try {
          await this.fetchProfile()
        } catch (e) {
          const status = e?.response?.status
            || e?.status
            || e?.response?.data?.status
          if (status === 401) {
            // Only clear on definite invalid token
            this.clearSession()
          } else {
            // Keep cached user; soft error logged
            console.warn('[auth] profile fetch failed, using cached user')
          }
        } finally {
          this.pendingProfile = false
          this.hydrated = true
        }
      } else {
        // No token; consider hydrated even if user exists (guest or stale cache)
        this.hydrated = true
      }
    },

    setToken(token, rememberDays = 30) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
        setCookie('auth_token', token, rememberDays)
      } else {
        localStorage.removeItem('token')
        deleteCookie('auth_token')
      }
    },

    mapApiUserToState(apiUser) {
      if (!apiUser) return null
      // Map preferred_categories (IDs) to names using categories store if available (lazy require to avoid circular dep)
      let categoryIds = apiUser.preferred_categories || apiUser.categories || []
      let categoryNames = []
      try {
        // Dynamically import store to avoid build-time circular issues
        const { useCategoriesStore } = require('@/store/categories')
        const catStore = useCategoriesStore()
        const nameList = catStore.getCategories.map(c => c.name)
        // If backend sends IDs (1-based), map by index-1; if names already, just pass through
        categoryNames = categoryIds.every(id => typeof id === 'number')
          ? categoryIds.map(id => nameList[id - 1]).filter(Boolean)
          : categoryIds
      } catch (e) {
        categoryNames = categoryIds // fallback
      }
      const resolveImage = (p, fallback) => {
        if (!p) return fallback
        if (/^https?:/i.test(p)) return p
        const rawBase = import.meta.env.VITE_API_BASE_URL || API_CONFIG.baseURL || ''
        // If base ends with /api strip it when referencing storage assets
        const assetBase = /\/api\/?$/.test(rawBase) ? rawBase.replace(/\/api\/?$/, '') : rawBase
        const cleaned = String(p).replace(/^\/*/, '')
        // Some backends return path starting with 'storage/' already; ensure single 'storage/'
        if (/^storage\//i.test(cleaned)) {
          return `${assetBase.replace(/\/$/, '')}/${cleaned}`
        }
        return `${assetBase.replace(/\/$/, '')}/${cleaned}`
      }
      return {
        id: apiUser.id,
  userName: apiUser.username || [apiUser.first_name, apiUser.last_name].filter(Boolean).join(' ') || apiUser.userName || apiUser.name || 'user',
  userEmail: apiUser.email,
  name: [apiUser.first_name, apiUser.last_name].filter(Boolean).join(' ') || apiUser.name || apiUser.username,
  firstName: apiUser.first_name || null,
  lastName: apiUser.last_name || null,
  avatar: resolveImage(apiUser.profile_image || apiUser.avatar || apiUser.avatarUrl, ''),
  coverPhoto: resolveImage(apiUser.background_image || apiUser.cover_photo || apiUser.coverPhoto, ''),
  bio: apiUser.bio || apiUser.description || '',
  birthDate: apiUser.date_naissance || apiUser.birth_date || null,
  gender: apiUser.gender || null,
        categories: categoryNames,
  role: apiUser.role || null,
  permissions: apiUser.permissions || [],
  verified: apiUser.isVerified || apiUser.verified || false,
  stats: apiUser.stats || { followers: 0, following: 0, posts: 0 },
  joinedDate: apiUser.created_at || apiUser.joinedDate || new Date().toISOString(),
      }
    },

    // Fetch profile from API using saved token
    async fetchProfile() {
      this.setLoading(true)
      this.clearError()
      try {
        const res = await AuthService.getProfile()
        const payload = res?.data || res // support wrapped or direct
        const user = payload.user || payload
        this.user = this.mapApiUserToState(user)
        // Persist refreshed user immediately
        if (this.user) {
          const serialized = JSON.stringify(this.user)
          localStorage.setItem('user', serialized)
          setCookie('auth_user', serialized, 30)
        }
        return this.user
      } catch (error) {
        this.setError(error?.response?.data?.error?.message || 'Failed to load profile')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    // Update user profile data
    updateUserProfile(profileData) {
      if (this.user) {
        this.user = {
          ...this.user,
          ...profileData
        }
        // Persist to localStorage for fallback
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },

    // Persist profile changes to backend (first_name, last_name, etc.)
    async updateProfileRemote(payload) {
      this.setLoading(true)
      this.clearError()
      try {
        const res = await AuthService.updateProfile(payload)
        const response = res?.data || res
        const apiUser = response.user || response
        if (apiUser) {
          this.user = this.mapApiUserToState(apiUser)
          localStorage.setItem('user', JSON.stringify(this.user))
        } else {
          // If backend returns only success flag, merge manually
          this.updateUserProfile(payload)
        }
        return { success: true, user: this.user }
      } catch (e) {
        this.setError(e?.response?.data?.message || 'Profile update failed')
        return { success: false, error: this.error }
      } finally {
        this.setLoading(false)
      }
    },

    async updateProfileImage(file) {
      return this.updateProfileRemote({ profile_image: file })
    },
    async updateBackgroundImage(file) {
      return this.updateProfileRemote({ background_image: file })
    },
    
    // Update user stats
    updateUserStats(stats) {
      this.userStats = {
        ...this.userStats,
        ...stats
      }
    },
    
  // No mock posts; posts remain empty unless created by the user

    // Add a new post
    addPost(postData) {
      const newPost = {
        id: Date.now(),
        content: postData.content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
  // shares removed
        image: postData.image || null,
        type: postData.image ? 'image' : 'text'
      }
      this.posts.unshift(newPost) // Add to beginning of array
      
      // Update posts count in user stats
      this.updateUserStats({ posts: this.posts.length })
    },

    // Like a post
    likePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.likes += 1
      }
    },

    // Unlike a post
    unlikePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post && post.likes > 0) {
        post.likes -= 1
      }
    },

    // Delete a post
    deletePost(postId) {
      this.posts = this.posts.filter(p => p.id !== postId)
      this.updateUserStats({ posts: this.posts.length })
    },

    // Initialize user from localStorage (fallback when no token)
    initializeUser() {
      try {
        let savedUser = localStorage.getItem('user')
        if (!savedUser) {
          const cookieUser = getCookie('auth_user')
          if (cookieUser) savedUser = cookieUser
        }
        if (savedUser) {
          this.user = JSON.parse(savedUser)
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        localStorage.removeItem('user')
        deleteCookie('auth_user')
      }
    },
    
    // Login action - call backend API
  async login(credentials) {
      this.setLoading(true)
      this.clearError()
      
      try {
        const res = await AuthService.login(credentials)
        const payload = res?.data || res
        const token = payload.token || payload?.data?.token
        const apiUser = payload.user || payload?.data?.user

  if (token) this.setToken(token)
        this.user = this.mapApiUserToState(apiUser)
        // Update stats store if backend provided
        if (apiUser?.stats) {
          this.userStats = { ...this.userStats, ...apiUser.stats }
        }
        if (this.user) {
          const serialized = JSON.stringify(this.user)
          localStorage.setItem('user', serialized)
          setCookie('auth_user', serialized, 30)
        }
  // Remove mock posts when real feed is integrated; comment out for production
  // this.initializeMockPosts()
        return { success: true, user: this.user }
      } catch (error) {
        const status = error?.response?.status
        if (status === 401) {
          this.setError('Invalid email or password.')
          return { success: false, error: this.error }
        }
  // No mock fallback
        this.setError(error?.response?.data?.message || 'Login failed')
        return { success: false, error: this.error }
      } finally {
        this.setLoading(false)
      }
    },
    // Register new user (flow step 1/2)
  async register(form) {
      this.setLoading(true)
      this.clearError()
      try {
        const res = await AuthService.register(form)
        const payload = res?.data || res
        const token = payload.token || payload?.data?.token
        const apiUser = payload.user || payload?.data?.user
        if (token) this.setToken(token)
        if (apiUser) {
          this.user = this.mapApiUserToState(apiUser)
          const serialized = JSON.stringify(this.user)
          localStorage.setItem('user', serialized)
          setCookie('auth_user', serialized, 30)
        }
        return { success: true, user: this.user, token }
      } catch (e) {
        this.setError(e?.response?.data?.message || 'Registration failed')
        return { success: false, error: this.error }
      } finally {
        this.setLoading(false)
      }
    },
    
    // Logout action
    async logout() {
      try {
        await AuthService.logout()
      } catch (_) {
        // ignore
      } finally {
        this.clearSession()
      }
    },

    clearSession() {
      this.user = null
      this.setToken(null)
      this.userStats = {
        followers: 0,
        following: 0,
        posts: 0
      }
      this.posts = [] // Clear posts on logout
      localStorage.removeItem('user')
      deleteCookie('auth_user')
      this.hydrated = true
      this.pendingProfile = false
    },

    // Set loading state
    setLoading(loading) {
      this.loading = loading
    },

    // Set error state
    setError(error) {
      this.error = error
    },

    // Clear error
    clearError() {
      this.error = null
    }
  }
})