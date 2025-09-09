import { i18n } from '@/i18n'
import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/general/LandingPage.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.home', showBottomNav: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/content/Home.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.dashboard', showBottomNav: true }
  },
  {
    path: '/explore',
    name: 'UserExplore',
    component: () => import('@/views/content/Explore.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.explore', showBottomNav: true }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/content/News.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.news', showBottomNav: true }
  },
  {
    path: '/category/:category',
    name: 'CategoryDetail',
    component: () => import('@/views/content/CategoryDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.category', showBottomNav: true }
  },
  {
    path: '/hashtag/:hashtag',
    name: 'HashtagDetail',
    component: () => import('@/views/content/HashtagDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.hashtag', showBottomNav: true }
  },
  {
    path: '/subcategory/:id',
    name: 'SubcategoryDetail',
    component: () => import('@/views/content/SubcategoryDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.subcategory', showBottomNav: true }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/views/content/SearchResults.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.search', showBottomNav: true }
  },
  {
    path: '/fandoms/browse',
    name: 'Fandoms',
    component: () => import('@/views/fandom/Fandoms.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.fandoms', showBottomNav: true }
  },
  {
    path: '/account/:user',
    name: 'Account',
    component: () => import('@/views/account/Account.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.account', showBottomNav: true }
  },
  {
    path: '/profile',
    name: 'MyProfile',
    beforeEnter: (to, from, next) => {
      // Use auth store first, fall back to cached user in localStorage
      try {
        const authStore = useAuthStore()
        let userName = authStore?.userName || authStore?.user?.userName
        if (!userName) {
          const cached = JSON.parse(localStorage.getItem('user') || '{}')
          userName = cached.userName || cached.username || cached.name
        }
        if (userName) {
          next({ name: 'Account', params: { user: userName } })
        } else {
          next('/login')
        }
      } catch {
        next('/login')
      }
    },
    meta: { requiresAuth: true, titleKey: 'routes.account', showBottomNav: true }
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: () => import('@/views/account/EditAccount.vue'),
    meta: { titleKey: 'routes.editAccount', showBottomNav: true }
  },
  {
    path: '/mart',
    name: 'Mart',
    component: () => import('@/views/store/Mart.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.mart', showBottomNav: true }
  },
  {
    path: '/mart/search',
    name: 'ProductSearchResults',
    component: () => import('@/views/store/ProductSearchResults.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.productSearch', showBottomNav: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/components/store/MyCart.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.cart', showBottomNav: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/components/store/MyOrder.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.orders', showBottomNav: true }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: () => import('@/components/store/OrderDetails.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.orderDetails', showBottomNav: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/store/Favorites.vue'),
    meta: { requiresAuth: true, layout: 'store', titleKey: 'routes.favorites', showBottomNav: true }
  },
  {
    path: '/create-fandom',
    name: 'CreateFandom',
    component: () => import('@/views/fandom/CreateFandom.vue'),
    meta: { titleKey: 'routes.createFandom', showBottomNav: true }
  },
  {
    path: '/fandom/:name',
    name: 'FandomDetail',
    component: () => import('@/views/fandom/FandomDetail.vue'),
    meta: { requiresAuth: true, titleKey: 'routes.fandomDetail', showBottomNav: true }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.signIn', showBottomNav: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.signUp', showBottomNav: false }
  },
  {
    path: '/choose-categories',
    name: 'ChooseCategories',
    component: () => import('@/views/auth/ChooseCategories.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.chooseCategories', showBottomNav: false }
  },
  {
    path: '/verify-otp',
    name: 'OtpVerification',
    component: () => import('@/views/auth/OtpVerification.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.otpVerification', showBottomNav: false }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.forgotPassword', showBottomNav: false }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: { requiresAuth: false, titleKey: 'routes.resetPassword', showBottomNav: false }
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
    try {
      await authStore.initialize()
    } catch (e) {
      // swallow init errors; authStore will be unauthenticated if something failed
    }
  }

  // Ensure hydration finished (initialize sets hydrated flag)
  if (!authStore.isHydrated) {
    try { await authStore.initialize() } catch (_) { /* ignore */ }
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
  if (['/login', '/signup', '/choose-categories', '/verify-otp', '/forgot-password', '/reset-password'].includes(to.path)) {
    next()
    return
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth !== false) {
    // While token exists and profile still loading, allow navigation (avoid premature redirect)
    if (authStore.hasToken && authStore.pendingProfile) {
      return next()
    }
    if (!authStore.isAuthenticated) {
      return next('/login')
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