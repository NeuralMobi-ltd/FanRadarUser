import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryDetail from '@/views/content/CategoryDetail.vue'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: { content: { category: { label: 'Category', communities: 'communities', members: 'members', tabs: { fandoms: 'Fandoms', posts: 'Posts', news: 'News' }, empty: { fandoms: 'No fandoms', posts: 'No posts', news: 'No news' } } }, common: { join: 'Join', contentComingSoon: 'Coming soon', sectionUnderDevelopment: 'Under dev' } } }
})

describe('CategoryDetail.vue', () => {
  it('renders and uses store getters for color/stats', () => {
    const wrapper = mount(CategoryDetail, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              categories: {
                descriptions: { gaming: 'Gaming desc' },
                colors: { gaming: 'bg-green-600' },
                stats: { gaming: { communities: '1', members: '2' } }
              }
            }
          }),
          i18n
        ],
        mocks: {
          $route: { params: { category: 'gaming' } }
        }
      }
    })

    expect(wrapper.html()).toContain('Gaming')
    expect(wrapper.html()).toContain('bg-green-600')
    expect(wrapper.html()).toContain('1')
    expect(wrapper.html()).toContain('2')
  })
})
