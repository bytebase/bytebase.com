/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      'sans-default': ['Inter', 'Inter Fallback', ...defaultTheme.fontFamily.sans],
      'sans-titles': ['Sharp Grotesk', 'Sharp Grotesk Fallback', ...defaultTheme.fontFamily.sans],
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      white: colors.white,
      black: '#0F1624',
      primary: {
        1: '#5647EB',
        2: '#32279B',
      },
      secondary: {
        1: '#FFE666',
        2: '#1FD68A',
        3: '#3DB8F5',
        4: '#EB477E',
        5: '#EC93EC',
      },
      gray: {
        15: '#172136',
        30: '#364563',
        40: '#4D5E80',
        50: '#6A7895',
        60: '#8893AA',
        70: '#A7AFBE',
        80: '#C4C9D4',
        90: '#E2E4E9',
        94: '#EDEFF2',
        97: '#F6F7F8',
      },
      tones: {
        'purple-light': '#F0F2FF',
        'purple-dark': '#ACB2D2',
        'blue-light': '#F0FAFE',
        'blue-dark': '#9CBAC9',
        'green-light': '#F2FCF8',
        'green-dark': '#9CC9B6',
        'yellow-light': '#FEFEE1',
        'yellow-dark': '#E2E29C',
        'pink-light': '#FDF2FD',
        'pink-dark': '#D2ACD2',
      },
      code: {
        blue: '#192AE6',
      },
      tags: {
        purple: '#382E9E',
      },
    }),
    screens: {
      '3xl': { max: '1919px' },
      '2xl': { max: '1599px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '413px' },
    },
  },
};
