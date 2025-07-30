<template>
  <aside class="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-50">
    <!-- Logo Section -->
    <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-center">
      <router-link to="/" class="flex items-center justify-center">
        <img
          :src="isDark ? logoSrcWhite : logoSrc"
          alt="FanRadar Logo"
          class="h-12 transition-all hover:scale-105"
        />
      </router-link>
    </div>

    <!-- Main Navigation -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
      <ul class="space-y-1">
        <!-- Home -->
        <li>
          <router-link 
            to="/" 
            class="nav-link group"
            :class="{ 'active-link': $route.path === '/' }"
          >
            <div class="nav-icon">
              <i class="fas fa-home"></i>
            </div>
            <span>Home</span>
            <div class="nav-highlight"></div>
          </router-link>
        </li>

        <!-- Explore -->
        <li>
          <router-link 
            to="/exploree" 
            class="nav-link group"
            :class="{ 'active-link': $route.path === '/exploree' }"
          >
            <div class="nav-icon">
              <i class="fas fa-compass"></i>
            </div>
            <span>Explore</span>
            <div class="nav-highlight"></div>
          </router-link>
        </li>

        <!-- Fandom Section -->
        <li>
          <div
            class="nav-link group cursor-pointer"
            @click="isFandomOpen = !isFandomOpen"
          >
            <div class="nav-icon">
              <i class="fas fa-users"></i>
            </div>
            <span>Fandom</span>
            <i :class="['fas transition-transform dark:text-white', isFandomOpen ? 'fa-chevron-up rotate-180' : 'fa-chevron-down', 'ml-auto text-xs opacity-60']"></i>
          </div>
          
          <transition name="slide">
            <ul v-show="isFandomOpen" class="ml-2 mt-1 space-y-1 pl-7 border-l-2 border-gray-200 dark:border-gray-700">
              <li>
                <router-link 
                  to="/communities/browse" 
                  class="subnav-link"
                  :class="{ 'active-subnav': $route.path === '/communities/browse ' }"
                >
                  <i class="fas fa-book-open text-sm"></i>
                  <span>Browse Fandoms</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/fandom/ilia-hahh" 
                  class="subnav-link"
                  :class="{ 'active-subnav': $route.path === '/fandom/ilia-hahh' }"
                >
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-5 h-5 rounded-full object-cover" />
                  <span>ilia hahh</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>

        <!-- FanRadarMart -->
        <li>
          <router-link 
            to="/mart" 
            class="nav-link group"
            :class="{ 'active-link': $route.path === '/mart' }"
          >
            <div class="nav-icon">
              <i class="fas fa-store"></i>
            </div>
            <span>FanRadarMart</span>
            <div class="nav-highlight"></div>
          </router-link>
        </li>

        <!-- My Cart Section -->
        <li>
          <div
            class="nav-link group cursor-pointer"
            @click="isMartOpen = !isMartOpen"
          >
            <div class="nav-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <span>My Cart</span>
            <i :class="['fas transition-transform dark:text-white', isMartOpen ? 'fa-chevron-up rotate-180' : 'fa-chevron-down', 'ml-auto text-xs opacity-60']"></i>
          </div>
          
          <transition name="slide">
            <ul v-show="isMartOpen" class="ml-2 mt-1 space-y-1 pl-7 border-l-2 border-gray-200 dark:border-gray-700">
              <li>
                <router-link 
                  to="/cart" 
                  class="subnav-link"
                  :class="{ 'active-subnav': $route.path === '/cart' }"
                >
                  <i class="fas fa-shopping-basket text-sm"></i>
                  <span>My Cart</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/orders" 
                  class="subnav-link"
                  :class="{ 'active-subnav': $route.path === '/orders' }"
                >
                  <i class="fas fa-box text-sm"></i>
                  <span>My Orders</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>

    <!-- User & Actions Section -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
      <!-- Account Dropdown -->
      <div class="mb-4">
        <button 
          @click="isAccountOpen = !isAccountOpen"
          class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="relative">
              <img
                v-if="userAvatar"
                :src="userAvatar"
                alt="avatar"
                class="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
              />
              <div v-else class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {{ userName ? userName.charAt(0).toUpperCase() : 'U' }}
              </div>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </div>
            <div class="text-left">
              <div class="font-medium text-sm dark:text-white truncate max-w-[120px]">yassinelaouni</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">yassinelouni581@gmail.com</div>
            </div>
          </div>
          <i :class="['fas text-xs transition-transform dark:text-white', isAccountOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>

        <transition name="slide">
          <div v-show="isAccountOpen" class="mt-2 pl-2 space-y-1">
            <router-link 
              :to="`/account/${userName}`"
              class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <i class="fas fa-user-circle text-gray-500 dark:text-gray-400"></i>
              <span>Profile</span>
            </router-link>
            
         
            
            <button 
              @click="logout"
              class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 w-full text-left"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span>Log out</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2">
        <button
          @click="toggleThemeMode"
          class="action-btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <i class="fas fa-palette"></i>
          <span>Theme</span>
        </button>
      </div>
    </div>

    <!-- Create Post Modal -->
    <CreatePostModal 
      :is-visible="showCreatePost"
      @close="showCreatePost = false"
      @create="handleCreatePost"
    />
  </aside>
</template>

<script>
import CreatePostModal from '@/components/CreatePostModal.vue'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Sidebar',
  components: {
    CreatePostModal
  },
  data() {
    return {
      isAccountOpen: false,
      showCreatePost: false,
      isFandomOpen: true,
      isMartOpen: false // Added this property
    }
  },
  setup() {
    const auth = useAuthStore()
    const themeStore = useThemeStore()
    const router = useRouter()
    const avatarError = ref(false)

    const logoSrcWhite = new URL('/images/FanRadarWhite.png', import.meta.url).href
    const logoSrc = new URL('/images/FanRadar.png', import.meta.url).href
    const isDark = ref(document.documentElement.classList.contains('dark'))

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
      router.push('/login')
    }

    const userName = computed(() => auth.user?.name || 'yassineelaouni')
    const userEmail = computed(() => auth.user?.email || 'yassineelaouni@fanradar.com')
    const userAvatar = computed(() => {
      if (avatarError.value) return ''
      return auth.user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
    })

    return {
      auth,
      logout,
      userName,
      userEmail,
      userAvatar,
      avatarError,
      toggleThemeMode,
      logoSrc,
      logoSrcWhite,
      isDark
    }
  },
  methods: {
    handleCreatePost(post) {
      console.log('New post:', post)
      this.showCreatePost = false
    }
  }
}
</script>

<style scoped>
/* Navigation Links */
.nav-link {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative overflow-hidden;
}

.nav-icon {
  @apply w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors;
}

.nav-link span {
  @apply text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors;
}

.nav-highlight {
  @apply absolute left-0 top-0 h-full w-1 bg-blue-500 dark:bg-blue-400 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity;
}

/* Active States */
.active-link {
  @apply bg-blue-50 dark:bg-gray-800;
}

.active-link .nav-icon {
  @apply text-blue-500 dark:text-blue-400;
}

.active-link span {
  @apply text-blue-600 dark:text-blue-400 font-semibold;
}

.active-link .nav-highlight {
  @apply opacity-100;
}

/* Sub Navigation */
.subnav-link {
  @apply flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}

.active-subnav {
  @apply text-blue-500 dark:text-blue-400 font-medium;
}

/* Badges */
.badge {
  @apply text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full;
}

/* Action Buttons */
.action-btn {
  @apply w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium transition-all hover:shadow-lg;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 300px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  @apply w-1;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>