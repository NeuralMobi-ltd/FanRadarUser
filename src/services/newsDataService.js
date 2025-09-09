// Lightweight service for Newsdata.io public API
// Note: For production, prefer proxying via your backend to hide the API key.

const BASE_URL = 'https://newsdata.io/api/1/latest'

function buildQuery(params = {}) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    if (Array.isArray(v)) {
      v.forEach((item) => sp.append(k, item))
    } else {
      sp.set(k, v)
    }
  })
  return sp.toString()
}

export async function fetchLatestNews({
  apiKey,
  q,
  language,
  country,
  category,
  page,
  nextPage,
} = {}) {
  const key = apiKey || import.meta.env.VITE_NEWSDATA_API_KEY || 'pub_a0666803cc034865af0e1f1ac8a6edc2'
  const params = {
    apikey: key,
    q,
    language,
    country,
    category,
  page: nextPage || page,
  }
  // Remove undefined
  Object.keys(params).forEach((k) => params[k] == null && delete params[k])

  const url = `${BASE_URL}?${buildQuery(params)}`
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`News API error ${res.status}: ${text || res.statusText}`)
  }
  const data = await res.json()
  if (data && data.status && data.status !== 'success') {
    const msg = data?.results?.message || data?.message || 'News API returned an error'
    const code = data?.results?.code || data?.code
    const err = new Error(msg)
    err.code = code
    throw err
  }
  return data
}

export default { fetchLatestNews }
