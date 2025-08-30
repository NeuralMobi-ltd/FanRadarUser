// Central API configuration and endpoints
export const API_CONFIG = {
  // Enable mocks while backend is not ready (can be overridden via env)
  // Set default to false so real API is used unless explicitly enabled
  useMocks: (import.meta?.env?.VITE_USE_MOCKS ?? 'false') === 'true',
  mockLatency: Number(import.meta?.env?.VITE_MOCK_LATENCY ?? 300),

  // Base URL of your backend API (adjust for prod/staging via env if needed)
  // Updated default base URL to Laravel backend
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',

  // Auth
  auth: {
    // Primary (current backend) endpoints
    login: '/api/Y/auth/login',
    register: '/api/Y/auth/register',
  logout: '/api/Y/auth/logout',
  // Profile endpoints (backend uses same path for GET (show) & POST (update))
  profile: '/api/Y/users/profile',
  updateProfile: '/api/Y/users/profile', // also used for image updates via form-data
  updateAvatar: '/api/Y/users/profile',
  updateCover: '/api/Y/users/profile',
    // Legacy / fallback endpoints (optional) can be added here if needed
  },

  // Users
  users: {
  // Backend namespaced under /api/Y for user-specific resources
  posts: (userId) => `/api/Y/users/${userId}/posts`,
  followers: (userId) => `/api/Y/users/${userId}/followers`,
  following: (userId) => `/api/Y/users/${userId}/following`,
  follow: (userId) => `/api/Y/users/${userId}/follow`,
  },

  // Feed / Posts
  feed: {
    home: '/api/feed/home',
    explore: '/api/feed/explore',
    trendingPosts: '/api/trending/posts',
  },
  posts: {
  // NOTE: Backend currently uses /api/Y/... for mutable post routes (create/update/delete)
  create: '/api/Y/posts/create', // backend route observed in Postman screenshot
  update: (postId) => `/api/Y/posts/${postId}/update`,
  delete: (postId) => `/api/Y/posts/${postId}/delete`,
  like: (postId) => `/api/posts/${postId}/like`, // keep non-Y like (adjust if backend also namespaces)
  comments: (postId) => `/api/posts/${postId}/comments`,
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
