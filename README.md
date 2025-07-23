## Project Architecture

This project is a Vue 3 application structured for an admin and writer portal, using Pinia for state management and Vue Router for navigation. The main folders and their purposes are:

- **src/components/**: Reusable UI components (e.g., Topbar, Sidebar, Pagination, PostCard, StatCard, etc.).
- **src/views/**: Page-level views, organized by feature (admin, writer, auth, etc.).
- **src/layouts/**: Layout components for different sections (e.g., DashboardLayout, AuthLayout).
- **src/store/**: Pinia stores for state management (e.g., auth.js for authentication state).
- **src/router/**: Vue Router configuration and route definitions.
- **src/mock/**: Mock data for development/testing (e.g., mockPosts).
- **src/assets/**: Static assets like images and icons.
- **src/index.css**: Global styles, using Tailwind CSS for utility-first styling.
- **src/main.js**: App entry point, sets up Vue, Pinia, Router, and global styles.
- **App.vue**: Root component, renders the main layout and router view.

### Main Features
- **Authentication**: Login, signup, password reset, and role-based access (admin/writer).
- **Admin Dashboard**: User management, content moderation, fandom tracking, shop management, analytics.
- **Writer Portal**: Post creation (articles, images, videos, polls), editing, and submission for review.
- **Reusable Components**: Cards, tables, pagination, charts, and more.
- **Layouts**: Dashboard and Auth layouts for consistent UI.
- **Mock Data**: Used for development/demo purposes.

## How to Run the Project

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run serve
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Run unit tests**

   ```bash
   npm run test:unit
   ```

5. **Lint and fix files**

   ```bash
   npm run lint
   ```

---

For more details, see the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
