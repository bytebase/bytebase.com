module.exports = {
  printWidth: 100,
  trailingComma: 'all',
  singleQuote: true,
  importOrder: [
    '^(next)|(next/(.*))$',
    '^(react)|(react/(.*))$',
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$',
    '^@/types/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    '^@/svgs/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('prettier-plugin-tailwindcss')],
};
