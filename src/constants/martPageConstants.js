// Product Drops for Mart Page - Limited Time Releases
export const PRODUCT_DROPS = [
  {
    id: 1,
    title: "Limited Edition Gaming Collection",
    subtitle: "Exclusive merchandise from top gaming franchises",
    image: "https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg",
    originalPrice: 199.99,
    dropPrice: 149.99,
    discount: 25,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    stockLeft: 47,
    totalStock: 100,
    urgencyLevel: "high", // high, medium, low
    badge: "HOT DROP",
    features: [
      "🎮 Exclusive Gaming Merch",
      "🔥 Limited to 100 pieces",
      "⚡ 48-hour flash sale",
      "🎁 Free premium packaging"
    ],
    category: "Gaming",
    isExclusive: true
  },
  {
    id: 2,
    title: "Anime Figure Premiere Drop",
    subtitle: "First-ever release of collectible anime figures",
    image: "https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg",
    originalPrice: 299.99,
    dropPrice: 249.99,
    discount: 17,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    stockLeft: 23,
    totalStock: 50,
    urgencyLevel: "high",
    badge: "PREMIERE",
    features: [
      "🎌 Premium Anime Collectibles",
      "✨ Hand-crafted details",
      "📦 Collector's edition box",
      "🌟 Certificate of authenticity"
    ],
    category: "Collectibles",
    isExclusive: true
  },
  {
    id: 3,
    title: "Tech Gadgets Flash Sale",
    subtitle: "Latest tech accessories at unbeatable prices",
    image: "https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg",
    originalPrice: 159.99,
    dropPrice: 99.99,
    discount: 38,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    stockLeft: 156,
    totalStock: 200,
    urgencyLevel: "medium",
    badge: "FLASH SALE",
    features: [
      "📱 Latest Tech Accessories",
      "⚡ 12-hour lightning deal",
      "🚚 Same-day shipping",
      "💯 30-day warranty"
    ],
    category: "Tech",
    isExclusive: false
  }
]

// Drop urgency messaging
export const DROP_URGENCY_MESSAGES = {
  high: {
    text: "Almost Gone!",
    color: "text-red-600",
    bgColor: "bg-red-100",
    pulse: true
  },
  medium: {
    text: "Going Fast",
    color: "text-orange-600", 
    bgColor: "bg-orange-100",
    pulse: false
  },
  low: {
    text: "Limited Time",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100", 
    pulse: false
  }
}

// Drop configuration
export const DROP_CONFIG = {
  AUTO_ROTATE_INTERVAL: 8000, // 8 seconds
  COUNTDOWN_UPDATE_INTERVAL: 1000, // 1 second
  STOCK_WARNING_THRESHOLD: 0.3, // Show warning when 30% or less stock
  URGENT_STOCK_THRESHOLD: 0.1 // Show urgent when 10% or less stock
}
