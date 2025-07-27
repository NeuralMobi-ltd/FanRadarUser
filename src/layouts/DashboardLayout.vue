<template>
  <div class="dashboard-layout">
    <header class="topbar">
      <slot name="topbar">
        <!-- Default topbar content -->
      </slot>
    </header>
    <div class="main-content">
      <aside class="sidebar">
        <slot name="sidebar"></slot>
      </aside>
      <main class="content">
        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
} 

.topbar {
  background: #001935;
  color: white;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>