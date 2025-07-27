<template>
  <div class="dashboard-layout">
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