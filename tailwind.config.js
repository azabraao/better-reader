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
      boxShadow: {
        'elevation-1': '0px 2px 4px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0px 4px 8px rgba(0, 0, 0, 0.16)',
        'elevation-3': '0px 8px 16px rgba(0, 0, 0, 0.12)',
        'elevation-4': '0px 16px 24px rgba(0, 0, 0, 0.12)',
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
