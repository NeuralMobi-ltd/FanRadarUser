<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <slot name="header"></slot>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-4">
        <slot name="body"></slot>
      </div>
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>