const injectDevServer = require("@cypress/react/plugins/react-scripts");

module.exports = (on, config) => {
  // Das `injectDevServer`-Plugin wird verwendet, um den React Development Server in Cypress zu injizieren.
  // Dadurch können wir React-Anwendungen während der Entwicklung in Cypress testen.
  injectDevServer(on, config);

  // Gib die aktualisierte Konfiguration zurück, die den React Development Server enthält.
  return config;
};
