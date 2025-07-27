<template>
  <header class="tumblr-header">
    <div class="header-content">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link to="/" class="logo">
          <img src="/images/FanRadarWhite.png" alt="FanRadar" />
        </router-link>
      </div>

      <!-- Navigation Tabs -->
      <div class="nav-tabs">
        <router-link to="/" class="nav-tab active">For you</router-link>
        <router-link to="/following" class="nav-tab">Following</router-link>
        <router-link to="/explore" class="nav-tab">Explore</router-link>
        <router-link to="/tv" class="nav-tab">FanRadar TV</router-link>
        <router-link to="/tags" class="nav-tab">Your tags</router-link>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Search Bar -->
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search FanRadar" class="search-input" />
        </div>

        <!-- Account Menu -->
        <div class="account-menu">
          <button class="account-btn">
            <i class="fas fa-user-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.tumblr-header {
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
  max-width: 990px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-section {
  flex-shrink: 0;
  margin-right: 30px;
}

.logo img {
  height: 32px;
  width: auto;
}

.nav-tabs {
  display: flex;
  gap: 30px;
  flex: 1;
}

.nav-tab {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 0;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.nav-tab:hover {
  color: #00cf35;
}

.nav-tab.active {
  color: #00cf35;
  border-bottom-color: #00cf35;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
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
  width: 200px;
  outline: none;
}

.search-input::placeholder {
  color: #656565;
}

.search-input:focus {
  border-color: #00cf35;
}

.account-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.account-btn:hover {
  background: #2c5aa0;
}
</style>
