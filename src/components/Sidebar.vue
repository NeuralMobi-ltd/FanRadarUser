<template>
  <aside class="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-800 flex flex-col">
    <!-- Logo -->
    <div class="px-5 py-4">
      <router-link to="/" class="text-black dark:text-white hover:opacity-80 transition-opacity flex items-center">
        <img
          :src="isDark ? logoSrcWhite : logoSrc"
          alt="FanRadar Logo"
          class="h-14 object-contain"
        />
      </router-link>
    </div>
    <!-- Main Navigation -->
    <nav class="flex-1 px-2">
      <ul class="space-y-1">
        <li>
          <router-link 
            to="/" 
            class="nav-link text-gray-900 dark:text-white"
            :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': $route.path === '/' }"
          >
            <i class="fas fa-home text-xl"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/user/explore" 
            class="nav-link text-gray-900 dark:text-white"
            :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': $route.path === 'user/explore' }"
          >
            <i class="fas fa-compass text-xl"></i>
            <span>Explore</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/likes" 
            class="nav-link text-gray-900 dark:text-white"
            :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': $route.path === '/likes' }"
          >
            <i class="fas fa-heart text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Likes
              <span class="text-xs bg-gray-100 dark:bg-[#1A1A1A] px-2 py-0.5 rounded">3</span>
            </span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/following" 
            class="nav-link text-gray-900 dark:text-white"
            :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': $route.path === '/following' }"
          >
            <i class="fas fa-user-friends text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Following
              <span class="text-xs bg-gray-100 dark:bg-[#1A1A1A] px-2 py-0.5 rounded">6</span>
            </span>
          </router-link>
        </li>
        <li>
          <button 
            @click="isAccountOpen = !isAccountOpen"
            class="nav-link w-full text-gray-900 dark:text-white"
            :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': isAccountOpen }"
          >
            <i class="fas fa-user text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Account
              <i :class="['fas', isAccountOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-sm opacity-60']"></i>
            </span>
          </button>
        </li>
      </ul>

      <!-- Account Dropdown -->
      <div v-if="isAccountOpen" class="mt-1 pl-6 space-y-2">
        <button @click="logout" class="block py-2 text-sm opacity-80 hover:opacity-100 w-full text-left text-red-500">
          Log out
        </button>
        <router-link 
         :to="`/account/${userName}`" 
          class="flex items-center gap-3 px-0 py-2 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] rounded-md transition-colors"
        >
          <div class="w-8 h-8 bg-purple-500 rounded flex items-center justify-center overflow-hidden">
            <img
              v-if="userAvatar && userAvatar !== '/public/images/me.png'"
              :src="userAvatar"
              alt="avatar"
              class="w-8 h-8 object-cover rounded"
              @error="avatarError = true"
            />
            <span v-else class="text-white font-bold text-lg">
              {{ userName ? userName.charAt(0).toUpperCase() : 'U' }}
            </span>
          </div>
          <div>
            <div class="text-sm font-medium truncate">{{ userName }}</div>
          </div>
        </router-link>
      </div>

        <!-- FanRadarMart Link -->
        <router-link
          to="/mart"
          class="nav-link text-gray-900 dark:text-white"
          :class="{ 'bg-gray-100 dark:bg-[#1A1A1A]': $route.path === '/mart' }"
        >
          <i class="fas fa-store text-xl"></i>
          <span class="text-sm font-medium">FanRadarMart</span>
        </router-link>
    </nav>

    <!-- Create Post Button -->
    <div class="p-4">
      <button
        class="w-full flex items-center justify-center gap-2 bg-[#00BFFF] hover:bg-[#0099cc] text-black rounded-full py-3 font-medium transition-colors mb-2"
        @click="toggleThemeMode"
      >
        <i class="fas fa-palette"></i>
        Change Theme
      </button>
      <button class="w-full flex items-center justify-center gap-2 bg-[#00BFFF] hover:bg-[#0099cc] text-black rounded-full py-3 font-medium transition-colors">
        <i class="fas fa-pen"></i>
        Create
      </button>
    </div>
  </aside>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Sidebar',
  data() {
    return {
      isAccountOpen: true
    }
  },
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const avatarError = ref(false)

    // Theme/logo logic (from GuestSidebar)
    const themeStore = useThemeStore()
    const logoSrcWhite = '/images/FanRadarWhite.png'
    const logoSrc = '/images/FanRadar.png'
    const isDark = ref(document.documentElement.classList.contains('dark'))

    // Watch for dark mode changes
    const updateIsDark = () => {
      isDark.value = document.documentElement.classList.contains('dark')
    }

    onMounted(() => {
      const observer = new MutationObserver(updateIsDark)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    })

    const toggleThemeMode = () => {
      const html = document.documentElement
      html.classList.toggle('dark')
      updateIsDark()
      themeStore.toggleTheme && themeStore.toggleTheme()
    }

    const logout = () => {
      auth.logout()
      window.location.href = '/communities'
    }

    const userName = computed(() => auth.user?.name || 'yassineelaouni')
    const userEmail = computed(() => auth.user?.email || 'yassineelaouni@fanradar.com')
    const userAvatar = computed(() => {
      if (avatarError.value) return ''
      if (auth.user?.avatar && auth.user.avatar !== '/public/images/me.png') return auth.user.avatar
      return '/images/me.png'
    })
    const userStats = computed(() => ({
      followers: auth.user?.followers ?? 0,
      following: auth.user?.following ?? 0,
      posts: auth.user?.posts ?? 0
    }))

    return {
      auth,
      logout,
      userName,
      userEmail,
      userAvatar,
      userStats,
      avatarError,
      // theme/logo
      toggleThemeMode,
      logoSrc,
      logoSrcWhite,
      isDark
    }
  }
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Light mode hover */
.nav-link:hover {
  background-color: #f3f4f6; /* Tailwind gray-100 */
}

/* Dark mode hover: use a slightly lighter dark shade for contrast */
.dark .nav-link:hover {
  background-color: #232b3e !important; /* matches dark hover in GuestSidebar */
}

.nav-link i {
  width: 1.5rem;
}

.nav-link span {
  font-weight: 500;
}
</style>
