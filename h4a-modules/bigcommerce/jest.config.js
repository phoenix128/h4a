module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
    },
    verbose: false,
    testPathIgnorePatterns: ['node_modules', 'dist'],
    watchPathIgnorePatterns: ['node_modules', 'dist'],
    moduleNameMapper: {
        '@h4a/bigcommerce/(.+)': '<rootDir>/src/$1',
        '@h4a/core/(.+)': '<rootDir>/../core/src/$1',
    },
};
