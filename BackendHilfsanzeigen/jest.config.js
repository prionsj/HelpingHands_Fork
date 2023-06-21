module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testMatch: [
      '**/src/service/**/*.test.js',
    ],
  };
  