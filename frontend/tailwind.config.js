/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/*.{png,svg,jpg,jpeg,gif,ico}"
  ],
  theme: {
    extend: {
      colors: {
        primary_bg: "#0D1B2A",
        primary_text: "#CCCCCC",
        primary_button: "#3EAFAF",
        primary_hover: "#4682B4",
        secondary_bg: "#1E2B3B",
        third_bg: "#2A394A",
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
      },  
      fontWeight: {
        'nunito_500': 500,
        'nunito_600': 600,
        'nunito_800': 800,
      },
      fontSize: {
        'micro': '0.25rem',
      },

      width: {

        '100': '28rem',
        '104': '30rem',
        '128': '32rem',
        '132': '34rem',
        '136': '36rem',
        '140': '40rem',
        '144': '42rem',
        '148': '44rem',
        '152': '46rem',
        '156': '48rem',
      },

      height: {
        '128': '32rem',
        '132': '34rem',
        '136': '36rem',
        '140': '40rem',
        '144': '42rem',
        '148': '44rem',
        '152': '46rem',
        '156': '48rem',
      },
      margin: {
        '100': '32rem',
      }
    }
  },
  plugins: [],
}

