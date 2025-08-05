// Category statistics mapping
export const categoryStats = {
  'sport': { communities: '450+', members: '2.5M+' },
  'music': { communities: '680+', members: '3.8M+' },
  'tech': { communities: '320+', members: '1.7M+' },
  'gaming': { communities: '890+', members: '4.2M+' },
  'anime': { communities: '750+', members: '3.1M+' },
  'movies': { communities: '520+', members: '2.8M+' },
  'books': { communities: '280+', members: '1.5M+' },
  'art': { communities: '340+', members: '1.9M+' },
  'tv-shows': { communities: '620+', members: '3.4M+' },
  'comics': { communities: '430+', members: '2.3M+' },
  'fashion': { communities: '290+', members: '1.6M+' },
  'photography': { communities: '380+', members: '2.1M+' }
}

// Helper function to get category stats
export const getCategoryStats = (categoryName) => {
  return categoryStats[categoryName] || { communities: '250+', members: '1.2M+' }
}
