import { FANDOM_DATA } from './fandomData'
import { FANDOM_DEFAULTS, generateDefaultDescription, generateDefaultFullDescription } from './fandomDefaults'

// Get fandom data by handle/name
export const getFandomData = (fandomName) => {
  // Check if we have predefined data for this fandom
  if (FANDOM_DATA[fandomName]) {
    return FANDOM_DATA[fandomName]
  }

  // Generate default fandom data
  const displayName = fandomName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    name: displayName,
    description: generateDefaultDescription(fandomName),
    fullDescription: generateDefaultFullDescription(fandomName),
    ...FANDOM_DEFAULTS
  }
}
