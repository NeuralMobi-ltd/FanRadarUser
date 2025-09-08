import { defineStore } from 'pinia'
import PostsService from '@/services/postsService'
import API_CONFIG from '@/config/api'

// Helper to resolve media/storage paths to absolute URLs
function resolveMediaUrl(p) {
  if (!p) return p
  const apiBase = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
  const root = apiBase.replace(/\/api$/i, '')
  if (/^https?:/i.test(p)) {
    // Remove /api before /storage if present
    return p.replace('/api/storage/', '/storage/')
  }
  const cleaned = String(p).replace(/^\/+/, '')
  // posts/images|videos without storage prefix
  if (/^posts\/(images|videos)\//i.test(cleaned)) {
    return `${root}/storage/${cleaned}`
  }
  if (cleaned.startsWith('storage/')) return `${root}/${cleaned}`
  if (cleaned.startsWith('api/storage/')) return `${root}/${cleaned.replace(/^api\//,'')}`
  return `${root}/${cleaned}`
}

export const usePostsStore = defineStore('posts', {
  state: () => ({
  posts: [],
    activeFeed: 'timeline',
    loadingMore: false,
    hasMorePosts: true,
  pagination: { page: 1, limit: 20, hasNext: true },
  lastMutation: 0,
  savedPosts: [],
  savedPagination: null,

    // Category-specific posts for CategoryDetail pages
    categoryPosts: {
      sport: [
        {
          id: 101,
          username: 'SportsEnthusiast',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: '2h ago',
          communityName: 'Premier League Fans',
          content: 'What an incredible match yesterday! The last-minute goal completely changed the league standings. Anyone else think the referee missed a clear penalty in the first half?',
          image: 'https://dims.apnews.com/dims4/default/9a1aa05/2147483647/strip/true/crop/5058x2845+0+263/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2Fc3%2F568b2887ee1325a267b042192e69%2F8021f5b2054d4f93ac59558090f0e304',
          tags: ['PremierLeague', 'Football', 'MatchDay', 'Referee'],
          likes: 234,
          comments: 56,
          isLiked: false,
          fandom: 'Sport'
        },
        {
          id: 102,
          username: 'BasketballFan44',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '5h ago',
          communityName: 'NBA Central',
          content: 'Hot take: This rookie class might be the best we\'ve seen in the past decade. The skill level and basketball IQ of these young players is absolutely off the charts!',
          image: 'https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/02/nba_central.jpg',
          tags: ['NBA', 'Rookies', 'Basketball', 'HotTake'],
          likes: 189,
          comments: 43,
          isLiked: true,
          fandom: 'Sport'
        },
        {
          id: 103,
          username: 'F1Analyst',
          userAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
          date: '1d ago',
          communityName: 'Formula 1',
          content: 'Breaking down the new aerodynamic regulations and how they might affect the competitive balance next season. Teams with high downforce philosophy will need to completely rethink their approach.',
          image: 'https://e0.365dm.com/25/02/2048x1152/skysports-pirelli-f1-2025-test_6820918.jpg?20250206074138',
          tags: ['Formula1', 'F1Regulations', 'Aerodynamics', 'Racing'],
          comments: 89,
          isLiked: false,
          fandom: 'Sport'
        }
      ],
      gaming: [
        {
          id: 201,
          username: 'GamerPro2024',
          userAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
          date: '3h ago',
          communityName: 'Gaming Central',
          content: 'The new League of Legends patch completely changed the meta! Assassins are back in a big way. Time to dust off my Zed gameplay 🎮',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          tags: ['LeagueOfLegends', 'Gaming', 'Meta', 'Patch'],
          likes: 156,
          comments: 34,
          isLiked: false,
          fandom: 'Gaming'
        },
        {
          id: 7,
          username: 'john_doe',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        date: '2h ago',
        text: 'This is a sample post with a single image.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        tags: ['Vue', 'Pinia', 'Mock'],
  likes: 12,
  comments: 2,
        isLiked: false,
        isSaved: false,
        fandom: 'Vue Fans',
        trending: true,
        commentsList: [
          {
            id: 1,
            username: 'Jane Smith',
            userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            content: 'Awesome post! Love the image.',
            date: '1h ago'
          },
          {
            id: 2,
            username: 'Bob Lee',
            userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            content: 'Great work!',
            date: '30m ago'
          }
        ]
      },
      {
        id: 8,
        username: 'alice_j',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        date: '1h ago',
        text: 'Check out this cool carousel!',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308' },
          { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
        ],
        tags: ['Carousel', 'Media'],
  likes: 8,
  comments: 1,
        isLiked: true,
        isSaved: true,
        fandom: 'Media Lovers',
        trending: false,
        commentsList: [
          {
            id: 1,
            username: 'John Doe',
            userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            content: 'Nice carousel!',
            date: '45m ago'
          }
        ]
      },
        {
          id: 202,
          username: 'PlayStationFan',
          userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
          date: '6h ago',
          communityName: 'PlayStation Nation',
          content: 'Just got my hands on the new exclusive PS5 game and it\'s absolutely stunning! The graphics and gameplay are next level 🔥',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop',
          tags: ['PS5', 'PlayStation', 'Gaming', 'Exclusive'],
          likes: 203,
          comments: 67,
          isLiked: true,
          fandom: 'Gaming'
        }
      ],
      entertainment: [
        {
          id: 301,
          username: 'AnimeWatcher',
          userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          date: '4h ago',
          communityName: 'Anime Enthusiasts',
          content: 'The latest episode of Attack on Titan was absolutely mind-blowing! I can\'t believe they managed to top last week\'s episode 😭',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
          tags: ['AttackOnTitan', 'Anime', 'Manga', 'Episode'],
          likes: 445,
          comments: 123,
          isLiked: false,
          fandom: 'Entertainment'
        },
        {
          id: 302,
          username: 'MovieCritic',
          userAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          date: '8h ago',
          communityName: 'Movie Buffs',
          content: 'Just watched the latest Marvel movie and I have mixed feelings. Great action sequences but the plot felt rushed. What did you all think?',
          image: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=800&h=500&fit=crop',
          tags: ['Marvel', 'Movies', 'Review', 'Cinema'],
          likes: 89,
          comments: 45,
          isLiked: false,
          fandom: 'Entertainment'
        }
      ]
    }
  }),
  
  getters: {
    filteredPosts: (state) => {
      let filtered = state.posts
      switch (state.activeFeed) {
        case 'trending':
          filtered = filtered.filter(post => post.trending)
          break
        case 'following':
          // Following feed comes pre-filtered from backend; show as-is
          filtered = filtered
          break
        default:
          break
      }
  return filtered.slice().sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime()))
    },
    
    trendingPosts: (state) => state.posts.filter(post => post.trending),
    followingPosts: (state) => state.posts.filter(post => post.isLiked),
    postsByFandom: (state) => (fandom) => state.posts.filter(post => post.fandom === fandom),
    
    // Get posts by category for CategoryDetail pages
    getPostsByCategory: (state) => (category) => {
      return state.categoryPosts[category] || []
    }
  },
  
  actions: {
    mapBackendPost(apiPost) {
      if (!apiPost) return null
      const user = apiPost.user || apiPost.author || {}
      const mediaArr = Array.isArray(apiPost.media) ? apiPost.media.map(m => {
        const srcRaw = typeof m === 'string' ? m : (m.file_path || m.url || m.path || m.src || '')
        const src = resolveMediaUrl(srcRaw)
        return { type: /\.(mp4|webm|ogg)$/i.test(srcRaw) ? 'video' : 'image', url: src }
      }) : []
      const displayName = [user.first_name || user.firstName, user.last_name || user.lastName].filter(Boolean).join(' ').trim() || user.username || (user.email ? user.email.split('@')[0] : '') || 'User'
      let avatar = user.profile_image || user.avatar || user.profileImage
      if (avatar) avatar = resolveMediaUrl(avatar)
      return {
        id: apiPost.id,
        originalId: apiPost.id,
        username: displayName,
        avatar,
        date: new Date(apiPost.created_at || apiPost.createdAt || Date.now()),
        text: apiPost.description || apiPost.content || apiPost.body || '',
        media: mediaArr,
        tags: Array.isArray(apiPost.tags) ? apiPost.tags : [],
        likes: apiPost.likes || apiPost.likes_count || apiPost.favorites_count || apiPost.stats?.likes || 0,
        comments: apiPost.comments || apiPost.comments_count || 0,
        isLiked: !!apiPost.liked || !!apiPost.is_liked,
        isSaved: !!apiPost.is_saved || !!apiPost.saved_at,
        fandom: apiPost.fandom || null,
        trending: !!apiPost.trending,
        likedBy: []
      }
    },
    normalizeApiPost(apiPost) {
      if (!apiPost) return null
      const media = Array.isArray(apiPost.media) ? apiPost.media.map(m => {
        const raw = typeof m === 'string' ? m : (m.file_path || m.url || m.path || m.src || '')
        return {
          type: /\.(mp4|webm|ogg)$/i.test(raw) ? 'video' : 'image',
          url: resolveMediaUrl(raw)
        }
      }) : []
      return {
        id: apiPost.id,
        originalId: apiPost.id,
        text: apiPost.description || apiPost.content || apiPost.body || '',
        media,
        likes: apiPost.likes || apiPost.likes_count || apiPost.favorites_count || apiPost.stats?.likes || 0,
        comments: apiPost.comments || apiPost.comments_count || 0,
        isLiked: !!apiPost.liked || !!apiPost.is_liked,
  isSaved: !!apiPost.is_saved || !!apiPost.saved_at,
        fandom: apiPost.fandom || null,
        trending: !!apiPost.trending,
        date: new Date(apiPost.created_at || apiPost.createdAt || Date.now()),
        tags: Array.isArray(apiPost.tags) ? apiPost.tags : []
      }
    },
    replaceOptimistic(tempId, apiPost) {
      const normalized = this.normalizeApiPost(apiPost)
      if (!normalized) return
      const idx = this.posts.findIndex(p => p.id === tempId)
      if (idx !== -1) {
        this.posts[idx] = { ...this.posts[idx], ...normalized }
        this.lastMutation = Date.now()
      } else {
        this.posts.unshift(normalized)
        this.lastMutation = Date.now()
      }
    },
    async fetchHomeFeed() {
      try {
  const { posts, pagination } = await PostsService.homeFeed({ page: 1, limit: this.pagination.limit })
  this.pagination = pagination || { page: 1, limit: this.pagination.limit, hasNext: false }
  this.posts = Array.isArray(posts) ? posts.map(p => this.mapBackendPost(p)).filter(Boolean) : []
        this.hasMorePosts = !!(pagination && pagination.hasNext)
        this.lastMutation = Date.now()
      } catch (e) {
        // On failure remain with existing posts
      }
    },
    async fetchFollowingFeed(params = {}) {
      try {
        const query = { page: 1, limit: this.pagination.limit, ...params }
        const { posts, pagination } = await PostsService.followingFeed(query)
        this.pagination = pagination || { page: 1, limit: this.pagination.limit, hasNext: false }
        this.posts = Array.isArray(posts) ? posts.map(p => this.mapBackendPost(p)).filter(Boolean) : []
        this.hasMorePosts = !!(this.pagination && this.pagination.hasNext)
        this.lastMutation = Date.now()
        return { success: true }
      } catch (e) {
        return { success: false, error: e?.message || 'Failed to load following feed' }
      }
    },
    async fetchTrendingTop(params = {}) {
      try {
        const { posts, pagination } = await PostsService.trendingTop(params)
        const mapped = Array.isArray(posts) ? posts.map(p => {
          const m = this.mapBackendPost(p)
          return m ? { ...m, trending: true } : null
        }).filter(Boolean) : []
        // Replace current posts with trending list to keep filteredPosts in sync when activeFeed==='trending'
        // If you prefer to merge, consider de-duping by id.
        this.posts = mapped
        this.pagination = pagination || { page: 1, limit: this.pagination.limit, hasNext: false }
        this.hasMorePosts = !!(this.pagination && this.pagination.hasNext)
        this.lastMutation = Date.now()
        return { success: true }
      } catch (e) {
        return { success: false, error: e?.message || 'Failed to load trending posts' }
      }
    },
    async fetchExploreFeed() {
      try {
        const res = await PostsService.exploreFeed()
        const payload = res?.data || res
        const list = (payload.posts || payload.data?.posts || []).map(p => ({
          id: p.id,
          username: p.author?.name,
          avatar: p.author?.avatar,
          date: new Date(p.createdAt),
          text: p.content,
          media: (p.media || []).map(m => ({ type: m.type || 'image', url: m })),
          likes: p.likes || 0,
          comments: p.comments || 0,
          // shares removed
          isLiked: !!p.isLiked,
          fandom: p.fandom?.name || null,
          trending: !!p.trending
        }))
        this.posts = list
      } catch (e) {
        // keep mock data
      }
    },
    async createPost(payload, config = {}) {
      // Allow callers to skip the immediate local add and rely on a follow-up feed refresh
      const skipAdd = !!config.__skipAdd
      const axiosCfg = { ...config }
      delete axiosCfg.__skipAdd
      const res = await PostsService.create(payload, axiosCfg)
      const p = res?.data?.post || res?.data || res?.post || res
      if (!skipAdd && p) {
        // Map backend shape defensively (prefer description when content is missing)
        const mapped = this.mapBackendPost({
          ...p,
          description: p.description || p.content || payload?.description || payload?.content || ''
        })
        if (mapped) this.posts.unshift(mapped)
      }
      return res
    },
    async updatePostApi(postId, payload) {
      // Extract numeric ID; accept composite keys like '2025-09-01T...-123'
      let apiId = postId
      if (typeof apiId === 'string') {
        const tail = apiId.split('-').pop()
        if (/^\d+$/.test(tail)) apiId = tail
      }
      if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
      // Guard against invalid or zero id (backend expects positive int)
      if (!apiId || typeof apiId !== 'number' || apiId <= 0) {
        return { success: false, error: 'Invalid post id for update', id: postId }
      }
      const res = await PostsService.update(apiId, payload)
      const p = res?.post || res?.data?.post || res
      if (p?.id) {
        const idx = this.posts.findIndex(x => x.id === p.id || x.originalId === p.id || x.id === postId)
        if (idx !== -1) {
          this.posts[idx] = {
            ...this.posts[idx],
            text: p.description || p.content || this.posts[idx].text,
            media: (p.media || []).map(m => ({ type: m.type || 'image', url: typeof m === 'string' ? m : m.url })),
            trending: !!p.trending,
            originalId: p.id
          }
          this.lastMutation = Date.now()
        }
      }
      return res
    },
    async deletePostApi(postId) {
      // Resolve to numeric backend id if we stored originalId
      const record = this.posts.find(p => p.id === postId || p.originalId === postId)
      let apiId = record?.originalId || postId
      if (typeof apiId === 'string') {
        const tail = apiId.split('-').pop()
        if (/^\d+$/.test(tail)) apiId = tail
      }
      if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
      if (typeof apiId !== 'number' || apiId <= 0) {
        return { success: false, error: 'Invalid post id for delete', id: postId }
      }
      try {
        const res = await PostsService.remove(apiId)
        if (res?.success !== false) {
          this.deletePost(postId)
        }
        return res
      } catch (e) {
        return { success: false, error: e?.message || 'Delete failed', id: postId }
      }
    },
    async fetchUserPosts(userId, params = {}) {
      try {
        const { posts } = await PostsService.userPosts(userId, params)
        if (Array.isArray(posts)) {
          this.posts = posts.map(p => ({
            id: p.id,
            username: p.author?.name || p.username || '',
            avatar: p.author?.avatar || p.profile_image || p.avatar,
            date: new Date(p.created_at || p.createdAt || Date.now()),
            text: p.description || p.body || p.content || '',
            media: (p.media || []).map(m => ({ type: m.type || 'image', url: typeof m === 'string' ? m : m.url })),
            likes: p.likes || p.likes_count || 0,
            comments: p.comments || p.comments_count || 0,
            isLiked: !!p.isLiked || !!p.liked,
            fandom: p.fandom?.name || p.fandom || null,
            trending: !!p.trending
          }))
        }
      } catch (e) {
        // ignore keep existing
      }
    },
    async favoritePostApi(postId) {
      try {
        const record = this.posts.find(p => p.id === postId || p.originalId === postId)
        let apiId = record?.originalId || postId
        if (typeof apiId === 'string') {
          const tail = apiId.split('-').pop()
          if (/^\d+$/.test(tail)) apiId = tail
        }
        if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
        if (typeof apiId !== 'number' || apiId <= 0) return { success: false, error: 'Invalid post id for favorite', id: postId }
        await PostsService.favorite(apiId)
        if (record) this.toggleLike(record.id, 'currentUser')
        return { success: true }
      } catch (e) {
        return { success: false, error: e?.message || 'Favorite failed', id: postId }
      }
    },
    async savePostApi(postId) {
      try {
        const record = this.posts.find(p => p.id === postId || p.originalId === postId)
        let apiId = record?.originalId || postId
        if (typeof apiId === 'string') {
          const tail = apiId.split('-').pop()
          if (/^\d+$/.test(tail)) apiId = tail
        }
        if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
        if (typeof apiId !== 'number' || apiId <= 0) return { success: false, error: 'Invalid post id for save', id: postId }
        const res = await PostsService.save(apiId)
        if (record) record.isSaved = true
        this.lastMutation = Date.now()
        return res
      } catch (e) {
        return { success: false, error: e?.message || 'Save failed', id: postId }
      }
    },
    async unsavePostApi(postId) {
      try {
        const record = this.posts.find(p => p.id === postId || p.originalId === postId)
        let apiId = record?.originalId || postId
        if (typeof apiId === 'string') {
          const tail = apiId.split('-').pop()
          if (/^\d+$/.test(tail)) apiId = tail
        }
        if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
        if (typeof apiId !== 'number' || apiId <= 0) return { success: false, error: 'Invalid post id for unsave', id: postId }
        const res = await PostsService.unsave(apiId)
        if (record) record.isSaved = false
        this.lastMutation = Date.now()
        return res
      } catch (e) {
        return { success: false, error: e?.message || 'Unsave failed', id: postId }
      }
    },
    async addCommentApi(postId, content) {
      try {
        const payload = typeof content === 'string' ? { content } : content
        const record = this.posts.find(p => p.id === postId || p.originalId === postId)
        let apiId = record?.originalId || postId
        if (typeof apiId === 'string') {
          const tail = apiId.split('-').pop()
          if (/^\d+$/.test(tail)) apiId = tail
        }
        if (typeof apiId === 'string' && /^\d+$/.test(apiId)) apiId = Number(apiId)
        const res = await PostsService.addComment(apiId, payload)
        if (record) {
          record.comments = (record.comments || 0) + 1
          if (!record.commentsList) record.commentsList = []
          const commentData = res?.comment || res?.data?.comment || { id: Date.now(), content: payload.content, created_at: new Date().toISOString() }
          record.commentsList.unshift({
            id: commentData.id,
            content: commentData.content || commentData.text,
            date: commentData.created_at || commentData.createdAt || new Date().toISOString(),
            username: commentData.user?.username || commentData.user?.name || 'You',
            userAvatar: commentData.user?.avatar || commentData.user?.profile_image_url || ''
          })
        }
        return res
      } catch (e) {
        return { success: false, error: e?.message || 'Add comment failed', id: postId }
      }
    },
    async loadSavedPosts(params = {}) {
      try {
        const { posts, pagination } = await PostsService.savedPosts(params)
        if (Array.isArray(posts)) {
          this.savedPosts = posts.map(p => this.normalizeApiPost({
            ...p,
            likes: p.likes_count,
            comments: p.comments_count
          }))
          this.savedPagination = pagination
          this.lastMutation = Date.now()
        }
        return { success: true }
      } catch (e) {
        return { success: false, error: e?.message || 'Failed to load saved posts' }
      }
    },

    addPost(post) {
      const newPost = {
        id: Date.now(),
  originalId: post.originalId || (Number.isInteger(post.id) ? post.id : null),
  likes: 0,
  comments: 0,
        isLiked: false,
        fandom: null,
        trending: false,
        likedBy: [],
        date: new Date(),
        ...post
      }
      this.posts.unshift(newPost)
  this.lastMutation = Date.now()
    },
    
    deletePost(postId) {
  this.posts = this.posts.filter(post => post.id !== postId && post.originalId !== postId)
  this.lastMutation = Date.now()
    },
    
    likePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.isLiked = !post.isLiked
        post.likes += post.isLiked ? 1 : -1
  this.lastMutation = Date.now()
      }
    },
    
  // sharePost removed
    
    setActiveFeed(feed) {
      this.activeFeed = feed
    },
    
    async loadMorePosts() {
      if (!this.pagination?.hasNext || this.loadingMore) return
      this.loadingMore = true
      try {
        const nextPage = (this.pagination.page || 1) + 1
        if (this.activeFeed === 'trending') {
          const { posts, pagination } = await PostsService.trendingTop({ page: nextPage, limit: this.pagination.limit })
          if (Array.isArray(posts) && posts.length) {
            const mapped = posts.map(p => {
              const m = this.mapBackendPost(p)
              return m ? { ...m, trending: true } : null
            }).filter(Boolean)
            this.posts.push(...mapped)
          }
          this.pagination = pagination || { ...this.pagination, page: nextPage, hasNext: false }
        } else if (this.activeFeed === 'following') {
          const { posts, pagination } = await PostsService.followingFeed({ page: nextPage, limit: this.pagination.limit })
          if (Array.isArray(posts) && posts.length) {
            const mapped = posts.map(p => this.mapBackendPost(p)).filter(Boolean)
            this.posts.push(...mapped)
          }
          this.pagination = pagination || { ...this.pagination, page: nextPage, hasNext: false }
        } else {
          const { posts, pagination } = await PostsService.homeFeed({ page: nextPage, limit: this.pagination.limit })
          if (Array.isArray(posts) && posts.length) {
            const mapped = posts.map(p => this.mapBackendPost(p)).filter(Boolean)
            this.posts.push(...mapped)
          }
          this.pagination = pagination || { ...this.pagination, page: nextPage, hasNext: false }
        }
        this.hasMorePosts = !!(this.pagination && this.pagination.hasNext)
        this.lastMutation = Date.now()
      } catch (e) {
        // ignore
      } finally {
        this.loadingMore = false
      }
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
  this.lastMutation = Date.now()
      }
    },
    updatePost(postId, updatedPost) {
      const index = this.posts.findIndex(post => post.id === postId)
      if (index !== -1) {
        this.posts[index] = updatedPost
  this.lastMutation = Date.now()
      }
    }
  },
  persist: true
})