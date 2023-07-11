import defaultTheme from 'tailwindcss/defaultTheme';

import tokens from '@eduzz/ui-tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [tokens.font.family.base, ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'belt-white': tokens.belt.background.white,
        'belt-red': tokens.belt.background.red,
        'belt-orange': tokens.belt.background.orange,
        'belt-green': tokens.belt.background.green,
        'belt-black': tokens.belt.background.black,
        'belt-golden': tokens.belt.background.golden,
        'belt-white-foreground': tokens.belt.foreground.white,
        'belt-red-foreground': tokens.belt.foreground.red,
        'belt-orange-foreground': tokens.belt.foreground.orange,
        'belt-green-foreground': tokens.belt.foreground.green,
        'belt-black-foreground': tokens.belt.foreground.black,
        'belt-golden-foreground': tokens.belt.foreground.golden
      },
      screens: {
        'sm': tokens.breakpoints.sm,
        'md': tokens.breakpoints.md,
        'lg': tokens.breakpoints.lg,
        'xl': tokens.breakpoints.xl,
        '2xl': tokens.breakpoints.xxl
      },
      fontSize: {
        'sm': tokens.font.size.xxxs,
        'base': tokens.font.size.xs,
        'xl': tokens.font.size.sm,
        '2xl': tokens.font.size.md,
        '3xl': tokens.font.size.lg,
        '4xl': tokens.font.size.xl
      },
      animation: {
        overlay: 'fade 200ms linear'
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    }
  },
  plugins: []
};
