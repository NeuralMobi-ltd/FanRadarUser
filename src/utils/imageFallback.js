// Global <img> fallback initializer
// Replaces missing or broken images with a provided fallback URL across the app.

export function initImageFallback(fallbackUrl) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {}
  const FALLBACK = String(fallbackUrl || '').trim()
  if (!FALLBACK) return () => {}

  const markApplied = (img) => {
    try { img.dataset.fallbackApplied = 'true' } catch (_) {}
  }

  const alreadyApplied = (img) => img?.dataset?.fallbackApplied === 'true'

  const isMissingSrc = (img) => {
    const src = img?.getAttribute?.('src')
    return !src || src === 'null' || src === 'undefined' || String(src).trim() === ''
  }

  const applyIfMissing = (img) => {
    if (!(img instanceof HTMLImageElement)) return
    if (alreadyApplied(img)) return
    if (isMissingSrc(img)) {
      img.src = FALLBACK
      markApplied(img)
    }
  }

  const onError = (e) => {
    const img = e?.target
    if (!(img instanceof HTMLImageElement)) return
    if (alreadyApplied(img)) return
    // Avoid loops: if the fallback itself fails, don't keep retrying
    try {
      if (img.currentSrc === FALLBACK || img.src === FALLBACK) return
      img.src = FALLBACK
      markApplied(img)
    } catch (_) {}
  }

  document.addEventListener('error', onError, true)

  // Initial scan of existing images
  try { Array.from(document.images || []).forEach(applyIfMissing) } catch (_) {}

  // Observe DOM for new images or src changes
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') {
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.tagName === 'IMG') applyIfMissing(node)
          const imgs = node.querySelectorAll?.('img')
          if (imgs?.length) imgs.forEach(applyIfMissing)
        }
      } else if (m.type === 'attributes' && m.attributeName === 'src') {
        const el = m.target
        if (el instanceof HTMLImageElement) applyIfMissing(el)
      }
    }
  })

  try {
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    })
  } catch (_) {}

  // Return cleanup
  return () => {
    try { document.removeEventListener('error', onError, true) } catch (_) {}
    try { observer.disconnect() } catch (_) {}
  }
}

export default initImageFallback
