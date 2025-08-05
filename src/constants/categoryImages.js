// Category images mapping
export const categoryImages = {
  'sport': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=400&fit=crop',
  'music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
  'tech': 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg',
  'gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
  'anime': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
  'movies': 'https://www.wondermind.com/wp-content/uploads/2024/09/20-Feel-Good-Movies-People-Swear-By-For-Your-Next-Bad-Day.jpg?w=960',
  'books': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
  'art': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop',
  'tv-shows': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=400&fit=crop',
  'comics': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&h=400&fit=crop',
  'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
  'photography': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=400&fit=crop'
}

// Helper function to get category image
export const getCategoryImage = (categoryName) => {
  return categoryImages[categoryName] || 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop'
}
