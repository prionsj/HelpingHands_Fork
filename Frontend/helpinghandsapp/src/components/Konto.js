import React, {useContext, useEffect, useState} from 'react'
import UsernameContext from "./UsernameContext";
import Navigation from "./Navigation";

const Konto = () => {
    const [benutzer, setBenutzer] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/benutzer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBenutzer(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    const username = useContext(UsernameContext)

    return (
        <div>
            <Navigation />
        {
            benutzer && benutzer.map((benutzer, index)=> {
                if (benutzer.nutzername === username) {
                    return (
                        <div className="container">
                            <div className="header">
                                <h1>Mein Konto</h1>
                            </div>
                            <div className="box">
                                <p><strong>Vorname:</strong> {benutzer.vorname} </p>
                                <p><strong>Nachname:</strong> {benutzer.nachname}</p>
                            </div>
                            <div className="box">
                                <p><strong>Straße:</strong> {benutzer.straße}</p>
                                <p><strong>Hausnummer:</strong> {benutzer.hausnummer}</p>
                            </div>
                            <div className="box">
                                <p><strong>Postleitzahl:</strong> {benutzer.postleitzahl}</p>
                                <p><strong>Stadt:</strong> {benutzer.stadt}</p>
                            </div>
                            <div className="box">
                                <p><strong>Email:</strong>{benutzer.email}</p>
                                <p><strong>Telefon:</strong> {benutzer.telefon}</p>
                            </div>
                            <div className="box">
                                <p><strong>Nutzername:</strong>{benutzer.nutzername}</p>
                            </div>
                        </div>
                    )
                }
            })
        }
        </div>

    )
}

export default Konto;