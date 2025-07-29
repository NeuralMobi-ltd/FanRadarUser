import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: []
  }),
  
  actions: {
    addPost(post) {
      this.posts.unshift({
        id: Date.now(),
        ...post,
        author: post.author || 'anonymous',
        date: new Date().toISOString()
      })
    },
    
    updatePost(id, content) {
      const index = this.posts.findIndex(p => p.id === id)
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...content }
      }
    },
    
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
    }
  }
})
