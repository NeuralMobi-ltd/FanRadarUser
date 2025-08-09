<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button 
              @click="$router.back()" 
              class="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors group"
            >
              <svg class="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Fandom</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">Build a thriving community around your passion</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="saveDraft" 
              :disabled="!hasContent"
              class="px-4 py-2 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Draft
            </button>
            <button 
              @click="createFandom"
              :disabled="!isFormValid"
              class="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center"
              :class="isFormValid 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'"
            >
              <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Create Fandom
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2 space-y-8">
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fandom Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="formData.title" 
                    maxlength="50" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-11" 
                    placeholder="Give your community a great name"
                    @input="generateHandle"
                  />
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Handle <span class="text-red-500">*</span>
                </label>
                <div class="flex rounded-lg border border-gray-300/80 dark:border-gray-600/80 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all overflow-hidden">
                  <span class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-r border-gray-300/80 dark:border-gray-600/80 flex items-center">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    fanradar.com/fandom/
                  </span>
                  <input 
                    type="text" 
                    v-model="formData.handle" 
                    maxlength="30" 
                    class="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white border-0 focus:outline-none" 
                    placeholder="your-fandom-name"
                    @input="validateHandle"
                  />
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="formData.tagline" 
                    maxlength="100" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-11" 
                    placeholder="A compelling one-liner that captures your fandom's essence"
                  />
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description
                </label>
                <div class="relative">
                  <textarea 
                    v-model="formData.description" 
                    rows="4" 
                    maxlength="500"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none pl-11" 
                    placeholder="Describe what makes your fandom special, what kind of content to expect, and what brings your community together..."
                  ></textarea>
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Primary Category <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <button
                    v-for="category in categories"
                    :key="category.value"
                    @click="formData.category = category.value"
                    :class="[
                      'p-3 text-left rounded-lg border-2 transition-all duration-200 flex flex-col items-start group',
                      formData.category === category.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                        : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'
                    ]"
                  >
                    <span
                      class="block w-6 h-6 mb-1 rounded-full"
                      :style="{ background: category.color }"
                    >
                      <span v-html="category.icon" class="w-full h-full"></span>
                    </span>
                    <div class="font-medium text-sm truncate">{{ category.name }}</div>
                    <div 
                      class="text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                      :class="formData.category === category.value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'"
                    >
                      {{ getCategoryDescription(category.value) }}
                    </div>
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Tags ({{ formData.tags.length }}/10)
                </label>
                <div class="flex items-center space-x-2 mb-4">
                  <div class="relative flex-1">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">#</span>
                    <input 
                      v-model="newTag" 
                      @keydown.enter.prevent="addTag"
                      @keydown.space.prevent="addTag"
                      placeholder="Add tags that describe your fandom" 
                      class="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                    />
                  </div>
                  <button 
                    @click="addTag"
                    :disabled="!newTag.trim() || formData.tags.length >= 10"
                    class="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center"
                  >
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
                  <span 
                    v-for="tag in formData.tags" 
                    :key="tag" 
                    class="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800 text-sm font-medium transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                  >
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
                    <button
                      v-for="tag in suggestedTags.slice(0, 5)"
                      :key="tag"
                      @click="addSuggestedTag(tag)"
                      class="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                    >
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
                  <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all"
                    :class="formData.privacy === 'public' 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'">
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
                  <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all"
                    :class="formData.privacy === 'private' 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200/80 dark:border-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'">
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
                <label class="flex items-center justify-between p-3 border border-gray-200/80 dark:border-gray-600/80 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <div class="flex items-center space-x-3">
                    <div class="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">Membership Approval</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Review and approve new member requests</div>
                    </div>
                  </div>
                  <input type="checkbox" v-model="formData.requireApproval" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Live Preview -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sticky top-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </h3>
            <!-- Fandom Header Preview (modern style) -->
            <div class="border border-gray-200/80 dark:border-gray-600/80 rounded-xl overflow-hidden relative shadow-sm">
              <div class="h-24 w-full bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div class="absolute bottom-2 left-3 text-white">
                  <div class="flex items-center mb-1">
                    <div class="px-2 py-0.5 bg-indigo-600 rounded-full text-xs font-medium mr-2 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                      </svg>
                      Fandom
                    </div>
                    <div class="flex items-center text-xs">
                      <span class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        0 members
                      </span>
                      <span class="mx-1">•</span>
                      <span class="flex items-center">
                        <svg v-if="formData.privacy === 'private'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Public
                      </span>
                    </div>
                  </div>
                  <div class="text-sm">
                    <div class="font-medium truncate">{{ formData.title || 'Fandom Name' }}</div>
                    <div class="text-gray-300 truncate">{{ formData.tagline || 'Short description of your fandom' }}</div>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white dark:bg-gray-800">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-center space-x-3 mb-4 sm:mb-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img v-if="formData.avatar" :src="formData.avatar" alt="Fandom Avatar" class="w-full h-full object-cover" />
                      <svg v-else class="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="text-sm">
                      <div class="font-medium text-gray-900 dark:text-white">{{ formData.title || 'Fandom Name' }}</div>
                      <div class="text-gray-500 dark:text-gray-400">{{ formData.handle ? 'fanradar.com/fandom/' + formData.handle : 'URL Handle' }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs rounded-full" :class="formData.privacy === 'public' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ formData.privacy === 'public' ? 'Public' : 'Private' }}
                    </span>
                    <button 
                      @click="editFandom"
                      class="px-3 py-1 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Edit Fandom
                    </button>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-gray-700 dark:text-gray-300 text-sm" v-html="previewContent"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useFandomsStore } from '@/store/fandoms'
import { useRouter } from 'vue-router'

// Simple feedback for actions
const feedback = ref('')

// Form data
const formData = ref({
  title: '',
  handle: '',
  tagline: '',
  description: '',
  category: '',
  tags: [],
  privacy: 'public',
  allowMemberInvites: true,
  requireApproval: false,
  avatar: '',
  coverImage: ''
})

// New tag input
const newTag = ref('')

// Category icon SVGs
const categoryIcons = {
  entertainment: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/></svg>`,
  music: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 19V6l12-2v13'/></svg>`,
  'movies-tv': `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><rect width='20' height='14' x='2' y='7' rx='2'/><path d='M16 3l-4 4-4-4'/></svg>`,
  books: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 20h9'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4h9v16H3V4h9z'/></svg>`,
  gaming: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><rect width='20' height='12' x='2' y='6' rx='2'/><circle cx='8' cy='12' r='1.5'/><circle cx='16' cy='12' r='1.5'/></svg>`,
  sports: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M2 12h20'/></svg>`,
  technology: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><rect width='18' height='10' x='3' y='7' rx='2'/><path d='M8 21h8'/></svg>`,
  'art-design': `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 20l9-5-9-5-9 5 9 5z'/></svg>`,
  lifestyle: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><rect width='20' height='12' x='2' y='6' rx='2'/></svg>`,
  education: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 20l9-5-9-5-9 5 9 5z'/></svg>`,
  science: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/></svg>`,
  travel: `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6'/><circle cx='10' cy='10' r='7'/></svg>`
}

// Categories for the fandom
const categories = [
  { value: 'entertainment', name: 'Entertainment', color: '#4F46E5', icon: categoryIcons.entertainment },
  { value: 'music', name: 'Music', color: '#3B82F6', icon: categoryIcons.music },
  { value: 'movies-tv', name: 'Movies & TV', color: '#9333EA', icon: categoryIcons['movies-tv'] },
  { value: 'books', name: 'Books', color: '#10B981', icon: categoryIcons.books },
  { value: 'gaming', name: 'Gaming', color: '#F59E0B', icon: categoryIcons.gaming },
  { value: 'sports', name: 'Sports', color: '#EF4444', icon: categoryIcons.sports },
  { value: 'technology', name: 'Technology', color: '#6366F1', icon: categoryIcons.technology },
  { value: 'art-design', name: 'Art & Design', color: '#D97706', icon: categoryIcons['art-design'] },
  { value: 'lifestyle', name: 'Lifestyle', color: '#059669', icon: categoryIcons.lifestyle },
  { value: 'education', name: 'Education', color: '#3B82F6', icon: categoryIcons.education },
  { value: 'science', name: 'Science', color: '#8B5CF6', icon: categoryIcons.science },
  { value: 'travel', name: 'Travel', color: '#F97316', icon: categoryIcons.travel }
]

// Suggested tags based on category
const suggestedTags = ref([])

// Check if the form has content
const hasContent = computed(() => {
  return formData.value.title.trim() !== '' || 
         formData.value.tagline.trim() !== '' || 
         formData.value.description.trim() !== '' ||
         formData.value.handle.trim() !== '' ||
         formData.value.category !== '' ||
         formData.value.tags.length > 0
})

// Validate the form
const isFormValid = computed(() => {
  return formData.value.title.trim() !== '' &&
         formData.value.handle.trim() !== '' &&
         formData.value.tagline.trim() !== '' &&
         formData.value.description.trim() !== '' &&
         formData.value.category !== '' &&
         !handleError.value
})

// Handle error message for URL handle
const handleError = ref('')

// Generate URL handle from title
function generateHandle() {
  const baseHandle = formData.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  
  formData.value.handle = baseHandle
}

// Validate the URL handle
function validateHandle() {
  const handle = formData.value.handle.trim()
  
  if (handle.length === 0) {
    handleError.value = ''
    return
  }
  
  if (handle.length < 3) {
    handleError.value = 'Handle must be at least 3 characters long'
    return
  }
  
  if (handle.length > 30) {
    handleError.value = 'Handle must be at most 30 characters long'
    return
  }
  
  if (!/^[a-z0-9-]+$/.test(handle)) {
    handleError.value = 'Handle can only contain letters, numbers, and hyphens'
    return
  }
  
  handleError.value = ''
}

// Add a new tag
function addTag() {
  const tag = newTag.value.trim().toLowerCase()
  
  if (tag.length === 0 || formData.value.tags.includes(tag) || formData.value.tags.length >= 10) {
    newTag.value = ''
    return
  }
  
  formData.value.tags.push(tag)
  newTag.value = ''
}

// Remove a tag
function removeTag(tag) {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

// Add suggested tag
function addSuggestedTag(tag) {
  if (!formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
  }
}

// Handle logo/avatar upload
function onLogoChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.avatar = ev.target.result
  }
  reader.readAsDataURL(file)
}

// Handle cover image upload
function onCoverChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    formData.value.coverImage = ev.target.result
  }
  reader.readAsDataURL(file)
}

// Save draft function
function saveDraft() {
  // Save the current form as a draft in the store
  const draft = {
    ...formData.value,
    id: Date.now(),
    savedAt: new Date().toISOString(),
    isDraft: true
  }
  // Add to store (create array if not exists)
  if (!fandomsStore.draftFandoms) fandomsStore.draftFandoms = []
  fandomsStore.draftFandoms.unshift(draft)
  feedback.value = 'Draft saved!'
  setTimeout(() => (feedback.value = ''), 2000)
}

// Create fandom function
function createFandom() {
  if (!isFormValid.value) return
  // Add fandom to store
  const newFandom = {
    id: Date.now(),
    name: formData.value.title,
    handle: formData.value.handle,
    description: formData.value.tagline,
    fullDescription: formData.value.description,
    category: categories.find(c => c.value === formData.value.category)?.name || '',
    tags: [...formData.value.tags],
    privacy: formData.value.privacy,
    allowMemberInvites: formData.value.allowMemberInvites,
    requireApproval: formData.value.requireApproval,
    avatar: formData.value.avatar,
    logo: formData.value.avatar,
    coverImage: formData.value.coverImage,
    membersCount: 1,
    role: 'admin',
    createdAt: new Date().toISOString().slice(0, 10)
  }
  fandomsStore.allFandoms.unshift(newFandom)
  fandomsStore.userRoles[formData.value.handle] = 'admin'
  if (!fandomsStore.fandomMembers[formData.value.handle]) {
    fandomsStore.fandomMembers[formData.value.handle] = []
  }
  fandomsStore.fandomMembers[formData.value.handle].push({
    id: Date.now(),
    name: 'You',
    username: 'you',
    avatar: formData.value.avatar || '/public/images/me.png',
    role: 'admin',
    posts: 0,
    joinedDate: new Date().toLocaleDateString()
  })
  feedback.value = 'Fandom created! Redirecting...'
  setTimeout(() => {
    feedback.value = ''
    router.push(`/fandom/${formData.value.handle}`)
  }, 1200)
}

// Watch for category changes to update suggested tags
watch(() => formData.value.category, (newCategory) => {
  if (newCategory) {
    // Fetch or generate suggested tags based on the selected category
    // For demo, we use static tags
    const staticTags = {
      entertainment: ['movies', 'tv shows', 'celebrities'],
      music: ['rock', 'pop', 'jazz'],
      'movies-tv': ['action', 'comedy', 'drama'],
      books: ['fiction', 'non-fiction', 'mystery'],
      gaming: ['pc', 'console', 'mobile'],
      sports: ['football', 'basketball', 'tennis'],
      technology: ['gadgets', 'programming', 'AI'],
      'art-design': ['illustration', 'graphic design', 'photography'],
      lifestyle: ['fashion', 'wellness', 'home decor'],
      education: ['online courses', 'tutorials', 'webinars'],
      science: ['biology', 'chemistry', 'physics'],
      travel: ['destinations', 'tips', 'travel stories']
    }
    
    suggestedTags.value = staticTags[newCategory] || []
  } else {
    suggestedTags.value = []
  }
})

// Add category descriptions for better UX
const categoryDescriptions = {
  entertainment: 'Movies, TV, celebrities, and pop culture.',
  music: 'Bands, artists, genres, and music lovers.',
  'movies-tv': 'Film buffs, TV series, reviews, and more.',
  books: 'Readers, authors, book clubs, and literature.',
  gaming: 'PC, console, mobile, esports, and more.',
  sports: 'Football, basketball, tennis, and all sports.',
  technology: 'Gadgets, programming, AI, and tech trends.',
  'art-design': 'Artists, designers, and creative minds.',
  lifestyle: 'Fashion, wellness, home, and daily life.',
  education: 'Learning, teaching, and academic topics.',
  science: 'Physics, biology, research, and discoveries.',
  travel: 'Destinations, tips, and travel stories.'
}

function getCategoryDescription(value) {
  return categoryDescriptions[value] || ''
}


// Edit Fandom button in preview (for demo: just show feedback)
function editFandom() {
  feedback.value = 'Edit Fandom clicked! (Implement edit logic as needed)'
  setTimeout(() => (feedback.value = ''), 1500)
}

const fandomsStore = useFandomsStore()
const router = useRouter()
</script>

<style>
/* Custom scrollbar for WebKit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #718096;
}
</style>