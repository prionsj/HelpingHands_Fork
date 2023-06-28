const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    "supportFile": false,
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    "supportFile": false,
    baseUrl: 'http://localhost:8083',
  }
})
