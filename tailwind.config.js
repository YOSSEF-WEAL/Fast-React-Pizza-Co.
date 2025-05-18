/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,cjs, mjs, , cts, mts}"

  ],
  theme: {
    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }]
      },
      height: {
        screen: '100dvh'
      }
    },
    fontFamily: {
      sans: 'Roboto Mono, Monospace'
    },
  },
  plugins: [],
}
