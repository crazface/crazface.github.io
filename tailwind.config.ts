import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '0' }], // 48px
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '0' }], // 48px
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '0' }], // 32px
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0' }], // 24px
        'body': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.1px' }], // 18px
        'small': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.1px' }], // 14px
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
      },
      maxWidth: {
        'grid': '1200px',
      },
      spacing: {
        'gutter': '1.5rem', // 24px
        'section': '4.5rem', // 72px
      },
      borderRadius: {
        'lg': '1.5rem', // 24px
        'md': 'calc(var(--radius) - 2px)',
        'sm': '0.75rem', // 12px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'glass': {
          'tint': 'var(--glass-tint)',
          'stroke': 'var(--glass-stroke)',
        },
        'text': {
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
        }
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.12)',
        'tile-hover': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        "fade-in": "fade-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up": "slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "tile-hover": "tile-hover 0.08s cubic-bezier(0.22, 1, 0.36, 1)",
        "tile-hover-out": "tile-hover-out 0.12s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "tile-hover": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.03)" },
        },
        "tile-hover-out": {
          "0%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      gridRow: {
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
