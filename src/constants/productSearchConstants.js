// Product search filter constants

export const PRICE_RANGES = [
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: '$200 & Above' }
]

export const PRODUCT_CATEGORIES = [
  { id: 1, name: 'Electronics', count: 67 },
  { id: 2, name: 'Clothing', count: 32 },
  { id: 3, name: 'Collectibles', count: 45 },
  { id: 4, name: 'Home & Living', count: 28 },
  { id: 5, name: 'Accessories', count: 18 }
]

export const PRODUCT_BRANDS = [
  { id: 1, name: 'Razer', count: 15 },
  { id: 2, name: 'Corsair', count: 12 },
  { id: 3, name: 'SteelSeries', count: 8 },
  { id: 4, name: 'HyperX', count: 10 },
  { id: 5, name: 'ASUS', count: 7 },
  { id: 6, name: 'Secretlab', count: 5 }
]

export const RATING_FILTERS = [
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' }
]

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest' }
]

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list'
}

export const PAGINATION_CONFIG = {
  DEFAULT_ITEMS_PER_PAGE: 20,
  PAGINATION_DELTA: 2
}

export const SEARCH_CONFIG = {
  DEFAULT_VIEW_MODE: VIEW_MODES.GRID,
  DEFAULT_SORT: 'relevance'
}

export const MOCK_CATEGORIES = [
  // Example mock categories
  { id: 1, name: 'Electronics', icon: 'fas fa-tv', productCount: 120 },
  { id: 2, name: 'Fashion', icon: 'fas fa-tshirt', productCount: 80 }
];

export const MOCK_BRANDS = [
  // Example mock brands
  { id: 1, name: 'Brand A', logo: '/images/brand-a.png', productCount: 50 },
  { id: 2, name: 'Brand B', logo: '/images/brand-b.png', productCount: 30 }
];

export const MOCK_PRODUCTS = [
  // Example mock products
  { id: 1, name: 'Smartphone', image: '/images/smartphone.png', price: 299, category: 'Electronics' },
  { id: 2, name: 'T-Shirt', image: '/images/tshirt.png', price: 19, category: 'Fashion' }
];

export const POPULAR_PRODUCTS = [
  // Example popular products
  { id: 1, name: 'Smartphone', price: 299, category: 'Electronics' },
  { id: 2, name: 'T-Shirt', price: 19, category: 'Fashion' }
];
