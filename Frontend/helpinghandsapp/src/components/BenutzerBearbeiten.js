import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "./static/HelpingHandsWhite.png";

// Komponente zum Bearbeiten der Benutzerdaten
const BenutzerBearbeiten = () => {
  // BenutzerId aus den URL-Parametern abrufen
  const { benutzerId } = useParams();
  // Zustand für den Benutzer
  const [benutzer, setBenutzer] = useState(null);
  // Navigationsfunktion zum Weiterleiten nach dem Speichern
  const navigate = useNavigate();

  // Effekt zum Abrufen der Benutzerdaten von der API
  useEffect(() => {
    fetch(`http://localhost:3001/benutzer/${benutzerId}`)
      .then((response) => response.json())
      .then((data) => {
        setBenutzer(data);
      })
      .catch((err) => {
      });
  }, [benutzerId]);

  // Funktion zum Aktualisieren des Eingabewerts
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBenutzer((prevBenutzer) => ({
      ...prevBenutzer,
      [name]: value,
    }));
  };

  // Funktion zum Bearbeiten des Benutzers
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3001/benutzer/${benutzerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(benutzer),
      });
  
      if (response.ok) {
        localStorage.setItem('username', benutzer.nutzername);
        navigate('/konto', { state: { updatedUsername: benutzer.nutzername } });
      } else {
      }
    } catch (error) {
    }
  };

  // Hauptkomponente für die Bearbeiten-Ansicht wird gerendert
  return (
    <div>
      {/* Überprüfen, ob Benutzerdaten vorhanden sind */}
      {benutzer && (
        <div>
          {/* Logo und Beschreibung anzeigen */}
          <div className="logo-container">
            <div className="logo-picture">
              <img className="logo" src={logo} alt="Logo" />
            </div>
            <p className="logo-description">
              Bearbeite deine Benutzerdaten
            </p>
          </div>
          {/* Formular zum Bearbeiten der Benutzerdaten */}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="name_container">
              <div className="name_labels">
                <label htmlFor="vorname" className="name">Vorname</label>
                <label htmlFor="nachname" className="name">Nachname</label>
              </div>
              <div className="name_inputs">
                <input
                  type="text"
                  name="vorname"
                  className="name"
                  defaultValue={benutzer.vorname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="nachname"
                  className="name"
                  defaultValue={benutzer.nachname}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="adress_container">
              <div className="adress_labels">
                <label htmlFor="straße" className="street">Straße</label>
                <label htmlFor="hausnummer" className="number">Nr.</label>
              </div>
              <div className="adress_inputs">
                <input
                  type="text"
                  name="straße"
                  className="street"
                  defaultValue={benutzer.straße}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="hausnummer"
                  className="number"
                  defaultValue={benutzer.hausnummer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="adress_labels">
                <label htmlFor="postleitzahl" className="plz">Plz</label>
                <label htmlFor="stadt" className="city">Stadt</label>
              </div>
              <div className="adress_inputs">
                <input
                  type="text"
                  name="postleitzahl"
                  className="plz"
                  defaultValue={benutzer.postleitzahl}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="stadt"
                  className="city"
                  defaultValue={benutzer.stadt}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mail_container">
              <div className="email_label">
                <label htmlFor="email" className="email">E-Mail</label>
              </div>
              <div className="email_input">
                <input
                  type="text"
                  name="email"
                  className="email"
                  defaultValue={benutzer.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="phone_container">
              <div className="phone_label">
                <label htmlFor="telefon" className="phone">Telefonnummer</label>
              </div>
              <div className="phone_input">
                <input
                  type="text"
                  name="telefon"
                  className="phone"
                  defaultValue={benutzer.telefon}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="username_container">
              <div className="username_label">
                <label htmlFor="nutzername" className="username">Username</label>
              </div>
              <div className="username_input">
                <input
                  type="text"
                  name="nutzername"
                  className="username"
                  defaultValue={benutzer.nutzername}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pw_container">
              <div className="pw_label">
                <label htmlFor="passwort" className="pw">Passwort</label>
              </div>
              <div className="pw_input">
                <input
                  type="password"
                  name="passwort"
                  className="pw"
                  defaultValue={benutzer.passwort}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="register-button">
              <button type="submit">
                Speichern
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BenutzerBearbeiten;
