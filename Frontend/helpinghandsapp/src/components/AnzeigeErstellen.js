import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHandsWhite.png";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import CloseButton from "./CloseButton";

// Komponente für das Erstellen einer Hilfsanzeige
const AnzeigeErstellen = () => {
      
    // Zustände für die Formulareingaben
    const [titel, setTitel] = useState('')
    const [beschreibung, setBeschreibung] = useState('')
    const [kategorie, setKategorie] = useState('')
    const [standort, setStandort] = useState('')
    const [zeitraum, setZeitraum] = useState('')
    const [nutzername, setNutzername] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Effekt zum Laden des Nutzernamens aus dem lokalen Speicher
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    // Funktion zum Absenden des Formulars
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            titel === '' ||
            standort === '' ||
            kategorie === '' ||
            zeitraum === ''
        ) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
            await fetch('http://localhost:3000/hilfsanzeige', {
                method: 'POST',
                body:
                    JSON.stringify({
                        "titel": titel,
                        "beschreibung": beschreibung,
                        "kategorie": kategorie,
                        "standort": standort,
                        "zeitraum": zeitraum,
                        "nutzername": nutzername,

                    }),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate("/hilfsanzeigen");
        }
    }

    // Hauptkomponente für das Erstellen der Hilfsanzeige wird gerendert
    return (
        <div>
            {/* Navigation-Komponente einbinden */}
            <Navigation />

            {/* Logo und Beschreibung anzeigen */}
            <div className="logo-container">
                <div className="logo-picture">
                    <img className="logo" src={logo} alt="Logo" />
                </div>
                <p className="logo-description double">
                    <div className="logo-description-title">Du brauchst Hilfe?</div>
                    <div className="logo-description-title"> Erstelle deinen Antrag und finde Hilfe! </div>
                </p>
            </div>

            {/* Formular zur Erstellung der Hilfsanzeige */}
            <form className="helping-form">
                <div className="heling-form-inputs">
                    <div>
                        <input
                            placeholder="Ich brauche Hilfe bei..."
                            value={titel}
                            className="title-input"
                            onChange={(e) => setTitel(e.target.value)}
                        />
                    </div>
                    <div>
                        <select className="form-select category" aria-label="Default select example" value={kategorie} onChange={(e) => setKategorie(e.target.value)}>
                            <option selected>Alle Kategorien</option>
                            <option value="Garten">Garten</option>
                            <option value="Betreuung">Betreuung</option>
                            <option value="Tierpflege">Tierpflege</option>
                            <option value="Technik">Technik</option>
                            <option value="Handwerk">Handwerk</option>
                            <option value="Nachhilfe">Nachhilfe</option>
                            <option value="Transport">Transport</option>
                            <option value="Sonstiges">Sonstiges</option>
                        </select>
                    </div>
                    <div>
                        <input
                            placeholder="Standort"
                            value={standort}
                            className="place-input"
                            onChange={(e) => setStandort(e.target.value)}
                        />
                        <input
                            placeholder="Zeitraum"
                            value={zeitraum}
                            className="time-input"
                            onChange={(e) => setZeitraum(e.target.value)}
                        />
                    </div>
                    <div className="textarea">
                        <textarea rows="4" cols="48"
                            placeholder="Beschreibung"
                            value={beschreibung}
                            className="description-input"
                            onChange={(e) => setBeschreibung(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="submit-button">
                        <button onClick={handleSubmit} type="submit" className="submit-button">
                            Hilfsantrag veröffentlichen
                        </button>
                    </div>
                </div>
            </form>

            {/* Popup für fehlende Angaben */}
            {showPopup && (
        <Modal
        isOpen={true}
        onRequestClose={() => setShowPopup(false)}
        shouldCloseOnOverlayClick={false}
        className="Popup2"
      >
        <CloseButton onClick={() => setShowPopup(false)} />
        <h2>Um eine Hilfsanzeige zu veröffentlichen müssen mindestens der Titel, der Standort und die Kategorie ausgefüllt werden.</h2>
      </Modal>
            )}
        </div>
    )
}

export default AnzeigeErstellen;