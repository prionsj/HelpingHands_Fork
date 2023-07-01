import {useNavigate} from "react-router-dom";
import React, { useEffect,useState } from "react";
import logo from "./static/HelpingHandsWhite.png"
import Modal from 'react-modal';
import CloseButton from "./CloseButton";

// Funktion zur Registrierung
export const handleRegistration = async (event, benutzer, vorname, nachname, straße, hausnummer, postleitzahl, stadt, email,
                                          telefon, nutzername, passwort, navigate, setShowPopup, setShowPopup2) => {
    event.preventDefault()
    
    // Überprüfung der Eingabefelder
    const matchingNutzername = benutzer.find(
        (benutzer) =>
            benutzer.nutzername === nutzername
    );
    const matchingEmail = benutzer.find(
        (benutzer) =>
            benutzer.email === email
    )
    if (
        vorname === '' ||
        nachname === '' ||
        straße === '' ||
        hausnummer === '' ||
        postleitzahl === '' ||
        stadt === '' ||
        email === '' ||
        telefon === '' ||
        nutzername === '' ||
        passwort === ''

    ) {
        setShowPopup(true);
    } else if (matchingNutzername || matchingEmail) {
        setShowPopup2(true)
    } else {
        setShowPopup(false);
        setShowPopup2(false)
        
        // Daten an die API senden
        await fetch('http://localhost:3001/benutzer', {
            method: 'POST',
            body:
                JSON.stringify({
                    "vorname": vorname,
                    "nachname": nachname,
                    "straße": straße,
                    "hausnummer": hausnummer,
                    "postleitzahl": postleitzahl,
                    "stadt": stadt,
                    "email": email,
                    "telefon": telefon,
                    "nutzername": nutzername,
                    "passwort": passwort,
                }),

            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Zur Startseite navigieren
        navigate("/");
    }
};

// Komponente für die Registrierung
export const Registrierung = () => {
    // Zustand für den Vornamen des Benutzers
    const [vorname, setVorname] = useState('');
    // Zustand für den Nachnamen des Benutzers
    const [nachname, setNachname] = useState('');
    // Zustand für den Straßennamen des Benutzers
    const [straße, setStraße] = useState('');
    // Zustand für die Hausnummer des Benutzers
    const [hausnummer, setHausnummer] = useState('');
    // Zustand für die Postleitzahl des Benutzers
    const [postleitzahl, setPostleitzahl] = useState('');
    // Zustand für den Stadtnamen des Benutzers
    const [stadt, setStadt] = useState('');
    // Zustand für die E-Mail des Benutzers
    const [email, setEmail] = useState('');
    // Zustand für die Telefonnummer des Benutzers
    const [telefon, setTelefon] = useState('');
    // Zustand für den Benutzernamen des Benutzers
    const [nutzername, setNutzername] = useState('');
    // Zustand für das Passwort des Benutzers
    const [passwort, setPasswort] = useState('');
    // Zustand zur Steuerung der Anzeige des Popups
    const [showPopup, setShowPopup] = useState(false);
    // Zustand für eine Liste der Benutzer
    const [benutzer, setBenutzer] = useState([]);
    // Zustand zur Steuerung der Anzeige des zweiten Popups
    const [showPopup2, setShowPopup2] = useState(false);
    
    // Funktion zum Navigieren in der Anwendung
    const navigate = useNavigate();

    // Effekt zum Abrufen der Benutzerdaten von der API
    useEffect(() => {
        fetch('http://localhost:3001/benutzer')
            .then((response) => response.json())
            .then((data) => {
                setBenutzer(data);
            }).catch((err) => {
        });
    }, []);

    // Hauptkomponente für die Registrierungsseite wird gerendert
    return (
      <div className="registrieren-page">
            {/* Logo und Registrierungsbeschreibung */}
          <div className="logo-container">
              <div className="logo-picture">
                  <img className="logo" src={logo} alt="Logo" />
              </div>
              <p className="logo-description">
                  Registrierung
              </p>
          </div>
      <form className="register-form"> {/* Registrierungsformular */}
        <div className="name_container">
            <div className="name_labels">
                <label htmlFor="name" className="name">Vorname</label>
                <label htmlFor="name" className="name">Nachname</label>
            </div>
            <div className="name_inputs">
                <input
                    placeholder="Max"
                    className="name"
                    value={vorname}
                    onChange={(e) => setVorname(e.target.value)}
                />
                <input
                    placeholder="Mustermann"
                    className="name"
                    value={nachname}
                    onChange={(e) => setNachname(e.target.value)}
                />
            </div>
        </div>
        <div className="adress_container">
            <div className="adress_labels">
                <label htmlFor="street" className="street">Straße</label>
                <label htmlFor="number" className="number">Nr.</label>
            </div>
            <div className="adress_inputs">
                <input
                    placeholder="Mustermannstraße"
                    className="street"
                    value={straße}
                    onChange={(e) => setStraße(e.target.value)}
                />
                <input
                    placeholder="15"
                    className="number"
                    value={hausnummer}
                    onChange={(e) => setHausnummer(e.target.value)}
                />
            </div>
            <div className="adress_labels">
                <label htmlFor="plz" className="plz">Plz</label>
                <label htmlFor="city" className="city">Stadt</label>
            </div>
            <div className="adress_inputs">
                <input
                    placeholder="78048"
                    className="plz"
                    value={postleitzahl}
                    onChange={(e) => setPostleitzahl(e.target.value)}
                />
                <input
                    placeholder="Musterstadt"
                    className="city"
                    value={stadt}
                    onChange={(e) => setStadt(e.target.value)}
                />
            </div>
        </div>
        <div className="mail_container">
            <div className="email_label">
                <label htmlFor="email" className="email">E-Mail</label>
            </div>
            <div className="email_input">
                <input
                    placeholder="max.mustermann@gmail.com"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>
        <div className="phone_container">
            <div className="phone_label">
                <label htmlFor="phone" className="phone">Telefonnummer</label>
            </div>
            <div className="phone_input">
                <input
                    placeholder="015637383"
                    className="phone"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                />
            </div>
        </div>
        <div className="username_container">
            <div className="username_label">
                <label htmlFor="username" className="username">Username</label>
            </div>
            <div className="username_input">
                <input
                    placeholder="max.mustermann"
                    className="username"
                    value={nutzername}
                    onChange={(e) => setNutzername(e.target.value)}
                />
            </div>
        </div>
        <div className="pw_container">
            <div className="pw_label">
                <label htmlFor="password" className="pw">Passwort</label>
            </div>
            <div className="pw_input">
                <input
                    placeholder="*******"
                    className="pw"
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                />
            </div>
        </div>
        <div className="register-button">
            <button onClick={(event) => handleRegistration(event, benutzer, vorname, nachname, straße, hausnummer, postleitzahl, stadt,
                email, telefon, nutzername, passwort, navigate, setShowPopup, setShowPopup2)} type="submit">
                Registrieren
            </button>
        </div>
      </form>
        {/* Popup-Modal für fehlende Daten */}
        {showPopup && (
            <Modal
                isOpen={true}
                onRequestClose={() => setShowPopup(false)}
                shouldCloseOnOverlayClick={false}
                className="Popup"
            >
              <CloseButton onClick={() => setShowPopup(false)} />
              <h2>Für die Registrierung müssen alle Datenfelder ausgefüllt werden.</h2>
            </Modal>
        )}
            {/* Popup-Modal für bereits verwendeten Benutzernamen oder E-Mail */}
          {showPopup2 && (
              <Modal
                  isOpen={true}
                  onRequestClose={() => setShowPopup2(false)}
                  shouldCloseOnOverlayClick={false}
                  className="Popup"
              >
                  <CloseButton onClick={() => setShowPopup2(false)} />
                  <h2>Der Benutzername oder die Email wurde bereits zur Registrierung verwendet.</h2>
              </Modal>
          )}
    </div>

    )
  }
    
   

export default Registrierung;