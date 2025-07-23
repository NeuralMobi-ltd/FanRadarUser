module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Updated color palette from PDF
        primary: {
          DEFAULT: '#0372ff', // Bleu Radar
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8d8ff',
          300: '#79b8ff',
          400: '#0372ff',
          500: '#0066e6',
          600: '#0052b8',
          700: '#00418f',
        },
        secondary: {
          DEFAULT: '#2367b1', // Bleu Profond
          50: '#f2f6fc',
          100: '#e1ebf7',
          200: '#c3d7ef',
          300: '#2367b1',
          400: '#1e5999',
          500: '#1a4b80',
          600: '#153d66',
        },
        tertiary: {
          DEFAULT: '#79c2be', // Menthe Fraîche
          50: '#f0f9f8',
          100: '#d9f0ee',
          200: '#b5e1de',
          300: '#79c2be',
          400: '#5ab3af',
          500: '#3da39f',
        },
        accent1: {
          DEFAULT: '#ffca08', // Jaune Soleil
          50: '#fffceb',
          100: '#fff6c6',
          200: '#ffea88',
          300: '#ffca08',
          400: '#ffc000',
          500: '#e6b000',
        },
        accent2: {
          DEFAULT: '#ec781d', // Orange Punch
          50: '#fef6ee',
          100: '#fde9d6',
          200: '#fbd0ad',
          300: '#ec781d',
          400: '#d46c1a',
          500: '#bb6017',
        },
        error: {
          DEFAULT: '#e63946', // Rouge Fanatique
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d5',
          300: '#f7aab2',
          400: '#e63946',
          500: '#cf333f',
        },
        dark: {
          DEFAULT: '#0c1729',
          900: '#0c1729',
          800: '#1a293f',
          700: '#283c55',
        },
        light: {
          DEFAULT: '#f8fafc',
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
        },
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        // Adding a more playful font option
        comic: ['"Comic Neue"', 'cursive'],
      },
      backgroundImage: {
        'fandom-pattern': "radial-gradient(circle at 10% 20%, rgba(255, 202, 8, 0.2) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(236, 120, 29, 0.1) 0%, transparent 20%)",
        'radar-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMzcyZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNSw1Ii8+CiAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlYzc4MWQiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iNSw1Ii8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')",
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}