import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestHomeLayout from '@/layouts/GuestHomeLayout.vue'
import { useAuthStore } from '@/store/auth'
import CommunitiesBrowse from '@/views/CommunitiesBrowse.vue'
import Account from '@/views/Account.vue'
import EditAccount from '@/views/EditAccount.vue'
import Mart from '@/views/Mart.vue'
import MyCart from '@/components/MyCart.vue'
import CreateFandom from '@/views/CreateFandom.vue'
import FandomDetail from '@/views/FandomDetail.vue'

const routes = [
  {
    path: '/',
    redirect: (to) => {
      const auth = useAuthStore()
      return auth.isAuthenticated ? '/dashboard' : '/communities'
    }
  },
  {
    path: '/communities',
    component: GuestHomeLayout,
    children: [
      {
        path: '',
        name: 'Communities',
        component: () => import('@/views/Communities.vue'),
        meta: { requiresAuth: false, guestOnly: true }
      },
    ]
  },
  {
    path: '/explore',
    component: GuestHomeLayout,
    children: [
      {
        path: '',
        name: 'Explore',
        component: () => import('@/views/GestExplore.vue'),
        meta: { requiresAuth: false, guestOnly: true }
      }
    ]
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('@/views/Likes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/following',
    name: 'Following',
    component: () => import('@/views/Following.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/explore',
    name: 'UserExplore',
    component: () => import('@/views/UserExplore.vue'),
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
    component: Account
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: EditAccount
  },
  {
    path: '/mart',
    name: 'Mart',
    component: Mart
  },
  {
    path: '/cart',
    name: 'Cart',
    component: MyCart
  },
  {
    path: '/create-fandom',
    name: 'CreateFandom',
    component: CreateFandom
  },
  {
    path: '/fandom/:name',
    name: 'FandomDetail',
    component: FandomDetail,
    meta: { requiresAuth: false }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = auth.isAuthenticated
  
  // If route requires guest access only and user is authenticated
  if ((to.path === '/communities' || to.path === '/explore') && isAuthenticated) {
    // Redirect to dashboard or home for authenticated users
    return next('/dashboard')
  }

  // For authenticated routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/communities')
  }
  const authStore = useAuthStore()
  
  // Initialize auth state
  if (!authStore.user) {
    authStore.initialize()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
    } else if (to.meta.role && to.meta.role !== authStore.user.role) {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router