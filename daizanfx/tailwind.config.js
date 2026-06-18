/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#050a14',
          secondary: '#0a0f1e',
          card: 'rgba(13,22,41,0.8)',
        },
        accent: {
          cyan: '#00d4ff',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,212,255,0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(0,212,255,0.3)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'dot-grid': "radial-gradient(circle,#1a2a45 1px,transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #050a14 0%, #0a0f1e 50%, #050a14 100%)',
      },
      backgroundSize: {
        'dot': '30px 30px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cyan-sm': '0 0 15px rgba(0,212,255,0.15)',
        'cyan-md': '0 0 30px rgba(0,212,255,0.2)',
        'cyan-lg': '0 0 60px rgba(0,212,255,0.25)',
        'glow-cyan': '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2)',
      },
    },
  },
  plugins: [],
};
