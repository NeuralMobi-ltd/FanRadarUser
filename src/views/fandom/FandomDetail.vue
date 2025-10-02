<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8  mt-4 pt-2 sm:pt-4">
    <!-- Fandom Header -->
    <div class="relative mb-4 sm:mb-8">
      <!-- Cover Image -->
      <div class="h-32 sm:h-40 md:h-64 w-full rounded-lg sm:rounded-xl overflow-hidden">
        <img 
          :src="normalizedCover" 
          :alt="fandom.name" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Fandom Avatar/Logo -->
      <div class="absolute bottom-0 right-0 m-2 sm:m-3 md:m-6">
        <img 
          :src="normalizedLogo" 
          :alt="fandom.name" 
          class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl border-2 sm:border-4 border-white shadow-lg" 
        />
      </div>
      
      <!-- Fandom Info -->
      <div class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-6 md:left-6 text-white">
        <div class="flex flex-col sm:flex-row sm:items-center mb-1 sm:mb-2">
          <div class="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-600 rounded-full text-xs sm:text-sm font-medium mb-1 sm:mb-0 sm:mr-3 flex items-center gap-1 sm:gap-2 w-fit">
            <span>{{ $t('fandom.detail.label') }}</span>
          </div>
          <div class="flex items-center text-xs sm:text-sm">
            <span>{{ fandom.members }} {{ $t('fandom.detail.members') }}</span>
          </div>
        </div>
        <h1 class="text-xl sm:text-2xl md:text-4xl font-bold mb-1 leading-tight">{{ fandom.name }}</h1>
        <p class="text-white/90 max-w-xl text-sm sm:text-base hidden sm:block">{{ fandom.description }}</p>
        <!-- Show category if present -->
        <p v-if="fandom.category" class="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-blue-200 bg-blue-700/40 inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          {{ fandom.category }}
        </p>
      </div>
    </div>

    <!-- Admin Controls (Only visible to admins) -->
    <div v-if="isAdmin" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
      <div class="flex flex-col gap-3">
        <div class="flex items-center">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <i class="fas fa-crown text-yellow-600 text-sm sm:text-base"></i>
          </div>
          <span class="font-medium text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">{{ $t('fandom.detail.adminPanel') }}</span>
        </div>
        <div class="grid grid-cols-2 sm:flex gap-2 sm:gap-2">
          <button @click="showEditFandom = true" class="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
            <i class="fas fa-edit mr-1 sm:mr-2"></i>{{ $t('fandom.detail.editFandom') }}
          </button>
      
        </div>
      </div>
    </div>

    <!-- Visitor Actions (Only visible to non-members or non-admins) -->
    <div v-if="!isMember" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">{{ $t('fandom.detail.joinTitle', { name: fandom.name }) }}</h3>
          <p class="text-sm sm:text-base text-blue-700 dark:text-blue-300">{{ $t('fandom.detail.joinSubtitle', { members: fandom.members }) }}</p>
        </div>
        <button 
          @click="joinFandom"
          :disabled="joining"
          class="w-full sm:w-auto px-6 py-3 bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <i v-if="!joining" class="fas fa-plus"></i>
          <i v-else class="fas fa-spinner fa-spin"></i>
          <span v-if="!joining">{{ $t('common.joinFandom') }}</span>
          <span v-else>{{ $t('common.saving') }}</span>
        </button>
      </div>
    </div>

    <!-- Member Welcome (Only visible to members who are not admins) -->
    <div v-if="isMember && !isAdmin" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div class="flex items-center">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
          <i class="fas fa-check text-green-600 text-sm sm:text-base"></i>
        </div>
        <span class="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">{{ $t('common.youreMember') }}</span>
      </div>
  <button @click="showLeaveConfirm = true" class="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">{{ $t('common.leaveFandom') }}</button>
    </div>

  <!-- Hashtags section removed per request -->

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
      <div class="hidden sm:flex gap-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-4 px-1 font-medium',
            activeTab === tab.id 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          {{ $t(`fandom.detail.tabs.${tab.id}`) }}
          <span v-if="tab.id !== 'about' && tab.count" class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
        </button>
      </div>
      <!-- Mobile chip tabs -->
      <div class="sm:hidden -mx-3 px-3 py-2 overflow-x-auto no-scrollbar">
        <div class="flex gap-2 min-w-max">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-3 py-2 rounded-full text-sm font-medium border whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-blue-600 text-white border-transparent'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
            ]"
          >
            {{ $t(`fandom.detail.tabs.${tab.id}`) }}
            <span class="ml-2 px-1.5 py-0.5 text-xs bg-white/70 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-200" v-if="tab.count">{{ tab.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="space-y-4 sm:space-y-6">
      <!-- Create Post (match Home.vue design) -->
      <div v-if="isModeratorOrAdmin" class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200">
        <!-- User Avatar and Text Input -->
        <div class="flex items-start space-x-3 sm:space-x-4">
          <img :src="currentUser.avatar" class="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0" :alt="currentUser.name">
          <div class="flex-1 min-w-0">
            <textarea
              v-model="newPostContent"
              :placeholder="$t('common.whatsOnYourMind')"
              class="w-full resize-none border-none outline-none bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium min-h-[3rem] focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors"
              rows="1"
              @input="autoResize"
              @focus="$event.target.style.minHeight = '5rem'"
              @blur="$event.target.style.minHeight = '3rem'"
            ></textarea>
          </div>
        </div>

        <!-- Tags Section (same as Home.vue) -->
        <div v-if="tags.length || tagInput" class="mt-4 pl-13 sm:pl-16">
          <div class="flex flex-wrap gap-2 mb-3" v-if="Array.isArray(tags) && tags.length">
            <span
              v-for="(tag, idx) in tags"
              :key="idx"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
            >
              #{{ tag }}
              <button 
                type="button" 
                class="ml-2 text-blue-600 dark:text-blue-400 hover:text-red-500 transition-colors w-4 h-4 flex items-center justify-center" 
                @click="removeTag(idx)"
              >
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
          </div>
          <input
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            @keydown.tab.prevent="addTag"
            type="text"
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('common.addTagsPlaceholder')"
          />
        </div>

        <!-- Media Preview (same grid) -->
        <div v-if="Array.isArray(postMedia) && postMedia.length > 0" class="mt-4 pl-13 sm:pl-16">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div v-for="(media, index) in postMedia" :key="index" class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square">
              <img v-if="media.type === 'image'" :src="media.url" class="w-full h-full object-cover" />
              <video v-else-if="media.type === 'video'" :src="media.url" class="w-full h-full object-cover" muted></video>
              <button @click="removeMedia(index)" class="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Bar (same as Home.vue) -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-1">
            <label class="flex items-center justify-center w-10 h-10 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all touch-target">
              <i class="fas fa-image text-lg"></i>
              <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
            </label>
            <label class="flex items-center justify-center w-10 h-10 rounded-xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all touch-target">
              <i class="fas fa-video text-lg"></i>
              <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
            </label>
            <button 
              @click="() => { if (!tagInput && tags.length === 0) tagInput = ' ' }"
              class="flex items-center justify-center w-10 h-10 rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all touch-target"
            >
              <i class="fas fa-hashtag text-lg"></i>
            </button>
          </div>

          <button
            @click="createPost"
            :disabled="!newPostContent.trim() && postMedia.length === 0"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm disabled:cursor-not-allowed transition-all text-sm touch-target min-w-[5rem]"
          >
            {{ $t('common.post') }}
          </button>
        </div>
      </div>

      <!-- Posts List -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <Post
          v-for="post in sortedPosts"
          :key="post.id"
          :post="post"
          :can-edit="canModifyPost(post)"
          @like="likePost"
          @comment="commentPost"
          @delete="deletePost"
          :can-delete="canModifyPost(post)"
          @edit="openEditPost"
          :prefer-parent-edit="true"
          class="w-full mb-0"
        />
      </div>
    </div>

    <!-- Members Tab with Admin Controls -->
    <div v-else-if="activeTab === 'members'" class="space-y-4 sm:space-y-6">
  <!-- Add Member block removed per request -->

      <!-- Members Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div v-for="member in members" :key="member.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <AvatarFallback
              :src="normalizeAsset(member.avatar)"
              :first-name="(member.name || '').split(' ')[0]"
              :last-name="(member.name || '').split(' ').slice(1).join(' ')"
              custom-class="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 cursor-pointer hover:ring-2 hover:ring-blue-500 transition flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold"
              @click="goToUser(member)"
            />
            <div class="flex-1 cursor-pointer group" @click="goToUser(member)">
              <h3 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ member.name }}</h3>
            </div>
            <div class="flex items-center">
              <span v-if="member.role === 'admin'" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-2">
                <i class="fas fa-crown mr-1"></i>{{ $t('fandom.detail.admin') }}
              </span>
              <span v-else-if="member.role === 'moderator'" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">
                <i class="fas fa-shield-alt mr-1"></i>{{ $t('fandom.detail.moderator') || 'Moderator' }}
              </span>
              <span v-else class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                <i class="fas fa-user mr-1"></i>{{ $t('fandom.detail.member') }}
              </span>
            </div>
          </div>
          
          <!-- Admin Controls for Members -->
          <div v-if="isAdmin && member.id !== currentUser.id" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <select 
                :value="member.role" 
                @change="changeMemberRole(member.id, $event.target.value)"
                class="text-xs px-2 py-1 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="member">{{ $t('fandom.detail.member') }}</option>
                <option value="moderator">{{ $t('fandom.detail.moderator') || 'Moderator' }}</option>
                <option value="admin">{{ $t('fandom.detail.admin') }}</option>
              </select>
              <button @click="removeMember(member.id)" class="text-red-500 hover:text-red-700 text-xs">
                <i class="fas fa-trash mr-1"></i>{{ $t('common.remove') }}
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4">
            <span v-if="member.joined_at || member.created_at || member.joinedDate">{{ $t('fandom.detail.joinedOn', { date: formatJoined(member.joined_at || member.created_at || member.joinedDate) }) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'about'" class="space-y-8">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform translate-x-32 -translate-y-32"></div>
        </div>
        <div class="relative p-8 sm:p-10">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <i class="fas fa-circle-info text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ $t('fandom.detail.aboutTitle', { name: fandom.name }) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">{{ $t('fandom.detail.aboutSubtitle') }}</p>
            </div>
          </div>
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {{ fandom.fullDescription || $t('fandom.detail.aboutFallback') }}
            </p>
          </div>
          
          <!-- Category Badge -->
          <div class="mt-6" v-if="fandom.category">
            <div class="inline-flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <i class="fas fa-folder-tree text-white"></i>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-0.5">{{ $t('common.category') }}</p>
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ fandom.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <i class="fas fa-chart-line text-white"></i>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.detail.stats.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('fandom.detail.stats.subtitle') }}</p>
            </div>
          </div>
        </div>
        
        <div class="p-8">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <!-- Members Stat -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer">
              <div class="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <div class="w-full h-full bg-blue-400 rounded-full transform translate-x-8 -translate-y-8"></div>
              </div>
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i class="fas fa-users text-white text-lg"></i>
                </div>
                <p class="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-1">{{ $t('fandom.detail.stats.membersTitle') }}</p>
                <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ fandom.members }}</p>
                <p class="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">{{ $t('fandom.detail.stats.membersHint') }}</p>
              </div>
            </div>

            <!-- Posts Stat -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-700/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer">
              <div class="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <div class="w-full h-full bg-green-400 rounded-full transform translate-x-8 -translate-y-8"></div>
              </div>
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i class="fas fa-file-lines text-white text-lg"></i>
                </div>
                <p class="text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-bold mb-1">{{ $t('common.posts') }}</p>
                <p class="text-2xl font-bold text-green-700 dark:text-green-300">{{ fandom.totalPosts }}</p>
                <p class="text-xs text-green-600/70 dark:text-green-400/70 mt-1">{{ $t('fandom.detail.stats.postsHint') }}</p>
              </div>
            </div>

            <!-- Created Stat -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-800/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-700/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer">
              <div class="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <div class="w-full h-full bg-orange-400 rounded-full transform translate-x-8 -translate-y-8"></div>
              </div>
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i class="fas fa-calendar-plus text-white text-lg"></i>
                </div>
                <p class="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-1">{{ $t('fandom.detail.stats.createdTitle') }}</p>
                <p class="text-2xl font-bold text-orange-700 dark:text-orange-300">{{ formattedCreated }}</p>
                <p class="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">{{ $t('fandom.detail.stats.createdHint') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Fandom Modal (Admin Only) -->
    <div v-if="showEditFandom && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <i class="fas fa-edit text-white text-lg"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.detail.editFandom') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('fandom.detail.edit.subtitle') }}</p>
          </div>
        </div>
        
        <div class="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <i class="fas fa-tag mr-2 text-blue-500"></i>{{ $t('fandom.create.fields.fandomName') }}
            </label>
            <input v-model="editFandom.name" type="text" :placeholder="$t('fandom.create.fields.fandomNamePlaceholder')" 
              class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <i class="fas fa-file-alt mr-2 text-green-500"></i>{{ $t('fandom.create.fields.description') }}
            </label>
            <textarea v-model="editFandom.description" rows="4" :placeholder="$t('fandom.create.fields.descriptionPlaceholder')" 
              class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm resize-none"></textarea>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Cover Image Section -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                <i class="fas fa-image mr-2 text-purple-500"></i>{{ $t('fandom.create.fields.coverLabel') }}
              </label>
              <div class="relative">
                <div class="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all group cursor-pointer">
                  <img v-if="coverPreview || editFandom.coverImage" :src="coverPreview || editFandom.coverImage" class="object-cover w-full h-full" alt="Cover preview">
                  <div v-else class="text-center group-hover:scale-105 transition-transform">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('fandom.detail.edit.uploadCoverPrompt') }}</p>
                  </div>
                  <input @change="onCoverFileChange" type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                </div>
                <p class="text-xs text-gray-500 mt-2">{{ $t('fandom.detail.edit.coverHintShort') }}</p>
              </div>
            </div>

            <!-- Logo Image Section -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                <i class="fas fa-shield-alt mr-2 text-orange-500"></i>{{ $t('fandom.create.fields.logoLabel') }}
              </label>
              <div class="relative">
                <div class="w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 transition-all group cursor-pointer">
                  <img v-if="logoPreview || editFandom.logo" :src="logoPreview || editFandom.logo" class="object-cover w-full h-full" alt="Logo preview">
                  <div v-else class="text-center group-hover:scale-105 transition-transform">
                    <i class="fas fa-plus-circle text-3xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('fandom.detail.edit.uploadLogoPrompt') }}</p>
                  </div>
                  <input @change="onLogoFileChange" type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                </div>
                <p class="text-xs text-gray-500 mt-2">{{ $t('fandom.detail.edit.logoHintShort') }}</p>
              </div>
            </div>
          </div>
          
          <!-- Status Messages -->
          <div v-if="updateError" class="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl">
            <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
              <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-sm"></i>
            </div>
            <p class="text-sm text-red-700 dark:text-red-300">{{ updateError }}</p>
          </div>
          
          <div v-if="updateSuccess" class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl">
            <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 text-sm"></i>
            </div>
            <p class="text-sm text-green-700 dark:text-green-300">{{ $t('fandom.detail.edit.success') }}</p>
          </div>
        </div>
        
        <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button @click="showEditFandom = false" :disabled="updatingFandom" 
            class="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium rounded-xl transition-all disabled:opacity-60 hover:bg-gray-50 dark:hover:bg-gray-800">
            {{ $t('common.cancel') }}
          </button>
          <button @click="saveFandomChanges" :disabled="updatingFandom" 
            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all disabled:opacity-60 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[140px] justify-center">
            <i v-if="!updatingFandom" class="fas fa-save"></i>
            <i v-else class="fas fa-spinner fa-spin"></i>
            <span>{{ updatingFandom ? $t('common.saving') : $t('common.saveChanges') }}</span>
          </button>
        </div>
      </div>
    </div>

  <!-- Manage Members Modal (Admin Only) -->
    <div v-if="showManageMembers && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('fandom.detail.manageMembers') }}</h3>
        
        <!-- Member Search -->
        <div class="mb-4">
          <input 
            v-model="memberSearch" 
            type="text" 
            :placeholder="$t('fandom.detail.searchMembersPlaceholder')" 
            class="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <!-- Members List -->
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div v-for="member in filteredMembers" :key="member.id" class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div class="flex items-center space-x-3">
              <img :src="member.avatar" :alt="member.name" class="w-10 h-10 rounded-full">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">{{ member.name }}</h4>
                <!-- Username hidden (not used in app model) -->
                <p class="text-sm text-gray-500 dark:text-gray-400" v-if="false">@</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <select 
                :value="member.role" 
                @change="changeMemberRole(member.id, $event.target.value)"
                class="text-sm px-3 py-1 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option v-for="role in roleOptions" :key="role.value" :value="role.value">{{ role.label }}</option>
              </select>
              <button v-if="member.id !== currentUser.id" @click="removeMember(member.id)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end mt-6">
          <button @click="showManageMembers = false" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">{{ $t('common.close') }}</button>
        </div>
      </div>
    </div>

  <!-- Edit Hashtags modal removed per request -->
    <!-- Leave Fandom Confirmation Modal -->
    <div v-if="showLeaveConfirm" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6">
        <div class="flex items-start mb-4">
          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-800/30 text-red-600 dark:text-red-300 mr-3">
            <i class="fas fa-triangle-exclamation text-lg"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-snug">{{ $t('fandom.detail.leaveTitle', { name: fandom.name || $t('fandom.detail.label') }) }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              {{ $t('fandom.detail.leaveDescription') }}
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 mb-5 flex items-start gap-2">
          <i class="fas fa-info-circle mt-0.5"></i>
          <span>{{ $t('fandom.detail.leaveInfo') }}</span>
        </div>
        <div class="flex flex-col sm:flex-row-reverse gap-3">
          <button @click="confirmLeaveFandom" :disabled="leaving" class="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
            <i v-if="!leaving" class="fas fa-door-open"></i>
            <i v-else class="fas fa-spinner fa-spin"></i>
            <span>{{ leaving ? $t('common.saving') : $t('common.leaveFandom') }}</span>
          </button>
          <button @click="showLeaveConfirm = false" :disabled="leaving" class="px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Generic Confirm Modals -->
  <ConfirmModal
    v-model="showRemoveMember"
    tone="danger"
    :title="$t('fandom.detail.removeMemberTitle')"
    :message="$t('fandom.detail.removeMemberMessage')"
    :confirm-text="$t('common.remove')"
    :loading-text="$t('common.removing')"
    :loading="removingMember"
    confirm-icon="fas fa-user-minus"
    icon="fas fa-user-slash"
    @confirm="confirmRemoveMember"
    @cancel="cancelRemoveMember"
  />
  <ConfirmModal
    v-model="showDeletePost"
    tone="danger"
    :title="$t('common.deletePostConfirm')"
    :message="$t('common.actionIrreversible')"
    :confirm-text="$t('common.remove')"
    :loading-text="$t('common.deleting')"
    :loading="deletingPost"
    confirm-icon="fas fa-trash"
    icon="fas fa-trash"
    @confirm="confirmDeletePost"
    @cancel="cancelDeletePost"
  />
  <!-- Fandom Post Edit Modal -->
  <CreatePostModal
    v-if="showEditPostModal"
    v-model="showEditPostModal"
    :edit-post="editingPost"
    :user-avatar="currentUser.avatar"
  :user-name="currentUser.name"
    mode="fandom-edit"
    :disable-schedule="true"
    :disable-category="true"
    @submit="submitFandomEdit"
  />
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import CreatePostModal from '@/components/common/CreatePostModal.vue'
import Post from '@/components/common/Post.vue'
import API_CONFIG from '@/config/api'
import { useAuthStore } from '@/store/auth'
import { useFandomsStore } from '@/store/fandoms'
import { normalizeAsset as normAsset } from '@/utils/assets'
import { notify } from '@/utils/notify'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const fandomsStore = useFandomsStore()
const { t } = useI18n()
const fandomName = computed(() => route.params.name || '')
// Map handle to stored fandom to retrieve numeric id for backend endpoints
const fandomRecord = computed(() => fandomsStore.allFandoms.find(f => f.handle === fandomName.value || f.id === Number(fandomName.value)))
// Stable key to index store dictionaries (prefer real handle, fallback to original param)
const fandomKey = computed(() => fandomRecord.value?.handle || fandomName.value)
// If no local record yet, we'll keep a ref for numeric id once resolved
const resolvedFandomId = ref(null)
const fandomIdForApi = computed(() => {
  if (resolvedFandomId.value) return resolvedFandomId.value
  return fandomRecord.value?.id || fandomName.value // may still be handle; store will now guard against sending slug
})
const activeTab = ref('posts')
const newPostContent = ref('')

// Modal reactive variables
const showEditFandom = ref(false)
const showManageMembers = ref(false)
const postMedia = ref([])
const isPinned = ref(false)
const isAnnouncement = ref(false)
const memberSearch = ref('')
const editFandom = ref({})
const tags = ref([])
const tagInput = ref('')
const scheduleEnabled = ref(false)
const scheduleAt = ref('')
function toggleSchedule() { scheduleEnabled.value = !scheduleEnabled.value; if (!scheduleEnabled.value) scheduleAt.value = '' }
function clearSchedule() { scheduleAt.value = '' }

// Mock current user
const currentUser = computed(() => ({
  id: authStore.user?.id || 1,
  name: authStore.user?.name || 'Current User',
  // remove username alias; use name only
  avatar: authStore.user?.avatar || ''
}))

// Fandom data from store
const fandom = ref({
  name: '',
  description: '',
  fullDescription: '',
  coverImage: '',
  logo: '',
  members: '0',
  onlineMembers: '0',
  totalPosts: '0',
  createdDate: '2024',
  rules: [],
  tags: [],
  hashtags: []
})

// Reflect membership/admin status immediately from in-memory record or store getters
const isAdmin = computed(() => {
  const local = fandomRecord.value?.role
  if (local === 'admin') return true
  return fandomsStore.isAdmin(fandomKey.value)
})
const isMember = computed(() => {
  const local = fandomRecord.value?.role
  if (local) return true
  return fandomsStore.isMember(fandomKey.value)
})
// Moderators have elevated permissions similar to admins for post management
const isModerator = computed(() => {
  const role = fandomRecord.value?.role || fandomsStore.getUserRole(fandomKey.value)
  return role === 'moderator'
})
const isModeratorOrAdmin = computed(() => isAdmin.value || isModerator.value)

// Media normalization
const baseOrigin = API_CONFIG.baseURL.replace(/\/?api\/?$/, '')
function normalizeAsset(path, fallback) {
  const val = normAsset(path)
  if (!val && fallback) return fallback
  // Use local fallback instead of external placeholder to avoid network/DNS issues
  if (!val) return 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
  return val
}
const normalizedCover = computed(() => normalizeAsset(fandom.value.coverImage))
const normalizedLogo = computed(() => normalizeAsset(fandom.value.logo || fandom.value.coverImage))

// Leave fandom custom modal flow
const showLeaveConfirm = ref(false)
const leaving = ref(false)
async function confirmLeaveFandom() {
  if (leaving.value || !fandomRecord.value?.id) return
  leaving.value = true
  try {
    const res = await fandomsStore.leaveFandomApi(fandomRecord.value.id, fandomName.value, currentUser.value.id)
    if (res?.success) {
      notify.info(t('fandom.detail.leftFandom'))
      showLeaveConfirm.value = false
      // Refresh local fandom stats (members count) without navigating away
      const updated = fandomsStore.allFandoms.find(f=>f.handle===fandomName.value)
      if (updated) {
        fandom.value.members = updated.membersCount ?? updated.members ?? fandom.value.members
      }
    } else if (res?.message) {
      notify.error(res.message)
    }
  } finally { leaving.value = false }
}
// Load fandom data from local store snapshot (handle based)
function loadFandomData() {
  fandom.value = fandomsStore.getFandomDetail(fandomKey.value)
}

// New remote loading logic
const membersLoading = ref(false)
const postsLoading = ref(false)
const fandomLoading = ref(false)
async function loadRemoteFandomData() {
  try {
    fandomLoading.value = true
  let record = await fandomsStore.fetchFandom(fandomIdForApi.value)
    // If we passed a handle and got null, try loading list then resolve id
    if (!record && !/^[0-9]+$/.test(String(fandomIdForApi.value))) {
      await fandomsStore.loadFromApi().catch(()=>{})
      record = await fandomsStore.fetchFandom(fandomIdForApi.value)
    }
    if (record) {
      resolvedFandomId.value = record.id
      fandom.value = {
        ...fandom.value,
        name: record.name,
        description: record.description || fandom.value.description,
        fullDescription: record.fullDescription || record.description || fandom.value.fullDescription,
        coverImage: record.coverImage || record.cover_image || fandom.value.coverImage,
        logo: record.logo || record.coverImage || fandom.value.logo,
        category: record.category || fandom.value.category,
        members: record.membersCount ?? fandom.value.members,
        totalPosts: record.postsCount ?? fandom.value.totalPosts,
        createdDate: record.createdAt || fandom.value.createdDate
      }
    }
  } finally {
    fandomLoading.value = false
  }
  membersLoading.value = true
  postsLoading.value = true
  await Promise.all([
  fandomsStore.fetchFandomMembers(fandomIdForApi.value).finally(() => { membersLoading.value = false }),
  fandomsStore.fetchFandomPosts(fandomIdForApi.value).finally(() => { postsLoading.value = false })
  ])
}

onMounted(async () => {
  loadFandomData()
  await loadRemoteFandomData()
})

const tabs = computed(() => {
  return fandomsStore.config.tabs.map(tab => {
    let count = ''
    if (tab.id === 'posts') count = posts.value.length.toString()
    else if (tab.id === 'members') count = fandom.value.members || '0'
    return { ...tab, count }
  })
})

const posts = computed(() => fandomsStore.getFandomPosts(fandomKey.value))
const computedHashtags = computed(() => {
  const raw = fandom.value?.hashtags ?? []
  if (Array.isArray(raw) && raw.length) {
    return raw.map(h => {
      if (typeof h === 'string') {
        const tag = h.replace(/^#/, '').trim(); return tag ? { tag, posts: '' } : null
      }
      if (h && typeof h === 'object') {
        const tag = String(h.tag ?? h.name ?? h.title ?? '').replace(/^#/, '').trim()
        const countLike = h.posts ?? h.count ?? h.uses ?? h.frequency
        const posts = countLike != null && String(countLike).trim() !== '' ? `${countLike}` : ''
        return tag ? { tag, posts } : null
      }
      return null
    }).filter(Boolean)
  }
  const counts = new Map()
  for (const p of posts.value || []) {
    if (!Array.isArray(p.tags)) continue
    for (const rawTag of p.tags) {
      const t = String(rawTag).replace(/^#/, '').trim()
      if (!t) continue
      counts.set(t, (counts.get(t) || 0) + 1)
    }
  }
  return Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([tag,count])=>({ tag, posts: `${count} posts` }))
})
const members = computed(() => fandomsStore.getFandomMembers(fandomKey.value))

const formattedCreated = computed(() => {
  const raw = fandom.value.createdDate || fandom.value.created_at || fandom.value.createdAt
  if (!raw) return '—'
  if (/^\d{4}$/.test(raw)) return raw
  let d
  try { d = new Date(raw) } catch { d = null }
  if (d && !isNaN(d.getTime())) {
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
  }
  const cleaned = String(raw).replace(/\.\d+Z$/, 'Z')
  try {
    const d2 = new Date(cleaned)
    if (!isNaN(d2.getTime())) return d2.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {}
  return raw
})

const joining = ref(false)
async function joinFandom() {
  if (joining.value) return
  joining.value = true
  try {
    const res = await fandomsStore.joinFandom(fandomIdForApi.value)
    if (res && res.success) {
      await Promise.all([
        fandomsStore.fetchFandom(fandomIdForApi.value),
        fandomsStore.fetchFandomMembers(fandomIdForApi.value)
      ])
      const updated = fandomsStore.getFandomDetail(fandomName.value)
      fandom.value.members = updated.members
      fandom.value.totalPosts = updated.totalPosts
    }
  if (res && res.message) notify.success(res.message)
  } finally {
    joining.value = false
  }
}

// Auto-resize textarea for mobile experience
const autoResize = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'
}

// Role options from store config
const roleOptions = fandomsStore.config.roleOptions
function addTag(){ const val=tagInput.value.trim().replace(/^#/,''); if(!val) return; if(!tags.value.includes(val)) tags.value.push(val); tagInput.value='' }
function removeTag(idx){ tags.value.splice(idx,1) }
function onFileChange(type,event){ const files=Array.from(event.target.files); files.forEach(file=>{ const reader=new FileReader(); reader.onload=e=>{ postMedia.value.push({ type, url:e.target.result, file })}; reader.readAsDataURL(file)}); if(event?.target) event.target.value='' }
function removeMedia(i){ postMedia.value.splice(i,1) }
async function createPost(){
  const text = newPostContent.value.trim()
  if(!text && postMedia.value.length===0) return
  const fid = fandomRecord.value?.id || resolvedFandomId.value
  if(!fid){ notify.error(t('common.fandomNotLoaded')); return }
  // Convert schedule to backend format YYYY-MM-DD HH:MM:SS
  let schedule_at_value = ''
  if (scheduleEnabled.value && scheduleAt.value) {
    try {
      const d = new Date(scheduleAt.value)
      if(!isNaN(d.getTime())) {
        const pad = n=> String(n).padStart(2,'0')
        schedule_at_value = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`
      }
    } catch {}
  }
  const mediasFiles = postMedia.value.map(m=> m.file).filter(Boolean)
  const res = await fandomsStore.createFandomPostApi(fid, fandomKey.value, {
    description: text,
    content_status: 'published',
    schedule_at: schedule_at_value || undefined,
    tags: [...tags.value],
    medias: mediasFiles
  })
  if(res?.success){
    notify.success(res.message || t('common.postCreated'))
  } else if(res?.message){
    notify.error(res.message)
  }
  newPostContent.value=''
  postMedia.value=[]
  tags.value=[]
  tagInput.value=''
}
const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    if (a.isAnnouncement && !b.isAnnouncement) return -1
    if (!a.isAnnouncement && b.isAnnouncement) return 1
    return new Date(b.date) - new Date(a.date)
  })
})
// addMember removed
async function changeMemberRole(memberId,newRole){
  // Only admins can change roles
  if(!isAdmin.value) return
  if(!['member','moderator','admin'].includes(newRole)) return // enforce only allowed roles
  const fid = fandomRecord.value?.id || fandomIdForApi.value
  const res = await fandomsStore.updateMemberRoleApi(fid, memberId, newRole, fandomKey.value)
  if (res?.success) notify.success(t('fandom.detail.roleUpdated'))
  else if (res?.message) notify.error(res.message)
}
const showRemoveMember = ref(false)
const removingMember = ref(false)
const pendingRemoveMemberId = ref(null)
function removeMember(memberId){ pendingRemoveMemberId.value = memberId; showRemoveMember.value = true }
async function confirmRemoveMember(){
  if(!pendingRemoveMemberId.value || removingMember.value) return
  removingMember.value = true
  try {
    const fid = fandomRecord.value?.id || resolvedFandomId.value || fandomIdForApi.value
    const handle = fandomKey.value
    // Optimistic update: remove locally first
    const prevMembers = [...(fandomsStore.fandomMembers[handle] || [])]
    fandomsStore.removeFandomMember(handle, pendingRemoveMemberId.value)
    const res = await fandomsStore.removeMemberApi(fid, handle, pendingRemoveMemberId.value)
    if (res?.success) {
      notify.success(res.message || t('fandom.detail.memberRemoved', 'Member removed'))
    } else if (res?.message) {
      // Revert on failure
      fandomsStore.fandomMembers[handle] = prevMembers
      notify.error(res.message)
    } else if (res?.success === false) {
      fandomsStore.fandomMembers[handle] = prevMembers
      notify.error(t('fandom.detail.removeFailed', 'Failed to remove member'))
    }
  } finally {
    removingMember.value = false
    showRemoveMember.value = false
    pendingRemoveMemberId.value = null
  }
}
function cancelRemoveMember(){ pendingRemoveMemberId.value = null }
const filteredMembers = computed(()=> fandomsStore.searchFandomMembers(fandomKey.value, memberSearch.value))
function likePost(postId){ fandomsStore.likeFandomPost(fandomKey.value,postId) }
function commentPost(postId){ console.log('Comment on post:', postId) }
const showDeletePost = ref(false)
const deletingPost = ref(false)
const pendingDeletePostId = ref(null)
function deletePost(postId){ pendingDeletePostId.value = postId; showDeletePost.value = true }
async function confirmDeletePost(){
  if(!pendingDeletePostId.value || deletingPost.value) return
  deletingPost.value = true
  try {
    const fid = fandomRecord.value?.id || resolvedFandomId.value
    // Optimistic remove
    const handle = fandomKey.value
    const previous = [...(fandomsStore.fandomPosts[handle] || [])]
    fandomsStore.deleteFandomPost(handle, pendingDeletePostId.value)
    const res = await fandomsStore.deleteFandomPostApi(fid, handle, pendingDeletePostId.value)
    if(res?.success) {
      notify.info(t('common.postDeleted'))
    } else if(res?.message) {
      // Revert on failure
      fandomsStore.fandomPosts[handle] = previous
      notify.error(res.message)
    } else if(res?.success === false) {
      fandomsStore.fandomPosts[handle] = previous
      notify.error(t('common.failedToDeletePost'))
    }
  } finally {
    deletingPost.value = false
    showDeletePost.value = false
    pendingDeletePostId.value = null
  }
}
function cancelDeletePost(){ pendingDeletePostId.value = null }
// --- Fandom Post Edit (limited to media + tags + description) ---
const showEditPostModal = ref(false)
const editingPost = ref(null)
// Determine if current user can edit/delete a post
function canModifyPost(post){
  if(!post) return false
  if(isModeratorOrAdmin.value) return true
  // Prefer userId equality for ownership
  if (post.userId && authStore.user?.id) return String(post.userId) === String(authStore.user.id)
  // Fallback: compare displayName to current name (case-insensitive)
  const currentName = (currentUser.value.name || '').toLowerCase()
  const postName = (post.displayName || post.username || '').toLowerCase()
  return currentName && postName && currentName === postName
}
function openEditPost(postId){
  const collection = fandomsStore.fandomPosts[fandomKey.value] || []
  const target = collection.find(p => p.id === postId)
  if(!target || !canModifyPost(target)) return
  editingPost.value = { ...target }
  showEditPostModal.value = true
}
async function submitFandomEdit(payload){
  if(!editingPost.value) return
  const fid = fandomRecord.value?.id || resolvedFandomId.value
  if(!fid){ notify.error(t('common.fandomNotLoaded')); return }
  const postId = editingPost.value.id
  // First update text + tags
  const res = await fandomsStore.updateFandomPostApi(fid, fandomKey.value, postId, { description: payload.description, content_status: 'published', tags: payload.tags })
  if(res?.success === false){ if(res?.message) notify.error(res.message); return }
  // If new media files added, attempt multipart update (backend must support). We'll try PUT with FormData.
  if(Array.isArray(payload.medias) && payload.medias.length){
    try {
      const form = new FormData()
      form.append('content_status','published')
      if(payload.description) form.append('description', payload.description)
      ;(payload.tags||[]).forEach(t=> form.append('tags[]', t))
      payload.medias.forEach(f=> form.append('medias[]', f))
      // Use fetch directly to avoid axios config duplication; API_CONFIG.baseURL already includes /api
      await fetch(API_CONFIG.baseURL + API_CONFIG.fandoms.updatePost(fid, postId), {
        method: 'POST', // fallback if PUT multipart not accepted
        body: form
      }).catch(()=>{})
      fandomsStore.fetchFandomPosts(fid)
    } catch(e){ console.error('Fandom media update failed', e) }
  }
  notify.success(t('common.postUpdated'))
  showEditPostModal.value = false
  editingPost.value = null
}
// (Removed earlier simple saveFandomChanges & initializeEditData; advanced versions defined later with API update logic)
// Admin update logic additions
const updatingFandom = ref(false)
const updateError = ref('')
const updateSuccess = ref(false)
const coverFile = ref(null)
const logoFile = ref(null)
const coverPreview = ref('')
const logoPreview = ref('')
function onCoverFileChange(e){
  const file = e.target.files && e.target.files[0]
  coverFile.value = file || null
  coverPreview.value = file ? URL.createObjectURL(file) : ''
}
function onLogoFileChange(e){
  const file = e.target.files && e.target.files[0]
  logoFile.value = file || null
  logoPreview.value = file ? URL.createObjectURL(file) : ''
}
async function saveFandomChanges(){
  if(!isAdmin.value) { showEditFandom.value=false; return }
  updateError.value=''
  updateSuccess.value=false
  const id = fandomRecord.value?.id || resolvedFandomId.value
  if(!id){ updateError.value=t('fandom.detail.edit.idNotResolved'); return }
  const payload = {}
  if(editFandom.value.name && editFandom.value.name !== fandom.value.name) payload.name = editFandom.value.name
  if(editFandom.value.description && editFandom.value.description !== fandom.value.description) payload.description = editFandom.value.description
  if(coverFile.value) payload.cover_image = coverFile.value
  if(logoFile.value) payload.logo_image = logoFile.value
  if(Object.keys(payload).length===0){ updateError.value=t('fandom.detail.edit.noChanges'); return }
  try {
    updatingFandom.value = true
    const res = await fandomsStore.updateFandomApi(id, payload)
    if(res?.success || res?.fandom || res?.data?.fandom){
      updateSuccess.value = true
      // Refresh local view
      await fandomsStore.fetchFandom(id)
      loadFandomData()
      fandom.value.coverImage = fandomsStore.allFandoms.find(f=>f.id===id)?.coverImage || fandom.value.coverImage
      fandom.value.logo = fandomsStore.allFandoms.find(f=>f.id===id)?.logo || fandom.value.logo
      setTimeout(()=>{ showEditFandom.value=false; updateSuccess.value=false }, 1200)
    } else {
      updateError.value = res?.message || t('fandom.detail.edit.updateFailed')
    }
  } catch(e){
    updateError.value = e?.message || t('fandom.detail.edit.updateError')
  } finally {
    updatingFandom.value = false
  }
}
function initializeEditData(){
  editFandom.value = { name: fandom.value.name, description: fandom.value.description, coverImage: fandom.value.coverImage, logo: fandom.value.logo }
  coverFile.value=null; logoFile.value=null; coverPreview.value=''; logoPreview.value=''; updateError.value=''; updateSuccess.value=false
}
watch(showEditFandom,v=>{ if(v) initializeEditData() })
watch(()=>fandomKey.value, async (n,o)=>{ if(n && n!==o){ loadFandomData(); await loadRemoteFandomData() } })

const isMobile = ref(false)
const isTablet = ref(false)
function updateBreakpoints(){ const w=window.innerWidth; isMobile.value = w < 640; isTablet.value = w >=640 && w < 1024 }
onMounted(()=>{ updateBreakpoints(); window.addEventListener('resize', updateBreakpoints) })
onBeforeUnmount(()=>{ window.removeEventListener('resize', updateBreakpoints) })

function navigateToHashtag(hashtag){ router.push(`/hashtag/${hashtag}`) }

// Format ISO/DB datetime (e.g., 2025-08-31T22:05:49.000000Z) into "31 Aug 2025" (local)
function formatJoined(value){
  if(!value) return '—'
  // Already friendly? (short forms like 'Today', 'Jan 2024')
  if(/today|\b\w{3}\s?\d{4}/i.test(value)) return value
  let date
  try { date = new Date(value) } catch { date = null }
  if(!date || isNaN(date.getTime())) {
    // Try trimming microseconds
    const trimmed = value.replace(/\.\d+Z$/, 'Z')
    try { date = new Date(trimmed) } catch { date = null }
  }
  if(date && !isNaN(date.getTime())) {
    return date.toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric' })
  }
  return value
}

// Navigate to account page for clicked member
function goToUser(member){
  if(!member) return
  const current = authStore.user
  if (member.id && current && String(member.id) === String(current.id)) {
    const selfName = (current?.userName || current?.userEmail?.split('@')[0])
    if (selfName) {
      router.push({ name: 'Account', params: { user: selfName } })
      return
    }
  }
  if(member.id){
    router.push({ name: 'Account', params: { user: String(member.id) } })
    return
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Mobile-friendly touch targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

/* Responsive spacing utilities */
.pl-13 {
  padding-left: 3.25rem;
}

@media (min-width: 640px) {
  .sm\:pl-16 {
    padding-left: 4rem;
  }
}

/* Hide scrollbar for Webkit browsers */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Smooth scrolling for overflow elements */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Ensure good touch targets on mobile */
@media (max-width: 640px) {
  button, .touch-target, a {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>