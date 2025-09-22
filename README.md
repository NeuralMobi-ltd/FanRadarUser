<div align="center">

# FanRadar

### A Social + Commerce Platform for Fandom Communities

Connect with other fans, create & edit rich media posts, discover trending fandoms & hashtags, and purchase official merchandise — all in one unified responsive interface.

</div>

---

## Table of Contents
1. [Core Features](#core-features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Architecture Overview](#architecture-overview)
8. [Data & State Flow](#data--state-flow)
9. [UI / UX Conventions](#ui--ux-conventions)
10. [Internationalization (i18n)](#internationalization-i18n)
11. [Testing](#testing)
12. [Deployment Notes](#deployment-notes)
13. [Performance & Responsiveness](#performance--responsiveness)
14. [Roadmap / Ideas](#roadmap--ideas)
15. [Contributing](#contributing)
16. [License](#license)

---

## Core Features

### Community & Social
- Create / edit posts with text, images, videos, tags & scheduling (draft support depending on backend)
- Fandom discovery & membership (trending fandoms & hashtags side panels)
- Post interactions (likes / comments / favorites) – supported via store & services layers
- Category & subcategory classification with enforced subcategory selection when required
- Real‑time style UX patterns (optimistic UI areas prepared; event dispatch `posts:created`)

### Commerce (Store Module)
- Product browsing, categories, subcategories, brands
- Cart, orders, order detail, favorites/wishlist
- Ratings & reviews (ratings modal components)

### Search & Discovery
- Global search layout with dedicated sidebar
- Tag & hashtag exploration
- Trending blocks for fandoms & hashtags

### User & Auth
- Registration flow with age validation (min 8 years)
- Token auto‑login via `?token=` query handling
- Dark / light theme toggle (class-based `dark`)
- Mobile bottom navigation for authenticated non-auth pages

### UX Enhancements
- Highly tuned mobile layouts (Create Post modal, hashtag pills, responsive grids)
- Adaptive scaling on large screens (root `html` font-size reduced for compact view)
- Smooth modals & animated transitions (`animate-in`, fade / zoom utilities)

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite |
| Styling | Tailwind CSS (+ custom responsive utilities) |
| State | Pinia |
| Routing | Vue Router 4 |
| i18n | `vue-i18n` |
| HTTP | Axios (encapsulated in service modules) |
| Icons | Font Awesome, Heroicons, Lucide (subset) |
| Charts (optional views) | Chart.js |
| Testing | Vitest + @vue/test-utils + happy-dom |

---

## Project Structure
```
src/
   App.vue                # Root component / layout router switching
   main.js                # App bootstrap (Pinia, Router, i18n, theme init)
   index.css              # Tailwind layers + global responsive adjustments
   assets/styles/         # SCSS partials (buttons, global)
   components/
      common/              # Reusable UI (modals, avatars, posts)
      layout/              # Header, Sidebar, Mobile nav, Search sidebars
      store/               # Store-centric UI (cart, orders, product search)
   layouts/               # High-level page layout wrappers
   router/                # Route definitions & guards (token auto-login)
   services/              # API abstraction modules (postsService, usersService...)
   store/                 # Pinia stores (auth, posts, products, categories...)
   i18n/                  # i18n initialization & locale resources
   utils/                 # Helpers (media, notify, cookies, asset fallback)
   views/                 # Page-level views grouped by domain
public/
   _redirects             # SPA fallback (Netlify / CF Pages)
   .htaccess              # Apache history API routing
tailwind.config.js       # Theme extension / safelist config
vite.config.js           # Vite build configuration
```

---

## Getting Started
### Prerequisites
- Node.js ≥ 18.x (Recommended LTS)
- npm ≥ 9 (bundled with Node LTS) or pnpm/yarn if preferred

### Clone & Install
```bash
git clone https://github.com/yassinelaouni/FanRadarUser.git
cd FanRadarUser
npm install
```

### Environment File
Create `.env.local` (ignored by git) if you need to override defaults:
```bash
VITE_API_BASE_URL=https://api.fanradars.com/api
```
If omitted, the code falls back to that same default.

### Run Dev Server
```bash
npm run dev
```
Visit: http://localhost:5173 (Vite default, or the port shown in terminal)

### Production Build
```bash
npm run build
```
Preview the build locally:
```bash
npm run preview
```

---

## Environment Variables
| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_BASE_URL` | Base API endpoint (should include `/api` if backend routes expect it) | `https://api.fanradars.com/api` |

All variables must be prefixed with `VITE_` to be exposed to the client by Vite.

---

## Available Scripts
| Script | Description |
|--------|-------------|
| `dev` | Start Vite dev server with HMR |
| `build` | Create production build in `dist/` |
| `preview` | Serve the production build locally |
| `test` | Run unit tests once (Vitest) |
| `test:watch` | Run tests in watch mode |

---

## Architecture Overview
### Routing & Layout Switching
`App.vue` chooses between: landing, auth-less community, store, search, or general community layouts based on route & auth state. Guard logic (e.g., token auto-login) resides in the router setup.

### State Management (Pinia)
Stores follow domain separation: `auth`, `posts`, `products`, `categories`, `fandoms`, `cart`, `notifications`, etc. Stores act as the single source of truth; constants have been deprecated.

### Services Layer
API calls centralized (`services/*.js`) wrapping Axios; each file groups related endpoints (e.g. `postsService`, `ordersService`). This isolates network concerns from components.

### Media & Uploads
`normalizeMediaUrl` cleans API-returned paths (removes duplicated `/api/storage`). Media selection uses FileReader for immediate previews; existing URLs and new files are combined in payloads.

### Posting Flow
`CreatePostModal` supports create & edit modes, dynamic tag input, scheduling (optional), category/subcategory enforcement, optimistic event dispatch, responsive mobile adjustments.

### Internationalization
`src/i18n/index.js` initializes `vue-i18n`. New user-facing strings should reference keys instead of raw literals (ongoing migration for legacy text).

### Theming
Dark mode toggled via the `dark` class on `html` (Tailwind class-based strategy). Gradient & brand color palettes extended in `tailwind.config.js`.

### Responsive Strategy
- Mobile-first utilities with selective desktop compaction
- Root font-size reduced on large breakpoints for dense layouts
- Mobile bottom nav appears conditionally (`showBottomNav` computed)

---

## Data & State Flow
1. **Auth**: Token stored (likely in local storage / cookies via helpers); stores hydrate on app init.
2. **Fetch**: Components request data via store actions that delegate to services.
3. **Transform**: Services normalize payloads (e.g., media URLs) before committing.
4. **Render**: Components consume reactive store state; derived data via `computed`.
5. **Mutate**: User interactions trigger store actions → API → optimistic or confirmed update.

Event example: after a successful new post, a `CustomEvent('posts:created')` is dispatched to allow non-parent listeners to react.

---

## UI / UX Conventions
- Minimum mobile touch target: 44px (enforced via utility classes and CSS overrides)
- Compact tag pills & toolbars for narrow screens
- Progressive disclosure: tag input only renders when toggled or tags present
- Adaptive textarea auto-resizing with max height on mobile
- Consistent modal animation primitives (`fade-in`, `zoom-in`)

---

## Internationalization (i18n)
Add new keys in the locale resource file (e.g., `en.json` or inline messages object). Example pattern:
```js
// i18n/en.js
export default {
   common: { post: 'Post', cancel: 'Cancel' },
   errors: { required: 'This field is required.' }
}
```
Usage in a component:
```vue
<button>{{ $t('common.post') }}</button>
```
Migration task (in progress): replace remaining hardcoded auth & modal texts with translation keys.

---

## Testing
Vitest + `@vue/test-utils` + `happy-dom` for component unit tests.
Run once:
```bash
npm test
```
Watch mode:
```bash
npm run test:watch
```
Add tests under `tests/unit/*.spec.js`.

Recommended additional coverage targets:
- Store actions (auth, posts creation)
- Services (mock Axios, assert payload shapes)
- Edge-case rendering (empty states, error banners)

---

## Deployment Notes
Static build (Vite) → host on any static provider.

Already included:
- `public/_redirects` for Netlify / Cloudflare Pages SPA fallback
- `public/.htaccess` for Apache history mode rewrite

Build artifacts:
```bash
npm run build
```
Upload `dist/` folder to host.

Caching tip: Enable immutable caching for hashed assets and short cache for `index.html`.

---

## Performance & Responsiveness
- Root font-size scaling (desktop compaction) reduces perceived whitespace without forcing browser zoom changes.
- Horizontal scroll optimization for tag lists (no scrollbars shown; momentum scroll on mobile)
- Lazy asset loading strategy can be added (future enhancement) using dynamic imports & IntersectionObserver.

Potential future improvements:
- Image optimization pipeline (responsive `srcset`)
- Post list virtualization for very large feeds
- Service worker for offline shell / caching

---

## Roadmap / Ideas
- Real-time updates via WebSockets (live post & notification streaming)
- Expanded moderation tools (reporting, admin dashboards)
- User-to-user direct messaging
- Advanced analytics dashboards (existing Chart.js foundation)
- Theme customization (user-defined accent color)

---

## Contributing
1. Fork & create a feature branch
2. Ensure tests pass (`npm test`)
3. Keep commits scoped & conventional (e.g., `feat:`, `fix:`)
4. Open a PR describing motivation & changes

Code style follows project conventions (Tailwind utility-first + Composition API). ESLint/Prettier config can be added if alignment drifts.

---

## License
Distributed under the terms of the project LICENSE (see `LICENSE`).

---

### Quick Start (TL;DR)
```bash
git clone https://github.com/yassinelaouni/FanRadarUser.git
cd FanRadarUser
npm install
cp .env.example .env.local   # (create if you need overrides)
npm run dev
```

Happy building with FanRadar! If you need an additional deployment, i18n, or performance guide, open an issue or request a doc section.
