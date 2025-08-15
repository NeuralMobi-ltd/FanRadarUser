import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { i18n } from '@/i18n'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/general/LandingPage.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.home' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/content/Home.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.dashboard' }
  },
  {
    path: '/explore',
    name: 'UserExplore',
    component: () => import('@/views/content/Explore.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.explore' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/content/News.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.news' }
  },
  {
    path: '/category/:category',
    name: 'CategoryDetail',
    component: () => import('@/views/content/CategoryDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.category' }
  },
  {
    path: '/hashtag/:hashtag',
    name: 'HashtagDetail',
    component: () => import('@/views/content/HashtagDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.hashtag' }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/views/content/SearchResults.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.search' }
  },
  {
    path: '/fandoms/browse',
    name: 'Fandoms',
    component: () => import('@/views/fandom/Fandoms.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.fandoms' }
  },
  {
    path: '/account/:user',
    name: 'Account',
    component: () => import('@/views/account/Account.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.account' }
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: () => import('@/views/account/EditAccount.vue'),
    meta: { titleKey: 'routes.editAccount' }
  },
  {
    path: '/mart',
    name: 'Mart',
    component: () => import('@/views/store/Mart.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.mart' }
  },
  {
    path: '/mart/search',
    name: 'ProductSearchResults',
    component: () => import('@/views/store/ProductSearchResults.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.productSearch' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/components/store/MyCart.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.cart' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/components/store/MyOrder.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.orders' }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: () => import('@/components/store/OrderDetails.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.orderDetails' }
  },
  {
    path: '/create-fandom',
    name: 'CreateFandom',
    component: () => import('@/views/community/CreateFandom.vue'),
    meta: { titleKey: 'routes.createFandom' }
  },
  {
    path: '/fandom/:name',
    name: 'FandomDetail',
    component: () => import('@/views/fandom/FandomDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.fandomDetail' }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.signIn' }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.signUp' }
  },
  {
    path: '/choose-categories',
    name: 'ChooseCategories',
    component: () => import('@/views/auth/ChooseCategories.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.chooseCategories' }
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

router.afterEach((to) => {
  const titleKey = to.meta?.titleKey
  if (titleKey) {
    const t = i18n.global.t
    document.title = `${t(titleKey)} • FanRadar`
  } else {
    document.title = 'FanRadar'
  }
})

export default router