module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'vue/script-setup-uses-vars': 'warn',
    'vue/no-multi-spaces': [
      'error',
      {
        ignoreProperties: false
      }
    ],
    "vue/script-indent": ["error", 2, { "switchCase": 1, "baseIndent": 0 }],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0
    }]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.js",
        "**/tests/unit/**/*.spec.js",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
