import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCategoriesStore } from '@/store/categories'

describe('categories store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns default color and stats for unknown category', () => {
    const store = useCategoriesStore()
    expect(store.getCategoryColor('unknown')).toBe('bg-blue-600')
    expect(store.getCategoryStats('unknown')).toEqual({ communities: '250+', members: '1.2M+' })
  })

  it('returns values for known category', () => {
    const store = useCategoriesStore()
    expect(store.getCategoryColor('gaming')).toBe('bg-green-600')
    expect(store.getCategoryStats('gaming')).toEqual({ communities: '890+', members: '4.2M+' })
  })
})
