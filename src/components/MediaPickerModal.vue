<template>
  <TransitionRoot as="template" :show="isVisible">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {{ type === 'avatar' ? 'Profile Picture' : 'Cover Photo' }}
                  </DialogTitle>
                  <div class="mt-4">
                    <div class="flex justify-center">
                      <div
                        class="w-64 h-64 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                        @dragover.prevent
                        @drop.prevent="handleDrop"
                      >
                        <div v-if="!previewImage" class="text-center p-6">
                          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600">
                            <CameraIcon class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div class="mt-3 text-sm text-gray-600 dark:text-gray-300">
                            <p>
                              <button
                                type="button"
                                class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                @click="openFileInput"
                              >
                                Upload a file
                              </button>
                              or drag and drop
                            </p>
                            <p class="mt-1">PNG, JPG, GIF up to 5MB</p>
                          </div>
                        </div>
                        <img
                          v-else
                          :src="previewImage"
                          class="w-full h-full object-cover"
                          :alt="type === 'avatar' ? 'Profile picture preview' : 'Cover photo preview'"
                        />
                      </div>
                      <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        @change="handleFileChange"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  :disabled="!selectedFile"
                  @click="confirmSelection"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  @click="close"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { CameraIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isVisible: Boolean,
  type: {
    type: String,
    default: 'avatar',
    validator: (value) => ['avatar', 'cover'].includes(value)
  }
})

const emit = defineEmits(['close', 'selected'])

const fileInput = ref(null)
const selectedFile = ref(null)
const previewImage = ref(null)

function openFileInput() {
  fileInput.value.click()
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    processFile(file)
  }
}

function handleDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

function processFile(file) {
  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size exceeds 5MB limit')
    return
  }

  selectedFile.value = file
  previewImage.value = URL.createObjectURL(file)
}

function confirmSelection() {
  if (selectedFile.value) {
    emit('selected', selectedFile.value)
    close()
  }
}

function close() {
  selectedFile.value = null
  previewImage.value = null
  emit('close')
}

// Reset when modal is opened/closed
watch(() => props.isVisible, (isOpen) => {
  if (!isOpen) {
    selectedFile.value = null
    previewImage.value = null
  }
})
</script>