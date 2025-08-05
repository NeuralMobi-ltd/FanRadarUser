import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    userStats: {
      followers: 132,
      following: 12,
      posts: 15
    },
    posts: []
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
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
    initialize() {
      this.initializeUser()
    },

    // Update user profile data
    updateUserProfile(profileData) {
      if (this.user) {
        this.user = {
          ...this.user,
          ...profileData
        }
        // Persist to localStorage
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

    // Initialize user from localStorage
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
    
    // Login action - updated to handle proper authentication
    async login(credentials) {
      this.setLoading(true)
      this.clearError()
      
      try {
        // Here you would typically make an API call
        // For now, using mock authentication
        const { email, password } = credentials
        
        // Mock user data that should come from your backend
        const userData = {
          id: 1,
          userName: email.split('@')[0], // Extract username from email
          userEmail: email,
          avatar: 'https://ui-avatars.com/api/?name=' + email.split('@')[0] + '&background=6366f1&color=fff&size=256',
          bio: 'FanRadar user',
          coverPhoto: '',
          verified: false,
          joinedDate: new Date().toISOString(),
          // Don't store password in user object for security
        }
        
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Initialize user stats and posts
        this.userStats = {
          followers: 132,
          following: 12,
          posts: 15
        }
        
        // Initialize mock posts after successful login
        this.initializeMockPosts()
        
        return { success: true, user: userData }
        
      } catch (error) {
        this.setError('Login failed. Please check your credentials.')
        return { success: false, error: error.message }
      } finally {
        this.setLoading(false)
      }
    },
    
    // Logout action
    logout() {
      this.user = null
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