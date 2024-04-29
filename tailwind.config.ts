import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    colors: {
      'primary-default': '#7550cc',
      'primary-700': '#37206d',
      'gray-white': '#FFFFFF',
      'gray-200': '#f5f5f5',
      'gray-500': '#A6AAB4',
      'gray-600': '#6f7585',
      'gray-700': '#545963',
      'gray-800': '#36393f',
      'primary-850': '#0d081a',
    },
    fontFamily: {
      sans: ['Noto Sans TC', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'primary-gradients': 'linear-gradient(90deg, #53389e 0%, #7f56d9 100%)',
        'primary-gradients-deep':
          'linear-gradient(45deg, #42307d 0%, #7f56d9 100%)',
        'primary-gradients-dark':
          'linear-gradient(44deg, #493289 0%, #6a45c5 100%)',
        'gray-gradients': 'linear-gradient(229deg, #EEEFF1 0%, #D5D6D8 100%)',
      },
      boxShadow: {
        card: '0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)',
      },
    },
  },
  plugins: [],
}
export default config
