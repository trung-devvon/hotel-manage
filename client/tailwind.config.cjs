/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      width: { main: '1200px' },
      colors: {
        'main-600': '#033f63',
        'main-500': '#28666e',
        'main-400': '#fedc97',
        'main-300': '#7c9885',
        'main-200': '#b5b862'
      },
      outlineColor: {
        'main-600': '#033f63',
        'main-500': '#28666e',
        'main-400': '#fedc97',
        'main-300': '#7c9885',
        'main-200': '#b5b862'
      },
      backgroundColor: {
        'main-600': '#033f63',
        'main-500': '#28666e',
        'main-400': '#fedc97',
        'main-300': '#7c9885',
        'main-200': '#b5b862',
        'second-10': 'rgba(254, 254, 254, 0.081)'
      },
      borderColor: {
        'main-600': '#033f63',
        'main-500': '#28666e',
        'main-400': '#fedc97',
        'main-300': '#7c9885',
        'main-200': '#b5b862'
      }
    }
  },
  plugins: []
})
