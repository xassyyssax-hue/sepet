/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ff4d4f',
        'brand-dark': '#c63538',
        'bg-muted': '#f8fafc',
        'text-muted': '#4b5563',
        'border': '#e2e8f0',
      },
      boxShadow: {
        'brand': '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        '0': '0',
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '24px': '24px',
        '28px': '28px',
        '32px': '32px',
        '40px': '40px',
        '80px': '80px',
        '120px': '120px',
      },
    },
  },
  plugins: [],
}
