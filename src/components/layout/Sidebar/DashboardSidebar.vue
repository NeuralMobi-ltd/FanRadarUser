<template>
  <div class="dashboard-sidebar">
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <router-link :to="item.path" class="menu-item">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="recommended">
      <h3>Recommended Communities</h3>
      <ul>
        <li v-for="comm in recommendedCommunities" :key="comm.id">
          <div class="community">
            <img :src="comm.image" alt="Community" />
            <span>{{ comm.name }}</span>
          </div>
          <button class="follow-btn">Follow</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: 'Home', path: '/home' },
        { name: 'Explore', path: '/explore' },
        { name: 'Communities', path: '/communities' },
        { name: 'Messages', path: '/messages' },
        { name: 'Settings', path: '/settings' }
      ],
      recommendedCommunities: [
        { id: 1, name: 'Photography', image: 'https://via.placeholder.com/40' },
        { id: 2, name: 'Digital Art', image: 'https://via.placeholder.com/40' },
        { id: 3, name: 'Coding', image: 'https://via.placeholder.com/40' }
      ]
    };
  }
};
</script>

<style scoped>
.dashboard-sidebar {
  padding: 20px;
}

.menu-item {
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background 0.3s;
}

.menu-item:hover, .menu-item.router-link-active {
  background: #e0e0e0;
}

.recommended {
  margin-top: 30px;
}

.recommended h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.recommended ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.community {
  display: flex;
  align-items: center;
  gap: 10px;
}

.community img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.follow-btn {
  background: #001935;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
}
</style>