import { defineStore } from 'pinia'

// Mock user database
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@fanradar.com',
    password: 'password123',
    avatar: '/public/images/me.png',
    followers: 1250,
    following: 892,
    posts: 156
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@fanradar.com',
    password: 'password123',
    avatar:  '/public/images/me.png',
    followers: 2340,
    following: 567,
    posts: 289
  },
  {
    id: 3,
    name: 'yassineelaouni',
    email: 'yss@fanradars.com',
    password: 'ysselhhh123',
    avatar:  '/public/images/me.png',
    followers: 5670,
    following: 234,
    posts: 1024
  },
  {
    id: 4,
    name: 'Test User',
    email: 'test@test.com',
    password: 'test123',
    avatar:  '/public/images/me.png',
    followers: 100,
    following: 150,
    posts: 25
  }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async login({ email, password }) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if email and password are provided
        if (!email || !password) {
          throw new Error('Email and password are required')
        }
        
        // Find user in mock database
        const existingUser = mockUsers.find(u => u.email === email)
        
        // If no matching user was found in the database, create a temporary one
        // This allows any email/password combination to work
        let user = existingUser 
        if (!user) {
          user = {
            id: Math.floor(Math.random() * 10000) + 100,
            name: email.split('@')[0] || 'User',
            email,
            password,
            avatar: '/public/images/me.png', // Fix avatar path
            followers: Math.floor(Math.random() * 500),
            following: Math.floor(Math.random() * 300),
            posts: Math.floor(Math.random() * 50)
          }
          
          // Add to mock database for future logins
          mockUsers.push(user)
        }
        
        // Create session data (exclude password)
        const { password: _, ...userWithoutPassword } = user
        const sessionData = {
          ...userWithoutPassword,
          token: `token-${user.id}-${Date.now()}`
        }
        
        // Complete login
        this.user = sessionData
        localStorage.setItem('auth', JSON.stringify(sessionData))
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    
    async signup({ email, password, name }) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if email and password are provided
        if (!email || !password) {
          throw new Error('Email and password are required')
        }
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email)
        
        if (existingUser) {
          throw new Error('Email already exists')
        }
        
        // Store signup information for verification step
        localStorage.setItem('pendingAuthEmail', email)
        localStorage.setItem('pendingSignupPassword', password)
        localStorage.setItem('pendingSignupName', name || '')
        
        // Generate and send verification code instead of completing signup
        return await this.sendVerificationCode(email)
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    
    async sendVerificationCode(email) {
      this.loading = true
      this.error = null
      
      try {
        // Validate email
        if (!email) {
          throw new Error('Email is required')
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock verification code - always use 123456 for testing simplicity
        // In a real app, this would be random and sent via email
        const code = "123456"
        
        // Store code temporarily (in real app, this would be server-side)
        localStorage.setItem('verificationCode', code)
        localStorage.setItem('verificationEmail', email)
        
        console.log(`Verification code for ${email}: ${code}`) // For testing
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    
    async verifyCode(enteredCode) {
      this.loading = true
      this.error = null
      
      try {
        const storedCode = localStorage.getItem('verificationCode')
        const email = localStorage.getItem('pendingAuthEmail')
        const password = localStorage.getItem('pendingSignupPassword')
        const name = localStorage.getItem('pendingSignupName')
        
        if (!storedCode || !email) {
          throw new Error('Verification session expired')
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (enteredCode === storedCode) {
          // Create new user
          const newUser = {
            id: mockUsers.length + 1,
            name: name || email.split('@')[0],
            email,
            password,
            avatar: 'https://via.placeholder.com/40',
            followers: 0,
            following: 0,
            posts: 0
          }
          
          // Add to mock database
          mockUsers.push(newUser)
          
          // Create session data (exclude password)
          const { password: _, ...userWithoutPassword } = newUser
          const sessionData = {
            ...userWithoutPassword,
            token: `token-${newUser.id}-${Date.now()}`
          }
          
          // Complete signup and login
          this.user = sessionData
          localStorage.setItem('auth', JSON.stringify(sessionData))
          
          // Clean up verification data
          localStorage.removeItem('verificationCode')
          localStorage.removeItem('verificationEmail')
          localStorage.removeItem('pendingAuthEmail')
          localStorage.removeItem('pendingSignupPassword')
          localStorage.removeItem('pendingSignupName')
          
          return true
        }
        
        throw new Error('Invalid verification code')
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.error = null
      localStorage.removeItem('auth')
      localStorage.removeItem('verificationCode')
      localStorage.removeItem('verificationEmail')
    },
    initialize() {
      const auth = localStorage.getItem('auth')
      if (auth) {
        try {
          this.user = JSON.parse(auth)
        } catch (error) {
          console.error('Failed to parse auth data:', error)
          localStorage.removeItem('auth')
        }
      }
    },
    
    clearError() {
      this.error = null
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.name || '',
    userEmail: (state) => state.user?.email || '',
    userStats: (state) => ({
      followers: state.user?.followers || 0,
      following: state.user?.following || 0,
      posts: state.user?.posts || 0
    })
  }
})