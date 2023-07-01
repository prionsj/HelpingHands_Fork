import React, { useState, useEffect } from "react";
import logo from "./static/HelpingHands.png";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from 'react-modal';
import CloseButton from "./CloseButton";


/**
 * Ausgelagerte handleLogin-Funktion
 * Funktion zur Behandlung des Login-Vorgangs.
 * Überprüft den Benutzernamen und das Passwort und navigiert bei erfolgreicher Anmeldung zur Hilfsanzeigen-Seite.
 * @param {object} event - Das Event-Objekt.
 * @param {string} nutzername - Der eingegebene Benutzername.
 * @param {string} passwort - Das eingegebene Passwort.
 * @param {array} benutzer - Die Liste der Benutzer.
 * @param {function} navigate - Die navigate-Funktion aus dem useNavigate-Hook.
 * @param {function} setShowPopup - Die Funktion zum Anzeigen/Verstecken des Popups.
 */
export const handleLogin = (event, nutzername, passwort, benutzer, navigate, setShowPopup) => {
    event.preventDefault()
    const matchingBenutzer = benutzer.find(
        (benutzer) => benutzer.nutzername === nutzername && benutzer.passwort === passwort
    );
    if (matchingBenutzer) {
        setShowPopup(false);
        localStorage.setItem('username', nutzername);
        navigate("/hilfsanzeigen");
    } else {
        setShowPopup(true);
    }
};

/**
 * Komponente für den Login.
 * Zeigt das Login-Formular an und ermöglicht die Anmeldung.
 */

export const Login = () => {
    const navigate = useNavigate();
    const [nutzername, setNutzername] = useState("");
    const [passwort, setPasswort] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [benutzer, setBenutzer] = useState([]);

    // Daten vom Server abrufen
    useEffect(() => {
        fetch("http://localhost:3001/benutzer")
            .then((response) => response.json())
            .then((data) => {
                setBenutzer(data);
            })
            .catch((err) => {
            });
    }, []);

    // Speichert den aktuellen Nutzernamen im Local Storage.
    useEffect(() => {
        localStorage.setItem('username', nutzername);
    }, [nutzername]);

    // Hauptkomponente für die Login-Seite wird gerendert
    return (
        <div className="login-page">
            <div className="logo-picture">
                <img className="login logo" src={logo} alt="Logo" />
            </div>

            {/* Forular für das Login */}
            <form className="login-form">
                <label htmlFor="nutzername">Benutzername</label>
                <input
                    value={nutzername}
                    onChange={(e) => setNutzername(e.target.value)}
                    type="text"
                    placeholder="Benutzername"
                    id="nutzername"
                    name="nutzername"
                />
                <label htmlFor="passwort">Passwort</label>
                <input
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                />
                <div className="login-button">
                <button onClick={(event) => handleLogin(event, nutzername, passwort, benutzer, navigate, setShowPopup)}>
                    Anmelden
                </button>

                </div>
            </form>

            {/* Popup für Fehlermeldung */}
            {showPopup && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => setShowPopup(false)}
                    shouldCloseOnOverlayClick={false}
                    className="Popup"
                >
                    <CloseButton onClick={() => setShowPopup(false)} />
                    <h2>Benutzername oder Passwort ist inkorrekt</h2>
                </Modal>
            )}
            <div className="register-now">
                <button className="link-btn">
                    <NavLink to="/Registrierung">
                        Noch kein Konto?
                        <br></br>Jetzt registrieren
                    </NavLink>
                </button>
            </div>
        </div>
    );
};

export default Login;