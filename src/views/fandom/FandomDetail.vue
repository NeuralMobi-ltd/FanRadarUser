<template>
  <!-- MOBILE PATCH: You can move/duplicate blocks inside these wrappers -->
  <!-- MOBILE-ONLY header placeholder (show back button, title, actions) -->
  <div class="sm:hidden sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-4xl mx-auto px-3 py-2 flex items-center justify-between">
      <!-- TODO: Replace with your back navigation -->
      <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200" @click="$router.back()">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="text-sm font-semibold text-gray-900 dark:text-white truncate">
        <!-- TODO: Bind fandom name here -->
        {{ fandom?.name || 'Fandom' }}
      </div>
      <div class="flex items-center gap-2">
        <!-- TODO: Add quick actions (follow, share, menu) -->
      </div>
    </div>
  </div>

  <!-- Use these helpers to hide sidebars on phones, keep desktop layout intact -->
  <!-- Example markers (wrap your existing sections accordingly) -->
  <!-- MOBILE PATCH START: Hide left sidebar on phones -->
  <!-- <aside class="hidden md:block"> ... </aside> -->
  <!-- MOBILE PATCH END -->

  <!-- MOBILE PATCH START: Turn tab bar into horizontal chips on phones -->
  <!-- <div class="sm:hidden overflow-x-auto no-scrollbar -mx-3 px-3 py-2"> ... </div> -->
  <!-- MOBILE PATCH END -->

  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-2 sm:pt-4">
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
            <span>Fandom</span>
          </div>
          <div class="flex items-center text-xs sm:text-sm">
            <span>{{ fandom.members }} members</span>
            <span class="mx-1 sm:mx-2">•</span>
            <span>{{ fandom.onlineMembers }} online</span>
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
          <span class="font-medium text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">Admin Panel</span>
        </div>
        <div class="grid grid-cols-2 sm:flex gap-2 sm:gap-2">
          <button @click="showEditFandom = true" class="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
            <i class="fas fa-edit mr-1 sm:mr-2"></i><span class="hidden sm:inline">Edit </span>Fandom
          </button>
          <button @click="showManageMembers = true" class="px-2 py-1.5 sm:px-3 sm:py-2 bg-green-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition-colors">
            <i class="fas fa-users mr-1 sm:mr-2"></i><span class="hidden sm:inline">Manage </span>Members
          </button>
        </div>
      </div>
    </div>

    <!-- Visitor Actions (Only visible to non-members or non-admins) -->
    <div v-if="!isMember" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Join {{ fandom.name }}</h3>
          <p class="text-sm sm:text-base text-blue-700 dark:text-blue-300">Connect with {{ fandom.members }} passionate fans and never miss an update!</p>
        </div>
        <button 
          @click="joinFandom"
          :disabled="joining"
          class="w-full sm:w-auto px-6 py-3 bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <i v-if="!joining" class="fas fa-plus"></i>
          <i v-else class="fas fa-spinner fa-spin"></i>
          <span v-if="!joining">Join Fandom</span>
          <span v-else>Joining...</span>
        </button>
      </div>
    </div>

    <!-- Member Welcome (Only visible to members who are not admins) -->
    <div v-if="isMember && !isAdmin" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div class="flex items-center">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
          <i class="fas fa-check text-green-600 text-sm sm:text-base"></i>
        </div>
        <span class="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">You're a member of this fandom!</span>
      </div>
  <button @click="showLeaveConfirm = true" class="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">Leave Fandom</button>
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
          {{ tab.label }}
          <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
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
            {{ tab.label }}
            <span class="ml-2 px-1.5 py-0.5 text-xs bg-white/70 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-200" v-if="tab.count">{{ tab.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="space-y-4 sm:space-y-6">
      <!-- Create Post (match Home.vue design) -->
      <div v-if="isMember" class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200">
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
          @like="likePost"
          @comment="commentPost"
          @delete="deletePost"
          :can-delete="isAdmin || post.username === currentUser.name"
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
            <img :src="normalizeAsset(member.avatar, '/images/me.png')" :alt="member.name" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4">
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{{ member.name }}</h3>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">@{{ member.username }}</p>
            </div>
            <div class="flex items-center">
              <span v-if="member.role === 'admin'" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-2">
                <i class="fas fa-crown mr-1"></i>Admin
              </span>
              <!-- Moderator badge removed per requirement (only admin/member roles supported) -->
              <span v-else class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                <i class="fas fa-user mr-1"></i>Member
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
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <button @click="removeMember(member.id)" class="text-red-500 hover:text-red-700 text-xs">
                <i class="fas fa-trash mr-1"></i>Remove
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4">
            <span>{{ member.posts }} posts</span>
            <span>Joined {{ formatJoined(member.joinedDate) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'about'" class="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
      <div class="space-y-6 sm:space-y-8">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">About {{ fandom.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{{ fandom.fullDescription }}</p>
        </div>
        
        <div>
          <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">Fandom Rules</h4>
          <ul class="space-y-2">
            <li v-for="rule in fandom.rules" :key="rule" class="flex items-start">
              <i class="fas fa-check-circle text-green-500 mt-1 mr-3 text-sm"></i>
              <span class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{{ rule }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">Tags</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in fandom.tags" :key="tag" class="px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">Statistics</h4>
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-xl sm:text-2xl font-bold text-blue-600">{{ fandom.members }}</div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Members</div>
            </div>
            <div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-xl sm:text-2xl font-bold text-green-600">{{ fandom.totalPosts }}</div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-xl sm:text-2xl font-bold text-purple-600">{{ fandom.onlineMembers }}</div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Online</div>
            </div>
            <div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-xl sm:text-2xl font-bold text-orange-600">{{ formattedCreated }}</div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Created</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Fandom Modal (Admin Only) -->
    <div v-if="showEditFandom && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Fandom</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fandom Name</label>
            <input v-model="editFandom.name" type="text" class="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea v-model="editFandom.description" rows="3" class="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showEditFandom = false" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
          <button @click="saveFandomChanges" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
        </div>
      </div>
    </div>

  <!-- Manage Members Modal (Admin Only) -->
    <div v-if="showManageMembers && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Manage Members</h3>
        
        <!-- Member Search -->
        <div class="mb-4">
          <input 
            v-model="memberSearch" 
            type="text" 
            placeholder="Search members..." 
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
                <p class="text-sm text-gray-500 dark:text-gray-400">@{{ member.username }}</p>
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
          <button @click="showManageMembers = false" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Close</button>
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
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-snug">Leave {{ fandom.name || 'this fandom' }}?</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              You'll lose member-only access (posts, future announcements). You can rejoin later unless membership becomes restricted.
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 mb-5 flex items-start gap-2">
          <i class="fas fa-info-circle mt-0.5"></i>
          <span>Your existing posts remain unless you delete them individually.</span>
        </div>
        <div class="flex flex-col sm:flex-row-reverse gap-3">
          <button @click="confirmLeaveFandom" :disabled="leaving" class="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
            <i v-if="!leaving" class="fas fa-door-open"></i>
            <i v-else class="fas fa-spinner fa-spin"></i>
            <span>{{ leaving ? 'Leaving...' : 'Leave Fandom' }}</span>
          </button>
          <button @click="showLeaveConfirm = false" :disabled="leaving" class="px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Generic Confirm Modals -->
  <ConfirmModal
    v-model="showRemoveMember"
    tone="danger"
    title="Remove member?"
    :message="'This will remove the user from the fandom.'"
    confirm-text="Remove"
    loading-text="Removing..."
    :loading="removingMember"
    confirm-icon="fas fa-user-minus"
    icon="fas fa-user-slash"
    @confirm="confirmRemoveMember"
    @cancel="cancelRemoveMember"
  />
  <ConfirmModal
    v-model="showDeletePost"
    tone="danger"
    title="Delete post?"
    :message="'This action cannot be undone.'"
    confirm-text="Delete"
    loading-text="Deleting..."
    :loading="deletingPost"
    confirm-icon="fas fa-trash"
    icon="fas fa-trash"
    @confirm="confirmDeletePost"
    @cancel="cancelDeletePost"
  />
</template>

<script setup>
import Post from '@/components/common/Post.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { notify } from '@/utils/notify'
import { useAuthStore } from '@/store/auth'
import { useFandomsStore } from '@/store/fandoms'
import { computed, onMounted, ref, watch } from 'vue'
import API_CONFIG from '@/config/api'
import { normalizeAsset as normAsset } from '@/utils/assets'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const fandomsStore = useFandomsStore()
const fandomName = computed(() => route.params.name || '')
// Map handle to stored fandom to retrieve numeric id for backend endpoints
const fandomRecord = computed(() => fandomsStore.allFandoms.find(f => f.handle === fandomName.value))
const fandomIdForApi = computed(() => fandomRecord.value?.id || fandomName.value)
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
  username: authStore.user?.email?.split('@')[0] || 'user',
  avatar: authStore.user?.avatar || '/public/images/me.png'
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
  return fandomsStore.isAdmin(fandomName.value)
})
const isMember = computed(() => {
  const local = fandomRecord.value?.role
  if (local) return true
  return fandomsStore.isMember(fandomName.value)
})

// Media normalization
const baseOrigin = API_CONFIG.baseURL.replace(/\/?api\/?$/, '')
function normalizeAsset(path, fallback) {
  const val = normAsset(path)
  if (!val && fallback) return fallback
  if (!val) return 'https://via.placeholder.com/1200x400?text=Fandom'
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
      notify.info('You left the fandom')
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

function loadFandomData() {
  fandom.value = fandomsStore.getFandomDetail(fandomName.value)
}

// New remote loading logic
const membersLoading = ref(false)
const postsLoading = ref(false)
const fandomLoading = ref(false)
async function loadRemoteFandomData() {
  try {
    fandomLoading.value = true
  const record = await fandomsStore.fetchFandom(fandomIdForApi.value)
    if (record) {
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

const posts = computed(() => fandomsStore.getFandomPosts(fandomName.value))
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
const members = computed(() => fandomsStore.getFandomMembers(fandomName.value))

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
function createPost(){ if(newPostContent.value.trim()||postMedia.value.length>0){ const newPost={ id:Date.now(), username:currentUser.value.name, userAvatar:currentUser.value.avatar, date:'just now', communityName:fandom.value.name, content:newPostContent.value, media:postMedia.value.map(m=>({ type:m.type, url:m.url })), tags:[...tags.value], likes:0, comments:0, shares:0, isLiked:false, fandom:fandom.value.name, isPinned:false, isAnnouncement:false, authorRole:isAdmin.value?fandomsStore.config.memberRoles.ADMIN:fandomsStore.config.memberRoles.MEMBER, category: fandom.value.category?fandom.value.category:'sports', schedule_at: scheduleEnabled.value && scheduleAt.value ? (()=>{ try{return new Date(scheduleAt.value).toISOString()}catch{return null}})():null }; fandomsStore.addFandomPost(fandomName.value,newPost); newPostContent.value=''; postMedia.value=[]; tags.value=[]; tagInput.value='' }}
const postsSorted = computed(() => {
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
  if(!['member','admin'].includes(newRole)) return // enforce only allowed roles
  const fid = fandomRecord.value?.id || fandomIdForApi.value
  const res = await fandomsStore.updateMemberRoleApi(fid, memberId, newRole, fandomName.value)
  if (res?.success) notify.success('Role updated')
  else if (res?.message) notify.error(res.message)
}
const showRemoveMember = ref(false)
const removingMember = ref(false)
const pendingRemoveMemberId = ref(null)
function removeMember(memberId){ pendingRemoveMemberId.value = memberId; showRemoveMember.value = true }
async function confirmRemoveMember(){
  if(!pendingRemoveMemberId.value || removingMember.value) return
  removingMember.value = true
  try { fandomsStore.removeFandomMember(fandomName.value, pendingRemoveMemberId.value) } finally {
    removingMember.value = false
    showRemoveMember.value = false
    pendingRemoveMemberId.value = null
  }
}
function cancelRemoveMember(){ pendingRemoveMemberId.value = null }
const filteredMembers = computed(()=> fandomsStore.searchFandomMembers(fandomName.value, memberSearch.value))
function likePost(postId){ fandomsStore.likeFandomPost(fandomName.value,postId) }
function commentPost(postId){ console.log('Comment on post:', postId) }
const showDeletePost = ref(false)
const deletingPost = ref(false)
const pendingDeletePostId = ref(null)
function deletePost(postId){ pendingDeletePostId.value = postId; showDeletePost.value = true }
async function confirmDeletePost(){
  if(!pendingDeletePostId.value || deletingPost.value) return
  deletingPost.value = true
  try { fandomsStore.deleteFandomPost(fandomName.value, pendingDeletePostId.value) } finally {
    deletingPost.value = false
    showDeletePost.value = false
    pendingDeletePostId.value = null
  }
}
function cancelDeletePost(){ pendingDeletePostId.value = null }
function saveFandomChanges(){ fandom.value.name=editFandom.value.name; fandom.value.description=editFandom.value.description; showEditFandom.value=false }
function initializeEditData(){ editFandom.value={...fandom.value} }
watch(showEditFandom,v=>{ if(v) initializeEditData() })
watch(()=>fandomName.value, async (n,o)=>{ if(n && n!==o){ loadFandomData(); await loadRemoteFandomData() } })

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