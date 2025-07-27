<template>
  <div class="home-container">
    <template v-if="!isAuthenticated">
      <!-- Communities Page Layout for Non-Logged Users -->
      <div class="communities-page">
        <!-- Header for non-authenticated users -->
        <header class="communities-header">
          <div class="header-content">
            <!-- Logo -->
            <div class="logo-section">
              <router-link to="/" class="logo">
                <img src="/images/FanRadarWhite.png" alt="FanRadar" />
              </router-link>
            </div>

            <!-- Page Title -->
            <h1 class="page-title">Browse communities</h1>

            <!-- Right Section -->
            <div class="header-right">
              <!-- Create Community Button -->
              <button class="create-community-btn" @click="openAuthModal('signup')">Create a community</button>
              
              <!-- Search Bar -->
              <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search communities..." class="search-input" />
              </div>
            </div>
          </div>
        </header>

        <!-- Main Layout -->
        <div class="main-layout">
          <!-- Left Sidebar -->
          <aside class="left-sidebar">
            <nav class="sidebar-nav">
              <ul>
                <li><router-link to="/explore" class="nav-item"><i class="fas fa-compass"></i> Explore</router-link></li>
                <li><router-link to="/communities" class="nav-item active"><i class="fas fa-users"></i> Communities</router-link></li>
                <li><a href="#" class="nav-item"><i class="fas fa-palette"></i> Change palette</a></li>
              </ul>
            </nav>

            <!-- Sign Up Section -->
            <div class="signup-section">
              <button class="signup-btn" @click="openAuthModal('signup')">Sign up</button>
              <button class="signin-btn" @click="openAuthModal('login')">Log in</button>
            </div>
          </aside>

          <!-- Communities Grid -->
          <main class="communities-grid">
            <div class="grid-container">
              <div class="community-card" v-for="community in categories" :key="community.title">
                <div class="community-image" :style="{ background: community.gradient }"></div>
                <div class="community-overlay">
                  <h3 class="community-title">{{ community.title }}</h3>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <!-- Auth Modal -->
      <AuthModal 
        :isVisible="showAuthModal" 
        :mode="authModalMode" 
        @close="showAuthModal = false"
        @success="handleAuthSuccess"
      />
    </template>
    <template v-else>
      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Post Creation Section -->
        <div class="post-creation-section">
          <div class="post-buttons">
            <button v-for="tab in postTabs" :key="tab.type" 
                    :class="['post-btn', tab.type, {active: activeTab === tab.type}]" 
                    @click="activeTab = tab.type">
              <i :class="tab.icon"></i>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </div>
        
        <!-- Feed Content -->
        <div class="feed-content">
          <div class="post-item">
            <div class="post-header">
              <div class="user-avatar">
                <img src="https://via.placeholder.com/40" alt="User" />
              </div>
              <div class="user-info">
                <span class="username">cmal95</span>
                <span class="post-meta">Reblogged darkclassicwithin • 1d</span>
              </div>
            </div>
            <div class="post-content">
              <p>Welcome to your dashboard! Start following some blogs to see content here.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Sidebar -->
      <div class="right-sidebar">
        <!-- Premium Ad -->
        <div class="premium-ad">
          <div class="ad-icon">💎</div>
          <div class="ad-content">
            <h4>Get ad-free and early access to new stuff with Premium.</h4>
            <button class="premium-btn">Subscribe</button>
          </div>
        </div>
        
        <!-- Recommended Blogs -->
        <div class="recommended-section">
          <h3>Check out these blogs</h3>
          <div class="blog-recommendations">
            <div class="blog-item">
              <img src="https://via.placeholder.com/40" alt="Blog" />
              <div class="blog-info">
                <span class="blog-name">slonendforsixtyfa...</span>
                <span class="blog-desc">70's movie stills</span>
              </div>
              <button class="follow-btn">Follow</button>
            </div>
            <div class="blog-item">
              <img src="https://via.placeholder.com/40" alt="Blog" />
              <div class="blog-info">
                <span class="blog-name">oldpaintings</span>
                <span class="blog-desc">Old Paintings</span>
              </div>
              <button class="follow-btn">Follow</button>
            </div>
            <div class="blog-item">
              <img src="https://via.placeholder.com/40" alt="Blog" />
              <div class="blog-info">
                <span class="blog-name">joyeuselyful</span>
                <span class="blog-desc">Tiny Bursts of Happiness</span>
              </div>
              <button class="follow-btn">Follow</button>
            </div>
          </div>
          <a href="#" class="explore-link">Explore all of Tumblr</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import AuthModal from '@/components/AuthModal.vue'

const auth = useAuthStore()
auth.initialize()
const isAuthenticated = computed(() => auth.isAuthenticated)

const activeTab = ref('text')
const showAuthModal = ref(false)
const authModalMode = ref('login')

// You can call this in the browser console to test the modals:
// window.openAuthModals = { login: () => openAuthModal('login'), signup: () => openAuthModal('signup') }

const openAuthModal = (mode) => {
  authModalMode.value = mode
  showAuthModal.value = true
}

const handleAuthSuccess = (data) => {
  console.log('Authentication successful:', data)
  // The user is already authenticated through the auth store
  // We can add any additional logic here if needed
  
  // Display a welcome message or redirect if needed
  if (data.mode === 'signup') {
    alert('Welcome to FanRadar! Your account has been created successfully.')
  } else {
    alert('Welcome back to FanRadar!')
  }
}

const postTabs = [
  { type: 'text', label: 'Text', icon: 'fas fa-font' },
  { type: 'photo', label: 'Photo', icon: 'fas fa-camera' },
  { type: 'quote', label: 'Quote', icon: 'fas fa-quote-left' },
  { type: 'link', label: 'Link', icon: 'fas fa-link' },
  { type: 'chat', label: 'Chat', icon: 'fas fa-comments' },
  { type: 'audio', label: 'Audio', icon: 'fas fa-music' },
  { type: 'video', label: 'Video', icon: 'fas fa-video' }
]

const categories = [
  { title: 'Aesthetic', desc: 'Beautiful visuals and artistic content', gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  { title: 'Anime', desc: 'Japanese animation and manga culture', gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { title: 'Books & Literature', desc: 'Literary discussions and book reviews', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { title: 'Culture', desc: 'Cultural discussions and traditions', gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { title: 'Art', desc: 'Creative expressions and artwork', gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  { title: 'Community Spotlight', desc: 'Featured communities and creators', gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
]
</script>

<style scoped>
.home-container {
  width: 100%;
  background: #001935;
  min-height: 100vh;
}

/* Communities Page Styles for Non-Authenticated Users */
.communities-page {
  min-height: 100vh;
  background: #001935;
}

.communities-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  background: #001935;
  border-bottom: 1px solid #2c5aa0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 30px;
}

.logo-section {
  flex-shrink: 0;
}

.logo img {
  height: 32px;
  width: auto;
}

.page-title {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.create-community-btn {
  background: #00cf35;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.create-community-btn:hover {
  background: #00b82f;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #656565;
  font-size: 14px;
}

.search-input {
  background: #001427;
  border: 1px solid #2c5aa0;
  border-radius: 3px;
  padding: 8px 12px 8px 35px;
  color: #ffffff;
  font-size: 14px;
  width: 250px;
  outline: none;
}

.search-input::placeholder {
  color: #656565;
}

.search-input:focus {
  border-color: #00cf35;
}

.main-layout {
  display: flex;
  padding-top: 54px;
}

.left-sidebar {
  position: fixed;
  left: 0;
  top: 54px;
  width: 200px;
  height: calc(100vh - 54px);
  background: #001935;
  border-right: 1px solid #2c5aa0;
  padding: 20px 0;
  z-index: 100;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.2s ease;
}

.nav-item:hover {
  background: #2c5aa0;
}

.nav-item.active {
  background: #00cf35;
}

.nav-item i {
  width: 20px;
  margin-right: 12px;
  font-size: 16px;
}

.signup-section {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.signup-btn {
  width: 100%;
  background: #00cf35;
  color: #ffffff;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.2s ease;
}

.signup-btn:hover {
  background: #00b82f;
}

.signin-btn {
  width: 100%;
  background: #ffffff;
  color: #001935;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.signin-btn:hover {
  background: #f0f0f0;
}

.login-link {
  display: block;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
}

.login-link:hover {
  text-decoration: underline;
}

.communities-grid {
  margin-left: 200px;
  flex: 1;
  padding: 40px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
}

.community-card {
  position: relative;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.community-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.community-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.community-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
}

.community-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Logged-in user layout */
.main-content {
  max-width: 990px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;
}

.post-creation-section {
  flex: 1;
}

.post-buttons {
  background: #3d3d3d;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.post-btn {
  background: none;
  border: none;
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 60px;
}

.post-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.post-btn.active {
  background: #00cf35;
}

.post-btn i {
  font-size: 18px;
}

.post-btn span {
  font-size: 11px;
  font-weight: 600;
}

/* Different colors for different post types */
.post-btn.text { background: #00cf35; }
.post-btn.photo { background: #ff492f; }
.post-btn.quote { background: #ff8a00; }
.post-btn.link { background: #00cf35; }
.post-btn.chat { background: #00cf35; }
.post-btn.audio { background: #ff8a00; }
.post-btn.video { background: #00cf35; }

.feed-content {
  background: #ffffff;
  border-radius: 6px;
  min-height: 500px;
}

.post-item {
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 700;
  color: #000000;
  font-size: 16px;
}

.post-meta {
  color: #656565;
  font-size: 13px;
}

.post-content {
  color: #000000;
  line-height: 1.5;
}

.right-sidebar {
  width: 320px;
  flex-shrink: 0;
}

.premium-ad {
  background: #ffffff;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.ad-icon {
  font-size: 24px;
}

.ad-content h4 {
  margin: 0 0 10px 0;
  color: #000000;
  font-size: 14px;
  line-height: 1.4;
}

.premium-btn {
  background: #00cf35;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
}

.recommended-section {
  background: #ffffff;
  border-radius: 6px;
  padding: 20px;
}

.recommended-section h3 {
  margin: 0 0 15px 0;
  color: #000000;
  font-size: 16px;
  font-weight: 700;
}

.blog-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e1e8ed;
}

.blog-item:last-child {
  border-bottom: none;
}

.blog-item img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.blog-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-name {
  font-weight: 700;
  color: #000000;
  font-size: 14px;
}

.blog-desc {
  color: #656565;
  font-size: 13px;
}

.follow-btn {
  background: #00cf35;
  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
}

.explore-link {
  color: #00cf35;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  display: inline-block;
  margin-top: 15px;
}

.explore-link:hover {
  text-decoration: underline;
}
</style>