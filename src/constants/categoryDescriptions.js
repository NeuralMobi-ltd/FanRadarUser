// Category descriptions for different content categories
export const categoryDescriptions = {
  'sport': 'Connect with sports fans, follow your favorite teams, and discuss the latest games and events.',
  'music': 'Share your favorite tracks, discover new artists, and connect with music lovers worldwide.',
  'tech': 'Stay updated on the latest tech news, product releases, and industry trends.',
  'gaming': 'Find gaming communities, share gameplay strategies, and connect with fellow gamers.',
  'anime': 'Discuss your favorite anime series, share fan art, and stay updated on new releases.',
  'movies': 'Talk about the latest blockbusters, classic films, and connect with movie enthusiasts.',
  'books': 'Explore literary discussions, book recommendations, and connect with fellow readers.',
  'art': 'Share your artwork, discover talented artists, and join creative communities.',
  'tv-shows': 'Discuss episodes, theories, and news about your favorite TV series.',
  'comics': 'Connect with comic book fans, discuss storylines, and share your favorite characters.',
  'fashion': 'Stay on top of trends, share outfit inspirations, and connect with fashion enthusiasts.',
  'photography': 'Share your photos, learn techniques, and connect with photographers worldwide.'
}

// Helper function to get category description
export const getCategoryDescription = (categoryName, formattedName) => {
  return categoryDescriptions[categoryName] || `Join the ${formattedName} community and connect with fellow enthusiasts.`
}
