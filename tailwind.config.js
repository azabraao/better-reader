module.exports = {
  content: ['./src/renderer/**/*.{tsx,js}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0E17',
        white: '#FFFFFE',
        danger: '#E53170',
        highlight: '#FF8906',
        muted: '#A7A9BE',
      },
    },
    fontFamily: {
      sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
      display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
      body: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
};
