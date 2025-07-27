<template>
  <div class="communities">
    <h2>Browse Communities</h2>
    <div class="community-grid">
      <div v-for="community in communities" :key="community.id" class="community-card">
        <div class="community-header">
          <img :src="community.image" alt="Community image" class="community-image" />
          <h3>{{ community.name }}</h3>
        </div>
        <p>{{ community.description }}</p>
        <button class="join-button">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      communities: [
        {
          id: 1,
          name: "Animate",
          description: "Animation enthusiasts community",
          image: "https://via.placeholder.com/300"
        },
        {
          id: 2,
          name: "GAPPLENED!!",
          description: "Tech and gadget lovers",
          image: "https://via.placeholder.com/300"
        },
        {
          id: 3,
          name: "JAGA",
          description: "Nature and outdoor adventures",
          image: "https://via.placeholder.com/300"
        },
        {
          id: 4,
          name: "Photography",
          description: "Share and discuss photos",
          image: "https://via.placeholder.com/300"
        }
      ]
    };
  }
};
</script>

<style scoped>
.communities {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.community-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.community-card:hover {
  transform: translateY(-5px);
}

.community-header {
  position: relative;
}

.community-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.community-header h3 {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

.community-card p {
  padding: 15px;
  color: #555;
  min-height: 60px;
}

.join-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #001935;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>