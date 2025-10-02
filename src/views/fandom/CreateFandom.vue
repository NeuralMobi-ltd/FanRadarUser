<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <div class="flex items-center space-x-4">
            <div>
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.create.title') }}</h1>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ $t('fandom.create.subtitle') }}</p>
            </div>
          </div>
          <!-- Removed Back and Create Fandom buttons from header -->
        </div>
      </div>
    </header>

    <!-- Main Content -->
  <!-- Optimized for mobile-first with responsive spacing -->
    <main class="flex-1 w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-16 xl:px-24 py-4 sm:py-6 lg:py-8">
  <!-- Simplified grid for mobile -->
  <div class="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <!-- Form Section -->
  <div class="space-y-6 sm:space-y-8 w-full">
          <!-- Logo & Cover Image -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-4 sm:p-6 lg:p-8 xl:p-16 shadow-md w-full max-w-none">
            <div class="flex items-center mb-4 sm:mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.create.sections.media') }}</h2>
            </div>
            <div class="space-y-6 sm:space-y-8">
              <div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                <!-- Logo Upload -->
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.logoLabel') }}</label>
                  <div class="relative group">
                    <!-- Mobile-optimized avatar circle -->
                    <div class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72 mx-auto lg:mx-0 rounded-full overflow-hidden border-2 border-gray-200/80 dark:border-gray-600/80 bg-gray-100/50 dark:bg-gray-700/50 flex items-center justify-center cursor-pointer transition-all hover:border-indigo-500 hover:shadow-lg touch-manipulation">
                      <input type="file" @change="onLogoChange" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <template v-if="formData.avatar">
                        <img :src="formData.avatar" alt="Fandom Logo" class="w-full h-full object-cover" />
                      </template>
                      <template v-else>
                        <svg class="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </template>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 text-center lg:text-left">{{ $t('fandom.create.fields.logoHint') }}</p>
                  </div>
                </div>
                <!-- Cover Image Upload -->
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.coverLabel') }}</label>
                  <div class="relative group">
                    <!-- Mobile-optimized rectangular cover -->
                    <div class="w-full h-32 sm:h-40 md:h-48 lg:h-60 xl:h-80 rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200/80 dark:border-gray-600/80 bg-gray-100/50 dark:bg-gray-700/50 flex items-center justify-center cursor-pointer transition-all hover:border-indigo-500 hover:shadow-lg hover:scale-[1.01] touch-manipulation">
                      <input type="file" @change="onCoverChange" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <template v-if="formData.coverImage">
                        <img :src="formData.coverImage" alt="Fandom Cover" class="w-full h-full object-cover" />
                      </template>
                      <template v-else>
                        <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 px-4">
                          <svg class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div class="text-center sm:text-left">
                            <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">Upload Cover</p>
                            <p class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Click to browse</p>
                          </div>
                        </div>
                      </template>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 text-center lg:text-left">{{ $t('fandom.create.fields.coverHint') }}</p>
                  </div>
                </div>
              </div>
              <!-- Category & Subcategory Selection -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.category') }} <span class="text-red-500">*</span></label>
                  <div class="flex flex-col sm:flex-row gap-2 mb-3">
                    <div class="relative flex-1">
                      <input v-model="categorySearch" type="text" :placeholder="$t('fandom.create.fields.searchCategories')" class="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-2 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/60 dark:bg-gray-700/60 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 touch-manipulation" />
                      <svg class="w-4 h-4 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <button type="button" @click="refreshCategories" class="px-3 py-2.5 sm:py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 text-gray-600 dark:text-gray-300 touch-manipulation whitespace-nowrap">{{ $t('fandom.create.actions.reload') }}</button>
                  </div>
                  <div class="border border-gray-200 dark:border-gray-700 rounded-lg bg-white/60 dark:bg-gray-800/60 max-h-48 sm:max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 no-scrollbar">
                    <button v-for="c in filteredApiCategories" :key="c.id" type="button" @click="selectCategoryList(c)" :class="['w-full text-left px-3 sm:px-4 py-3 sm:py-2 flex items-center gap-3 hover:bg-indigo-50/70 dark:hover:bg-indigo-900/30 transition touch-manipulation', selectedCategoryId === c.id ? 'bg-indigo-100/70 dark:bg-indigo-900/40 font-medium text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300']">
                      <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-semibold flex-shrink-0" :style="{background: c.color + '22', border: '1px solid ' + c.color, color: c.color}">{{ c.name.charAt(0).toUpperCase() }}</span>
                      <span class="truncate flex-1 text-sm sm:text-base">{{ c.name }}</span>
                      <svg v-if="selectedCategoryId === c.id" class="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <div v-if="!filteredApiCategories.length && !categoriesStore.loading" class="p-3 text-xs text-gray-500">{{ $t('fandom.create.states.noCategoriesMatch', { q: categorySearch }) }}</div>
                    <div v-if="categoriesStore.loading" class="p-3 text-xs text-indigo-500 animate-pulse">{{ $t('fandom.create.states.loadingCategories') }}</div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ $t('fandom.create.states.showingCount', { shown: filteredApiCategories.length, total: apiCategories.length }) }}</p>
                </div>
                <div v-if="showSubcategoryPicker" class="pt-3 sm:pt-2 border-t border-gray-200 dark:border-gray-700">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.subcategory') }} <span v-if="subcategories.length" class="text-red-500">*</span></label>
                  <div class="flex flex-wrap gap-2 min-h-[2.5rem]">
                    <button v-for="s in subcategories" :key="s.id" type="button" @click="formData.subcategory_id = s.id" :class="['px-3 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm border transition touch-manipulation', formData.subcategory_id == s.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-300']">{{ s.name }}</button>
                    <button v-if="!subcategoriesLoading && selectedCategoryId" type="button" @click="refreshSubcategories" class="px-3 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm border border-dashed border-indigo-400 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 touch-manipulation">{{ $t('fandom.create.actions.reload') }}</button>
                    <span v-if="subcategoriesLoading" class="text-xs text-indigo-500 animate-pulse py-2">{{ $t('fandom.create.states.loading') }}</span>
                    <span v-if="!subcategoriesLoading && !subcategories.length" class="text-xs text-gray-500 py-2">{{ $t('fandom.create.states.noSubcategories') }}</span>
                    <span v-if="!subcategoriesLoading && subcategories.length === 1 && formData.subcategory_id" class="text-xs text-gray-400 py-2">{{ $t('fandom.create.states.autoSelected') }}</span>
                  </div>
      <p v-if="formData.subcategory_id && subcategories.length === 1" class="mt-2 text-[10px] sm:text-[11px] text-gray-500">{{ $t('fandom.create.states.usingSubcategory', { name: subcategories[0].name }) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic Information -->
  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-4 sm:p-6 lg:p-8 xl:p-16 shadow-md w-full max-w-none">
            <div class="flex items-center mb-4 sm:mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.create.sections.basic') }}</h2>
            </div>
            <div class="space-y-4 sm:space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.fandomName') }} <span class="text-red-500">*</span></label>
                <input type="text" v-model="formData.title" maxlength="50" class="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all touch-manipulation" :placeholder="$t('fandom.create.fields.fandomNamePlaceholder')" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">{{ $t('fandom.create.fields.description') }}</label>
                <div class="relative">
                  <textarea v-model="formData.description" rows="3" sm:rows="4" maxlength="500" class="w-full px-4 py-3 pl-10 sm:pl-11 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none touch-manipulation" :placeholder="$t('fandom.create.fields.descriptionPlaceholder')"></textarea>
                  <div class="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <p class="text-[10px] sm:text-xs text-gray-500">{{ $t('fandom.create.fields.descriptionHelp') }}</p>
                  <p class="text-[10px] sm:text-xs text-gray-500">{{ formData.description.length }}/500</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- Mobile-optimized sticky action bar -->
      <div class="sticky bottom-0 mt-6 sm:mt-8 lg:mt-10 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-16 xl:-mx-24 px-3 sm:px-4 md:px-6 lg:px-16 xl:px-24 pb-4 sm:pb-6 pt-3 sm:pt-4">
        <div class="relative mx-auto max-w-4xl w-full">
          <div class="group rounded-xl sm:rounded-2xl bg-white/90 sm:bg-white/80 dark:bg-gray-900/90 sm:dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl ring-1 ring-black/5 dark:ring-white/5 flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 transition-all">
            <!-- Progress / Status -->
            <div class="flex-1 w-full text-center">
              <p class="text-[10px] sm:text-xs font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
                {{ isFormValid ? $t('fandom.create.progress.ready') : $t('fandom.create.progress.status', { done: completedFields, total: requiredTotal }) }}
              </p>
              <div class="h-1.5 sm:h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div class="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300" :style="{ width: progressPct + '%' }"></div>
              </div>
            </div>
            <!-- Action Button -->
            <button
              class="relative inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base w-full sm:w-auto
                     bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:via-indigo-500 hover:to-indigo-500
                     text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                     touch-manipulation"
              @click="createFandom"
              :disabled="!isFormValid || creating"
            >
              <span class="flex items-center gap-2">
                <svg v-if="!creating" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8v4m0 0l-3-3m3 3l3-3" />
                </svg>
                <span v-if="!creating">{{ $t('fandom.create.actions.create') }}</span>
                <span v-else>{{ $t('fandom.create.actions.creating') }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useFandomsStore } from '@/store/fandoms'
import { notify } from '@/utils/notify'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const fandomsStore = useFandomsStore()
const categoriesStore = useCategoriesStore()

// Form state
const formData = ref({
  title: '',
  description: '',
  avatar: '', // preview only
  avatarFile: null, // actual File for API (logo_image)
  coverImage: '', // preview only
  coverImageFile: null, // actual File for API
  category: '',
  subcategory_id: ''
})
// Removed: handle, tagline, tags, privacy, invites settings
// If backend requires dynamic subcategory selection, adjust subcategory_id above.
const handleError = ref('') // kept for future if needed
const creating = ref(false)

// Categories for selection
const categories = computed(() => categoriesStore.getCategories.map(cat => ({ ...cat, value: cat.name })))
const apiCategories = computed(() => categoriesStore.getCategories)
const selectedCategoryId = ref('')
const subcategories = ref([])
const subcategoriesLoading = ref(false)
const showSubcategoryPicker = computed(() => !!selectedCategoryId.value)
const categorySearch = ref('')
const filteredApiCategories = computed(() => {
  if (!categorySearch.value.trim()) return apiCategories.value
  const q = categorySearch.value.toLowerCase()
  return apiCategories.value.filter(c => c.name.toLowerCase().includes(q))
})

// Validation
const isFormValid = computed(() => {
  const basic = formData.value.title.trim().length > 0 && formData.value.coverImageFile instanceof File && selectedCategoryId.value && formData.value.subcategory_id
  return basic
})

function onLogoChange(e) {
  const file = e.target.files[0]
  if (!file) return
  formData.value.avatarFile = file
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.avatar = ev.target.result
  }
  reader.readAsDataURL(file)
}

function onCoverChange(e) {
  const file = e.target.files[0]
  if (!file) return
  formData.value.coverImageFile = file
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.coverImage = ev.target.result
  }
  reader.readAsDataURL(file)
}

function getCategoryName(categoryValue) {
  const cat = categories.value.find(c => c.value === categoryValue)
  return cat ? cat.name : categoryValue
}

// Replace constant helper with store-backed description
function getCategoryDescription(value) {
  return categoriesStore.getCategoryDescription(value, getCategoryName(value))
}

async function ensureCategories() {
  await categoriesStore.fetchCategoriesIfNeeded()
}
ensureCategories()

async function loadSubcategories(id) {
  if (!id) return
  subcategoriesLoading.value = true
  subcategories.value = await categoriesStore.fetchSubcategoriesFor(id)
  subcategoriesLoading.value = false
  if (subcategories.value.length === 1) {
    formData.value.subcategory_id = subcategories.value[0].id
  } else {
    formData.value.subcategory_id = ''
  }
}

function onCategoryChange() {
  formData.value.subcategory_id = ''
  loadSubcategories(selectedCategoryId.value)
}

function selectCategoryCard(category) { // kept for any template references
  selectCategoryList({ id: category.id, name: category.name, color: category.color, value: category.value })
}

function selectCategoryList(category) {
  if (selectedCategoryId.value === category.id) return
  selectedCategoryId.value = category.id
  formData.value.category = category.name || category.value
}

function refreshSubcategories() {
  loadSubcategories(selectedCategoryId.value)
}

function refreshCategories() {
  categoriesStore.fetchCategoriesIfNeeded(true)
}

watch(selectedCategoryId, (id) => { if (id) onCategoryChange() })

const requiredTotal = 3 // name, cover image, subcategory
const completedFields = computed(() => {
  let c = 0
  if (formData.value.title.trim()) c++
  if (formData.value.coverImageFile instanceof File) c++
  if (formData.value.subcategory_id) c++
  return c
})
const progressPct = computed(() => Math.min(100, (completedFields.value / requiredTotal) * 100))

async function createFandom() {
  if (!isFormValid.value || creating.value) return
  creating.value = true
  try {
    // Backend expects: name (text), description (text), subcategory_id (text), cover_image (file)
    const payload = {
      name: formData.value.title.trim(),
      description: (formData.value.description || '').trim() || undefined,
      subcategory_id: typeof formData.value.subcategory_id === 'string'
        ? formData.value.subcategory_id.trim()
        : formData.value.subcategory_id, // allow numeric id directly
      cover_image: formData.value.coverImageFile,
      logo_image: formData.value.avatarFile || undefined
    }
  const res = await fandomsStore.createFandomApi(payload)
    const f = res?.data?.fandom || res?.fandom
    if (f) {
  notify.success(t('fandom.create.notify.success'))
      // Redirect to home; fandoms must be approved by admin before becoming visible
      router.push('/')
    } else {
  notify.error(t('fandom.create.notify.failed'))
    }
  } catch (e) {
    console.error('Create fandom error', e)
    const resp = e?.response?.data
    if (resp?.errors) {
  notify.error(Object.values(resp.errors).flat().join('\n'), { autoClose: false })
    } else if (resp?.message) {
  notify.error(resp.message)
    } else {
  notify.error(t('fandom.create.notify.error'))
    }
  } finally {
    creating.value = false
  }
}

// Removed tag suggestion watcher
</script>

<style>
/* ...existing styles... */
.no-scrollbar::-webkit-scrollbar { width:0px; height:0px; }
.no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
</style>