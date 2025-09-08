<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <div class="relative mb-8">
      <div class="h-56 w-full rounded-xl overflow-hidden">
        <img :src="coverImage" :alt="title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      <div class="absolute bottom-6 left-6 text-white">
        <h1 class="text-3xl font-bold mb-1">{{ title }}</h1>
        <p class="text-white/90 max-w-xl">{{ description }}</p>
      </div>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div class="flex gap-8">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          :class="[
            'pb-4 px-1 font-medium',
            activeTab === tab.id
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]">
          {{ tab.label }}
          <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-if="posts.length">
        <Post v-for="post in posts" :key="post.id" :post="post" />
        <div class="col-span-full flex justify-center mt-2">
          <button v-if="canLoadMorePosts" @click="loadMorePosts" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">{{ $t('common.loadMore') }}</button>
        </div>
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.category.empty.posts') }}
      </div>
    </div>

    <div v-else-if="activeTab === 'fandoms'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="fandoms.length">
        <div v-for="f in fandoms" :key="f.id" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center mb-3">
            <img :src="f.avatar" :alt="f.name" class="w-12 h-12 rounded-lg object-cover mr-3" />
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">{{ f.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ f.members }} {{ $t('common.members') }}</p>
            </div>
          </div>
          <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm">{{ $t('common.join') }}</button>
        </div>
        <div class="col-span-full flex justify-center mt-2">
          <button v-if="canLoadMoreFandoms" @click="loadMoreFandoms" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">{{ $t('common.loadMore') }}</button>
        </div>
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.category.empty.fandoms') }}
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSubcategoriesStore } from '@/store/subcategories'
import Post from '@/components/common/Post.vue'

const route = useRoute()
const store = useSubcategoriesStore()
const activeTab = ref('posts')

const subId = computed(() => route.params.id || route.query.id)
const name = computed(() => route.query.name || '')
const title = computed(() => name.value ? String(name.value) : `Subcategory #${subId.value}`)
const description = computed(() => `Contenu et communautés pour la sous-catégorie ${title.value}.`)
const coverImage = computed(() => 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=600&fit=crop')

const posts = computed(() => store.getContent(subId.value))
const fandoms = computed(() => store.getFandoms(subId.value))
const canLoadMorePosts = computed(() => !!store.getContentPagination(subId.value)?.hasNext)
const canLoadMoreFandoms = computed(() => !!store.getFandomsPagination(subId.value)?.hasNext)

const tabs = computed(() => [
  { id: 'posts', label: 'Posts', count: posts.value.length.toString() },
  { id: 'fandoms', label: 'Fandoms', count: fandoms.value.length.toString() }
])

async function load() {
  const id = subId.value
  if (!id) return
  await Promise.all([
    store.fetchContent(id, { page: 1, limit: 20 }),
    store.fetchFandoms(id, { page: 1, limit: 12 })
  ])
}

onMounted(load)
watch(subId, load)

async function loadMorePosts() {
  const id = subId.value
  if (!id) return
  const slot = store.contentById[String(id)]
  const nextPage = (slot?.pagination?.page || 1) + 1
  await store.fetchContent(id, { page: nextPage, limit: slot?.pagination?.limit || 20 })
}

async function loadMoreFandoms() {
  const id = subId.value
  if (!id) return
  const slot = store.fandomsById[String(id)]
  const nextPage = (slot?.pagination?.page || 1) + 1
  await store.fetchFandoms(id, { page: nextPage, limit: slot?.pagination?.limit || 12 })
}
</script>

<style scoped>
</style>
