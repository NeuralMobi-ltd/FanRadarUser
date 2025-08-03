<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Fandom Header -->
    <div class="relative mb-8">
      <!-- Cover Image -->
      <div class="h-64 w-full rounded-xl overflow-hidden">
        <img 
          :src="fandom.coverImage" 
          :alt="fandom.name" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Fandom Avatar/Logo -->
      <div class="absolute bottom-0 right-0 m-6">
        <img 
          :src="fandom.logo" 
          :alt="fandom.name" 
          class="w-20 h-20 rounded-xl border-4 border-white shadow-lg" 
        />
      </div>
      
      <!-- Fandom Info -->
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center mb-2">
          <div class="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium mr-3 flex items-center gap-2">
            <span>Fandom</span>
          </div>
          <div class="flex items-center text-sm">
            <span>{{ fandom.members }} members</span>
            <span class="mx-2">•</span>
            <span>{{ fandom.onlineMembers }} online</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">{{ fandom.name }}</h1>
        <p class="text-white/90 max-w-xl">{{ fandom.description }}</p>
      </div>
    </div>

    <!-- Admin Controls (Only visible to admins) -->
    <div v-if="isAdmin" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-crown text-yellow-600"></i>
          </div>
          <span class="font-medium text-yellow-800 dark:text-yellow-200">Admin Panel</span>
        </div>
        <div class="flex gap-2">
          <button @click="showEditFandom = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <i class="fas fa-edit mr-2"></i>Edit Fandom
          </button>
          <button @click="showManageMembers = true" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <i class="fas fa-users mr-2"></i>Manage Members
          </button>
          <button @click="showEditRules = true" class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            <i class="fas fa-gavel mr-2"></i>Edit Rules
          </button>
          <button @click="showEditHashtags = true" class="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
            <i class="fas fa-hashtag mr-2"></i>Edit Hashtags
          </button>
        </div>
      </div>
    </div>

    <!-- Visitor Actions (Only visible to non-members or non-admins) -->
    <div v-if="!isMember" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Join {{ fandom.name }}</h3>
          <p class="text-blue-700 dark:text-blue-300">Connect with {{ fandom.members }} passionate fans and never miss an update!</p>
        </div>
        <button 
          @click="joinFandom"
          class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i class="fas fa-plus"></i>
          Join Fandom
        </button>
      </div>
    </div>

    <!-- Member Welcome (Only visible to members who are not admins) -->
    <div v-if="isMember && !isAdmin" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 mb-6">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
          <i class="fas fa-check text-green-600"></i>
        </div>
        <span class="font-medium text-green-800 dark:text-green-200">You're a member of this fandom!</span>
      </div>
    </div>

    <!-- Fandom Hashtags Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <i class="fas fa-hashtag text-blue-500 mr-2"></i>
          Trending Hashtags
        </h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ fandom.hashtags?.length || 0 }} hashtags</span>
      </div>
      <div v-if="fandom.hashtags && fandom.hashtags.length > 0" class="flex flex-wrap gap-2">
        <button
          v-for="hashtag in fandom.hashtags"
          :key="hashtag.tag"
          @click="navigateToHashtag(hashtag.tag)"
          class="group px-3 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700 transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center space-x-2">
            <span class="text-blue-600 dark:text-blue-400 font-medium">#{{ hashtag.tag }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ hashtag.posts }}</span>
          </div>
        </button>
      </div>
      <div v-else class="text-center py-4">
        <i class="fas fa-hashtag text-gray-300 dark:text-gray-600 text-2xl mb-2"></i>
        <p class="text-gray-500 dark:text-gray-400 text-sm">No hashtags yet</p>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div class="flex gap-8">
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
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="space-y-6">
      <!-- Create Post (For members and admins with enhanced features for admins) -->
      <div v-if="isMember" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-start space-x-3">
          <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" :alt="currentUser.name">
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              :placeholder="isAdmin ? 'Share an announcement or post with the fandom...' : 'Share something with the fandom...'"
              class="w-full resize-none border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            
            <!-- Media Upload Section -->
            <div class="mt-3 space-y-3">
              <!-- Media Preview -->
              <div v-if="postMedia.length > 0" class="grid grid-cols-2 gap-3">
                <div v-for="(media, index) in postMedia" :key="index" class="relative">
                  <img v-if="media.type === 'image'" :src="media.url" class="w-full h-32 object-cover rounded-lg" />
                  <video v-else :src="media.url" controls class="w-full h-32 object-cover rounded-lg"></video>
                  <button @click="removeMedia(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              
              <!-- Media Upload Controls -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Image Upload -->
                  <label class="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                    <i class="fas fa-image mr-1"></i>
                    <span class="text-sm">Image</span>
                    <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
                  </label>
                  
                  <!-- Video Upload -->
                  <label class="text-purple-500 hover:text-purple-600 transition-colors cursor-pointer">
                    <i class="fas fa-video mr-1"></i>
                    <span class="text-sm">Video</span>
                    <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
                  </label>
                  
                  <!-- Admin-only: Pin Post -->
                  <div v-if="isAdmin" class="flex items-center">
                    <input type="checkbox" v-model="isPinned" id="pinPost" class="mr-2">
                    <label for="pinPost" class="text-sm text-gray-600 dark:text-gray-400">Pin Post</label>
                  </div>
                  
                  <!-- Admin-only: Announcement -->
                  <div v-if="isAdmin" class="flex items-center">
                    <input type="checkbox" v-model="isAnnouncement" id="announcement" class="mr-2">
                    <label for="announcement" class="text-sm text-gray-600 dark:text-gray-400">Announcement</label>
                  </div>
                </div>
                
                <button
                  @click="createPost"
                  :disabled="!newPostContent.trim() && postMedia.length === 0"
                  :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    isAnnouncement ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
                    (!newPostContent.trim() && postMedia.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  {{ isAnnouncement ? 'Post Announcement' : 'Post' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts List -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Post
          v-for="post in sortedPosts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="commentPost"
          @share="sharePost"
          @delete="deletePost"
          :can-delete="isAdmin || post.username === currentUser.name"
          class="w-full mb-0"
        />
      </div>
    </div>

    <!-- Members Tab with Admin Controls -->
    <div v-else-if="activeTab === 'members'" class="space-y-6">
      <!-- Add Member (Admin Only) -->
      <div v-if="isAdmin" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Member</h3>
        <div class="flex items-center space-x-3">
          <input
            v-model="newMemberEmail"
            type="email"
            placeholder="Enter member's email"
            class="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select v-model="newMemberRole" class="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="member">Member</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
          <button @click="addMember" class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Add Member
          </button>
        </div>
      </div>

      <!-- Members Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="member in members" :key="member.id" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <img :src="member.avatar" :alt="member.name" class="w-12 h-12 rounded-full mr-4">
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 dark:text-white">{{ member.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">@{{ member.username }}</p>
            </div>
            <div class="flex items-center">
              <span v-if="member.role === 'admin'" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-2">
                <i class="fas fa-crown mr-1"></i>Admin
              </span>
              <span v-else-if="member.role === 'moderator'" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">
                <i class="fas fa-shield mr-1"></i>Mod
              </span>
              <span v-else class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                <i class="fas fa-user mr-1"></i>Member
              </span>
            </div>
          </div>
          
          <!-- Admin Controls for Members -->
          <div v-if="isAdmin && member.id !== currentUser.id" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-between">
              <select 
                :value="member.role" 
                @change="changeMemberRole(member.id, $event.target.value)"
                class="text-xs px-2 py-1 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="member">Member</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
              <button @click="removeMember(member.id)" class="text-red-500 hover:text-red-700 text-xs">
                <i class="fas fa-trash mr-1"></i>Remove
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
            <span>{{ member.posts }} posts</span>
            <span>Joined {{ member.joinedDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'about'" class="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About {{ fandom.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ fandom.fullDescription }}</p>
        </div>
        
        <div>
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Fandom Rules</h4>
          <ul class="space-y-2">
            <li v-for="rule in fandom.rules" :key="rule" class="flex items-start">
              <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
              <span class="text-gray-600 dark:text-gray-300">{{ rule }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Tags</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in fandom.tags" :key="tag" class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              #{{ tag }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Statistics</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ fandom.members }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Members</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ fandom.totalPosts }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ fandom.onlineMembers }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Online</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-orange-600">{{ fandom.createdDate }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Created</div>
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

    <!-- Edit Rules Modal (Admin Only) -->
    <div v-if="showEditRules && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Fandom Rules</h3>
        <div class="space-y-3">
          <div v-for="(rule, index) in editRules" :key="index" class="flex items-center space-x-3">
            <input 
              v-model="editRules[index]" 
              type="text" 
              class="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              :placeholder="`Rule ${index + 1}`"
            />
            <button @click="removeRule(index)" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <button @click="addRule" class="text-blue-500 hover:text-blue-700 text-sm">
            <i class="fas fa-plus mr-1"></i>Add Rule
          </button>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showEditRules = false" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
          <button @click="saveRulesChanges" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Save Rules</button>
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
                <option value="member">Member</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
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

    <!-- Edit Hashtags Modal (Admin Only) -->
    <div v-if="showEditHashtags && isAdmin" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Fandom Hashtags</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add New Hashtag</label>
            <div class="flex items-center space-x-3">
              <div class="relative flex-1">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">#</span>
                <input 
                  v-model="newHashtagTag" 
                  type="text" 
                  placeholder="hashtag"
                  class="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <input 
                v-model="newHashtagPosts" 
                type="text" 
                placeholder="posts count"
                class="w-24 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button @click="addHashtag" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          
          <div class="space-y-3 max-h-60 overflow-y-auto">
            <div v-for="(hashtag, index) in editHashtags" :key="index" class="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div class="flex-1 flex items-center space-x-3">
                <div class="relative flex-1">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">#</span>
                  <input 
                    v-model="editHashtags[index].tag" 
                    type="text" 
                    class="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <input 
                  v-model="editHashtags[index].posts" 
                  type="text" 
                  class="w-24 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button @click="removeHashtag(index)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showEditHashtags = false" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
          <button @click="saveHashtagsChanges" class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">Save Hashtags</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useFandomsStore } from '@/store/fandoms'
import Post from '@/components/community/Post/Post.vue'

const route = useRoute()
const authStore = useAuthStore()
const fandomsStore = useFandomsStore()
const fandomName = computed(() => route.params.name || '')
const activeTab = ref('posts')
const newPostContent = ref('')

// Modal reactive variables
const showEditFandom = ref(false)
const showEditRules = ref(false)
const showManageMembers = ref(false)
const showEditHashtags = ref(false)
const postMedia = ref([])
const isPinned = ref(false)
const isAnnouncement = ref(false)
const newMemberEmail = ref('')
const newMemberRole = ref('member')
const memberSearch = ref('')
const newHashtagTag = ref('')
const newHashtagPosts = ref('')
const editFandom = ref({})
const editRules = ref([])
const editHashtags = ref([])

// Mock current user
const currentUser = computed(() => ({
  id: authStore.user?.id || 1,
  name: authStore.user?.name || 'Current User',
  username: authStore.user?.email?.split('@')[0] || 'user',
  avatar: authStore.user?.avatar || '/public/images/me.png'
}))

// Mock fandom data
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

// User relationship with fandom - check from store
const isAdmin = computed(() => {
  return fandomsStore.isAdmin(fandomName.value)
})

const isMember = computed(() => {
  return fandomsStore.isMember(fandomName.value)
})

// Initialize based on fandom name and user
onMounted(() => {
  loadFandomData()
})

const loadFandomData = () => {
  // Mock fandom data based on name
  const fandomsData = {
    'premier-league-fans': {
      name: 'Premier League Fans',
      description: 'The ultimate community for Premier League football fans. Match discussions, transfer news, and more!',
      fullDescription: 'Welcome to the most passionate Premier League community on FanRadar! Here we discuss everything from match predictions to transfer rumors, tactical analysis to player performances. Whether you support Manchester United, Liverpool, Arsenal, Chelsea, or any other Premier League club, you\'ll find your tribe here. Join us for live match threads, post-match analysis, and heated but respectful debates about the beautiful game.',
      coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=400&fit=crop',
      logo: 'https://logo.clearbit.com/premierleague.com',
      members: '234K',
      onlineMembers: '5.2K',
      totalPosts: '45.7K',
      createdDate: '2019',
      rules: [
        'Keep discussions respectful and civil',
        'No spam or self-promotion without permission',
        'Stay on topic - Premier League related content only',
        'No hate speech or discrimination',
        'Use spoiler tags for recent match results'
      ],
      tags: ['football', 'premierleague', 'soccer', 'EPL', 'manchester-united', 'liverpool', 'arsenal', 'chelsea'],
      hashtags: [
        { tag: 'PremierLeague', posts: '45.2K' },
        { tag: 'Football', posts: '128K' },
        { tag: 'Soccer', posts: '89.5K' },
        { tag: 'EPL', posts: '23.8K' },
        { tag: 'MatchDay', posts: '67.3K' },
        { tag: 'Transfer', posts: '34.1K' }
      ]
    },
    'anime-manga': {
      name: 'Anime & Manga',
      description: 'All things anime and manga - discussions, fan art, and more',
      fullDescription: 'Dive into the wonderful world of anime and manga with fellow otakus! From the latest seasonal anime to timeless classics, from mainstream hits to hidden gems, we cover it all. Share your reviews, fan art, theories, and recommendations. Whether you\'re into shonen, seinen, shoujo, josei, or any other genre, there\'s a place for you here.',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
      logo: 'https://logo.clearbit.com/crunchyroll.com',
      members: '980K',
      onlineMembers: '12.8K',
      totalPosts: '78.3K',
      createdDate: '2018',
      rules: [
        'Use spoiler tags for recent episodes/chapters',
        'No piracy links or illegal streaming sites',
        'Credit fan art creators when sharing',
        'Be respectful of different tastes and opinions',
        'Keep NSFW content properly tagged'
      ],
      tags: ['anime', 'manga', 'otaku', 'japan', 'crunchyroll', 'funimation', 'shounen', 'seinen'],
      hashtags: [
        { tag: 'Anime', posts: '234K' },
        { tag: 'Manga', posts: '156K' },
        { tag: 'Otaku', posts: '89.7K' },
        { tag: 'AnimeReview', posts: '45.2K' },
        { tag: 'AnimeFan', posts: '67.8K' },
        { tag: 'Shounen', posts: '123K' }
      ]
    }
  }

  // Default fandom data if not found
  const defaultFandom = {
    name: fandomName.value.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    description: `Welcome to the ${fandomName.value} community! Connect with passionate fans and share your enthusiasm.`,
    fullDescription: `This is the official ${fandomName.value} fandom on FanRadar. Here you can discuss everything related to your favorite topic, share content, and connect with like-minded individuals from around the world.`,
    coverImage: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop',
    logo: 'https://via.placeholder.com/80x80/3B82F6/ffffff?text=F',
    members: '125K',
    onlineMembers: '2.1K',
    totalPosts: '23.4K',
    createdDate: '2020',
    rules: [
      'Be respectful to all community members',
      'Stay on topic and relevant to the fandom',
      'No spam or excessive self-promotion',
      'Follow community guidelines and rules'
    ],
    tags: ['fandom', 'community', 'discussion'],
    hashtags: [
      { tag: 'Fandom', posts: '12.5K' },
      { tag: 'Community', posts: '8.9K' },
      { tag: 'Discussion', posts: '15.2K' }
    ]
  }

  fandom.value = fandomsData[fandomName.value] || defaultFandom
}

// Navigation function for hashtags
const navigateToHashtag = (hashtag) => {
  const router = useRouter()
  router.push(`/hashtag/${hashtag}`)
}

// Initialize tabs after fandom data is loaded
const tabs = computed(() => [
  { id: 'posts', label: 'Posts', count: '156' },
  { id: 'members', label: 'Members', count: fandom.value.members || '0' },
  { id: 'about', label: 'About', count: '' }
])

const posts = ref([
  {
    id: 1,
    username: 'FootballFanatic',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2h ago',
    communityName: '',
    content: 'What a match yesterday! The tactical setup was absolutely brilliant. The way they pressed high and created chances was textbook football.',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
    tags: ['match', 'tactics', 'analysis'],
    likes: 89,
    comments: 23,
    shares: 5,
    isLiked: false,
    fandom: ''
  },
  {
    id: 2,
    username: 'TacticalGenius',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '5h ago',
    communityName: '',
    content: 'Breaking down the formation changes in the second half. The manager\'s substitutions completely changed the game dynamic.',
    tags: ['tactics', 'formation', 'substitutions'],
    likes: 156,
    comments: 34,
    shares: 12,
    isLiked: true,
    fandom: ''
  }
])

const members = ref([
  {
    id: 1,
    name: 'John Smith',
    username: 'johnsmith',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'admin',
    posts: 245,
    joinedDate: 'Jan 2019'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    username: 'emmaw',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'moderator',
    posts: 189,
    joinedDate: 'Mar 2020'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    username: 'mikej',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'member',
    posts: 67,
    joinedDate: 'Aug 2021'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    username: 'sarahd',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'member',
    posts: 123,
    joinedDate: 'Feb 2022'
  }
])

const joinFandom = () => {
  // Add to store
  fandomsStore.setUserRole(fandomName.value, 'member')
  console.log(`Joined fandom: ${fandom.value.name}`)
}

// Enhanced media handling
const onFileChange = (type, event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      postMedia.value.push({
        type,
        url: e.target.result,
        file
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeMedia = (index) => {
  postMedia.value.splice(index, 1)
}

// Enhanced createPost function
const createPost = () => {
  if (newPostContent.value.trim() || postMedia.value.length > 0) {
    const newPost = {
      id: Date.now(),
      username: currentUser.value.name,
      userAvatar: currentUser.value.avatar,
      date: 'just now',
      communityName: fandom.value.name,
      content: newPostContent.value,
      media: postMedia.value.map(m => ({ type: m.type, url: m.url })),
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      fandom: fandom.value.name,
      isPinned: isPinned.value,
      isAnnouncement: isAnnouncement.value,
      authorRole: isAdmin.value ? 'admin' : 'member'
    }
    posts.value.unshift(newPost)
    
    // Reset form
    newPostContent.value = ''
    postMedia.value = []
    isPinned.value = false
    isAnnouncement.value = false
  }
}

// Sort posts to show pinned and announcements first
const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    if (a.isAnnouncement && !b.isAnnouncement) return -1
    if (!a.isAnnouncement && b.isAnnouncement) return 1
    return new Date(b.date) - new Date(a.date)
  })
})

// Admin member management functions
const addMember = () => {
  if (newMemberEmail.value.trim()) {
    const newMember = {
      id: Date.now(),
      name: newMemberEmail.value.split('@')[0],
      username: newMemberEmail.value.split('@')[0],
      email: newMemberEmail.value,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      role: newMemberRole.value,
      posts: 0,
      joinedDate: 'Today'
    }
    members.value.push(newMember)
    newMemberEmail.value = ''
    newMemberRole.value = 'member'
  }
}

const changeMemberRole = (memberId, newRole) => {
  const member = members.value.find(m => m.id === memberId)
  if (member) {
    member.role = newRole
  }
}

const removeMember = (memberId) => {
  if (confirm('Are you sure you want to remove this member?')) {
    members.value = members.value.filter(m => m.id !== memberId)
  }
}

const filteredMembers = computed(() => {
  if (!memberSearch.value) return members.value
  return members.value.filter(member => 
    member.name.toLowerCase().includes(memberSearch.value.toLowerCase()) ||
    member.username.toLowerCase().includes(memberSearch.value.toLowerCase())
  )
})

// Edit fandom functions
const saveFandomChanges = () => {
  fandom.value.name = editFandom.value.name
  fandom.value.description = editFandom.value.description
  showEditFandom.value = false
}

// Edit rules functions
const addRule = () => {
  editRules.value.push('')
}

const removeRule = (index) => {
  editRules.value.splice(index, 1)
}

const saveRulesChanges = () => {
  fandom.value.rules = editRules.value.filter(rule => rule.trim())
  showEditRules.value = false
}

// Hashtag management functions
const addHashtag = () => {
  if (newHashtagTag.value.trim() && newHashtagPosts.value.trim()) {
    editHashtags.value.push({
      tag: newHashtagTag.value.trim(),
      posts: newHashtagPosts.value.trim()
    })
    newHashtagTag.value = ''
    newHashtagPosts.value = ''
  }
}

const removeHashtag = (index) => {
  editHashtags.value.splice(index, 1)
}

const saveHashtagsChanges = () => {
  fandom.value.hashtags = editHashtags.value.filter(hashtag => hashtag.tag.trim() && hashtag.posts.trim())
  showEditHashtags.value = false
}

// Initialize edit data when modals open
const initializeEditData = () => {
  editFandom.value = { ...fandom.value }
  editRules.value = [...fandom.value.rules]
  editHashtags.value = [...(fandom.value.hashtags || [])]
}

// Delete post function
const deletePost = (postId) => {
  if (confirm('Are you sure you want to delete this post?')) {
    posts.value = posts.value.filter(p => p.id !== postId)
  }
}

// Watch for modal opens to initialize data
watch(showEditFandom, (newVal) => {
  if (newVal) initializeEditData()
})

watch(showEditRules, (newVal) => {
  if (newVal) initializeEditData()
})

watch(showEditHashtags, (newVal) => {
  if (newVal) initializeEditData()
})
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>