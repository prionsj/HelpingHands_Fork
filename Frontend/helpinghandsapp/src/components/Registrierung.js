import React from 'react'
import {NavLink} from "react-router-dom";

const Registrierung = () => {
    return (
        <div>
            <h1>Registrierung</h1>
            <p>Hier kann sich der Anwender später Registrieren, wenn er noch kein Konto hat..</p>
            <button><NavLink to="/konto">Registrieren</NavLink></button>
        </div>
    )
}

export default Registrierung;