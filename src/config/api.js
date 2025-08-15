// Central API configuration and endpoints
export const API_CONFIG = {
  // Enable mocks while backend is not ready (can be overridden via env)
  useMocks: (import.meta?.env?.VITE_USE_MOCKS ?? 'true') === 'true',
  mockLatency: Number(import.meta?.env?.VITE_MOCK_LATENCY ?? 300),

  // Base URL of your backend API (adjust for prod/staging via env if needed)
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

  // Auth
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    profile: '/api/users/profile',
    updateProfile: '/api/users/profile',
    updateAvatar: '/api/users/avatar',
    updateCover: '/api/users/cover-photo',
  },

  // Users
  users: {
    posts: (userId) => `/api/users/${userId}/posts`,
    followers: (userId) => `/api/users/${userId}/followers`,
    following: (userId) => `/api/users/${userId}/following`,
    follow: (userId) => `/api/users/${userId}/follow`,
  },

  // Feed / Posts
  feed: {
    home: '/api/feed/home',
    explore: '/api/feed/explore',
    trendingPosts: '/api/trending/posts',
  },
  posts: {
    create: '/api/posts',
    like: (postId) => `/api/posts/${postId}/like`,
    comments: (postId) => `/api/posts/${postId}/comments`,
    share: (postId) => `/api/posts/${postId}/share`,
    saved: '/api/posts/saved',
  },

  // Categories & Hashtags
  categories: {
    all: '/api/categories',
    contentByCategory: (category) => `/api/categories/${encodeURIComponent(category)}/content`,
  },
  hashtags: {
    posts: (hashtag) => `/api/hashtags/${encodeURIComponent(hashtag)}/posts`,
  },

  // Fandoms
  fandoms: {
    all: '/api/fandoms',
    trending: '/api/fandoms/trending',
    categories: '/api/fandoms/categories',
    search: (query) => `/api/fandoms/search?q=${encodeURIComponent(query)}`,
    byId: (idOrHandle) => `/api/fandoms/${idOrHandle}`,
    posts: (idOrHandle) => `/api/fandoms/${idOrHandle}/posts`,
    members: (idOrHandle) => `/api/fandoms/${idOrHandle}/members`,
    join: (idOrHandle) => `/api/fandoms/${idOrHandle}/join`,
    create: '/api/fandoms',
    uploadImage: '/api/upload/image',
    update: (idOrHandle) => `/api/fandoms/${idOrHandle}`,
    changeRole: (idOrHandle, userId) => `/api/fandoms/${idOrHandle}/role/${userId}`,
    hashtags: (idOrHandle) => `/api/fandoms/${idOrHandle}/hashtags`,
  },

  // Search
  search: {
    global: (q, type) => `/api/search/global?q=${encodeURIComponent(q)}${type ? `&type=${encodeURIComponent(type)}` : ''}`,
    suggestions: (q) => `/api/search/suggestions?q=${encodeURIComponent(q)}`,
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
