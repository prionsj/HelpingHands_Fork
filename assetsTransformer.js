// Dieses Modul wird verwendet, um den Dateinamen des Assets in einen String umzuwandeln und zu exportieren.
const path = require('path');

module.exports = {
  // Der Dateiname wird in einen JSON-String umgewandelt und mit "module.exports =" vorangestellt.
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};