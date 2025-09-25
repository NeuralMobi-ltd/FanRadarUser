<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
    <div class="p-4 sm:p-6">
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ $t('store.favorites.title') }}</h1>
        <span class="text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {{ $t('store.favorites.itemsCount', { count: totalItems }) }}
        </span>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 8" :key="i" class="h-64 bg-gray-200/60 dark:bg-gray-800/60 rounded-xl animate-pulse" />
      </div>

      <div v-else-if="favorites.length === 0" class="text-center py-20">
        <div class="text-gray-400 text-6xl mb-3">
          <i class="far fa-heart"></i>
        </div>
        <h3 class="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1">{{ $t('store.favorites.emptyTitle') }}</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ $t('store.favorites.emptyDesc') }}</p>
      </div>

      <div v-else class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div 
            v-for="p in favorites" 
            :key="p.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02] group"
          >
            <div class="relative">
              <img :src="p.image" :alt="p.name || `Product #${p.id}`" class="w-full h-48 object-cover" />
              <button 
                class="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 dark:bg-gray-900/80 text-red-500 flex items-center justify-center shadow hover:scale-110 transition"
                @click="unfavorite(p)"
                :disabled="processing.has(p.id)"
                :title="processing.has(p.id) ? $t('store.favorites.updating') : $t('store.favorites.removeFromFavorites')"
              >
                <i :class="['fas', processing.has(p.id) ? 'fa-spinner fa-spin' : 'fa-heart']"></i>
              </button>
              <div class="absolute top-3 left-3 flex gap-2">
                <span v-if="p.discount" class="px-2 py-1 text-xs bg-red-600 text-white rounded-full">-{{ p.discount }}%</span>
                <span v-if="p.isNew" class="px-2 py-1 text-xs bg-green-600 text-white rounded-full">{{ $t('common.new') }}</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-gray-900 dark:text-white font-semibold mb-1 line-clamp-2">{{ p.name || `Product #${p.id}` }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ p.subcategoryName || p.category || '—' }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">${{ p.price }}</span>
                  <span v-if="p.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ p.originalPrice }}</span>
                </div>
                <button @click="addToCart(p)" class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">{{ $t('common.addToCart') }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.total_pages > 1" class="flex items-center justify-center gap-2 mt-4">
          <button 
            class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            :disabled="page<=1 || loading"
            @click="goTo(page-1)"
          >
            {{ $t('common.previous') }}
          </button>
          <span class="text-sm text-gray-600 dark:text-gray-300">{{ $t('store.favorites.pageOf', { page, total: pagination.total_pages }) }}</span>
          <button 
            class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            :disabled="!pagination.has_more || loading"
            @click="goTo(page+1)"
          >
            {{ $t('common.next') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- bottom padding for mobile nav -->
  <div class="h-14 md:h-0"></div>
</template>

<script setup>
import FavoritesService from '@/services/favoritesService'
import ProductsService from '@/services/productsService'
import { useCartStore } from '@/store/cart'
import { useProductsStore } from '@/store/products'
import { resolveStorageUrl } from '@/utils/media'
import notify from '@/utils/notify'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const { t } = useI18n()

const favorites = ref([])
const pagination = ref({ current_page: 1, total_pages: 1, has_more: false, total_items: 0, per_page: 10 })
const page = ref(1)
const limit = 12
const loading = ref(false)
const processing = ref(new Set())

const totalItems = computed(() => pagination.value.total_items || favorites.value.length)

const syncWishlistSet = (items) => {
  const ids = items.map(p => p.id)
  // Update global wishlist set so sidebar count stays in sync
  productsStore.wishlistSet = new Set(ids)
  // Also mark wishlisted flag on any loaded products
  productsStore.products.forEach(p => { p.isWishlisted = ids.includes(p.id) })
}

const loadFavorites = async () => {
  loading.value = true
  try {
    const { products, pagination: pag } = await ProductsService.myFavoriteProducts({ page: page.value, limit })
    const basics = products || []
    const ids = basics.map(p => p.id).filter(Boolean)
    // Fetch full product details for each favorite to get image and full info
    const detailed = await Promise.all(ids.map(async (id) => {
      try {
        const { product } = await ProductsService.detail(id)
        return product
      } catch {
        // Fallback to basic entry if detail fails
        const fallback = basics.find(b => b.id === id) || null
        if (!fallback) return null
        return {
          id: fallback.id,
          name: fallback.name || `Product #${fallback.id}`,
          description: fallback.description || '',
          price: typeof fallback.price === 'string' ? parseFloat(fallback.price) : (fallback.price || 0),
          category: fallback.category || '',
          subcategoryName: fallback.subcategory?.name || null,
          image: fallback.image ? resolveStorageUrl(fallback.image) : '',
          rating: fallback.rating_average || 0,
          reviews: fallback.rating_count || 0,
        }
      }
    }))
    favorites.value = detailed.filter(Boolean)
    pagination.value = {
      current_page: pag?.page || 1,
      total_pages: pag?.total_pages || pag?.total || 1,
      total_items: pag?.total_items || pag?.total || favorites.value.length,
      per_page: pag?.per_page || limit,
      has_more: pag?.has_more ?? ((pag?.page || 1) < (pag?.total_pages || 1))
    }
    syncWishlistSet(favorites.value)
  } catch (e) {
    notify.error(t('store.favorites.failedToLoad'))
  } finally {
    loading.value = false
  }
}

const goTo = async (p) => {
  if (p < 1) return
  page.value = p
}

watch(page, () => { loadFavorites() })

onMounted(() => {
  loadFavorites()
})

const unfavorite = async (product) => {
  if (!product || processing.value.has(product.id)) return
  processing.value.add(product.id)
  try {
    await FavoritesService.unfavoriteProduct(product.id)
    favorites.value = favorites.value.filter(p => p.id !== product.id)
    syncWishlistSet(favorites.value)
    // Update product in global store if exists
    const gp = productsStore.products.find(p => p.id === product.id)
    if (gp) gp.isWishlisted = false
    notify.success(t('store.favorites.removed'))
  } catch (e) {
    notify.error(t('store.favorites.couldNotUpdate'))
  } finally {
    processing.value.delete(product.id)
  }
}

const addToCart = (p) => {
  cartStore.addItem({ id: p.id, name: p.name || `Product #${p.id}`, price: p.price, image: p.image, category: p.category })
  notify.success(t('common.addedToCart'))
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
