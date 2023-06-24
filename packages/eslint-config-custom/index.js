module.exports = {
  extends: ["next", "turbo", "prettier"],
  "ignorePatterns": ["**/dist/*", "**/generated/*", "**/node_modules/*"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-restricted-imports": [
      "error", {
        "patterns": [".*"],
      },
    ],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  overrides: [
    {
      files: ["h4a-rewrites/**/*.ts", "h4a-rewrites/**/*.tsx"],
      "rules": {
        "no-restricted-imports": "off"
      }
    }
  ]
};
