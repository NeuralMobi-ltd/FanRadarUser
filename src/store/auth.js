import { defineStore } from 'pinia'
import AuthService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
    userStats: {
      followers: 132,
      following: 12,
      posts: 15
    },
    posts: []
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
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
      // Prefer API profile when token exists
      if (this.token) {
        try {
          await this.fetchProfile()
          return
        } catch (e) {
          // token might be invalid; clear and fall back to local
          this.clearSession()
        }
      }
      this.initializeUser()
    },

    setToken(token) {
      this.token = token
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    },

    mapApiUserToState(apiUser) {
      if (!apiUser) return null
      return {
        id: apiUser.id,
        userName: apiUser.username || apiUser.userName || apiUser.name || 'user',
        userEmail: apiUser.email,
        name: apiUser.name,
        avatar: apiUser.avatar || apiUser.avatarUrl || '/images/me.png',
        bio: apiUser.bio || '',
        coverPhoto: apiUser.coverPhoto || '',
        verified: apiUser.isVerified || apiUser.verified || false,
        joinedDate: apiUser.joinedDate || new Date().toISOString(),
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
        // Optionally initialize posts from profile endpoint if exists
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
    
    // Update user stats
    updateUserStats(stats) {
      this.userStats = {
        ...this.userStats,
        ...stats
      }
    },
    
    // Initialize mock posts
    initializeMockPosts() {
      const mockPosts = [
        {
          id: 1,
          content: "Just discovered this amazing new band! Their sound is incredible 🎵",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          likes: 24,
          comments: 5,
          shares: 2,
          media: [
            {
              type: 'image',
              url: 'https://picsum.photos/600/400?random=10',
              caption: 'Band photo'
            },
            {
              type: 'video',
              url: 'https://www.w3schools.com/html/mov_bbb.mp4',
              caption: 'Live performance'
            }
          ],
          type: 'media'
        },
        {
          id: 2,
          content: "Concert tonight was absolutely mind-blowing! The energy was unreal ⚡",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          likes: 89,
          comments: 23,
          shares: 12,
          media: [
            {
              type: 'image',
              url: 'https://picsum.photos/600/400?random=1',
              caption: 'Concert crowd'
            },
            {
              type: 'image',
              url: 'https://picsum.photos/600/400?random=11',
              caption: 'Stage lights'
            }
          ],
          type: 'media'
        },
        {
          id: 3,
          content: "Working on my latest music review. This album is going to be a game changer! 📝",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          likes: 45,
          comments: 8,
          shares: 6,
          type: 'text'
        },
        {
          id: 4,
          content: "Throwback to last week's festival! Missing those vibes already 🎪",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
          likes: 156,
          comments: 34,
          shares: 28,
          media: [
            {
              type: 'image',
              url: 'https://picsum.photos/600/400?random=2',
              caption: 'Festival stage'
            },
            {
              type: 'video',
              url: 'https://www.w3schools.com/html/movie.mp4',
              caption: 'Festival highlights'
            },
            {
              type: 'image',
              url: 'https://picsum.photos/600/400?random=12',
              caption: 'Crowd dancing'
            }
          ],
          type: 'media'
        },
        {
          id: 5,
          content: "New playlist is live! Perfect mix for your weekend chill sessions 🎧",
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          likes: 67,
          comments: 12,
          shares: 15,
          type: 'text'
        }
      ]
      this.posts = mockPosts
    },

    // Add a new post
    addPost(postData) {
      const newPost = {
        id: Date.now(),
        content: postData.content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
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
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          this.user = JSON.parse(savedUser)
          this.initializeMockPosts() // Initialize posts when user is loaded
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        localStorage.removeItem('user')
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
        if (this.user) localStorage.setItem('user', JSON.stringify(this.user))
        // Optionally initialize posts
        this.initializeMockPosts()
        return { success: true, user: this.user }
      } catch (error) {
        // Fallback to mock login to avoid blocking UI during backend bring-up
        // Remove this fallback when backend is ready
        const { email } = credentials
        const userData = {
          id: 1,
          userName: email.split('@')[0],
          userEmail: email,
          avatar: 'https://ui-avatars.com/api/?name=' + email.split('@')[0] + '&background=6366f1&color=fff&size=256',
          bio: 'FanRadar user',
          coverPhoto: '',
          verified: false,
          joinedDate: new Date().toISOString(),
        }
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        this.initializeMockPosts()
        this.setError('Connected in mock mode. Backend not reachable.')
        return { success: true, user: userData, mock: true }
      } finally {
        this.setLoading(false)
      }
    },
    
    // Logout action
    logout() {
      this.clearSession()
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