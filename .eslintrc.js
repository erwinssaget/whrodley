module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['public/', 'node_modules/'],
  rules: {
    "prettier/prettier": "error",
  },
};
