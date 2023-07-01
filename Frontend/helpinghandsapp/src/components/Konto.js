import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { useNavigate, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import logo from './static/HelpingHandsWhite.png';
import CloseButton from "./CloseButton";

// Komponente für das Konto
const Konto = () => {
   // Zustand für Benutzerdaten
    const [benutzer, setBenutzer] = useState([]);
    // Zustand für Hilfsanzeigen
    const [helps, setHelps] = useState([]);
    // Zustand für den aktuellen Nutzernamen
    const [nutzername, setNutzername] = useState([]);
    // Zustand für die Anzeige des Lösch-Popups
    const [showPopup, setShowPopup] = useState(false);

    // Verwendung des useNavigate-Hooks zur Navigation
    const navigate = useNavigate();

    // Effekt zum Laden des Nutzernamens aus dem lokalen Speicher
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

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

    // Effekt zum Abrufen der Hilfsanzeigen von der API
    useEffect(() => {
        fetch('http://localhost:3000/hilfsanzeige')
            .then((response) => response.json())
            .then((data) => {
                setHelps(data);
            })
            .catch((err) => {
            });
    }, []);

    // Funktion zum Löschen einer Hilfsanzeige
    const deleteHelps = async (id) => {
        await fetch(`http://localhost:3000/hilfsanzeige/${id}`, { method: 'DELETE' });
        navigate('/hilfsanzeigen');
    };

    // Funktion zum Bestätigen des Löschen-Befehls für einen Benutzer
    const deleteUserConfirmation = async (id) => {
        setShowPopup(true);
    };

    // Funktion zum Löschen eines Benutzers
    const deleteUser = async (id) => {
        await fetch(`http://localhost:3001/benutzer/${id}`, { method: 'DELETE' });
        navigate('/');
    };

    // Funktion zum Bearbeiten eines Benutzers
    const handleBearbeiten = (benutzerId) => {
        navigate(`/benutzerbearbeiten/${benutzerId}`);
    };

    // Funktion zum Bearbeiten einer Hilfsanzeige
    const handleBearbeiten2 = (helpId) => {
        navigate(`/hilfsanzeigebearbeiten/${helpId}`);
    };

    // Hauptkomponente für das Konto wird gerendert
    return (
        <div>
            <Navigation />
            {benutzer &&
                benutzer.map((benutzer, index) => {
                    if (benutzer.nutzername === nutzername) {
                        return (
                            <div className="container" key={index}>
                                {/* Logo und Beschreibung */}
                                <div className="logo-container">
                                    <div className="logo-picture">
                                        <img className="logo" src={logo} alt="Logo" />
                                    </div>
                                    <p className="logo-description">Dein Konto</p>
                                </div>
                                
                                {/* Benutzerdaten anzeigen */}
                                <div className="header">
                                    <h1>Benutzerdaten</h1>
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
                                        <strong>Nr.:</strong> {benutzer.hausnummer}
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box Postleitzahl">
                                        <strong>PLZ:</strong> {benutzer.postleitzahl}
                                    </div>
                                    <div className="box Stadt">
                                        <strong>Stadt:</strong> {benutzer.stadt}
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box Email">
                                        <strong>Email:</strong> {benutzer.email}
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box Telefon">
                                        <strong>Telefon:</strong> {benutzer.telefon}
                                    </div>
                                </div>
                                <div className="box-container">
                                    <div className="box Nutzername">
                                        <strong>Nutzername:</strong> {benutzer.nutzername}
                                    </div>
                                </div>
                                <div className="konto-buttons">
                                    <button className="konto-button" onClick={() => handleBearbeiten(benutzer._id)}>
                                        Bearbeiten
                                    </button>
                                    <button className="konto-button" onClick={deleteUserConfirmation}>
                                        Löschen
                                    </button>
                                    <button className="konto-button logout">
                                        <NavLink to={`/`}>Abmelden</NavLink>
                                    </button>

                                    {/* Popup zur Bestätigung des Benutzerlöschens */}
                                    {showPopup && (
                                        <Modal
                                            isOpen={true}
                                            onRequestClose={() => setShowPopup(false)}
                                            shouldCloseOnOverlayClick={false}
                                            className="Popup2"
                                        >
                                            <CloseButton onClick={() => setShowPopup(false)} />
                                            <h2>Möchtest du dein Konto Löschen?</h2>
                                            <button onClick={() => deleteUser(benutzer._id)}>Löschen</button>
                                            <button onClick={() => setShowPopup(false)}>Abbrechen</button>
                                        </Modal>
                                    )}
                                </div>
                                <hr></hr>
                                {/* Meine Hilfsanzeigen anzeigen */}
                                <ol className="hilfsanzeigen">
                                    <div className="header">
                                        <h1>Meine Hilfsanzeigen</h1>
                                    </div>
                                    {helps &&
                                        helps.map((help, index) => {
                                            if (help.nutzername === nutzername) {
                                                return (
                                                    <div className="hilfen" key={index}>
                                                        <div className="card">
                                                            <li className="list-entry" data-id="$ID$">
                                                                <div className="stadt titel">
                                                                    {help.standort}: {help.titel}
                                                                </div>
                                                                <div className="beschreibung">{help.beschreibung}</div>
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
                                                                        <button
                                                                            className="konto-button hilfsanzeige-bearbeiten"
                                                                            onClick={() => handleBearbeiten2(help._id)}
                                                                        >
                                                                            Bearbeiten
                                                                        </button>
                                                                        <button
                                                                            className="konto-button"
                                                                            onClick={() => deleteHelps(help._id)}
                                                                        >
                                                                            Löschen
                                                                        </button>
                                                                    </div>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null; // Null zurückgeben für nicht übereinstimmende Hilfsanzeigen
                                        })}
                                </ol>
                            </div>
                        );
                    }
                    return null; // Null zurückgeben für nicht übereinstimmende Benutzer
                })}
        </div>
    );
};

export default Konto;
