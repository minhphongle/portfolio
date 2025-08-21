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
      height: {
        'mobile-window': 'calc(100vh - 210px)',
        'mobile-about': 'calc(100vh - 240px)',
        'mobile-stack': 'calc(100vh - 190px)',
      },
      maxHeight: {
        'mobile-window': 'calc(100vh - 210px)',
        'mobile-about': 'calc(100vh - 240px)',
        'mobile-stack': 'calc(100vh - 190px)',
      },
    },
  },
  plugins: [],
};

export default config;
