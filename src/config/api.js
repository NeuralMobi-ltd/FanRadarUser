// Central API configuration and endpoints
export const API_CONFIG = {
  // Enable mocks while backend is not ready (can be overridden via env)
  // Set default to false so real API is used unless explicitly enabled
  useMocks: (import.meta?.env?.VITE_USE_MOCKS ?? 'false') === 'true',
  mockLatency: Number(import.meta?.env?.VITE_MOCK_LATENCY ?? 300),

  // Base URL of your backend API (adjust for prod/staging via env if needed)
  // Updated default base URL to Laravel backend
  // If VITE_API_BASE_URL not provided, default includes /api so endpoints can use /Y/...
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',

  // Auth
  auth: {
    // Y namespace (baseURL already ends with /api)
    login: '/Y/auth/login',
    register: '/Y/auth/register',
    logout: '/Y/auth/logout',
    // Profile endpoints (GET + POST)
    profile: '/Y/users/profile',
    updateProfile: '/Y/users/profile',
    updateAvatar: '/Y/users/profile',
    updateCover: '/Y/users/profile'
  },

  // Users
  users: {
  // Fetch another user's profile by numeric id
  profileById: (userId) => `/Y/users/${userId}/profile`,
    posts: (userId) => `/Y/users/${userId}/posts`,
    followers: (userId) => `/Y/users/${userId}/followers`,
    following: (userId) => `/Y/users/${userId}/following`,
  follow: (userId) => `/Y/users/${userId}/follow`,
  unfollow: (userId) => `/Y/users/${userId}/unfollow`,
  myFandoms: '/Y/users/my-fandoms'
  },

  // Feed / Posts
  feed: {
    home: '/Y/feed/home',
    // Provide placeholders if explore/trending exist (adjust if backend differs)
    explore: '/Y/feed/explore',
    trendingPosts: '/Y/feed/trending'
  },
  posts: {
    create: '/Y/posts/create',
    update: (postId) => `/Y/posts/${postId}/update`,
    delete: (postId) => `/Y/posts/${postId}/delete`,
    favorite: (postId) => `/Y/posts/${postId}/favorite`,
  comments: (postId) => `/Y/posts/${postId}/comments`,
  save: '/Y/posts/save',
  unsave: '/Y/posts/unsave',
  saved: '/Y/posts/saved', // legacy / placeholder
  savedPosts: '/Y/posts/savedPosts'
  },

  // Categories & Hashtags
  categories: {
    list: '/Y/categories/list',
    // Keep legacy endpoints if still used somewhere else
    all: '/Y/categories/list',
    contentByCategory: (category) => `/Y/categories/${encodeURIComponent(category)}/content`
  },
  hashtags: {
    posts: (hashtag) => `/api/hashtags/${encodeURIComponent(hashtag)}/posts`,
  },

  // Fandoms
  fandoms: {
    // These endpoints now expect a numeric fandom id (NOT a slug/handle)
    all: '/Y/fandoms',
    trending: '/Y/fandoms/trending',
    search: (query) => `/Y/fandoms/search?q=${encodeURIComponent(query)}`,
    byId: (id) => `/Y/fandoms/${id}`,
    posts: (id) => `/Y/fandoms/${id}/posts`,
  createPost: (id) => `/Y/fandoms/${id}/posts`, // POST
  updatePost: (fid, pid) => `/Y/fandoms/${fid}/posts/${pid}`, // PUT
  deletePost: (fid, pid) => `/Y/fandoms/${fid}/posts/${pid}`, // DELETE
    members: (id) => `/Y/fandoms/${id}/members`,
    join: (id) => `/Y/fandoms/${id}/join`,
  leave: (id) => `/Y/fandoms/${id}/leave`,
    create: '/Y/fandoms',
    update: (id) => `/Y/fandoms/${id}`,
    uploadImage: '/Y/fandoms/upload-image',
    changeRole: (id, userId) => `/Y/fandoms/${id}/members/${userId}/role`,
    hashtags: (id) => `/Y/fandoms/${id}/hashtags`,
    categories: '/Y/fandoms/categories'
  },

  // Search
  search: {
    global: (q, type) => `/api/search/global?q=${encodeURIComponent(q)}${type ? `&type=${encodeURIComponent(type)}` : ''}`,
    suggestions: (q) => `/api/search/suggestions?q=${encodeURIComponent(q)}`,
    // New resource‑specific search endpoints (Y namespace)
    users: (q, page = 1, limit = 20) => `/Y/search/users?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`,
    // Posts search supports flexible params; accept an object to build query string at call site if preferred
    posts: (params = {}) => {
      const { q, tag, tags, subcategory_id, page = 1, limit = 20 } = params
      const sp = new URLSearchParams()
      if (q) sp.append('q', q)
      if (tag) sp.append('tag', tag)
      if (Array.isArray(tags)) tags.forEach(t => sp.append('tags[]', t))
      if (subcategory_id) sp.append('subcategory_id', subcategory_id)
      sp.append('page', page)
      sp.append('limit', limit)
      return `/Y/search/posts?${sp.toString()}`
    },
    fandoms: (q, page = 1, limit = 20) => `/Y/search/fandom?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
  },

  // Notifications
  notifications: {
    all: '/api/notifications',
    markRead: (id) => `/api/notifications/${id}/read`,
    markAllRead: '/api/notifications/mark-all-read',
  },

  // Store
  store: {
    products: '/api/store/products',
    categories: '/api/store/categories',
    brands: '/api/store/brands',
    search: (q) => `/api/store/products/search?q=${encodeURIComponent(q)}`,
    cart: '/api/store/cart',
    cartItem: (itemId) => `/api/store/cart/${itemId}`,
    orders: '/api/store/orders',
    orderById: (orderId) => `/api/store/orders/${orderId}`,
    cancelOrder: (orderId) => `/api/store/orders/${orderId}/cancel`,
    wishlist: (productId) => `/api/store/wishlist/${productId}`,
  }
}

export default API_CONFIG
