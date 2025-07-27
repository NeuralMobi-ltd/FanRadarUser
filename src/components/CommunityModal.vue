<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <button class="close-btn" @click="close">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <div class="community-gradient" :style="{ background: community.gradient }"></div>
          <h2>{{ community.title }}</h2>
          <p>{{ community.desc }}</p>
        </div>
        
        <div class="modal-stats">
          <div class="stat-item">
            <span class="stat-value">{{ community.members }}</span>
            <span class="stat-label">Members</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ community.posts }}</span>
            <span class="stat-label">Posts</span>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="join-btn" @click="$emit('join')">
            Join Community
          </button>
          <button class="cancel-btn" @click="close">
            Not Now
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isVisible: Boolean,
    community: Object
  })
  
  const emit = defineEmits(['close', 'join'])
  
  const close = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: #ffffff;
    border-radius: 12px;
    width: 450px;
    max-width: 90vw;
    position: relative;
    overflow: hidden;
  }
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
  }
  
  .modal-header {
    padding: 30px 30px 20px;
    text-align: center;
  }
  
  .community-gradient {
    height: 80px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .modal-header h2 {
    margin: 0 0 10px;
    font-size: 24px;
  }
  
  .modal-header p {
    color: #666;
    margin: 0;
  }
  
  .modal-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 20px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin: 0 30px;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .stat-label {
    color: #666;
    font-size: 14px;
  }
  
  .modal-actions {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .join-btn {
    background: #00cf35;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .cancel-btn {
    background: none;
    border: none;
    padding: 12px;
    color: #666;
    cursor: pointer;
  }
  </style>