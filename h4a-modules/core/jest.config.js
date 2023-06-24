module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }],
  },
  verbose: false,
  testPathIgnorePatterns: [
    "node_modules",
    "dist"
  ],
  watchPathIgnorePatterns: [
    "node_modules",
    "dist"
  ],
  "moduleNameMapper": {
    "@h4a/core/(.+)": "<rootDir>/src/$1"
  },
};
