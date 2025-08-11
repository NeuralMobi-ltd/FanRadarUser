<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Fandom</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">Build a thriving community around your passion</p>
            </div>
          </div>
          <!-- Removed Back and Create Fandom buttons from header -->
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 gap-8">
        <!-- Form Section -->
        <div class="space-y-8">
          <!-- Logo & Cover Image -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
            <div class="flex items-center mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Logo & Cover Image</h2>
            </div>
            <div class="space-y-6">
              <div class="flex flex-col sm:flex-row gap-6">
                <!-- Logo Upload -->
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo/Avatar</label>
                  <div class="relative group">
                    <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200/80 dark:border-gray-600/80 bg-gray-100/50 dark:bg-gray-700/50 flex items-center justify-center cursor-pointer transition-all hover:border-indigo-500">
                      <input type="file" @change="onLogoChange" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <template v-if="formData.avatar">
                        <img :src="formData.avatar" alt="Fandom Logo" class="w-full h-full object-cover" />
                      </template>
                      <template v-else>
                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </template>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Square image, 256x256 recommended</p>
                  </div>
                </div>
                <!-- Cover Image Upload -->
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
                  <div class="relative group">
                    <div class="w-full h-24 rounded-lg overflow-hidden border-2 border-gray-200/80 dark:border-gray-600/80 bg-gray-100/50 dark:bg-gray-700/50 flex items-center justify-center cursor-pointer transition-all hover:border-indigo-500">
                      <input type="file" @change="onCoverChange" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <template v-if="formData.coverImage">
                        <img :src="formData.coverImage" alt="Fandom Cover" class="w-full h-full object-cover" />
                      </template>
                      <template v-else>
                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="ml-2 text-sm text-gray-500">Upload Cover</span>
                      </template>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">16:9 ratio, 1200x675 recommended</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic Information -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
            <div class="flex items-center mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
            </div>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fandom Name <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input type="text" v-model="formData.title" maxlength="50" class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-11" placeholder="Give your community a great name" @input="generateHandle" />
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">Choose a clear, memorable name that reflects what your community is about</p>
                  <p class="text-xs text-gray-500">{{ formData.title.length }}/50</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Handle <span class="text-red-500">*</span></label>
                <div class="flex rounded-lg border border-gray-300/80 dark:border-gray-600/80 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all overflow-hidden">
                  <span class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-r border-gray-300/80 dark:border-gray-600/80 flex items-center">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    fanradar.com/fandom/
                  </span>
                  <input type="text" v-model="formData.handle" maxlength="30" class="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white border-0 focus:outline-none" placeholder="your-fandom-name" @input="validateHandle" />
                </div>
                <div class="mt-2">
                  <p v-if="handleError" class="text-xs text-red-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ handleError }}
                  </p>
                  <p v-else class="text-xs text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    This will be your community's unique address – letters, numbers, and hyphens only
                  </p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input type="text" v-model="formData.tagline" maxlength="100" class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-11" placeholder="A compelling one-liner that captures your fandom's essence" />
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">This appears in search results and previews – make it catchy!</p>
                  <p class="text-xs text-gray-500">{{ formData.tagline.length }}/100</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
                <div class="relative">
                  <textarea v-model="formData.description" rows="4" maxlength="500" class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none pl-11" placeholder="Describe what makes your fandom special, what kind of content to expect, and what brings your community together..."></textarea>
                  <div class="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">Help people understand your community's purpose</p>
                  <p class="text-xs text-gray-500">{{ formData.description.length }}/500</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Category & Tags -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
            <div class="flex items-center mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Category & Discovery</h2>
            </div>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Primary Category <span class="text-red-500">*</span></label>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <button v-for="category in categories" :key="category.value" @click="formData.category = category.value" :class="['p-3 text-left rounded-lg border-2 transition-all duration-200 flex flex-col items-start group', formData.category === category.value ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500']">
                    <span 
                      class="block w-10 h-10 mb-2 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 border-2 group-hover:scale-110 group-active:scale-95"
                      :style="{
                        background: category.color + '22', // 13% opacity for pastel bg
                        borderColor: category.color,
                        boxShadow: formData.category === category.value ? '0 0 0 4px ' + category.color + '33' : '0 1px 4px 0 rgba(0,0,0,0.04)'
                      }"
                    >
                      <i :class="category.faIcon" class="text-xl" :style="{ color: category.color }"></i>
                    </span>
                    <div class="font-medium text-sm truncate">{{ category.name }}</div>
                    <div class="text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1" :class="formData.category === category.value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'">
                      {{ getCategoryDescription(category.value) }}
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tags ({{ formData.tags.length }}/10)</label>
                <div class="flex items-center space-x-2 mb-4">
                  <div class="relative flex-1">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">#</span>
                    <input v-model="newTag" @keydown.enter.prevent="addTag" @keydown.space.prevent="addTag" placeholder="Add tags that describe your fandom" class="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                  </div>
                  <button @click="addTag" :disabled="!newTag.trim() || formData.tags.length >= 10" class="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
                  <span v-for="tag in formData.tags" :key="tag" class="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800 text-sm font-medium transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
                    #{{ tag }}
                    <button @click="removeTag(tag)" class="text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </div>
                <div v-if="suggestedTags.length > 0 && formData.tags.length < 10" class="mt-3">
                  <p class="text-xs text-gray-500 mb-2 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Suggested tags for {{ getCategoryName(formData.category) }}:
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="tag in suggestedTags.slice(0, 5)" :key="tag" @click="addSuggestedTag(tag)" class="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {{ tag }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
            <div class="flex items-center mb-6">
              <div class="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Privacy & Settings</h2>
            </div>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Community Type</label>
                <div class="space-y-4">
                  <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all" :class="formData.privacy === 'public' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'">
                    <input type="radio" value="public" v-model="formData.privacy" class="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center">
                        <div class="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-2">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span class="font-medium text-gray-900 dark:text-white">Public Community</span>
                      </div>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Anyone can discover your fandom, see content, and join</p>
                    </div>
                  </label>
                  <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all" :class="formData.privacy === 'private' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'">
                    <input type="radio" value="private" v-model="formData.privacy" class="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center">
                        <div class="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-2">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span class="font-medium text-gray-900 dark:text-white">Private Community</span>
                      </div>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Only approved members can see and participate in this fandom</p>
                    </div>
                  </label>
                </div>
              </div>
              <div class="space-y-4">
                <label class="flex items-center justify-between p-3 border border-gray-200/80 dark:border-gray-600/80 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <div class="flex items-center space-x-3">
                    <div class="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">Member Invitations</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Allow all members to invite their friends</div>
                    </div>
                  </div>
                  <input type="checkbox" v-model="formData.allowMemberInvites" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                </label>
                <!-- Add any additional settings here if needed -->
              </div>
            </div>
          </div>
        </div>
        <!-- You may have a sidebar or additional content here for the 3rd column -->
      </div> <!-- end .grid -->
    </main>
</div>
<!-- Button moved inside main flex column container, after </main> -->
<div class="w-full flex justify-center py-8">
  <button
    class="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
    @click="createFandom"
    :disabled="!isFormValid"
    :class="!isFormValid ? 'opacity-60 cursor-not-allowed' : ''"
  >
    <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
    Create
  </button>
</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFandomsStore } from '@/store/fandoms'
import { getCategoryDescription } from '@/constants/categoryDescriptions'
import { COMMUNITY_CATEGORIES } from '@/constants/communityCategories'

const router = useRouter()
const fandomsStore = useFandomsStore()

// Form state
const formData = ref({
  title: '',
  handle: '',
  tagline: '',
  description: '',
  avatar: '',
  coverImage: '',
  category: '',
  tags: [],
  privacy: 'public',
  allowMemberInvites: true,
  requireApproval: false
})
const newTag = ref('')
const handleError = ref('')
const suggestedTags = ref([])

// Categories for selection (add .value for v-for)
const categories = COMMUNITY_CATEGORIES.map(cat => ({
  ...cat,
  value: cat.name
}))

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.title.trim().length > 0 &&
    formData.value.handle.trim().length > 0 &&
    formData.value.tagline.trim().length > 0 &&
    formData.value.category &&
    !handleError.value
  )
})

function onLogoChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.avatar = ev.target.result
  }
  reader.readAsDataURL(file)
}

function onCoverChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.coverImage = ev.target.result
  }
  reader.readAsDataURL(file)
}

function generateHandle() {
  // Auto-generate handle from title
  let handle = formData.value.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
  formData.value.handle = handle
  validateHandle()
}

function validateHandle() {
  const handle = formData.value.handle
  if (!/^[a-z0-9-]+$/.test(handle)) {
    handleError.value = 'Handle can only contain lowercase letters, numbers, and hyphens.'
    return
  }
  // Check for uniqueness (simulate by checking existing fandoms)
  const exists = fandomsStore.allFandoms.some(f => f.handle === handle)
  handleError.value = exists ? 'This handle is already taken.' : ''
}

function addTag() {
  const tag = newTag.value.trim().replace(/^#/, '')
  if (!tag || formData.value.tags.includes(tag) || formData.value.tags.length >= 10) return
  formData.value.tags.push(tag)
  newTag.value = ''
}

function removeTag(tag) {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

function addSuggestedTag(tag) {
  if (!formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
  }
}

function getCategoryName(categoryValue) {
  const cat = categories.find(c => c.value === categoryValue)
  return cat ? cat.name : categoryValue
}

function createFandom() {
  if (!isFormValid.value) return
  // Prepare data for store
  const fandomData = {
    ...formData.value,
    categoryName: getCategoryName(formData.value.category)
  }
  const newFandom = fandomsStore.createFandom(fandomData)
  // Try to navigate by name, fallback to path if route name is missing
  try {
    if (newFandom && newFandom.handle) {
      router.push({ name: 'FandomDetail', params: { handle: newFandom.handle } })
    } else {
      // fallback: try path-based navigation
      router.push(`/fandom/${newFandom.handle || formData.value.handle}`)
    }
  } catch (e) {
    // fallback: try path-based navigation
    router.push(`/fandom/${newFandom && newFandom.handle ? newFandom.handle : formData.value.handle}`)
  }
}

// Watch category to update suggested tags
watch(() => formData.value.category, (cat) => {
  // Example: set suggested tags based on category
  if (cat === 'Sports') suggestedTags.value = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Olympics']
  else if (cat === 'Music') suggestedTags.value = ['Pop', 'Rock', 'KPop', 'Jazz', 'Indie']
  else if (cat === 'Gaming') suggestedTags.value = ['PC', 'Console', 'Esports', 'RPG', 'Shooter']
  else if (cat === 'Art') suggestedTags.value = ['Drawing', 'Painting', 'DigitalArt', 'Sculpture', 'Photography']
  else suggestedTags.value = []
})
</script>