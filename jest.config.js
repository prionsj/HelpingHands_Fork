module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
      "^.+\\.jsx?$": "babel-jest",
    },
    "testEnvironment": "node",
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
