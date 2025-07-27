import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestHomeLayout from '@/layouts/GuestHomeLayout.vue'
import Profile from '@/views/Profile.vue'
import { useAuthStore } from '@/store/auth'

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
        component: () => import('@/views/Comm.vue'),
        meta: { requiresAuth: false, guestOnly: true }
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
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