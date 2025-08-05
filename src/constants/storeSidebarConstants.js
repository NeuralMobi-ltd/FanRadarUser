// Store sidebar constants

export const STORE_HEADER = {
  title: 'FanRadar Store',
  subtitle: 'Premium Merchandise',
  icon: 'fas fa-store'
}

export const STORE_CATEGORIES = [
  {
    name: 'All Products',
    path: '/mart',
    slug: 'all',
    icon: 'fas fa-th-large'
  },
  {
    name: 'Apparel',
    path: '/mart?category=apparel',
    slug: 'apparel',
    icon: 'fas fa-tshirt'
  },
  {
    name: 'Accessories',
    path: '/mart?category=accessories',
    slug: 'accessories', 
    icon: 'fas fa-gem'
  },
  {
    name: 'Home & Living',
    path: '/mart?category=home',
    slug: 'home',
    icon: 'fas fa-home'
  },
  {
    name: 'Tech Gadgets',
    path: '/mart?category=tech',
    slug: 'tech',
    icon: 'fas fa-laptop'
  },
  {
    name: 'Collectibles',
    path: '/mart?category=collectibles',
    slug: 'collectibles',
    icon: 'fas fa-trophy'
  },
  {
    name: 'Books',
    path: '/mart?category=books',
    slug: 'books',
    icon: 'fas fa-book'
  }
]

export const QUICK_ACTIONS = [
  {
    name: 'View Cart',
    path: '/cart',
    icon: 'shopping-cart',
    iconType: 'svg',
    style: 'primary',
    badge: true
  },
  {
    name: 'My Orders',
    path: '/orders',
    icon: 'clipboard-list',
    iconType: 'svg',
    style: 'secondary'
  }
]

export const SIDEBAR_SECTIONS = {
  categories: {
    title: 'Categories',
    icon: 'fas fa-th-large'
  },
  brands: {
    title: 'Popular Brands',
    icon: 'fas fa-star'
  },
  priceRange: {
    title: 'Price Range',
    icon: 'fas fa-dollar-sign'
  },
  productDrop: {
    title: 'Exclusive Drop',
    icon: 'fas fa-fire'
  },
  quickActions: {
    title: 'Quick Actions',
    icon: 'fas fa-bolt'
  }
}

export const PRODUCT_DROPS = [
  {
    id: 1,
    name: 'Limited Edition Anime Collection',
    description: 'Exclusive merchandise from top anime series',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
    originalPrice: 199.99,
    dropPrice: 149.99,
    timeLeft: '2 days',
    itemsLeft: 15,
    totalItems: 50,
    badge: 'HOT',
    badgeColor: 'red'
  },
  {
    id: 2,
    name: 'Gaming Legends Pack',
    description: 'Rare collectibles from iconic games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
    originalPrice: 299.99,
    dropPrice: 199.99,
    timeLeft: '5 hours',
    itemsLeft: 8,
    totalItems: 25,
    badge: 'ENDING SOON',
    badgeColor: 'orange'
  },
  {
    id: 3,
    name: 'K-Pop Exclusive Bundle',
    description: 'Signed memorabilia and rare items',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    originalPrice: 149.99,
    dropPrice: 99.99,
    timeLeft: '1 week',
    itemsLeft: 32,
    totalItems: 100,
    badge: 'NEW',
    badgeColor: 'green'
  }
]
