<template>
  <div v-if="modelValue" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-gray-900 w-full max-w-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-start gap-3 mb-4">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center', iconBgClass]">
          <i :class="[icon, iconColorClass, 'text-lg']"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-snug">{{ titleComputed }}</h3>
          <p v-if="message" class="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed whitespace-pre-line">{{ message }}</p>
          <slot />
        </div>
      </div>
      <div v-if="hint" class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 mb-5 flex gap-2 items-start">
        <i class="fas fa-info-circle mt-0.5"></i>
        <span>{{ hint }}</span>
      </div>
      <div class="flex flex-col sm:flex-row-reverse gap-3">
        <button @click="onConfirm" :disabled="loading" :class="['px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors', confirmBtnClass, loading ? 'opacity-70 cursor-not-allowed' : '']">
          <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          <i v-else :class="confirmIcon"></i>
          <span>{{ loading ? loadingTextComputed : confirmTextComputed }}</span>
        </button>
        <button @click="onCancel" :disabled="loading" class="px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">{{ cancelTextComputed }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  hint: { type: String, default: '' },
  confirmText: { type: String, default: '' },
  cancelText: { type: String, default: '' },
  loadingText: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  confirmIcon: { type: String, default: 'fas fa-check' },
  icon: { type: String, default: 'fas fa-question' },
  tone: { type: String, default: 'danger' } // danger | warning | info | neutral
})

// i18n computed fallbacks
const titleComputed = computed(() => props.title || t('modal.confirm.title'))
const confirmTextComputed = computed(() => props.confirmText || t('modal.confirm.confirm'))
const cancelTextComputed = computed(() => props.cancelText || t('modal.confirm.cancel'))
const loadingTextComputed = computed(() => props.loadingText || t('modal.confirm.working'))

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const toneConfig = {
  danger: { iconBg: 'bg-red-100 dark:bg-red-800/30', iconColor: 'text-red-600 dark:text-red-300', btn: 'bg-red-600 hover:bg-red-700 text-white' },
  warning: { iconBg: 'bg-yellow-100 dark:bg-yellow-800/30', iconColor: 'text-yellow-600 dark:text-yellow-300', btn: 'bg-yellow-600 hover:bg-yellow-700 text-white' },
  info: { iconBg: 'bg-blue-100 dark:bg-blue-800/30', iconColor: 'text-blue-600 dark:text-blue-300', btn: 'bg-blue-600 hover:bg-blue-700 text-white' },
  neutral: { iconBg: 'bg-gray-100 dark:bg-gray-700', iconColor: 'text-gray-600 dark:text-gray-300', btn: 'bg-gray-600 hover:bg-gray-700 text-white' }
}

const iconBgClass = computed(() => toneConfig[props.tone]?.iconBg)
const iconColorClass = computed(() => toneConfig[props.tone]?.iconColor)
const confirmBtnClass = computed(() => toneConfig[props.tone]?.btn)

function onConfirm() {
  emit('confirm')
  // Parent may choose to keep it open while processing (loading state). Close here if not loading.
  if (!props.loading) emit('update:modelValue', false)
}
function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>
