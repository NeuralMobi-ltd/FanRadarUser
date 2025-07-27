<template>
  <div class="following-page">
    <div class="page-header">
      <h1 class="page-title">4 Following</h1>
      <div class="header-controls">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input type="text" v-model="searchQuery" placeholder="Search following..." />
        </div>
        <div class="follow-input">
          <input type="text" placeholder="Enter a username or URL to follow" />
          <button class="follow-btn">Follow</button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="following-list">
        <div v-for="user in filteredFollowing" :key="user.id" class="following-item">
          <div class="user-avatar" :style="{ backgroundColor: user.avatarColor }">
            {{ user.avatar }}
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="last-update">Updated {{ user.lastUpdate }}</p>
          </div>
          <button class="unfollow-btn">Unfollow</button>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="recommended-blogs">
          <h2>Check out these blogs</h2>
          <div class="blog-list">
            <div v-for="blog in recommendedBlogs" :key="blog.id" class="blog-item">
              <img :src="blog.avatar" :alt="blog.name" class="blog-avatar" />
              <div class="blog-info">
                <span class="blog-name">{{ blog.name }}</span>
                <span class="blog-description">{{ blog.description }}</span>
              </div>
              <button class="follow-btn">Follow</button>
            </div>
          </div>
          <a href="#" class="explore-link">Explore all of Tumblr</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

// Mock data for following
const recommendedBlogs = ref([
  {
    id: 1,
    name: 'oldpaintings',
    description: 'Old Paintings',
    avatar: 'https://64.media.tumblr.com/avatar_1234567890_128.png'
  },
  {
    id: 2,
    name: 'cherryandpudding',
    description: 'Cherry and Pudding',
    avatar: 'https://64.media.tumblr.com/avatar_2345678901_128.png'
  },
  {
    id: 3,
    name: 'twisted-cat',
    description: 'Twisted-cat',
    avatar: 'https://64.media.tumblr.com/avatar_3456789012_128.png'
  },
  {
    id: 4,
    name: 'iamspooky',
    description: 'Horror-Love',
    avatar: 'https://64.media.tumblr.com/avatar_4567890123_128.png'
  }
])

const following = ref([
  {
    id: 1,
    name: 'dailyralsei',
    avatar: 'D',
    avatarColor: '#FF3B5C',  // Coral red
    lastUpdate: '3 hours ago'
  },
  {
    id: 2,
    name: 'esraljahanofficial',
    avatar: 'E',
    avatarColor: '#4A6BDF',  // Royal blue
    lastUpdate: '1 day ago'
  },
  {
    id: 3,
    name: 'cma195',
    avatar: 'C',
    avatarColor: '#00B94F',  // Green
    lastUpdate: '2 hours ago'
  },
  {
    id: 4,
    name: 'staff',
    avatar: 'S',
    avatarColor: '#001935',  // Navy blue
    lastUpdate: '4 days ago'
  }
])

const filteredFollowing = computed(() => {
  if (!searchQuery.value) return following.value
  const query = searchQuery.value.toLowerCase()
  return following.value.filter(user => 
    user.name.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.following-page {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background: #001935;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(44, 90, 160, 0.2);
}

.page-title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.follow-input {
  display: flex;
  flex: 1;
  gap: 10px;
}

.follow-input input {
  flex: 1;
  background: rgba(0, 18, 40, 0.8);
  border: 1px solid rgba(44, 90, 160, 0.2);
  border-radius: 3px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
}

.follow-input input:focus {
  border-color: rgba(44, 90, 160, 0.4);
  background: #001228;
}

.follow-btn {
  background: #4A6BDF;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.follow-btn:hover {
  background: #5476E5;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box .icon {
  position: absolute;
  left: 15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  z-index: 1;
}

.search-box input {
  background: rgba(0, 18, 40, 0.8);
  border: 1px solid rgba(44, 90, 160, 0.2);
  border-radius: 20px;
  padding: 8px 15px 8px 40px;
  color: #ffffff;
  font-size: 14px;
  width: 250px;
  outline: none;
}

.search-box input:focus {
  border-color: rgba(44, 90, 160, 0.4);
  background: #001228;
}

.following-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.following-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  transition: all 0.2s ease;
  background: transparent;
}

.following-item:hover {
  background: rgba(44, 90, 160, 0.1);
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  margin-right: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
}

.user-name {
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.last-update {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin: 0;
}

.unfollow-btn {
  background: transparent;
  border: none;
  color: rgba(255, 59, 92, 0.9);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
}

.following-item:hover .unfollow-btn {
  opacity: 1;
}

.unfollow-btn:hover {
  background: rgba(255, 59, 92, 0.1);
  color: #FF3B5C;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  align-items: start;
}

.sidebar-section {
  position: sticky;
  top: 20px;
}

.recommended-blogs {
  background: rgba(0, 18, 40, 0.8);
  border-radius: 3px;
  overflow: hidden;
}

.recommended-blogs h2 {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  padding: 16px;
  margin: 0;
  border-bottom: 1px solid rgba(44, 90, 160, 0.2);
}

.blog-list {
  padding: 8px;
}

.blog-list .blog-item {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 12px;
}

.blog-list .blog-avatar {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  object-fit: cover;
}

.blog-list .blog-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.blog-list .blog-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.blog-list .blog-description {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.blog-list .follow-btn {
  padding: 6px 12px;
  font-size: 13px;
}

.explore-link {
  display: block;
  padding: 16px;
  text-align: center;
  color: #FF3B5C;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-top: 1px solid rgba(44, 90, 160, 0.2);
}

.explore-link:hover {
  text-decoration: underline;
}
</style>]]>
