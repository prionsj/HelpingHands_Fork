import React, { useEffect, useState } from 'react';
import Navigation from "./Navigation";
import logo from "./static/HelpingHandsWhite.png";

// Komponente für die angebotene Hilfe
const AngeboteneHilfe = () => {
    // Zustand für den Nutzernamen
    const [nutzername, setNutzername] = useState([]);
    // Zustand für die angebotene Hilfe
    const [angebote, setAngebote] = useState([]);
    // Zustand für die Benutzerdaten
    const [benutzer, setBenutzer] = useState([]);

    // Effekt zum Laden des Nutzernamens aus dem lokalen Speicher
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    // Effekt zum Abrufen der Angebote von der API
    useEffect(() => {
        fetch('http://localhost:3000/angebot')
            .then((response) => response.json())
            .then((data) => {
                setAngebote(data);
            })
            .catch((err) => {
            });
    }, []);

    // Effekt zum Abrufen der Benutzerdaten von der API
    useEffect(() => {
        fetch('http://localhost:3001/benutzer')
            .then((response) => response.json())
            .then((data) => {
                setBenutzer(data);
            })
            .catch((err) => {
            });
    }, []);

    // Hauptkomponente für die angebotene Hilfe-Ansicht wird gerendert
    return (
        <div>
            {/* Navigation-Komponente einbinden */}
            <Navigation />

            {/* Logo und Beschreibung anzeigen */}
            <div className="logo-container">
                <div className="logo-picture">
                    <img className="logo" src={logo} alt="Logo" />
                </div>
                <p className="logo-description">
                    Überblick über deine angebotene Hilfe
                </p>
            </div>

            {/* Liste der Hilfsanzeigen */}
            <ol className="hilfsanzeigen">
                {angebote &&
                    angebote.map((angebot) => {
                        if (angebot.nutzername === nutzername) {
                            return (
                                <div className="hilfen" key={angebot._id}>
                                    <div className="card">
                                        <li className="list-entry" data-id={angebot._id}>
                                            <div className="stadt titel">
                                                {angebot.standort}: {angebot.titel}
                                            </div>
                                            <div className="kontakt">
                                                Kontaktdaten des Hilfesuchenden:
                                            </div>
                                            <ul>
                                                {benutzer &&
                                                    benutzer.map((benutzer) => {
                                                        if (benutzer.nutzername === angebot.ersteller) {
                                                            return (
                                                                <div key={benutzer._id}>
                                                                    <li>
                                                                        <div className="standort">Name:</div>
                                                                        {benutzer.vorname} {benutzer.nachname}
                                                                    </li>
                                                                    <li>
                                                                        <div className="zeitpunkt">Adresse:</div>
                                                                        {benutzer.straße} {benutzer.hausnummer},{' '}
                                                                        {benutzer.postleitzahl} {benutzer.stadt}
                                                                    </li>
                                                                    <li>
                                                                        <div className="kategorie">Email:</div>
                                                                        {benutzer.email}
                                                                    </li>
                                                                    <li>
                                                                        <div className="kategorie">Telefon:</div>
                                                                        {benutzer.telefon}
                                                                    </li>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                            </ul>
                                        </li>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
            </ol>
        </div>
    );
};

export default AngeboteneHilfe;
