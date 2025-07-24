import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'indie-flower': ['var(--font-indie-flower)'],
        'custom': ['YourCustomFont', 'sans-serif'], // Add your custom font
      },
    },
  },
  plugins: [],
};

export default config; 