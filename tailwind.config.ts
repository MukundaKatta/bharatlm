import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8ed',
          100: '#ffeed4',
          200: '#ffd9a8',
          300: '#ffbe71',
          400: '#ff9838',
          500: '#ff7b11',
          600: '#f06006',
          700: '#c74807',
          800: '#9e390e',
          900: '#7f310f',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4338ca',
          600: '#3730a3',
          700: '#312e81',
          800: '#23215e',
          900: '#1e1b4b',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        bharat: {
          saffron: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
          navy: '#000080',
          chakra: '#000080',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'Noto Sans', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-noto-devanagari)', 'Noto Sans Devanagari', 'sans-serif'],
        tamil: ['var(--font-noto-tamil)', 'Noto Sans Tamil', 'sans-serif'],
        telugu: ['var(--font-noto-telugu)', 'Noto Sans Telugu', 'sans-serif'],
        kannada: ['var(--font-noto-kannada)', 'Noto Sans Kannada', 'sans-serif'],
        malayalam: ['var(--font-noto-malayalam)', 'Noto Sans Malayalam', 'sans-serif'],
        bengali: ['var(--font-noto-bengali)', 'Noto Sans Bengali', 'sans-serif'],
        gujarati: ['var(--font-noto-gujarati)', 'Noto Sans Gujarati', 'sans-serif'],
        gurmukhi: ['var(--font-noto-gurmukhi)', 'Noto Sans Gurmukhi', 'sans-serif'],
        oriya: ['var(--font-noto-oriya)', 'Noto Sans Oriya', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'indic-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'indic-base': ['1.0625rem', { lineHeight: '1.7' }],
        'indic-lg': ['1.1875rem', { lineHeight: '1.7' }],
        'indic-xl': ['1.375rem', { lineHeight: '1.6' }],
        'indic-2xl': ['1.625rem', { lineHeight: '1.5' }],
        'indic-3xl': ['2rem', { lineHeight: '1.4' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
