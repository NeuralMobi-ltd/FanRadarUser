// Mart page constants

export const MART_CATEGORIES = [
  'Apparel', 
  'Accessories', 
  'Home & Living', 
  'Tech Gadgets', 
  'Collectibles', 
  'Books', 
  'Posters'
]

export const MART_PRICE_RANGES = [
  { value: '', label: 'All Prices' },
  { value: '0-25', label: '$0 - $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100+', label: '$100+' }
]

export const MART_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
]

export const MART_CONFIG = {
  DEFAULT_ITEMS_PER_PAGE: 12,
  DEFAULT_SORT: 'featured',
  DEFAULT_CATEGORY: '',
  DEFAULT_PRICE_RANGE: ''
}

export const MART_HERO_FEATURES = [
  { icon: '✨', text: 'New Arrivals' },
  { icon: '🚚', text: 'Free Shipping' },
  { icon: '💎', text: 'Premium Quality' }
]

export const MART_HERO_CONTENT = {
  title: 'FanRadar Official Store',
  subtitle: 'Discover exclusive merchandise from your favorite fandoms'
}
