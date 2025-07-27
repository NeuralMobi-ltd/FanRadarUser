<template>
  <aside class="fixed left-0 top-0 w-64 h-screen bg-[#000000] text-white flex flex-col">
    <!-- Logo -->
    <div class="px-5 py-4">
      <router-link to="/" class="text-white hover:opacity-80 transition-opacity">
        <h1 class="text-3xl font-bold">tumblr</h1>
      </router-link>
    </div>
    
    <!-- Main Navigation -->
    <nav class="flex-1 px-2">
      <ul class="space-y-1">
        <li>
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/' }"
          >
            <i class="fas fa-home text-xl"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/explore" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/explore' }"
          >
            <i class="fas fa-compass text-xl"></i>
            <span>Explore</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/messages" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/messages' }"
          >
            <i class="fas fa-envelope text-xl"></i>
            <span>Messages</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/inbox" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/inbox' }"
          >
            <i class="fas fa-inbox text-xl"></i>
            <span>Inbox</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/likes" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/likes' }"
          >
            <i class="fas fa-heart text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Likes
              <span class="text-xs bg-[#1A1A1A] px-2 py-0.5 rounded">1</span>
            </span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/following" 
            class="nav-link"
            :class="{ 'bg-[#1A1A1A]': $route.path === '/following' }"
          >
            <i class="fas fa-user-friends text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Following
              <span class="text-xs bg-[#1A1A1A] px-2 py-0.5 rounded">6</span>
            </span>
          </router-link>
        </li>
        <li>
          <button 
            @click="isSettingsOpen = !isSettingsOpen"
            class="nav-link w-full"
            :class="{ 'bg-[#1A1A1A]': isSettingsOpen }"
          >
            <i class="fas fa-cog text-xl"></i>
            <span class="flex items-center justify-between flex-1">
              Settings
              <i :class="['fas', isSettingsOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-sm opacity-60']"></i>
            </span>
          </button>
        </li>
      </ul>

      <!-- Settings Dropdown -->
      <div v-if="isSettingsOpen" class="mt-1 pl-10 space-y-2">
        <router-link to="/settings/blogs" class="block py-2 text-sm opacity-80 hover:opacity-100">Blogs</router-link>
        <router-link to="/settings/account" class="block py-2 text-sm opacity-80 hover:opacity-100">Account</router-link>
        <button @click="toggleTheme" class="block py-2 text-sm opacity-80 hover:opacity-100 w-full text-left">
          Change palette
        </button>
        <button @click="logout" class="block py-2 text-sm opacity-80 hover:opacity-100 w-full text-left text-red-500">
          Log out
        </button>
      </div>

      <!-- Blog Section -->
      <div class="mt-4 border-t border-[#1A1A1A] pt-4">
        <div class="px-4 pb-2 flex justify-between items-center">
          <span class="text-sm opacity-60">Blogs</span>
          <button class="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ New</button>
        </div>
        <router-link 
          to="/blog/yassinelaouni" 
          class="flex items-center gap-3 px-4 py-2 hover:bg-[#1A1A1A] rounded-md transition-colors"
        >
          <div class="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
            <i class="fas fa-user text-sm"></i>
          </div>
          <div>
            <div class="text-sm font-medium">yassinelaouni</div>
            <div class="text-xs opacity-60">Untitled</div>
          </div>
        </router-link>
      </div>
    </nav>

    <!-- Create Post Button -->
    <div class="p-4">
      <button class="w-full bg-[#FF4930] hover:bg-[#E5422B] text-white rounded-md py-3 font-medium transition-colors">
        Create
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isSettingsOpen: false
    }
  },
  methods: {
    toggleTheme() {
      document.documentElement.classList.toggle('dark')
    },
    logout() {
      // Implement logout logic here
      this.$router.push('/login')
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
  color: white;
  border-radius: 0.375rem;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.nav-link:hover {
  background-color: #1A1A1A;
}

.nav-link i {
  width: 1.5rem;
}

.nav-link span {
  font-weight: 500;
}
</style>
