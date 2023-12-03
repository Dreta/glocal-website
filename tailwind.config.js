/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{ts,tsx}'
  ],
  theme: {
    fontFamily: {
        'body': ['sans-serif', 'system-ui'],
        'display': ['Ubuntu', 'sans-serif', 'system-ui']
    },
    extend: {
        colors: {
            'bj-red': '#f2481b',
            'bj-yellow': '#ffb906',
            'bj-yellow-accent': '#ffd569',
            'bj-yellow-bg': '#ffe8ae'
        }
    },
  },
  plugins: [],
}

