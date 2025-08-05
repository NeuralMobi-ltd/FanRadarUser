// Category colors mapping
export const categoryColors = {
  'sport': 'bg-orange-600',
  'music': 'bg-pink-600',
  'tech': 'bg-gray-600',
  'gaming': 'bg-green-600',
  'anime': 'bg-purple-600',
  'movies': 'bg-yellow-600',
  'books': 'bg-amber-600',
  'art': 'bg-purple-600',
  'tv-shows': 'bg-indigo-600',
  'comics': 'bg-blue-600',
  'fashion': 'bg-rose-600',
  'photography': 'bg-teal-600'
}

// Helper function to get category color
export const getCategoryColor = (categoryName) => {
  return categoryColors[categoryName] || 'bg-blue-600'
}
