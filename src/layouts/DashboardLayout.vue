<template>
  <div class="dashboard-layout bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
    <div class="main-content">
      <aside class="sidebar bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <slot name="sidebar"></slot>
      </aside>
      <main class="content" style="height:auto;min-height:unset;">
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
  /* bg and border handled by Tailwind classes */
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: auto;
  /* bg handled by Tailwind classes */
}
</style>