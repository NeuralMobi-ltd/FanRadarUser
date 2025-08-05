import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Fandoms from '@/views/community/Fandoms.vue'
import CommunitiesBrowse from '@/views/community/CommunitiesBrowse.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/general/LandingPage.vue'), // Default to landing page
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/content/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    name: 'UserExplore',
    component: () => import('@/views/content/Explore.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/content/News.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/category/:category',
    name: 'CategoryDetail',
    component: () => import('@/views/content/CategoryDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hashtag/:hashtag',
    name: 'HashtagDetail',
    component: () => import('@/views/content/HashtagDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/views/content/SearchResults.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/communities/browse',
    name: 'Fandoms',
    component: Fandoms,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/:user',
    name: 'Account',
    component: () => import('@/views/account/Account.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: () => import('@/views/account/EditAccount.vue')
  },
  {
    path: '/mart',
    name: 'Mart',
    component: () => import('@/views/store/Mart.vue'),
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/mart/search',
    name: 'ProductSearchResults',
    component: () => import('@/views/store/ProductSearchResults.vue'),
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/components/store/MyCart.vue'),
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/components/store/MyOrder.vue'),
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: () => import('@/components/store/OrderDetails.vue'),
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/create-fandom',
    name: 'CreateFandom',
    component: () => import('@/views/community/CreateFandom.vue')
  },
  {
    path: '/fandom/:name',
    name: 'FandomDetail',
    component: () => import('@/views/community/FandomDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/choose-categories',
    name: 'ChooseCategories',
    component: () => import('@/views/auth/ChooseCategories.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/fandoms/browse',
    name: 'FandomsBrowse',
    component: CommunitiesBrowse,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth store if needed
  if (!authStore.user) {
    authStore.initialize()
  }

  // Handle root path based on authentication status
  if (to.path === '/') {
    if (authStore.isAuthenticated) {
      // If authenticated, redirect to dashboard
      next('/dashboard')
      return
    } else {
      // If not authenticated, show landing page
      next()
      return
    }
  }

  // Allow access to auth pages for non-authenticated users
  if (['/login', '/signup', '/choose-categories'].includes(to.path)) {
    next()
    return
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth !== false) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }
  }

  next()
})

export default router