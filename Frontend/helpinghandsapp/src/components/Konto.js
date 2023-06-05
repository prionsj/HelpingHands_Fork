import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

const Konto = () => {
    const [benutzer, setBenutzer] = useState([]);
    const [nutzername, setNutzername] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

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

    return (
        <div>
            <Navigation />
            {benutzer &&
                benutzer.map((benutzer, index) => {
                    if (benutzer.nutzername === nutzername) {
                        return (
                            <div className="hilfen">
                                <div className="card">
                                    <li className="list-entry" data-id="$ID$">
                                        <div className="stadt titel">
                                            {help.standort}: {help.titel}
                                        </div>
                                        <div className="beschreibung">
                                            {help.beschreibung}
                                        </div>
                                        <ul>
                                            <div>
                                                <li>
                                                    <div className="standort">Standort:</div>
                                                    {help.standort}
                                                </li>
                                                <li>
                                                    <div className="zeitpunkt">Zeitpunkt:</div>
                                                    {help.zeitraum}
                                                </li>
                                                <li>
                                                    <div className="kategorie">Kategorie:</div>
                                                    {help.kategorie}
                                                </li>
                                            </div>
                                            <div className="actions">
                                                <div className="action edit">
                                                    <a className="anfrage" href={"#"}>✉️<br/>Anfragen
                                                    </a>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                </div>
                </div>
                        )
                    })
                }
                </ol>
                  </div>
             
                )
              }
            })
          }
        </div>

    )
}

export default Konto;
