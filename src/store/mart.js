import { defineStore } from 'pinia'

export const useMartStore = defineStore('mart', {
  state: () => ({
    // Hero content
    heroContent: {
      title: 'FanRadar Official Store',
      subtitle: 'Discover exclusive merchandise from your favorite fandoms'
    },
    heroFeatures: [
      { icon: '✨', text: 'New Arrivals' },
      { icon: '🚚', text: 'Free Shipping' },
      { icon: '💎', text: 'Premium Quality' }
    ],

    // UI options
    priceRanges: [
      { value: '', label: 'All Prices' },
      { value: '0-25', label: '$0 - $25' },
      { value: '25-50', label: '$25 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100+', label: '$100+' }
    ],
    sortOptions: [
      { value: 'featured', label: 'Featured' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'newest', label: 'Newest' }
    ],
    config: {
      DEFAULT_ITEMS_PER_PAGE: 12,
      DEFAULT_SORT: 'featured',
      DEFAULT_CATEGORY: '',
      DEFAULT_PRICE_RANGE: ''
    },

    // Drops
    productDrops: [
      {
        id: 1,
        title: 'Limited Edition Gaming Collection',
        subtitle: 'Exclusive merchandise from top gaming franchises',
        image: 'https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg',
        originalPrice: 199.99,
        dropPrice: 149.99,
        discount: 25,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        stockLeft: 47,
        totalStock: 100,
        urgencyLevel: 'high',
        badge: 'HOT DROP',
        features: [
          '🎮 Exclusive Gaming Merch',
          '🔥 Limited to 100 pieces',
          '⚡ 48-hour flash sale',
          "🎁 Free premium packaging"
        ],
        category: 'Gaming',
        isExclusive: true
      },
      {
        id: 2,
        title: 'Anime Figure Premiere Drop',
        subtitle: 'First-ever release of collectible anime figures',
        image: 'https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg',
        originalPrice: 299.99,
        dropPrice: 249.99,
        discount: 17,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        stockLeft: 23,
        totalStock: 50,
        urgencyLevel: 'high',
        badge: 'PREMIERE',
        features: [
          '🎌 Premium Anime Collectibles',
          '✨ Hand-crafted details',
          "📦 Collector's edition box",
          '🌟 Certificate of authenticity'
        ],
        category: 'Collectibles',
        isExclusive: true
      },
      {
        id: 3,
        title: 'Tech Gadgets Flash Sale',
        subtitle: 'Latest tech accessories at unbeatable prices',
        image: 'https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg',
        originalPrice: 159.99,
        dropPrice: 99.99,
        discount: 38,
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
        stockLeft: 156,
        totalStock: 200,
        urgencyLevel: 'medium',
        badge: 'FLASH SALE',
        features: [
          '📱 Latest Tech Accessories',
          '⚡ 12-hour lightning deal',
          '🚚 Same-day shipping',
          '💯 30-day warranty'
        ],
        category: 'Tech',
        isExclusive: false
      }
    ],

    // Urgency styles/messages
    dropUrgencyMessages: {
      high: {
        text: 'Almost Gone!',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        pulse: true
      },
      medium: {
        text: 'Going Fast',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        pulse: false
      },
      low: {
        text: 'Limited Time',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        pulse: false
      }
    },

    // Timing config
    dropConfig: {
      AUTO_ROTATE_INTERVAL: 8000,
      COUNTDOWN_UPDATE_INTERVAL: 1000,
      STOCK_WARNING_THRESHOLD: 0.3,
      URGENT_STOCK_THRESHOLD: 0.1
    }
  })
})
