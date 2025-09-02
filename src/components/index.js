// Root components barrel aggregating domain barrels.
// Usage: import { Post, CreatePostModal, NewsPost, FandomCard, CommunityCard, StoreHeader } from '@/components'

export * from '@/components/feed'
export * from '@/components/auth'
export * from '@/components/fandom'
export * from '@/components/store'

// NOTE: Layout components intentionally not auto-exported to avoid accidental heavy imports.
// Add a layout barrel if needed later.

// Deprecated components live in _deprecated (not exported). Remove that folder after the validation window.
