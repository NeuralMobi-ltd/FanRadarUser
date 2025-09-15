<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 overflow-hidden pt-4">
    <div class="flex flex-col lg:flex-row min-h-screen gap-4 lg:gap-6 overflow-hidden">
      <!-- Main Content -->
      <div class="flex-1 max-w-full lg:max-w-2xl xl:max-w-none flex flex-col overflow-hidden">
        <!-- Create Post Section (updated to mirror CreatePostModal design) -->
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-5 lg:p-6 mb-6 shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <!-- User Avatar and Text Input -->
          <div class="flex items-start space-x-4">
            <AvatarFallback
              :src="authStore.user?.avatar || fetchedProfile?.avatar || currentUser.avatar"
              :firstName="currentUser.firstName || (currentUser.name || 'U').split(' ')[0]"
              :lastName="currentUser.lastName || (currentUser.name || '').split(' ').slice(1).join(' ')"
              :alt="currentUser.name"
              :size="48"
              class="w-12 h-12 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <textarea
                v-model="newPostContent"
                :placeholder="$t('common.whatsOnYourMind')"
                class="w-full resize-none border-none outline-none bg-gray-50 dark:bg-gray-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium min-h-[4rem] focus:bg-gray-100 dark:focus:bg-gray-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                rows="1"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                @input="autoResize"
                @focus="$event.target.style.minHeight = '6rem'"
                @blur="$event.target.style.minHeight = '4rem'"
              ></textarea>
            </div>
          </div>

          <!-- Tags Section -->
          <div v-if="showTagInput || tags.length" class="mt-5 pl-16">
            <div class="flex flex-wrap gap-3 mb-4" v-if="Array.isArray(tags) && tags.length">
              <span
                v-for="(tag, idx) in tags"
                :key="idx"
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                #{{ tag }}
                <button type="button" class="ml-2 text-white/80 hover:text-white transition-colors" @click="removeTag(idx)">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>
            </div>
            <input
              ref="tagInputEl"
              v-model="tagInput"
              @keydown.enter.prevent="addTag"
              @keydown.tab.prevent="addTag"
              type="text"
              class="w-full px-6 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :placeholder="$t('common.addTagsPlaceholder')"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>

      <!-- Selected Subcategory Badge -->
      <div v-if="selectedSubcategoryName" class="mt-2 pl-16">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
              <i class="fas fa-tag mr-2 text-sm"></i>
        {{ selectedSubcategoryName }}
            </span>
          </div>

          <!-- Scheduling Section -->
          <div v-if="scheduleEnabled" class="pl-16 mt-4">
            <div class="space-y-2">
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Schedule (optional)</label>
              <div class="flex items-center gap-3">
                <input type="datetime-local" v-model="scheduleAt" class="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full" />
                <button type="button" @click="clearSchedule" class="px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition" v-if="scheduleAt">Clear</button>
              </div>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">If set, the post may be auto-published at the chosen time (backend dependent).</p>
            </div>
          </div>

          <!-- Media Preview -->
          <div v-if="Array.isArray(postMedia) && postMedia.length > 0" class="mt-5 pl-16">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div 
                v-for="(media, index) in postMedia" 
                :key="index" 
                class="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square group hover:shadow-lg transition-all duration-200"
              >
                <img 
                  v-if="media.type === 'image'" 
                  :src="media.url" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                />
                <video 
                  v-else-if="media.type === 'video'" 
                  :src="media.url" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  muted
                ></video>
                <button 
                  @click="removeMedia(index)" 
                  class="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <i class="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <!-- Image Upload -->
              <label class="flex items-center justify-center w-12 h-12 rounded-2xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-200 touch-target group">
                <i class="fas fa-image text-xl group-hover:scale-110 transition-transform duration-200"></i>
                <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
              </label>
              <!-- Video Upload -->
              <label class="flex items-center justify-center w-12 h-12 rounded-2xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all duration-200 touch-target group">
                <i class="fas fa-video text-xl group-hover:scale-110 transition-transform duration-200"></i>
                <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
              </label>
              <!-- Tag Input Toggle -->
              <button 
                @click="toggleTagInput" 
                class="flex items-center justify-center w-12 h-12 rounded-2xl text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 touch-target group"
                :class="{ 'text-blue-600 bg-blue-50 dark:bg-blue-900/20': showTagInput || tags.length }"
                title="Add tags">
                <i class="fas fa-hashtag text-xl group-hover:scale-110 transition-transform duration-200"></i>
              </button>
              <!-- Category Picker -->
              <div class="relative">
                <button @click="showCategoryPicker = !showCategoryPicker" class="flex items-center justify-center w-12 h-12 rounded-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 touch-target group" 
                  :class="{ 'text-green-600 bg-green-50 dark:bg-green-900/20': selectedCategory }"
                  title="Choose category">
                  <i class="fas fa-list text-xl group-hover:scale-110 transition-transform duration-200"></i>
                </button>
                <div v-if="showCategoryPicker" class="absolute left-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 w-64 z-50 animate-in slide-in-from-top-2 duration-200 max-h-[70vh] overflow-hidden flex flex-col">
                  <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-white">Choose Category</div>
                  <ul class="max-h-48 overflow-auto space-y-1 scrollbar-hide flex-1">
                    <li v-for="(c, idx) in categoriesStore.getCategories" :key="idx">
                      <button @click.prevent="selectCategory(c.name)" class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-sm transition-colors duration-200 text-gray-900 dark:text-white"
                        :class="{ 'bg-green-50 dark:bg-green-900/20 text-green-600': selectedCategory === c.name }">
                        {{ c.name }}
                      </button>
                    </li>
                  </ul>
                  <div v-if="availableSubcategories.length" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div class="mb-2 text-sm font-semibold text-gray-700 dark:text-white">Choose Subcategory <span class="text-red-500" v-if="needSubcategory">*</span></div>
                    <select ref="subcategorySelectEl" v-model="selectedSubcategoryId" @change="onSubcategorySelect" class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                      <option :value="null">— select subcategory —</option>
                      <option v-for="(s, i) in availableSubcategories" :key="i" :value="s.id">{{ s.name }}</option>
                    </select>
                    <p v-if="needSubcategory && !selectedSubcategoryId" class="mt-2 text-xs text-red-500">Subcategory required.</p>
                  </div>
                </div>
              </div>
              <!-- Schedule Toggle -->
              <button @click="toggleSchedule" :title="scheduleEnabled ? 'Disable scheduling' : 'Schedule post'" class="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 touch-target group"
                :class="scheduleEnabled ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'">
                <i class="fas fa-clock text-xl group-hover:scale-110 transition-transform duration-200"></i>
              </button>
            </div>
            <!-- Post Button -->
            <div class="flex items-center space-x-3">
              <div v-if="creating" class="w-40 mr-2">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div :style="{ width: `${uploadProgress}%` }" class="h-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all"></div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ uploadProgress }}%</div>
              </div>
              <button
                @click="createPost"
                :disabled="creating || (!newPostContent.trim() && postMedia.length === 0) || (needSubcategory && !selectedSubcategoryId)"
                class="px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 text-base touch-target min-w-[8rem] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
              >
                <i v-if="creating" class="fas fa-spinner fa-spin text-lg"></i>
                <span>{{ $t('common.post') }}</span>
              </button>
            </div>
          </div>
        </div>
        <p v-if="createError" class="text-sm text-red-600 dark:text-red-400 mt-2">{{ createError }}</p>

        <!-- News Section (Horizontal Scroll ONLY) -->
        <div class="py-2 border-b border-gray-200 dark:border-gray-800 mb-3 sm:mb-4 overflow-hidden">
          <div class="flex justify-between items-center mb-2 sm:mb-3">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('content.home.newsToday') }}</h2>
            <router-link to="/news" class="text-blue-500 text-xs sm:text-sm hover:text-blue-600 transition-colors touch-button">{{ $t('common.showMore') }}</router-link>
          </div>
          <!-- Natural height container for news scrolling -->
          <div class="overflow-hidden">
            <div class="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory pb-3 sm:pb-4">
              <div class="flex gap-2 sm:gap-3 lg:gap-4 pl-4 pr-4" style="width: max-content;">
                <NewsPost 
                  v-for="news in newsItems" 
                  :key="news.id" 
                  :article="news" 
                  class="flex-shrink-0 snap-start"
                  :cardWidth="'25rem'"
                  :cardHeight="'11.5rem'"
                  @click:like="likeNews(news)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Modern Feed Toggle with Sliding Indicator -->
        <div class="relative bg-gray-100 dark:bg-gray-800 rounded-xl lg:rounded-2xl p-1 mb-4 sm:mb-6 overflow-hidden shadow-inner mx-1 sm:mx-0">
          <!-- Sliding background indicator -->
          <div 
            class="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl transition-all duration-300 ease-out shadow-lg"
            :style="{
              width: `${100/3}%`,
              left: activeFeed === 'timeline' ? '0%' : activeFeed === 'trending' ? `${100/3}%` : `${200/3}%`
            }"
          ></div>
          
          <!-- Feed buttons -->
          <div class="relative flex">
            <button
              @click="postsStore.setActiveFeed('timeline')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'timeline' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-home text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.timeline') }}</span>
              </div>
            </button>
            
            <button
              @click="postsStore.setActiveFeed('trending')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'trending' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-fire text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.trending') }}</span>
              </div>
            </button>
            
            <button
              @click="postsStore.setActiveFeed('following')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'following' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-user-friends text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.followingFeed') }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Posts Section -->
        <div class="space-y-3 sm:space-y-4 lg:space-y-6">
          <Post 
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200"
            @like="likePost"
            @comment="openComments"
          />
          
          <!-- Load More Button -->
          <div class="flex justify-center pt-3 sm:pt-4 lg:pt-6" v-if="hasMorePosts">
            <button
              @click="loadMorePosts"
              :disabled="loadingMore"
              class="px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-button text-sm sm:text-base lg:text-lg"
            >
              <span class="flex items-center space-x-2">
                <i v-if="loadingMore" class="fas fa-spinner fa-spin text-xs sm:text-sm"></i>
                <span>{{ loadingMore ? $t('common.loading') : $t('common.loadMorePosts') }}</span>
                <i v-if="!loadingMore" class="fas fa-chevron-down text-xs sm:text-sm"></i>
              </span>
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="filteredPosts.length === 0" class="text-center py-8 sm:py-12 lg:py-16">
            <div class="text-gray-500 dark:text-gray-400 space-y-3 sm:space-y-4">
              <div class="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
                <i class="fas fa-comments"></i>
              </div>
              <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">{{ $t('common.noPostsYet') }}</h3>
              <p class="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto leading-relaxed">{{ $t('common.followSomeFandoms') }}</p>
              <router-link 
                to="/fandoms/browse"
                class="inline-flex items-center space-x-2 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-button"
              >
                <span>{{ $t('common.exploreFandoms') }}</span>
                <i class="fas fa-arrow-right text-xs sm:text-sm"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Sidebar: Trending Fandoms & Hashtags -->
      <div class="hidden lg:block w-full lg:w-80 xl:w-96 flex-shrink-0">
        <div class="sticky space-y-4">
          <!-- Trending Fandoms -->
          <div class="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-800 dark:via-dark-800 dark:to-dark-900 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('common.trendingFandoms') }}</h3>
            <ul class="space-y-4">
              <li v-for="community in trendingCommunities" :key="community.id" class="flex items-center justify-between">
                <div 
                  class="flex items-center gap-3 cursor-pointer flex-1 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg p-2 -m-2 transition-colors"
                  @click="goToFandom(community)"
                >
                  <AvatarFallback
                    :src="community.avatar"
                    :alt="community.name"
                    :firstName="(community.name || '').split(' ')[0]"
                    :lastName="(community.name || '').split(' ').slice(1).join(' ')"
                    class="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-700"
                  />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ community.name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ community.members }} {{ $t('common.members') }}</p>
                  </div>
                </div>
                <button 
                  @click.stop="toggleJoin(community)"
                  :disabled="!!joining[community.id]"
                  class="px-3 py-1.5 text-xs font-semibold rounded-full shadow transition-colors"
                  :class="community.joined 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'"
                >
                  <i v-if="joining[community.id]" class="fas fa-spinner fa-spin mr-1"></i>
                  <span>{{ community.joined ? $t('common.leaveFandom') : $t('common.join') }}</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Trending Hashtags -->
          <div class="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-800 dark:via-dark-800 dark:to-dark-900 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('common.trendingHashtags') }}</h3>
            <ul class="space-y-3">
        <li v-for="tag in trendingHashtags" :key="tag.id || tag.name"
          @click="goToHashtag(tag)"
                  class="flex items-center justify-between cursor-pointer hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-xl p-2 transition">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">#{{ tag.name }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{{ $t('common.postsCount', { count: tag.posts }) }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="tag.growth !== undefined && tag.growth !== null" :class="tag.growth >= 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">{{ Math.abs(tag.growth) }}%</span>
                  <i class="fas fa-arrow-up-right-from-square text-xs text-gray-400"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import Post from '@/components/common/Post.vue'
import { NewsPost } from '@/components/feed'
import { useAuthStore } from '@/store/auth'
import { useCategoriesStore } from '@/store/categories'
import { useNewsStore } from '@/store/news'
import { usePostsStore } from '@/store/posts'
import { useTrendsStore } from '@/store/trends'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale } = useI18n()

// Stores
const postsStore = usePostsStore()
const newsStore = useNewsStore()
const authStore = useAuthStore()
const trendsStore = useTrendsStore()

// Expose reactive store state
const { filteredPosts } = storeToRefs(postsStore)
const activeFeed = computed(() => postsStore.activeFeed)
const loadingMore = computed(() => postsStore.loadingMore)
const hasMorePosts = computed(() => postsStore.hasMorePosts)

// Sidebar data
const trendingCommunities = computed(() => (trendsStore.trendingCommunities || []).slice(0, 6))
const trendingHashtags = computed(() => trendsStore.trendingHashtags)

// Current user for alt text and initials (no username)
import AuthService from '@/services/authService'

const fetchedProfile = ref(null)

onMounted(async () => {
  // Load home feed from backend
  if (!postsStore.posts.length) {
    await postsStore.fetchHomeFeed()
  }
  // Also fetch sidebar trends (fandoms + hashtags)
  try {
    await Promise.allSettled([
      trendsStore.fetchTrendingFandoms(10),
      trendsStore.fetchTrendingHashtags(10)
    ])
  } catch (_) { /* ignore */ }
  // Fetch home news as this is the first page for users
  try {
    if (!newsStore.newsItems?.length) {
      await newsStore.fetchNews({ language: locale.value })
    }
  } catch (_) { /* ignore */ }
  // Preload trending posts if user lands with trending active
  if (postsStore.activeFeed === 'trending') {
    await postsStore.fetchTrendingTop({ page: 1, limit: 20 })
  }
  // Preload following feed if user lands with following active
  if (postsStore.activeFeed === 'following') {
    await postsStore.fetchFollowingFeed({ page: 1, limit: 20 })
  }
  try {
    const profileResp = await AuthService.getProfile()
    // AuthService.getProfile returns either the user object (mock) or API response data
    const user = profileResp?.user || profileResp?.data || profileResp
    if (user) fetchedProfile.value = user
  } catch (e) {
    // ignore - fallback to auth store
  }
})

const currentUser = computed(() => {
  const u = fetchedProfile.value || authStore.user || {}
  const first = u.first_name || u.firstName || u.given_name || (u.name ? String(u.name).split(' ')[0] : '')
  const last = u.last_name || u.lastName || u.family_name || (u.name ? String(u.name).split(' ').slice(1).join(' ') : '')
  const name = u.name || [first, last].filter(Boolean).join(' ') || 'You'
  return {
    id: u.id,
    name,
    firstName: first,
    lastName: last,
    avatar: u.avatar || u.profile_image || '',
    ...u
  }
})

// Create post state
const newPostContent = ref('')
const tags = ref([])
const tagInput = ref('')
const showTagInput = ref(false)
const tagInputEl = ref(null)
const postMedia = ref([]) // [{ type: 'image'|'video', url: '...', file }]
const creating = ref(false)
const uploadProgress = ref(0)
const createError = ref('')
// Category picker
const categoriesStore = useCategoriesStore()
onMounted(() => { categoriesStore.fetchCategoriesIfNeeded().catch(()=>{}) })
const selectedCategory = ref('')
const selectedSubcategoryId = ref(null)
const showCategoryPicker = ref(false)
const subcategorySelectEl = ref(null)
// Store-backed subcategories
const availableSubcategories = computed(() => {
  const catId = categoriesStore.categoryIdByName(selectedCategory.value)
  return catId ? categoriesStore.getSubcategories(catId) : []
})
const selectedSubcategoryName = computed(() => {
  const list = availableSubcategories.value || []
  const found = list.find(s => String(s.id) === String(selectedSubcategoryId.value))
  return found?.name || ''
})
const needSubcategory = computed(() => {
  const catId = categoriesStore.categoryIdByName(selectedCategory.value)
  return !!(catId && categoriesStore.hasSubcategories(catId))
})

function autoResize(e) {
  const el = e?.target
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function addTag() {
  const val = tagInput.value.trim().replace(/^#/, '')
  if (!val) return
  if (!tags.value.includes(val)) tags.value.push(val)
  tagInput.value = ''
}

async function toggleTagInput() {
  showTagInput.value = !showTagInput.value
  if (showTagInput.value) {
    await nextTick()
    tagInputEl.value?.focus()
  }
}

async function selectCategory(name) {
  selectedCategory.value = name
  selectedSubcategoryId.value = null
  const catId = categoriesStore.categoryIdByName(name)
  if (catId) {
    try { await categoriesStore.fetchSubcategoriesFor(catId) } catch (_) {}
  }
  if ((availableSubcategories.value || []).length) {
    showCategoryPicker.value = true
    nextTick(() => { subcategorySelectEl.value?.focus() })
  } else {
    showCategoryPicker.value = false
  }
}

function onSubcategorySelect() {
  if (selectedSubcategoryId.value) showCategoryPicker.value = false
}

// Scheduling state
const scheduleEnabled = ref(false)
const scheduleAt = ref('')
function toMySqlDateTime(value) {
  try {
    const d = new Date(value)
    if (isNaN(d)) return null
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  } catch (e) { return null }
}
function toggleSchedule() {
  scheduleEnabled.value = !scheduleEnabled.value
  if (!scheduleEnabled.value) scheduleAt.value = ''
}
function clearSchedule() { scheduleAt.value = '' }

function removeTag(idx) {
  tags.value.splice(idx, 1)
}

function onFileChange(type, event) {
  const files = Array.from(event.target.files || [])
  files.forEach(file => {
    const url = URL.createObjectURL(file)
    const kind = type === 'video' || file.type.startsWith('video') ? 'video' : 'image'
    postMedia.value.push({ type: kind, url, file })
  })
  // reset input to allow re-selecting same file
  event.target.value = ''
}

function removeMedia(index) {
  const m = postMedia.value[index]
  if (m?.url?.startsWith('blob:')) URL.revokeObjectURL(m.url)
  postMedia.value.splice(index, 1)
}

async function createPost() {
  createError.value = ''
  // Build backend-friendly payload
  const title = (newPostContent.value || '').split('\n')[0].slice(0, 120)
  const payload = {
    title,
    description: newPostContent.value,
    content_status: 'draft',
    tags: Array.isArray(tags.value) ? tags.value.slice() : []
  }

  // attach category info when selected
  if (selectedCategory.value) payload.category = selectedCategory.value
  if (selectedCategory.value) {
    const categoryId = categoriesStore.categoryIdByName(selectedCategory.value)
    if (categoryId) payload.category_id = categoryId
  }
  if (selectedSubcategoryId.value) payload.subcategory_id = Number(selectedSubcategoryId.value)

  // schedule_at (ISO) if enabled
  if (scheduleEnabled.value && scheduleAt.value) {
    const mysql = toMySqlDateTime(scheduleAt.value)
    if (mysql) payload.schedule_at = mysql
  }

  // Attach files if present (server expects medias[] for file uploads)
  const files = postMedia.value.map(m => m.file).filter(Boolean)
  if (files.length) payload.medias = files

  if (!payload.description?.trim() && !files.length) return

  creating.value = true
  uploadProgress.value = 0

  try {
    // Assume postsStore.createPost forwards axios config (onUploadProgress)
  await postsStore.createPost(payload, {
      onUploadProgress: progressEvent => {
        try {
          if (progressEvent.lengthComputable) {
            uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        } catch (e) {
          // ignore progress calc errors
        }
      }
    })
  // Refresh home feed from backend instead of inserting locally
  await postsStore.fetchHomeFeed()

  // success: clear inputs
  newPostContent.value = ''
  tags.value = []
  tagInput.value = ''
  showTagInput.value = false
  selectedCategory.value = ''
  selectedSubcategoryId.value = null
    // Revoke blobs
    postMedia.value.forEach(m => { if (m?.url?.startsWith('blob:')) URL.revokeObjectURL(m.url) })
    postMedia.value = []
  } catch (err) {
    createError.value = (err && err.message) ? err.message : 'Failed to create post'
  } finally {
    creating.value = false
    // keep progress visible for a short moment then reset
    setTimeout(() => { uploadProgress.value = 0 }, 600)
  }
}

// Post item handlers
function likePost(postId) {
  postsStore.likePost(postId)
}
function openComments(postId) {
  // no-op placeholder for now
  console.debug('openComments', postId)
}
async function loadMorePosts() {
  await postsStore.loadMorePosts()
}

// When switching to Trending tab, fetch the backend trending/top list
watch(() => postsStore.activeFeed, async (val) => {
  if (val === 'trending') {
    await postsStore.fetchTrendingTop({ page: 1, limit: 20 })
  } else if (val === 'timeline') {
    await postsStore.fetchHomeFeed()
  } else if (val === 'following') {
    await postsStore.fetchFollowingFeed({ page: 1, limit: 20 })
  }
})

// News list
const newsItems = computed(() => newsStore.recentNews || newsStore.newsItems)
function likeNews(news) {
  newsStore.toggleLike(news.id)
}

// Sidebar handlers
const joining = ref({})
async function toggleJoin(community) {
  const id = community?.id
  if (!id || joining.value[id]) return
  joining.value = { ...joining.value, [id]: true }
  try {
    if (community.joined) await trendsStore.leaveFandom(id)
    else await trendsStore.joinFandom(id)
  } finally {
    const copy = { ...joining.value }
    delete copy[id]
    joining.value = copy
  }
}
function goToHashtag(tag) {
  const name = (tag && tag.name) ? tag.name : tag
  const id = tag && tag.id
  router.push({ path: `/hashtag/${encodeURIComponent(name)}`, query: id ? { id } : undefined })
}
function goToFandom(community) {
  // Navigate to fandom detail page using the community name or slug
  const fandomName = community.slug || community.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/fandom/${encodeURIComponent(fandomName)}`)
}
</script>

<style scoped>
/* Hide scrollbar (already present) */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Subtle edge fade for horizontal scrollers */
.mask-edges-x {
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
}

/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
}

/* Smooth textarea resize */
textarea {
  transition: min-height 0.2s ease;
}
</style>