import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Erstelle eine Wurzel für das Rendern der React-Anwendung
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendere die App-Komponente innerhalb des React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Wenn du die Leistung in deiner App messen möchtest, gib eine Funktion weiter,
// um die Ergebnisse zu protokollieren (z. B.: reportWebVitals(console.log))
// oder sende sie an eine Analytics-Endpunkt. Erfahre mehr unter: https://bit.ly/CRA-vitals
reportWebVitals();
