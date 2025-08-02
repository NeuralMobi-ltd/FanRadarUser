import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import CommunitiesBrowse from '@/views/CommunitiesBrowse.vue'
import Account from '@/views/Account.vue'
import EditAccount from '@/views/EditAccount.vue'
import Mart from '@/views/Mart.vue'
import MyCart from '@/components/MyCart.vue'
import MyOrder from '@/components/MyOrder.vue'
import orderDetails from '@/components/OrderDetails.vue'
import CreateFandom from '@/views/CreateFandom.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
const ChooseCategories = () => import('@/views/ChooseCategories.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LandingPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/explore', // Changed from '/exploree' to '/explore'
    name: 'UserExplore',
    component: () => import('@/views/UserExplore.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/category/:category',
    name: 'CategoryDetail',
    component: () => import('@/views/CategoryDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hashtag/:hashtag',
    name: 'HashtagDetail',
    component: () => import('@/views/HashtagDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/communities/browse',
    name: 'CommunitiesBrowse',
    component: CommunitiesBrowse,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/:user',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: EditAccount
  },
  {
    path: '/mart',
    name: 'Mart',
    component: Mart,
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: MyCart,
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: MyOrder,
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: orderDetails,
    meta: { requiresAuth: true, layout: 'store' }
  },
  {
    path: '/create-fandom',
    name: 'CreateFandom',
    component: CreateFandom
  },
  {
    path: '/fandom/:name',
    name: 'FandomDetail',
    component: () => import('@/views/FandomDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/choose-categories',
    name: 'ChooseCategories',
    component: ChooseCategories,
    meta: { requiresAuth: false }
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

  // Allow access to auth pages for non-authenticated users
  if (['/login', '/signup', '/choose-categories', '/'].includes(to.path)) {
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