// Funktion zum Berichten von Web-Vitals
const reportWebVitals = onPerfEntry => {
  // Überprüfen, ob onPerfEntry eine Funktion ist
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamisches Importieren des 'web-vitals'-Moduls
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Aufruf der einzelnen Web-Vitals-Funktionen und Übergabe von onPerfEntry als Callback
      getCLS(onPerfEntry);  // Cumulative Layout Shift
      getFID(onPerfEntry);  // First Input Delay
      getFCP(onPerfEntry);  // First Contentful Paint
      getLCP(onPerfEntry);  // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;
