// Simple shared image helpers to avoid coupling to any config

export function getHashtagImage(tag = '') {
  const key = String(tag || '').toLowerCase()
  const map = {
    gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop',
    music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=600&fit=crop',
    anime: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop',
    trending: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=600&fit=crop'
  }
  return map[key] || '/images/FanRadar.png'
}

export function getCategoryImage(categoryName = '') {
  const key = String(categoryName || '').toLowerCase()
  const map = {
    sport: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&h=600&fit=crop',
    gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop',
    anime: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop',
    music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=600&fit=crop',
    movies: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=1600&h=600&fit=crop'
  }
  return map[key] || '/images/FanRadar.png'
}

export default { getHashtagImage, getCategoryImage }
