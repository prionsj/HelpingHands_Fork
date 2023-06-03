import React, {useContext} from 'react'
import Navigation from "./Navigation";
import UsernameContext from "./UsernameContext";

const AnzeigeErstellen = () => {

    const username = useContext(UsernameContext)

    return (
        <div>
            <Navigation />
            <h1>Hilfsanzeige erstellen</h1>
            <p>Hier steht später das Formular, mit dem eine Hilfsanzeige erstellt werden kann.</p>
        </div>
    )
}

export default AnzeigeErstellen;