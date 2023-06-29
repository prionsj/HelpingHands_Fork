import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom'; //, useLocation 
import logo from "./static/HelpingHandsWhite.png";



const BenutzerBearbeiten = () => {
  const { benutzerId } = useParams();
  const [benutzer, setBenutzer] = useState(null);
  const [setIsSaved] = useState(false); //isSaved, 
  const navigate = useNavigate();
  // const location = useLocation();
  // const updatedUsername = location?.state?.updatedUsername; // Erhalten Sie den aktualisierten Nutzernamen aus dem state-Objekt



  useEffect(() => {
    fetch(`http://localhost:3001/benutzer/${benutzerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBenutzer(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [benutzerId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBenutzer((prevBenutzer) => ({
      ...prevBenutzer,
      [name]: value,
    }));
  };

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
        console.log('Benutzerdaten wurden aktualisiert:', benutzer);
        setIsSaved(true);
        localStorage.setItem('username', benutzer.nutzername);
        navigate('/konto', { state: { updatedUsername: benutzer.nutzername } });
      } else {
        console.log('Fehler beim Aktualisieren der Benutzerdaten:', response.statusText);
      }
    } catch (error) {
      console.log('Fehler beim Aktualisieren der Benutzerdaten:', error.message);
    }
  };
  

  

  return (
    <div>
      {benutzer && (
          <div>
          <div className="logo-container">
            <div className="logo-picture">
              <img className="logo" src={logo} alt="Logo" />
            </div>
            <p className="logo-description">
              Bearbeite deine Benutzerdaten
            </p>
          </div>
        <form  className="register-form">
          <div className="name_container">
            <div className="name_labels">
              <label htmlFor="name" className="name">Vorname</label>
              <label htmlFor="name" className="name">Nachname</label>
            </div>
            <div className="name_inputs">
              <input
                  type="text"
                  name="name"
                  className="name"
                  defaultValue={benutzer.vorname}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="name"
                  className="name"
                  defaultValue={benutzer.nachname}
                  onChange={handleInputChange}
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
                  type="text"
                  name="street"
                  className="street"
                  defaultValue={benutzer.straße}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="number"
                  className="number"
                  defaultValue={benutzer.hausnummer}
                  onChange={handleInputChange}
              />
            </div>
            <div className="adress_labels">
              <label htmlFor="plz" className="plz">Plz</label>
              <label htmlFor="city" className="city">Stadt</label>
            </div>
            <div className="adress_inputs">
              <input
                  type="text"
                  name="plz"
                  className="plz"
                  defaultValue={benutzer.postleitzahl}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="city"
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
              <label htmlFor="phone" className="phone">Telefonnummer</label>
            </div>
            <div className="phone_input">
              <input
                  type="text"
                  name="phone"
                  className="phone"
                  defaultValue={benutzer.telefon}
                  onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="username_container">
            <div className="username_label">
              <label htmlFor="username" className="username">Username</label>
            </div>
            <div className="username_input">
              <input
                  type="text"
                  name="username"
                  className="username"
                  defaultValue={benutzer.nutzername}
                  onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="pw_container">
            <div className="pw_label">
              <label htmlFor="password" className="pw">Passwort</label>
            </div>
            <div className="pw_input">
              <input
                  type="password"
                  name="password"
                  className="pw"
                  defaultValue={benutzer.passwort}
                  onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="register-button">
            <button onClick={handleSubmit} type="submit">
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
