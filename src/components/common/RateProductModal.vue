<template>
  <div v-if="open" class="fixed inset-0 z-[1000] flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="emit('close')"></div>
    <div class="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-[90%] max-w-sm p-5">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Rate product</h3>
        <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" @click="emit('close')">✕</button>
      </div>
      <div class="flex items-center justify-center gap-2 mb-3">
        <button v-for="i in 5" :key="i" @click="set(i)" class="text-2xl focus:outline-none">
          <i :class="i <= value ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-400'" />
        </button>
      </div>
      <textarea v-model="comment" rows="3" class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 text-sm" placeholder="Optional comment"></textarea>
      <div class="mt-4 flex items-center justify-end gap-2">
        <button class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm dark:text-white" @click="emit('close')">Cancel</button>
        <button :disabled="submitting || !value" class="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm disabled:opacity-50" @click="submit">{{ submitting ? 'Saving...' : 'Submit' }}</button>
      </div>
      <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  initialValue: { type: Number, default: 0 },
})
const emit = defineEmits(['close', 'submit'])

const value = ref(0)
const comment = ref('')
const submitting = ref(false)
const error = ref('')

watch(() => props.open, (v) => {
  if (v) {
    value.value = props.initialValue || 0
    comment.value = ''
    error.value = ''
  }
})

function set(v) { value.value = v }

async function submit() {
  error.value = ''
  if (!value.value) return
  submitting.value = true
  try {
    await emit('submit', { evaluation: value.value, commentaire: comment.value || undefined })
    emit('close')
  } catch (e) {
    error.value = e?.message || 'Failed to submit rating'
  } finally {
    submitting.value = false
  }
}
</script>
