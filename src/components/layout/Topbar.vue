<template>
  <header class="topbar">
    <div class="search-container">
      <input type="text" placeholder="Search communities..." class="search-input">
    </div>
    
    <div class="auth-buttons">
      <router-link to="/login" class="login-btn">Login</router-link>
      <router-link to="/signup" class="signup-btn">Sign Up</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style scoped>
.topbar {
  background: #001935;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-container {
  flex: 1;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: rgba(255,255,255,0.1);
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255,255,255,0.6);
}

.auth-buttons {
  display: flex;
  gap: 15px;
}

.login-btn, .signup-btn {
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.login-btn {
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
}

.signup-btn {
  background: #007bff;
  color: white;
}

.login-btn:hover {
  background: rgba(255,255,255,0.1);
}

.signup-btn:hover {
  background: #0069d9;
}
</style>