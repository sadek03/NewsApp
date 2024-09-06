// module.exports = {
//   arrowParens: 'avoid',
//   bracketSameLine: true,
//   bracketSpacing: false,
//   singleQuote: true,
//   trailingComma: 'all',
// };

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 'off',
    eqeqeq: 'off',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
