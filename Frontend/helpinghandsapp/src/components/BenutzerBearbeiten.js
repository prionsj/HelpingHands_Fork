import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';



const BenutzerBearbeiten = () => {
  const { benutzerId } = useParams();
  const [benutzer, setBenutzer] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const updatedUsername = location?.state?.updatedUsername; // Erhalten Sie den aktualisierten Nutzernamen aus dem state-Objekt



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
        <form>
          {/* Benutzerdaten bearbeiten */}
          <h2>Bearbeite deine Daten</h2>

          <div className="form-field">
            <label htmlFor="vorname">Vorname</label>
            <input
              type="text"
              name="vorname"
              defaultValue={benutzer.vorname}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="nachname">Nachname</label>
            <input
              type="text"
              name="nachname"
              defaultValue={benutzer.nachname}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="straße">Straße</label>
            <input
              type="text"
              name="straße"
              defaultValue={benutzer.straße}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="hausnummer">Hausnummer</label>
            <input
              type="text"
              name="hausnummer"
              defaultValue={benutzer.hausnummer}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="postleitzahl">Plz</label>
            <input
              type="text"
              name="postleitzahl"
              defaultValue={benutzer.postleitzahl}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="stadt">Stadt</label>
            <input
              type="text"
              name="stadt"
              defaultValue={benutzer.stadt}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              name="email"
              defaultValue={benutzer.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="telefon">Telefon</label>
            <input
              type="text"
              name="telefon"
              defaultValue={benutzer.telefon}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="nutzername">Nutzername</label>
            <input
              type="text"
              name="nutzername"
              defaultValue={benutzer.nutzername}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              name="passwort"
              defaultValue={benutzer.passwort}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={handleSubmit} type="submit">
            Speichern
          </button>
        </form>
      )}
    </div>
  );
};

export default BenutzerBearbeiten;
