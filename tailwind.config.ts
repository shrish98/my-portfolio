import type { Config } from 'tailwindcss';

const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Tailwind 3.3's default scale skips these steps.
      opacity: { 15: '0.15', 35: '0.35', 45: '0.45', 55: '0.55', 65: '0.65', 85: '0.85' },
      colors: {
        paper: { DEFAULT: channel('paper'), deep: channel('paper-deep') },
        card: channel('card'),
        ink: { DEFAULT: channel('ink'), soft: channel('ink-soft'), mute: channel('ink-mute') },
        accent: { DEFAULT: channel('accent'), deep: channel('accent-deep') },
        marker: channel('marker'),
        cobalt: channel('cobalt'),
        moss: channel('moss'),
        tint: {
          lilac: channel('tint-lilac'),
          sage: channel('tint-sage'),
          peach: channel('tint-peach'),
          butter: channel('tint-butter'),
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
