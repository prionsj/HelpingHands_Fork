const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    // Deaktiviere das Laden der Support-Datei
    "supportFile": false,
    devServer: {
      // Verwende das Create React App-Framework
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  // Deaktiviere das Laden der Support-Datei
  e2e: {
    "supportFile": false,
    baseUrl: 'http://localhost:8083',
  }
})
