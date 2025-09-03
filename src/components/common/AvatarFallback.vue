<template>
  <div v-if="!src" :class="[baseClass, customClass]" :style="computedStyle" role="img" :aria-label="alt">
    <span :class="textClass">{{ initials }}</span>
  </div>
  <img v-else :src="src" :alt="alt" :class="[baseImgClass, customClass]" :style="style" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: String,
  alt: { type: String, default: 'User avatar' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  username: { type: String, default: '' },
  initialsLength: { type: Number, default: 2 }, // max chars to show
  size: { type: [Number, String], default: 40 }, // px (Number) or any CSS (String)
  customClass: { type: String, default: '' },
  style: { type: [String, Object], default: '' }
})

// Derive initials (up to initialsLength). Priority: first + last first chars; else first two of firstName; else first two of username; else 'U'.
const initials = computed(() => {
  const fn = (props.firstName || '').trim()
  const ln = (props.lastName || '').trim()
  let result = ''
  if (fn && ln) {
    result = fn[0] + ln[0]
  } else if (fn.length >= 2) {
    result = fn.slice(0, 2)
  } else if (fn) {
    result = fn[0]
  } else if (props.username) {
    result = props.username.slice(0, 2)
  }
  result = result.toUpperCase()
  if (!result) return 'U'
  return result.slice(0, props.initialsLength)
})

// Deterministic color based on name/username.
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

const colorSeed = computed(() => {
  const base = (props.firstName + props.lastName) || props.username || initials.value
  return hash(base)
})

// Generate an HSL color with good contrast.
const bgHsl = computed(() => {
  const h = colorSeed.value % 360
  const s = 65
  const l = 45
  return `hsl(${h} ${s}% ${l}%)`
})

// Decide text color (light/dark) based on luminance approximation.
const textColor = computed(() => {
  // Convert HSL to relative luminance approximation: use L directly threshold.
  const lMatch = /\d+%\s*\)$/i.test(bgHsl.value) ? Number(bgHsl.value.split(' ')[2].replace(/%\)/, '')) : 45
  return lMatch > 55 ? '#1f2937' : '#ffffff'
})

const dimension = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)

const baseClass = 'rounded-full flex items-center justify-center select-none'
const baseImgClass = 'rounded-full object-cover'
const textClass = 'font-bold tracking-wide'

const computedStyle = computed(() => ({
  width: dimension.value,
  height: dimension.value,
  background: bgHsl.value,
  color: textColor.value,
  fontSize: `calc(${dimension.value} * 0.45)` ,
  ... (typeof props.style === 'object' ? props.style : {})
}))
</script>
