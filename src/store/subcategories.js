import { defineStore } from 'pinia'
import { SubcategoriesService } from '@/services/subcategoriesService'
import { usePostsStore } from '@/store/posts'
import { normalizeAsset } from '@/utils/assets'

export const useSubcategoriesStore = defineStore('subcategories', {
  state: () => ({
    contentById: {
      // [id]: { items: Post[], pagination }
    },
    fandomsById: {
      // [id]: { items: Fandom[], pagination }
    },
    loading: false,
    error: null
  }),
  getters: {
    getContent: (state) => (id) => state.contentById[String(id)]?.items || [],
    getFandoms: (state) => (id) => state.fandomsById[String(id)]?.items || [],
    getContentPagination: (state) => (id) => state.contentById[String(id)]?.pagination || null,
    getFandomsPagination: (state) => (id) => state.fandomsById[String(id)]?.pagination || null
  },
  actions: {
    async fetchContent(id, { page = 1, limit = 20 } = {}) {
      if (!id) return { success: false, error: 'missing id' }
      this.loading = true
      this.error = null
      try {
        const payload = await SubcategoriesService.getContent(id, { page, limit })
        // Backends may return mixed content or a flat posts array.
        // Examples:
        //  - { subcategory, posts: [...], posts_count }
        //  - { content: [ { type: 'post'|'fandom', ... } ], pagination }
        const postsStore = usePostsStore()

        // Prefer explicit posts array when available
        const postsArray = Array.isArray(payload?.posts)
          ? payload.posts
          : Array.isArray(payload?.data?.posts)
            ? payload.data.posts
            : null

        let postItems = []
        let fandomItems = []

        if (Array.isArray(postsArray)) {
          postItems = postsArray.map(p => postsStore.mapBackendPost(p)).filter(Boolean)
        } else {
          // Fallback: mixed content array
          const content = payload?.content || payload?.data?.content || payload?.data || payload || []
          if (Array.isArray(content)) {
            postItems = content
              .filter(it => (it.type || '').toLowerCase() === 'post' || (it.description || it.media))
              .map(p => postsStore.mapBackendPost(p))
              .filter(Boolean)
            // If content includes fandoms, also populate fandomsById (helpful on first load)
            fandomItems = content
              .filter(it => (it.type || '').toLowerCase() === 'fandom' || (it.name && it.members_count != null))
              .map(f => ({
                id: f.id,
                name: f.name,
                avatar: normalizeAsset(f.cover_image || f.logo_image || f.avatar || ''),
                members: f.members_count || f.members || 0,
                posts: f.posts_count || f.posts || 0
              }))
          }
        }

        // Normalize pagination: derive from backend fields if explicit object missing
        const rawPag = payload?.pagination || {}
        const derivedTotal = Number(payload?.posts_count ?? rawPag.total ?? postItems.length ?? 0)
        const curPage = Number(rawPag.page ?? rawPag.current_page ?? page ?? 1)
        const perPage = Number(rawPag.per_page ?? rawPag.limit ?? limit ?? 20)
        const lastPage = Number(rawPag.last_page ?? rawPag.total_pages ?? (perPage ? Math.max(1, Math.ceil(derivedTotal / perPage)) : 1))
        const hasNext = Boolean(
          rawPag.hasNext ?? rawPag.has_more ?? (derivedTotal ? (curPage < lastPage) : false)
        )
        const pagination = { page: curPage, limit: perPage, total: derivedTotal, lastPage, hasNext }

        const key = String(id)
        const prev = this.contentById[key]
        const mergedPosts = page > 1 && prev?.items?.length ? prev.items.concat(postItems) : postItems
        this.contentById[key] = { items: mergedPosts, pagination }

  if (fandomItems.length) {
          const prevF = this.fandomsById[key]
          const mergedF = page > 1 && prevF?.items?.length ? prevF.items.concat(fandomItems) : fandomItems
          // Reuse same pagination for now (content feed); dedicated fetchFandoms has its own pagination
          this.fandomsById[key] = { items: mergedF, pagination }
        }
  return { success: true, count: (postItems?.length || 0) + (fandomItems?.length || 0), pagination }
      } catch (e) {
        this.error = e?.message || 'Failed to fetch content'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    async fetchFandoms(id, { page = 1, limit = 12 } = {}) {
      if (!id) return { success: false, error: 'missing id' }
      this.loading = true
      this.error = null
      try {
        const payload = await SubcategoriesService.getFandoms(id, { page, limit })
        const list = payload?.fandoms || payload?.data?.fandoms || payload?.data || payload || []
        const items = Array.isArray(list)
          ? list.map(f => ({
              id: f.id,
              name: f.name,
              avatar: normalizeAsset(f.cover_image || f.logo_image || f.avatar || ''),
              members: f.members_count || f.members || 0,
              posts: f.posts_count || f.posts || 0
            }))
          : []
        const rawPag = payload?.pagination || {}
        const pagination = {
          page: Number(rawPag.page ?? rawPag.current_page ?? page ?? 1),
          limit: Number(rawPag.per_page ?? rawPag.limit ?? limit ?? 12),
          total: Number(rawPag.total ?? 0),
          lastPage: Number(rawPag.last_page ?? rawPag.total_pages ?? 1),
          hasNext: Boolean(rawPag.hasNext ?? rawPag.has_more ?? ((Number(rawPag.page ?? 1)) < (Number(rawPag.last_page ?? 1))))
        }
        const key = String(id)
        const prev = this.fandomsById[key]
        const merged = page > 1 && prev?.items?.length ? prev.items.concat(items) : items
        this.fandomsById[key] = { items: merged, pagination }
        return { success: true, count: items.length, pagination }
      } catch (e) {
        this.error = e?.message || 'Failed to fetch fandoms'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})

export default useSubcategoriesStore
