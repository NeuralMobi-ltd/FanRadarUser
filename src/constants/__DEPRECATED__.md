This folder previously contained UI-facing constants.

Migration status as of 2025-08-15:
- communityCategories.js -> inlined into Pinia store `src/store/categories.js`
- categoryDescriptions.js -> inlined into Pinia store `src/store/categories.js`
- userCategories.js -> removed (migrated to `views/auth/ChooseCategories.vue` using categories store and local config)
- Remaining files should be avoided in app code; prefer Pinia stores or API.
