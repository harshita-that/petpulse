import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: '#FAFAF7',
        'bg-card': '#FFFFFF',
        'bg-soft': '#F3F0E8',
        'text-base': '#1A1A1A',
        'text-muted': '#6B7280',
        emerald: {
          DEFAULT: '#2D9B6F',
          50: '#E8F5EF',
          100: '#C5E8D8',
          200: '#9BD4BC',
          300: '#70C1A0',
          400: '#48C49A',
          500: '#2D9B6F',
          600: '#247B58',
          700: '#1B5C42',
          800: '#123D2C',
          900: '#091F16',
        },
        coral: {
          DEFAULT: '#F4845F',
          50: '#FEF0EB',
          100: '#FDD8CB',
          200: '#FAB79D',
          300: '#F8976F',
          400: '#F4845F',
          500: '#F16A41',
          600: '#E04F24',
          700: '#B93E1B',
          800: '#922E12',
          900: '#6B1F09',
        },
        sky: {
          DEFAULT: '#7EC8E3',
          50: '#EFF8FC',
          100: '#D3EDF7',
          200: '#AADCEF',
          300: '#7EC8E3',
          400: '#55B5D7',
          500: '#2FA3CC',
          600: '#2483A6',
          700: '#1B6380',
          800: '#124259',
          900: '#092133',
        },
        border: '#E8E4DA',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.2)' },
          '70%': { transform: 'scale(1)' },
        },
        breatheGlow: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(244, 132, 95, 0.4), 0 4px 20px rgba(244, 132, 95, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 0 8px rgba(244, 132, 95, 0), 0 4px 30px rgba(244, 132, 95, 0.4)',
          },
        },
        scan: {
          '0%': { top: '-10%', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { top: '110%', opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 4s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        'breathe-glow': 'breatheGlow 2.5s ease-in-out infinite',
        scan: 'scan 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
