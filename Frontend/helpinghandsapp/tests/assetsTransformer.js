// Das `path`-Modul wird benötigt, um Dateipfade zu verarbeiten
const path = require('path');

module.exports = {
  // Eine Funktion, die den Quellcode, den Dateinamen, die Konfiguration und Optionen verarbeitet
  process(src, filename, config, options) {
    // Rückgabe des modifizierten Codes, der den Dateinamen als JSON-String enthält
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};