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


const App = () => {

    return (
          <Router>
            <div>
              <Routes>
                  <Route path="/" element={<Login />} exact/>
                  <Route path="/registrierung" element={<Registrierung />}/>
                  <Route path="/hilfsanzeigen" element={<Hilfsanzeigen />}/>
                  <Route path="/anzeige-erstellen" element={<AnzeigeErstellen />} exact/>
                  <Route path="/angebotene-hilfe" element={<AngeboteneHilfe />}/>
<<<<<<< HEAD
                  <Route path="/konto" element={<Konto />}/>
=======
                  <Route path="/konto" element={<Konto  />}/>
>>>>>>> fc91c4febb9e1aa6934c47f0425f165f2e90507d
                  <Route element={<Error />}/>
              </Routes>
            </div>
          </Router>
    );


}

export default App;
