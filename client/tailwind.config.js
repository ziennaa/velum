/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Velum design system colors
        surface: {
          DEFAULT: '#111117',
          raised: '#16161F',
          overlay: '#1C1C26',
        },
        border: {
          DEFAULT: '#1E1E28',
          strong: '#2A2A36',
        },
        text: {
          primary: '#F4F4F6',
          secondary: '#8B8B9E',
          muted: '#52526A',
        },
        accent: {
          DEFAULT: '#6366F1',
          hover: '#818CF8',
          muted: 'rgba(99,102,241,0.15)',
          glow: 'rgba(99,102,241,0.3)',
        },
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
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
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(99,102,241,0.25)',
        'glow-sm': '0 0 10px rgba(99,102,241,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 60%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};