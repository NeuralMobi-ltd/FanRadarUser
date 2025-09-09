<template>
	<div :class="wrapperClass" :style="wrapperStyle" :title="alt || fullName">
		<img
			:src="safeSrc"
			:alt="alt || fullName"
			class="w-full h-full object-cover rounded-full"
			@error="onImgError"
		/>
	</div>

</template>

<script setup>
import { computed, ref } from 'vue'

const FALLBACK_URL = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'

const props = defineProps({
	src: { type: String, default: '' },
	alt: { type: String, default: '' },
	// New preferred props
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	// Back-compat props
	username: { type: String, default: '' },
	size: { type: [Number, String], default: 40 },
	customClass: { type: String, default: '' },
})

const hasImage = ref(!!props.src)

const fullName = computed(() => {
	const name = `${props.firstName || ''} ${props.lastName || ''}`.trim()
	return name || props.username || props.alt || 'User'
})

const initials = computed(() => {
	const f = (props.firstName || '').trim()
	const l = (props.lastName || '').trim()
	if (f || l) {
		return `${(f[0] || '').toUpperCase()}${(l[0] || '').toUpperCase()}` || (f[0] || 'U').toUpperCase()
	}
	const uname = (props.username || props.alt || 'U').trim()
	const [p1 = 'U', p2 = ''] = uname.split(/\s+/)
	return `${(p1[0] || 'U').toUpperCase()}${(p2[0] || '').toUpperCase()}`
})

const dimension = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
const wrapperStyle = computed(() => ({ width: dimension.value, height: dimension.value }))
const wrapperClass = computed(() => `inline-block rounded-full overflow-hidden bg-gray-200 text-gray-700 ${props.customClass}`)
// Keep for potential future styling when using text fallback again
const fallbackBg = computed(() => 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200')

const safeSrc = computed(() => {
	const v = (props.src || '').trim()
	if (!v) return FALLBACK_URL
	return v
})

function onImgError(e) {
	try {
		const img = e?.target
		if (img && img.src !== FALLBACK_URL) img.src = FALLBACK_URL
	} catch (_) {}
	hasImage.value = false
}
</script>

<style scoped>
</style>