import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHandsWhite.png";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";

const AnzeigeErstellen = () => {

    const CloseButton = ({ onClick }) => (
        <button
          style={{
            position: 'relative',
            top: '-20px',
            right: '-20px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'red',
          }}
          onClick={onClick}
          className="close-button"
        >
          &times;
        </button>
      );
      
      
      
    const [titel, setTitel] = useState('')
    const [beschreibung, setBeschreibung] = useState('')
    const [kategorie, setKategorie] = useState('')
    const [standort, setStandort] = useState('')
    const [zeitraum, setZeitraum] = useState('')
    const [nutzername, setNutzername] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

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
            const response = await fetch('http://localhost:3000/hilfsanzeige', {
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

    return (
        <div>
            <Navigation />
            <div className="logo-container">
                <div className="logo-picture">
                    <img className="logo" src={logo} alt="Logo" />
                </div>
                <p className="logo-description double">
                    <div className="logo-description-title">Du brauchst Hilfe?</div>
                    <div className="logo-description-title"> Erstelle deinen Antrag und finde Hilfe! </div>
                </p>
            </div>
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
            {showPopup && (
        <Modal
        isOpen={true}
        onRequestClose={() => setShowPopup(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            width: '300px',
            height: '400px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
            background: 'white',
            border: '2px solid red',
          },
        }}
        className="popup"
      >
        <CloseButton onClick={() => setShowPopup(false)} />
        <h2>Um eine Hilfsanzeige zu veröffentlichen müssen mindestens der Titel, der Standort und die Beschreibung ausgefüllt werden.</h2>
      </Modal>
            )}
        </div>
    )
}

export default AnzeigeErstellen;