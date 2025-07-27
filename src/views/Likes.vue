<template>
  <div class="likes-page">
    <div class="page-header">
      <h1 class="page-title">Likes</h1>
      <div class="header-controls">
        <div class="search-box">
          <span class="icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search likes..." 
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <div class="likes-grid">
      <div 
        v-for="like in filteredLikes" 
        :key="like.id" 
        class="like-card"
        @click="viewLikeDetails(like.id)"
      >
        <div class="like-image" :style="{ backgroundImage: `url(${like.image})` }"></div>
        <div class="like-overlay">
          <h3 class="like-title">{{ like.title }}</h3>
          <p class="like-info">
            <span class="like-date">{{ like.date }}</span>
            <span class="like-author">by {{ like.author }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Mock data for likes
const likes = ref([
  {
    id: 1,
    title: 'Amazing Fanart',
    author: 'artistUser',
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Community Event',
    author: 'eventPlanner',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Cosplay Showcase',
    author: 'cosplayQueen',
    date: '3 days ago',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'
  }
])

const filteredLikes = computed(() => {
  if (!searchQuery.value.trim()) return likes.value
  const query = searchQuery.value.toLowerCase().trim()
  return likes.value.filter(like => 
    like.title.toLowerCase().includes(query) ||
    like.author.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  // You can add debounce here if needed
  console.log('Searching for:', searchQuery.value)
}

const viewLikeDetails = (likeId) => {
  router.push({ name: 'LikeDetails', params: { id: likeId } })
}
</script>

<style scoped>
.likes-page {
  padding: 20px;
  min-height: calc(100vh - 80px);
  background: #001935;
  color: white;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2c5aa0;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 30px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box .icon {
  position: absolute;
  left: 15px;
  color: #65676b;
  font-size: 14px;
  z-index: 1;
}

.search-box input {
  background: #13294b;
  border: 1px solid #2c5aa0;
  border-radius: 20px;
  padding: 8px 15px 8px 40px;
  color: #ffffff;
  font-size: 14px;
  width: 250px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-box input:focus {
  border-color: #00cf35;
}

.likes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.like-card {
  position: relative;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.like-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.like-image {
  width: 100%;
  height: 100%;
  background-color: #2c5aa0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.like-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
}

.like-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.like-info {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin: 0;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .likes-grid {
    grid-template-columns: 1fr;
  }
}
</style>