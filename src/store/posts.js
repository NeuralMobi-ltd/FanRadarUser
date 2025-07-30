import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [
      {
        id: 1,
        author: 'user',
        authorName: 'User',
        authorAvatar: 'https://ui-avatars.com/api/?name=User',
        content: 'My vacation photos!',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80' },
          { type: 'video', url: 'https://example.com/sample-video.mp4' }
        ],
        date: new Date().toISOString(),
        likes: 24,
        comments: 5,
        shares: 2,
        likedBy: [],
        visibility: 'public',
        tags: ['vacation', 'travel']
      },
      {
        id: 2,
        author: 'user',
        authorName: 'User',
        authorAvatar: 'https://ui-avatars.com/api/?name=User',
        content: 'Check out this video I made!',
        media: [
          { type: 'video', url: 'https://example.com/another-video.mp4' }
        ],
        date: new Date(Date.now() - 86400000).toISOString(),
        likes: 42,
        comments: 8,
        shares: 3,
        likedBy: [],
        visibility: 'public',
        tags: ['video', 'creative']
      }
    ]
  }),
  actions: {
    addPost(post) {
      this.posts.unshift(post)
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    },
    toggleLike(postId, username) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        if (!post.likedBy) {
          post.likedBy = []
        }
        
        const index = post.likedBy.indexOf(username)
        if (index === -1) {
          post.likedBy.push(username)
          post.likes += 1
        } else {
          post.likedBy.splice(index, 1)
          post.likes -= 1
        }
      }
    },
    updatePost(postId, updatedPost) {
      const index = this.posts.findIndex(post => post.id === postId)
      if (index !== -1) {
        this.posts[index] = updatedPost
      }
    }
  },
  persist: true
})