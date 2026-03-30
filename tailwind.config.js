/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        neonCyan: '#22D3EE',
        neonGreen: '#39FF88',
        neonBlue: '#38BDF8',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.35)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.14), transparent 40%), radial-gradient(circle at 80% 10%, rgba(57, 255, 136, 0.14), transparent 38%), radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.12), transparent 45%)',
      },
    },
  },
  plugins: [],
}
