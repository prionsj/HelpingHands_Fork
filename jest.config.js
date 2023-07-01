// Diese Datei enthält die Jest-Konfiguration für das Testen von JavaScript- und JSX-Dateien.
// Die Konfiguration definiert verschiedene Einstellungen und Transformationen für Jest-Tests.

module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
      "^.+\\.jsx?$": "babel-jest",
    },
    "testEnvironment": "node",
    maxWorkers: 1,
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    "moduleDirectories": [
        "node_modules"
    ],
    "testMatch": [
        "**/*.test.js"
    ],
    "transformIgnorePatterns": [
        "/node_modules/(?!.*\\.(jsx)$)",
        "\\.png$"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
        "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
    }
  };
