import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    // Other users data (not the authenticated user)
    users: [
      {
        id: 1,
        name: 'yassineelaouni',
        username: 'yassineelaouni581',
        email: 'yss@fanradars.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
        coverPhoto: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=200&fit=crop',
        bio: 'Tech enthusiast | Web developer | Coffee lover ☕ Building amazing apps with Vue.js and Node.js',
        followers: 5670,
        following: 234,
        posts: 4,
        joinedDate: '2023-01-15',
        verified: true
      }
    ], 
    
    // All posts (from all users)
    posts: [
      {
        id: 1,
        username: 'yassineelaouni581',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face',
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
            caption: 'Demon Slayer movie poster'
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
            caption: 'Demon Slayer movie poster'
          },
          {
            type: 'video',
            url: 'https://www.w3schools.com/html/movie.mp4',
            caption: 'Fight scene highlight'
          }
        ],        likes: 145,
        comments: 32,
        shares: 12,
        date: '2h ago',
        isLiked: false
      },
      {
        id: 2,
        username: 'yassineelaouni581',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face',
        content: 'Beautiful sunset today! 🌅',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        likes: 289,
        comments: 43,
        shares: 17,
        date: '1d ago',
        isLiked: true
      }
    ],
    
    // Social connections
    followers: [
      {
        id: 1,
        name: 'John Doe',
        username: 'john_doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
        bio: 'Tech enthusiast and developer'
      }
    ],
    
    following: [
      {
        id: 1,
        name: 'Sarah Wilson',
        username: 'sarah_w',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
        bio: 'Travel blogger and adventurer'
      }
    ]
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
    }
  }
})
