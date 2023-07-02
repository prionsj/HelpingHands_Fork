import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import "./App.css"

import Login from "./components/Login"
import Registrierung from "./components/Registrierung"
import Hilfsanzeigen from "./components/Hilfsanzeigen"
import AnzeigeErstellen from "./components/AnzeigeErstellen"
import AngeboteneHilfe from "./components/AngeboteneHilfe"
import Konto from "./components/Konto"
import Error from "./components/Error"
import BenutzerBearbeiten from "./components/BenutzerBearbeiten"
import HilfsanzeigeBearbeiten from "./components/HilfsanzeigeBearbeiten"

// Router-Konfiguration
const App = () => {

    return (
          <Router>
            <div>
              <Routes>
                  <Route path="/" element={<Login />} exact/>                                         {/*Startseite */}
                  <Route path="/registrierung" element={<Registrierung />}/>                          {/*Registrierungsseite */}
                  <Route path="/hilfsanzeigen" element={<Hilfsanzeigen />}/>                          {/*Hilfsanzeigen-Seite */}
                  <Route path="/anzeige-erstellen" element={<AnzeigeErstellen />} exact/>             {/*Seite zum Erstellen einer Anzeige */}
                  <Route path="/angebotene-hilfe" element={<AngeboteneHilfe />}/>                     {/*Seite mit angebotener Hilfe */}
                  <Route path="/konto" element={<Konto />}/>                                          {/*Konto-Seite */}
                  <Route path="/benutzerbearbeiten/:benutzerId" element={<BenutzerBearbeiten />}/>    {/*Seite zur Bearbeitung des Benutzerprofils */}
                  <Route path="/hilfsanzeigebearbeiten/:helpId" element={<HilfsanzeigeBearbeiten/>}/> {/*Seite zur Bearbeitung einer Hilfsanzeige */}
                  <Route element={<Error />}/>                                                        {/*Fallback-Seite für unbekannte Routen */}
              </Routes>
            </div>
          </Router>
    );


}

export default App;
