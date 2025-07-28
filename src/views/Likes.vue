<template>
  <div class="likes-page min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <div class="max-w-4xl mx-auto py-6 px-4 sm:px-10 justify-center ">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Likes</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ filteredLikes.length }} posts liked</p>
        </div>
        <div class="relative w-full sm:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search likes..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <!-- Likes Feed (Explore-style post cards) -->
      <div class="space-y-6">
        <div 
          v-for="like in filteredLikes" 
          :key="like.id"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
        >
          <!-- Post Header -->
          <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <img :src="like.authorAvatar" :alt="like.author" class="w-10 h-10 rounded-full mr-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 dark:text-white">{{ like.author }}</span>
                <span v-if="like.verified" class="text-blue-500 dark:text-blue-400">
                  <i class="fas fa-check-circle"></i>
                </span>
              </div>
              <span class="text-gray-500 dark:text-gray-400 text-sm">{{ like.date }}</span>
            </div>
            <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>

          <!-- Post Content -->
          <div class="p-4">
            <div v-if="like.quote" class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 mb-3">
              <p class="italic text-gray-600 dark:text-gray-300">"{{ like.quote }}"</p>
            </div>
            <div v-if="like.content" class="text-gray-900 dark:text-white whitespace-pre-line mb-3">
              {{ like.content }}
            </div>
            <div v-if="like.image" class="mb-3">
              <img :src="like.image" :alt="like.title" class="w-full rounded-md" />
            </div>
            <div v-if="like.tags && like.tags.length" class="flex flex-wrap gap-2 mt-2">
              <span v-for="tag in like.tags" :key="tag" class="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">#{{ tag }}</span>
            </div>
          </div>

          <!-- Post Footer -->
          <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#181c23]">
            <div class="flex items-center gap-6">
              <button
                class="flex items-center gap-1 text-blue-500 bg-blue-100 dark:bg-[#232b3e] px-2 py-1 rounded-full font-semibold"
                @click="toggleComments(like.id)"
              >
                <i class="fas fa-comment"></i>
                <span>{{ comments[like.id]?.length || 0 }}</span>
              </button>
              <span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <i class="fas fa-retweet"></i>
                <span>{{ like.retweets || 0 }}</span>
              </span>
              <button
                class="flex items-center gap-1 text-red-500"
                @click="removeLike(like.id)"
                title="Remove from Likes"
              >
                <i class="fas fa-heart"></i>
                <span>{{ like.likes }}</span>
              </button>
            </div>
            <span class="text-xs text-gray-400">{{ like.notes }} notes</span>
          </div>

          <!-- Comments Section -->
          <div v-if="commentsOpen[like.id]" class="bg-gray-50 dark:bg-[#181c23] px-4 py-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
              <input
                v-model="newComment[like.id]"
                @keyup.enter="addComment(like.id)"
                type="text"
                placeholder="Reply as @yassineelaouni"
                class="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="addComment(like.id)"
                class="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
            <div v-if="comments[like.id]?.length" class="space-y-6">
              <div v-for="(comment, idx) in comments[like.id]" :key="idx" class="flex items-start gap-3">
                <img :src="comment.avatar" alt="avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-blue-400">@{{ comment.user }}</span>
                    <span class="text-xs text-gray-400">{{ comment.date }}</span>
                  </div>
                  <div class="text-sm text-gray-900 dark:text-white">{{ comment.text }}</div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-10">
              <i class="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
              <div class="text-gray-400 mb-2">Be the first to Reply!</div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredLikes.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <svg class="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">No liked posts found</h3>
          <p class="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search or like some posts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

// Mock data for likes based on the example posts
const likes = ref([
  {
    id: 1,
    author: "laser-z-beam",
    authorAvatar: "https://photos.tf1.fr/1920/1080/background-ott-one-piece-saison-19-d34792-eb61c7-0@3x.jpg",
    date: "Jul 18",
    content: `Tanjiro: Muzan is far too powerful. There is no way we can defeat him.

Muzan: (laughing) That's Right! No demon slayer can ever defeat me!`,
    likes: 3,
    retweets: 64,
    notes: 3,
    tags: ["demon slayer", "anime"],
    image: null,
    verified: false
  },
  {
    id: 2,
    author: "tomfoolerytotality",
    authorAvatar: "https://photos.tf1.fr/1920/1080/background-ott-one-piece-saison-19-d34792-eb61c7-0@3x.jpg",
    date: "Jul 11",
    quote: "Superman isn't woke. You're just so evil that you see a man doing acts of kindness and you think it's a targeted political agenda",
    content: `This is the most important line in the movie. I'm 100% serious. It tells you everything you need to know about Lex Luthor's character. It shows the audience that, despite being almost omniscient from the get-go, Luthor clearly has no idea who Superman is, only what he does.`,
    likes: 254,
    comments: 42,
    notes: 74862,
    tags: [
      "superman", "superman 2025", "superman movie", "james gunn",
      "david corenswet", "woke", "kindness", "dc", "dc studios", "dcu",
      "comics", "rachel brosnahan", "comic book movies", "comic books",
      "nicholas hoult"
    ],
    image: null,
    verified: true
  },
  {
    id: 3,
    author: "Blaze",
    authorAvatar: "https://photos.tf1.fr/1920/1080/background-ott-one-piece-saison-19-d34792-eb61c7-0@3x.jpg",
    date: "Jun 28",
    content: "Just finished this fanart of my favorite character! What do you think?",
    likes: 128,
    comments: 24,
    notes: 542,
    tags: ["fanart", "digital art", "my art"],
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=600&q=80",
    verified: false
  }
])

const commentsOpen = ref({})
const comments = ref({})
const newComment = ref({})

// Initialize comments for each like
likes.value.forEach(like => {
  comments.value[like.id] = []
  newComment.value[like.id] = ''
})

function toggleComments(likeId) {
  commentsOpen.value[likeId] = !commentsOpen.value[likeId]
}

function addComment(likeId) {
  const text = (newComment.value[likeId] || '').trim()
  if (!text) return
  comments.value[likeId].push({
    user: 'yassineelaouni',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text
  })
  newComment.value[likeId] = ''
}

function removeLike(likeId) {
  likes.value = likes.value.filter(like => like.id !== likeId)
  // Optionally, also remove comments for this post
  delete comments.value[likeId]
  delete commentsOpen.value[likeId]
  delete newComment.value[likeId]
}

const filteredLikes = computed(() => {
  if (!searchQuery.value.trim()) return likes.value
  const query = searchQuery.value.toLowerCase().trim()
  return likes.value.filter(like => 
    (like.content && like.content.toLowerCase().includes(query)) ||
    (like.author && like.author.toLowerCase().includes(query)) ||
    (like.tags && like.tags.some(tag => tag.toLowerCase().includes(query)))
  );
});
</script>

<style scoped>
.like-post {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.like-post:hover {
  transform: translateY(-2px);
}

.post-content {
  line-height: 1.6;
}

/* Custom scrollbar for dark mode */
.dark ::-webkit-scrollbar {
  width: 8px;
}

.dark ::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.dark ::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>