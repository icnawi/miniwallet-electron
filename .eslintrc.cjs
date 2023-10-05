module.exports = {
  'plugins': [
    'import',
    'prettier',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
  ],
  'overrides': [],
  'rules': {
    'prettier/prettier': ['off', { 'endOfLine': 'auto' }],
  },

};
