import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        ald: 'var(--font-bai-jamjuree)',
      },

      colors: {
        blue_warm: {
          5: '#EDF5FF',
          10: '#D4E5FF',
          20: '#ADCDFF',
          30: '#81AEFC',
          40: '#5992ED',
          50: '#2670E8',
          60: '#155BCB',
          70: '#204B8F',
          80: '#0C326F',
          90: '#071D41',
        },
        wine: {
          80: '#3f0405',
        },
      },
    },
  },
  plugins: [],
}
export default config
