<template>
  <div class="following-page sm:px-10">
    <div class="pt-8 px-4 pb-8">
      <!-- Header -->
      <div class="flex flex-col gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ following.length }} Following</h1>
        </div>
        <form @submit.prevent="followUser" class="flex gap-2 w-full">
          <input
            v-model="followInput"
            type="text"
            placeholder="Follow"
            class="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
          >
            Follow
          </button>
        </form>
      </div>

      <!-- Following List -->
      <div class="flex flex-col" style="height: 70vh;">
        <div v-if="filteredFollowing.length" class="space-y-4" style="height:100%;">
          <div class="overflow-y-auto" style="height:100%;">
            <div
              v-for="user in filteredFollowing"
              :key="user.id"
              class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 border-b border-gray-100 dark:border-gray-800"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :style="{ backgroundColor: user.avatarColor }"
                >
                  <span v-if="user.avatarImg">
                    <img :src="user.avatarImg" :alt="user.name" class="w-8 h-8 rounded-full object-cover" />
                  </span>
                  <span v-else class="text-white">{{ user.avatar }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Updated {{ user.lastUpdate }}</div>
                </div>
              </div>
              <button
                class="px-3 py-1 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500 transition-all"
                @click="unfollowUser(user.id)"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col flex-1 min-h-0">
          <div class="flex flex-col items-center justify-center mb-8">
            <h3 class="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">No one here by that name.</h3>
            <p class="text-gray-400 dark:text-gray-500 text-sm">That was a cool thing to type but it's not a FanRadar.</p>
          </div>
          <div class="flex flex-col flex-1 min-h-0">
            <div class="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">Your following:</div>
            <div class="overflow-y-auto flex-1 min-h-0" style="height:100%;">
              <div
                v-for="user in following"
                :key="user.id"
                class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 border-b border-gray-100 dark:border-gray-800"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    :style="{ backgroundColor: user.avatarColor }"
                  >
                    <span v-if="user.avatarImg">
                      <img :src="user.avatarImg" :alt="user.name" class="w-8 h-8 rounded-full object-cover" />
                    </span>
                    <span v-else class="text-white">{{ user.avatar }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Updated {{ user.lastUpdate }}</div>
                  </div>
                </div>
                <button
                  class="px-3 py-1 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500 transition-all"
                  @click="unfollowUser(user.id)"
                >
                  Unfollow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const followInput = ref('')

// All users in the site (mock database)
const allUsers = ref([
  {
    id: 1,
    name: 'daliyraisei',
    avatar: 'D',
    avatarColor: '#FF3B5C',
    lastUpdate: '7 hours ago',
    avatarImg: ''
  },
  {
    id: 2,
    name: 'esratjahanofficial',
    avatar: 'E',
    avatarColor: '#4A6BDF',
    lastUpdate: '2 days ago',
    avatarImg: ''
  },
  {
    id: 3,
    name: 'cmal95',
    avatar: 'C',
    avatarColor: '#00B94F',
    lastUpdate: '18 hours ago',
    avatarImg: ''
  },
  {
    id: 4,
    name: 'staff',
    avatar: 'S',
    avatarColor: '#001935',
    lastUpdate: '5 days ago',
    avatarImg: 'https://c.files.bbci.co.uk/2ff8/live/2c67f6a0-57ea-11f0-960d-e9f1088a89fe.jpg'
  },
  {
    id: 5,
    name: 'hhhhhhhhhhhhhjjjjjjjj',
    avatar: 'H',
    avatarColor: '#F59E0B',
    lastUpdate: '8 years ago',
    avatarImg: ''
  },
  {
    id: 6,
    name: 'kkkkkkkkkkkkkkkk',
    avatar: 'K',
    avatarColor: '#6366F1',
    lastUpdate: '11 years ago',
    avatarImg: ''
  },
  {
    id: 7,
    name: 'hhh',
    avatar: 'H',
    avatarColor: '#E11D48',
    lastUpdate: '13 years ago',
    avatarImg: ''
  },
  {
    id: 8,
    name: 'jaaaaaaa',
    avatar: 'J',
    avatarColor: '#10B981',
    lastUpdate: '10 years ago',
    avatarImg: ''
  },
  {
    id: 9,
    name: 'vvv',
    avatar: 'V',
    avatarColor: '#8B4513',
    lastUpdate: '11 years ago',
    avatarImg: ''
  }
])

// Only followed users
const following = ref([...allUsers.value])

const filteredFollowing = computed(() => {
  if (!searchQuery.value) return following.value
  const query = searchQuery.value.toLowerCase()
  return following.value.filter(user =>
    user.name.toLowerCase().includes(query)
  )
})

function followUser() {
  const value = followInput.value.trim()
  if (!value) return
  const user = allUsers.value.find(u => u.name.toLowerCase() === value.toLowerCase())
  if (!user) {
    searchQuery.value = value
    followInput.value = ''
    return
  }
  if (!following.value.some(u => u.name.toLowerCase() === value.toLowerCase())) {
    following.value.unshift(user)
  }
  followInput.value = ''
}

function unfollowUser(id) {
  following.value = following.value.filter(user => user.id !== id)
}
</script>

<style scoped>
.following-page {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.2s ease, color 0.2s ease;
  flex-direction: column;
}

.max-w-2xl {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

button, input, a {
  transition: all 0.2s ease;
}

input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}
</style>