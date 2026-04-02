/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // 'class' strategy: dark mode is controlled by a .dark class on <html>
  // This is the safest approach — we control exactly when it toggles.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Theme-adaptive tokens ────────────────────────────────────────────
        // Values are RGB channels (e.g. "9 9 11") defined in globals.css.
        // The <alpha-value> placeholder lets Tailwind opacity modifiers work:
        //   bg-bg/80 → background-color: rgb(var(--color-bg) / 0.8)
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          raised:  'rgb(var(--color-surface-raised) / <alpha-value>)',
          overlay: 'rgb(var(--color-surface-overlay) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          strong:  'rgb(var(--color-border-strong) / <alpha-value>)',
        },
        text: {
          primary:   'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted:     'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        // ── Accent: same hue in both themes, hover lightens/darkens ─────────
        accent: {
          DEFAULT: '#6366F1',
          hover:   'rgb(var(--color-accent-hover) / <alpha-value>)',
          muted:   'rgb(99 102 241 / 0.15)',
          glow:    'rgb(99 102 241 / 0.30)',
        },
        // ── Semantic colors: fixed in both themes ───────────────────────────
        success: '#34D399',
        warning: '#FBBF24',
        danger:  '#F87171',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm:  '0.375rem',
        md:  '0.5rem',
        lg:  '0.75rem',
        xl:  '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        // Shadows are lighter on light bg, heavier on dark bg — handled via CSS var
        card:         'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        glow:    '0 0 20px rgba(99,102,241,0.25)',
        'glow-sm':'0 0 10px rgba(99,102,241,0.2)',
      },
      animation: {
        'fade-in':        'fadeIn 0.2s ease-out',
        'slide-up':       'slideUp 0.25s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow':       'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        'card-gradient':   'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 60%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};