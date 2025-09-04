import { defineStore } from 'pinia'
import UsersService from '@/services/usersService'

export const useUsersStore = defineStore('users', {
  state: () => ({
    // Other users data (not the authenticated user)
    users: [],    
    // All posts (from all users)
    posts: [],     
    // Social connections
    followers: [],
    following: []
  }),
  
  getters: {
    // Get user by username
    getUserByUsername: (state) => (username) => {
      return state.users.find(user => 
        user.username === username || 
        user.name === username ||
        user.email?.split('@')[0] === username
      )
    },
    
    // Get posts by username
    getPostsByUsername: (state) => (username) => {
      return state.posts.filter(post => post.username === username)
    },
    
    // Get all users
    getAllUsers: (state) => state.users,
    
    // Get followers list
    getFollowers: (state) => state.followers,
    
    // Get following list
    getFollowing: (state) => state.following
  },
  
  actions: {
    // Add a new user
    addUser(user) {
      this.users.push({
        ...user,
        id: Date.now()
      })
    },
    
    // Update user
    updateUser(updatedUser) {
      const index = this.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser }
      }
    },
    
    // Add post
    addPost(post) {
      this.posts.unshift({
        ...post,
        id: Date.now()
      })
    },
    
    // Add follower
    addFollower(follower) {
      this.followers.push(follower)
    },
    
    // Remove follower
    removeFollower(followerId) {
      this.followers = this.followers.filter(f => f.id !== followerId)
    },
    
    // Add to following
    addToFollowing(user) {
      this.following.push(user)
    },
    
    // Remove from following
    removeFromFollowing(userId) {
      this.following = this.following.filter(f => f.id !== userId)
    },
    async followUserApi(userId) {
      try {
        const res = await UsersService.follow(userId)
        if (res?.success !== false) {
          if (!this.following.find(u => u.id === userId)) {
            this.following.push({ id: userId, username: `user_${userId}` })
          }
        }
        return res
      } catch (e) { return null }
    },
    async unfollowUserApi(userId) {
      try {
        const res = await UsersService.unfollow(userId)
        if (res?.success !== false) {
          this.following = this.following.filter(u => u.id !== userId)
        }
        return res
      } catch (e) { return null }
    }
  }
})
