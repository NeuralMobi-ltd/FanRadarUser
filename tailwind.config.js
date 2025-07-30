export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          dark: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#001935',
            960: '#000',
          },
          accent: {
            50: '#fff0f6',
            100: '#ffe0ec',
            200: '#fab8d9',
            300: '#f191c1',
            400: '#e858a2',
            500: '#bc1c74',
            600: '#ab0c65',
            700: '#92034a',
            800: '#6f0035',
            900: '#4a0022',
          },
          success: {
            100: '#d1fae5',
            500: '#10b981',
            700: '#047857',
          },
          warning: {
            100: '#fef3c7',
            500: '#f59e0b',
            700: '#b45309',
          },
          error: {
            100: '#fee2e2',
            500: '#ef4444',
            700: '#b91c1c',
          }
        }
      },
    },
    plugins: [],
  }
