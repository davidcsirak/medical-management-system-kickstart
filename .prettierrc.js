const config = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  printWidth: 100,
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: [import('prettier-plugin-tailwindcss')],
};

module.exports = config;
