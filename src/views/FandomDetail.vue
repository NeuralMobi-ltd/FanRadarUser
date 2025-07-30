<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Banner/Header Area -->
    <div class="relative">
      <div class="h-48 bg-gradient-to-r from-purple-600 to-blue-500 w-full"></div>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-32"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-16">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="flex items-end gap-4">
            <div class="relative group">
              <div class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white shadow-lg overflow-hidden">
                <img :src="fandom.avatar" class="w-full h-full object-cover" alt="Fandom avatar" />
                <!-- Edit avatar button for admin -->
                <button 
                  v-if="isAdmin"
                  @click="openAvatarUpload"
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i class="fas fa-camera text-white"></i>
                </button>
              </div>
              <input 
                type="file" 
                ref="avatarInput"
                class="hidden"
                accept="image/*"
                @change="handleAvatarChange"
              />
            </div>
            <div class="mb-2">
              <h1 class="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                {{ fandom.name }}
                <button 
                  v-if="isAdmin"
                  @click="editFandomName"
                  class="ml-2 text-white/70 hover:text-white"
                >
                  <i class="fas fa-pencil-alt text-sm"></i>
                </button>
              </h1>
              <p class="text-white/90 text-sm sm:text-base">
                {{ fandom.tagline || 'Join our community' }}
                <button 
                  v-if="isAdmin"
                  @click="editTagline"
                  class="ml-2 text-white/70 hover:text-white"
                >
                  <i class="fas fa-pencil-alt text-xs"></i>
                </button>
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 mb-4">
            <button 
              v-if="!isAdmin"
              class="flex items-center gap-2 bg-white/90 hover:bg-white text-purple-700 px-4 py-2 rounded-full font-medium transition-all shadow-sm"
              @click="toggleJoin"
            >
              <i class="fas fa-user-plus text-sm"></i>
              <span>{{ isMember ? 'Leave' : 'Join' }}</span>
            </button>
            
            <!-- Admin controls -->
            <div v-if="isAdmin" class="flex gap-2">
              <button class="flex items-center gap-2 bg-white/90 hover:bg-white text-purple-700 px-4 py-2 rounded-full font-medium transition-all shadow-sm">
                <i class="fas fa-cog text-sm"></i>
                <span>Settings</span>
              </button>
              <button class="flex items-center gap-2 bg-white/90 hover:bg-white text-purple-700 px-4 py-2 rounded-full font-medium transition-all shadow-sm">
                <i class="fas fa-user-plus text-sm"></i>
                <span>Invite</span>
              </button>
            </div>
            
            <button class="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-purple-700 rounded-full transition-all shadow-sm">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column - Content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- About Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold flex items-center gap-2">
              <i class="fas fa-info-circle text-blue-500"></i>
              <span>About this community</span>
            </h2>
            <button 
              v-if="isAdmin"
              @click="editDescription"
              class="text-blue-500 hover:text-blue-600"
            >
              <i class="fas fa-pencil-alt text-sm"></i>
            </button>
          </div>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">{{ fandom.description || 'Welcome to our community! Join us to share your passion.' }}</p>
          
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in fandom.tags" :key="tag" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
              #{{ tag }}
              <button 
                v-if="isAdmin"
                @click="removeTag(tag)"
                class="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
            <button 
              v-if="isAdmin"
              @click="addTag"
              class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <i class="fas fa-plus mr-1"></i> Add Tag
            </button>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.members }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Members</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.posts }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.online }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Online</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.createdAt }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Created</div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'latest' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'latest'"
            >
              <span>Latest</span>
            </button>
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'polls' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'polls'"
            >
              <span>Polls</span>
            </button>
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'media' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'media'"
            >
              <span>Media</span>
            </button>
            <button 
              v-if="isAdmin"
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'moderation' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'moderation'"
            >
              <span>Moderation</span>
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-6">
            <!-- Post Creation -->
            <div v-if="activeTab === 'latest'">
              <div class="flex items-start gap-3 mb-4">
                <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
                <div class="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <input 
                    type="text" 
                    placeholder="Create a post..." 
                    class="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
                    @click="showPostModal = true"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-7 gap-1 mb-6">
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-font text-blue-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Text</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-image text-green-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Photo</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-link text-orange-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Link</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-poll text-purple-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Poll</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-video text-red-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Video</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-music text-pink-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Audio</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-quote-right text-yellow-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Quote</span>
                </button>
              </div>
            </div>
            
            <!-- Posts Feed -->
            <div v-if="activeTab === 'latest'" class="space-y-6">
              <Post
                v-for="post in formattedPosts"
                :key="post.id"
                :post="post"
                :is-liked="likedPosts[post.id]"
                :is-comments-open="commentsOpen[post.id]"
                :comments="comments[post.id]"
                :likes-count="post.likes"
                :comments-count="post.comments || 0"
                :is-admin="isAdmin"
                @toggle-comments="toggleComments(post.id)"
                @toggle-like="toggleLike(post.id)"
                @add-comment="(text) => addComment(post.id, text)"
                @delete-post="deletePost(post.id)"
              />
            </div>
            
            <!-- Polls Tab -->
            <div v-if="activeTab === 'polls'" class="py-6">
              <div v-if="polls.length === 0" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <i class="fas fa-poll text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">No polls yet</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Create a poll to engage with the community</p>
                <button 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium"
                  @click="showPollModal = true"
                >
                  Create Poll
                </button>
              </div>
              <div v-else class="space-y-4">
                <PollCard 
                  v-for="poll in polls"
                  :key="poll.id"
                  :poll="poll"
                  :is-admin="isAdmin"
                  @vote="handleVote"
                  @delete-poll="deletePoll"
                />
              </div>
            </div>
            
            <!-- Media Tab -->
            <div v-if="activeTab === 'media'" class="py-6">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div 
                  v-for="(post, index) in postsWithMedia" 
                  :key="index" 
                  class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative group"
                >
                  <img v-if="post.image" :src="post.image" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                    <i class="fas fa-image text-3xl"></i>
                  </div>
                  <button 
                    v-if="isAdmin"
                    @click="deleteMediaPost(post.id)"
                    class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Moderation Tab (Admin Only) -->
            <div v-if="activeTab === 'moderation' && isAdmin" class="py-6">
              <div class="space-y-6">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 class="text-lg font-bold mb-4">Pending Posts</h3>
                  <div v-if="pendingPosts.length === 0" class="text-center py-8 text-gray-500">
                    No pending posts to review
                  </div>
                  <div v-else class="space-y-4">
                    <PendingPost 
                      v-for="post in pendingPosts"
                      :key="post.id"
                      :post="post"
                      @approve="approvePost"
                      @reject="rejectPost"
                    />
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 class="text-lg font-bold mb-4">Reported Content</h3>
                  <div v-if="reportedContent.length === 0" class="text-center py-8 text-gray-500">
                    No reported content
                  </div>
                  <div v-else class="space-y-4">
                    <ReportedItem 
                      v-for="item in reportedContent"
                      :key="item.id"
                      :item="item"
                      @resolve="resolveReport"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        <!-- Moderators -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold flex items-center gap-2">
              <i class="fas fa-shield-alt text-blue-500"></i>
              <span>Moderators</span>
            </h2>
            <button 
              v-if="isAdmin"
              @click="showModeratorModal = true"
              class="text-blue-500 hover:text-blue-600 text-sm"
            >
              <i class="fas fa-plus mr-1"></i> Add
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="mod in moderators" :key="mod.id" class="flex items-center gap-3">
              <img :src="mod.avatar" class="w-10 h-10 rounded-full" alt="Moderator avatar" />
              <div>
                <div class="font-medium">{{ mod.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">@{{ mod.username }}</div>
              </div>
              <span v-if="mod.isAdmin" class="ml-auto px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded-full">
                Admin
              </span>
              <button 
                v-if="isAdmin && !mod.isAdmin"
                @click="removeModerator(mod.id)"
                class="ml-auto text-red-500 hover:text-red-600"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Community Rules -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold flex items-center gap-2">
              <i class="fas fa-gavel text-blue-500"></i>
              <span>Community Rules</span>
            </h2>
            <button 
              v-if="isAdmin"
              @click="editRules"
              class="text-blue-500 hover:text-blue-600"
            >
              <i class="fas fa-pencil-alt text-sm"></i>
            </button>
          </div>
          <ol class="list-decimal list-inside space-y-2 text-sm">
            <li v-for="(rule, index) in rules" :key="index" class="flex">
              <span class="mr-2">{{ index + 1 }}.</span>
              <span>{{ rule }}</span>
              <button 
                v-if="isAdmin"
                @click="removeRule(index)"
                class="ml-2 text-red-500 hover:text-red-600 text-xs"
              >
                <i class="fas fa-times"></i>
              </button>
            </li>
            <button 
              v-if="isAdmin"
              @click="addRule"
              class="mt-2 text-sm text-blue-500 hover:text-blue-600 flex items-center"
            >
              <i class="fas fa-plus mr-1"></i> Add Rule
            </button>
          </ol>
        </div>
        
        <!-- Similar Communities -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-users text-blue-500"></i>
            <span>Similar Communities</span>
          </h2>
          <div class="space-y-4">
            <div v-for="community in similarCommunities" :key="community.id" class="flex items-center gap-3">
              <img :src="community.avatar" class="w-10 h-10 rounded-full" alt="Community avatar" />
              <div>
                <div class="font-medium">{{ community.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ community.members }} members</div>
              </div>
              <button 
                class="ml-auto text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full transition-colors"
                @click="visitCommunity(community.id)"
              >
                {{ isMemberOf(community.id) ? 'Joined' : 'Join' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Post Creation Modal -->
    <Modal v-if="showPostModal" @close="showPostModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Create Post</h3>
      </template>
      <template #body>
        <div class="flex items-start gap-3 mb-4">
          <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
          <div>
            <div class="font-medium">{{ currentUser.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Posting to {{ fandom.name }}</div>
          </div>
        </div>
        
        <textarea 
          v-model="newPostContent"
          placeholder="What would you like to share?"
          class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none min-h-[150px]"
        ></textarea>
        
        <div class="mt-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
          <i class="fas fa-image text-3xl text-gray-400 mb-2"></i>
          <p class="text-gray-500 dark:text-gray-400">Drag and drop images or click to browse</p>
          <button class="mt-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-full transition-colors">
            Select Files
          </button>
        </div>
      </template>
      <template #footer>
        <button @click="showPostModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="createPost"
          :disabled="!newPostContent.trim()"
        >
          Post
        </button>
      </template>
    </Modal>
    
    <!-- Poll Creation Modal -->
    <Modal v-if="showPollModal" @close="showPollModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Create Poll</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question</label>
            <input 
              v-model="newPoll.question"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Ask your question..."
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Options</label>
            <div class="space-y-2">
              <div v-for="(option, index) in newPoll.options" :key="index" class="flex items-center gap-2">
                <input 
                  v-model="newPoll.options[index]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="`Option ${index + 1}`"
                />
                <button 
                  v-if="newPoll.options.length > 2"
                  @click="removePollOption(index)"
                  class="text-red-500 hover:text-red-600"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button 
                @click="addPollOption"
                class="text-sm text-blue-500 hover:text-blue-600 flex items-center"
                :disabled="newPoll.options.length >= 6"
              >
                <i class="fas fa-plus mr-1"></i> Add Option
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
            <select 
              v-model="newPoll.duration"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">1 week</option>
              <option value="30">1 month</option>
            </select>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showPollModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="createPoll"
          :disabled="!newPoll.question.trim() || newPoll.options.some(opt => !opt.trim())"
        >
          Create Poll
        </button>
      </template>
    </Modal>
    
    <!-- Add Moderator Modal -->
    <Modal v-if="showModeratorModal" @close="showModeratorModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Add Moderator</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input 
              v-model="newModerator.username"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter username..."
            />
          </div>
          
          <div>
            <label class="flex items-center">
              <input 
                v-model="newModerator.isAdmin"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Make admin</span>
            </label>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showModeratorModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="addNewModerator"
          :disabled="!newModerator.username.trim()"
        >
          Add Moderator
        </button>
      </template>
    </Modal>
    
    <!-- Edit Fandom Name Modal -->
    <Modal v-if="showNameEditModal" @close="showNameEditModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Edit Community Name</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              v-model="editNameForm.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Community name..."
            />
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showNameEditModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="saveFandomName"
          :disabled="!editNameForm.name.trim()"
        >
          Save
        </button>
      </template>
    </Modal>
    
    <!-- Edit Tagline Modal -->
    <Modal v-if="showTaglineEditModal" @close="showTaglineEditModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Edit Tagline</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
            <input 
              v-model="editTaglineForm.tagline"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Community tagline..."
            />
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showTaglineEditModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="saveTagline"
          :disabled="!editTaglineForm.tagline.trim()"
        >
          Save
        </button>
      </template>
    </Modal>
    
    <!-- Edit Description Modal -->
    <Modal v-if="showDescriptionEditModal" @close="showDescriptionEditModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Edit Description</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              v-model="editDescriptionForm.description"
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Community description..."
            ></textarea>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showDescriptionEditModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="saveDescription"
        >
          Save
        </button>
      </template>
    </Modal>
    
    <!-- Add Tag Modal -->
    <Modal v-if="showAddTagModal" @close="showAddTagModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Add Tag</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tag</label>
            <input 
              v-model="newTag"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter tag..."
            />
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="showAddTagModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="saveNewTag"
          :disabled="!newTag.trim()"
        >
          Add Tag
        </button>
      </template>
    </Modal>
    
    <!-- Edit Rules Modal -->
    <Modal v-if="showEditRulesModal" @close="showEditRulesModal = false">
      <template #header>
        <h3 class="text-lg font-bold">Edit Community Rules</h3>
      </template>
      <template #body>
        <div class="space-y-4">
          <div v-for="(rule, index) in editRulesForm.rules" :key="index" class="flex items-start gap-2">
            <span class="mt-2">{{ index + 1 }}.</span>
            <div class="flex-1">
              <textarea 
                v-model="editRulesForm.rules[index]"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <button 
              @click="removeRuleFromEdit(index)"
              class="mt-2 text-red-500 hover:text-red-600"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button 
            @click="addRuleToEdit"
            class="text-sm text-blue-500 hover:text-blue-600 flex items-center"
          >
            <i class="fas fa-plus mr-1"></i> Add Rule
          </button>
        </div>
      </template>
      <template #footer>
        <button @click="showEditRulesModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button 
          class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          @click="saveRules"
        >
          Save Rules
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Post from '@/components/Post.vue'
import PollCard from '@/components/PollCard.vue'
import PendingPost from '@/components/PendingPost.vue'
import ReportedItem from '@/components/ReportedItem.vue'
import Modal from '@/components/Modal.vue'

const router = useRouter()

// User and permissions
const currentUser = ref({
  id: 1,
  name: 'Yassine El Aouni',
  username: 'yassineelaouni',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  isAdmin: true // Change this to false to see regular user view
})

const isAdmin = computed(() => currentUser.value.isAdmin)
const isMember = ref(true)

// Fandom data
const fandom = ref({
  id: 1,
  name: 'Underwater Basketweavers',
  handle: 'underwater-basketweavers',
  tagline: 'A community celebrating original artists on Tumblr',
  avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
  banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
  members: '3,245',
  posts: '423',
  online: '1',
  description: 'Welcome to the official community for underwater basket weaving enthusiasts! Share your creations, techniques, and connect with fellow artists.',
  tags: ['art', 'craft', 'weaving', 'creative', 'handmade'],
  createdAt: 'January 15, 2023',
  isPrivate: false
})

// UI State
const activeTab = ref('latest')
const showPostModal = ref(false)
const showPollModal = ref(false)
const showModeratorModal = ref(false)
const showNameEditModal = ref(false)
const showTaglineEditModal = ref(false)
const showDescriptionEditModal = ref(false)
const showAddTagModal = ref(false)
const showEditRulesModal = ref(false)

// Form data
const newPostContent = ref('')
const newPoll = ref({
  question: '',
  options: ['', ''],
  duration: '3'
})
const newModerator = ref({
  username: '',
  isAdmin: false
})
const editNameForm = ref({
  name: ''
})
const editTaglineForm = ref({
  tagline: ''
})
const editDescriptionForm = ref({
  description: ''
})
const newTag = ref('')
const editRulesForm = ref({
  rules: []
})

// Initialize forms
onMounted(() => {
  editNameForm.value.name = fandom.value.name
  editTaglineForm.value.tagline = fandom.value.tagline
  editDescriptionForm.value.description = fandom.value.description
  editRulesForm.value.rules = [...rules.value]
})

// Rules
const rules = ref([
  'Be respectful to all members',
  'No spam or self-promotion',
  'Keep content relevant to the fandom',
  'No NSFW content',
  'Follow Tumblr\'s community guidelines'
])

// Moderators
const moderators = ref([
  {
    id: 1,
    name: 'Ilia Hahh',
    username: 'ilia-hahh',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isAdmin: true
  },
  {
    id: 3,
    name: 'Mike Chen',
    username: 'mikechen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isAdmin: false
  }
])

// Similar communities
const similarCommunities = ref([
  {
    id: 1,
    name: 'Fiber Arts Collective',
    avatar: 'https://images.unsplash.com/photo-1590544848371-d44111ea798e?auto=format&fit=crop&w=500&q=80',
    members: '8.2k'
  },
  {
    id: 2,
    name: 'Handmade Crafts',
    avatar: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=500&q=80',
    members: '12.5k'
  },
  {
    id: 3,
    name: 'Traditional Weaving',
    avatar: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80',
    members: '5.7k'
  }
])

// Posts and polls
const fandomPosts = ref([
  {
    id: 101,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    content: 'Check out my latest underwater basket! 🌊🧺',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    likes: 12,
    comments: 3,
    date: 'Apr 10',
    tags: ['art', 'basket']
  },
  {
    id: 102,
    author: {
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    content: 'Does anyone have tips for weaving with kelp?',
    image: '',
    likes: 7,
    comments: 2,
    date: 'Apr 9',
    tags: ['help', 'technique']
  },
  {
    id: 103,
    author: {
      name: 'Ilia Hahh',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: 'My first attempt at a circular basket. Feedback welcome!',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    likes: 18,
    comments: 5,
    date: 'Apr 8',
    tags: ['beginner', 'feedback']
  }
])

const polls = ref([
  {
    id: 1,
    question: 'Which material do you prefer for underwater weaving?',
    options: [
      { text: 'Seaweed', votes: 45, voted: false },
      { text: 'Kelp', votes: 78, voted: false },
      { text: 'Coral fibers', votes: 32, voted: false }
    ],
    totalVotes: 155,
    endDate: '2023-12-15',
    createdBy: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  }
])

const pendingPosts = ref([])
const reportedContent = ref([])

// Computed properties
const formattedPosts = computed(() => {
  return fandomPosts.value.map(post => {
    return {
      id: post.id,
      username: post.author.name,
      avatar: post.author.avatar,
      date: post.date,
      text: post.content,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      tags: post.tags || []
    }
  })
})

const postsWithMedia = computed(() => {
  return formattedPosts.value.filter(post => post.image)
})

// States for post interactions
const commentsOpen = ref({})
const likedPosts = ref({})
const comments = ref({})

// Initialize states for each post
onMounted(() => {
  formattedPosts.value.forEach(post => {
    commentsOpen.value[post.id] = false
    likedPosts.value[post.id] = false
    comments.value[post.id] = []
  })
})

// Methods
function toggleJoin() {
  isMember.value = !isMember.value
}

function toggleComments(postId) {
  commentsOpen.value[postId] = !commentsOpen.value[postId]
}

function toggleLike(postId) {
  likedPosts.value[postId] = !likedPosts.value[postId]
  const post = formattedPosts.value.find(p => p.id === postId)
  if (post) {
    post.likes += likedPosts.value[postId] ? 1 : -1
  }
}

function addComment(postId, text) {
  const trimmedText = text.trim()
  if (!trimmedText) return
  if (!comments.value[postId]) {
    comments.value[postId] = []
  }
  
  comments.value[postId].push({
    user: currentUser.value.username,
    avatar: currentUser.value.avatar,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text: trimmedText
  })
  
  // Increment comment count
  const post = formattedPosts.value.find(p => p.id === postId)
  if (post) {
    post.comments = (post.comments || 0) + 1
  }
}

function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    fandomPosts.value = fandomPosts.value.filter(post => post.id !== postId)
  }
}

function deleteMediaPost(postId) {
  if (confirm('Are you sure you want to delete this media post?')) {
    fandomPosts.value = fandomPosts.value.filter(post => post.id !== postId)
  }
}

function createPost() {
  if (!newPostContent.value.trim()) return
  
  const newPost = {
    id: Date.now(),
    author: {
      name: currentUser.value.name,
      avatar: currentUser.value.avatar
    },
    content: newPostContent.value,
    likes: 0,
    comments: 0,
    date: 'Just now',
    tags: []
  }
  
  fandomPosts.value.unshift(newPost)
  commentsOpen.value[newPost.id] = false
  likedPosts.value[newPost.id] = false
  comments.value[newPost.id] = []
  
  newPostContent.value = ''
  showPostModal.value = false
}

function addPollOption() {
  if (newPoll.value.options.length < 6) {
    newPoll.value.options.push('')
  }
}

function removePollOption(index) {
  if (newPoll.value.options.length > 2) {
    newPoll.value.options.splice(index, 1)
  }
}

function createPoll() {
  if (!newPoll.value.question.trim() || newPoll.value.options.some(opt => !opt.trim())) return
  
  const poll = {
    id: Date.now(),
    question: newPoll.value.question,
    options: newPoll.value.options.map(opt => ({
      text: opt,
      votes: 0,
      voted: false
    })),
    totalVotes: 0,
    endDate: new Date(Date.now() + newPoll.value.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdBy: {
      name: currentUser.value.name,
      avatar: currentUser.value.avatar
    }
  }
  
  polls.value.unshift(poll)
  newPoll.value = {
    question: '',
    options: ['', ''],
    duration: '3'
  }
  showPollModal.value = false
}

function handleVote(pollId, optionIndex) {
  const poll = polls.value.find(p => p.id === pollId)
  if (poll && !poll.options[optionIndex].voted) {
    poll.options[optionIndex].votes++
    poll.options[optionIndex].voted = true
    poll.totalVotes++
  }
}

function deletePoll(pollId) {
  if (confirm('Are you sure you want to delete this poll?')) {
    polls.value = polls.value.filter(poll => poll.id !== pollId)
  }
}

function addNewModerator() {
  if (!newModerator.value.username.trim()) return
  
  // In a real app, you would look up the user by username
  const newMod = {
    id: Date.now(),
    name: newModerator.value.username,
    username: newModerator.value.username.toLowerCase(),
    avatar: 'https://ui-avatars.com/api/?name=' + newModerator.value.username + '&background=random',
    isAdmin: newModerator.value.isAdmin
  }
  
  moderators.value.push(newMod)
  newModerator.value = {
    username: '',
    isAdmin: false
  }
  showModeratorModal.value = false
}

function removeModerator(modId) {
  if (confirm('Are you sure you want to remove this moderator?')) {
    moderators.value = moderators.value.filter(mod => mod.id !== modId)
  }
}

function approvePost(postId) {
  pendingPosts.value = pendingPosts.value.filter(post => post.id !== postId)
  // Add to regular posts
}

function rejectPost(postId) {
  pendingPosts.value = pendingPosts.value.filter(post => post.id !== postId)
}

function resolveReport(itemId) {
  reportedContent.value = reportedContent.value.filter(item => item.id !== itemId)
}

function visitCommunity(communityId) {
  router.push(`/fandom/${communityId}`)
}

function isMemberOf(communityId) {
  // In a real app, check if user is member
  return communityId === 1 // Just for demo
}

function editFandomName() {
  editNameForm.value.name = fandom.value.name
  showNameEditModal.value = true
}

function saveFandomName() {
  fandom.value.name = editNameForm.value.name
  showNameEditModal.value = false
}

function editTagline() {
  editTaglineForm.value.tagline = fandom.value.tagline
  showTaglineEditModal.value = true
}

function saveTagline() {
  fandom.value.tagline = editTaglineForm.value.tagline
  showTaglineEditModal.value = false
}

function editDescription() {
  editDescriptionForm.value.description = fandom.value.description
  showDescriptionEditModal.value = true
}

function saveDescription() {
  fandom.value.description = editDescriptionForm.value.description
  showDescriptionEditModal.value = false
}

function addTag() {
  newTag.value = ''
  showAddTagModal.value = true
}

function saveNewTag() {
  if (!newTag.value.trim()) return
  if (!fandom.value.tags) fandom.value.tags = []
  fandom.value.tags.push(newTag.value.trim())
  showAddTagModal.value = false
}

function removeTag(tag) {
  fandom.value.tags = fandom.value.tags.filter(t => t !== tag)
}

function editRules() {
  editRulesForm.value.rules = [...rules.value]
  showEditRulesModal.value = true
}

function addRuleToEdit() {
  editRulesForm.value.rules.push('')
}

function removeRuleFromEdit(index) {
  editRulesForm.value.rules.splice(index, 1)
}

function saveRules() {
  rules.value = editRulesForm.value.rules.filter(rule => rule.trim())
  showEditRulesModal.value = false
}

function addRule() {
  rules.value.push('New rule')
}

function removeRule(index) {
  rules.value.splice(index, 1)
}

// Avatar upload
const avatarInput = ref(null)

function openAvatarUpload() {
  avatarInput.value.click()
}

function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (event) => {
      fandom.value.avatar = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>
/* Custom scrollbar and other styles */
</style>