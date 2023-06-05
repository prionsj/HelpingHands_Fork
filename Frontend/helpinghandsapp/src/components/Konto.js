import React, {useContext, useEffect, useState} from 'react'
import Navigation from "./Navigation";


const Konto = () => {
    const [benutzer, setBenutzer] = useState([])
    const [helps, setHelps] = useState([])
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

    useEffect(() => {
      fetch('http://localhost:3000/hilfsanzeige')
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      setHelps(data);
  
      }).catch((err) => {
          console.log(err.message);
      });
  }, []);
  
  
    return (
        <div>
          <Navigation />
          {
            benutzer && benutzer.map((benutzer, index) => {
              if (benutzer.nutzername === nutzername)  {
                return (
                  <div className="container">
                    <div className="header">
                      <h1>Mein Konto</h1>
                    </div>
                    <div className="box-container">
                      <div className="box Vorname">
                        <strong>Vorname:</strong> {benutzer.vorname}
                      </div>
                      <div className="box Nachname">
                        <strong>Nachname:</strong> {benutzer.nachname}
                      </div>
                    </div>
                    <div className="box-container">
                      <div className="box Straße">
                        <strong>Straße:</strong> {benutzer.straße}
                      </div>
                      <div className="box Hausnummer">
                        <strong>Hausnummer:</strong> {benutzer.hausnummer}
                      </div>
                    </div>
                    <div className="box-container">
                      <div className="box Postleitzahl">
                        <strong>Postleitzahl:</strong> {benutzer.postleitzahl}
                      </div>
                      <div className="box Stadt">
                        <strong>Stadt:</strong> {benutzer.stadt}
                      </div>
                    </div>
                    <div className="box Email">
                      <strong>Email:</strong> {benutzer.email}
                    </div>
                    <div className="box Telefon">
                      <strong>Telefon:</strong> {benutzer.telefon}
                    </div>
                    <div className="box Nutzername">
                      <strong>Nutzername:</strong> {benutzer.nutzername}
                    </div>
                    <hr></hr>
                    <ol className="hilfsanzeigen">
                    <h1>Meine Hilfsanzeigen</h1>
                {
                    helps && helps.map((help, index)=> {
                        if (help.nutzername === nutzername)
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
