import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "./static/HelpingHandsWhite.png";

// Komponente zum Bearbeiten einer Hilfsanzeige
const HilfsanzeigeBearbeiten = () => {
  const { helpId } = useParams();
  const [hilfsanzeige, setHilfsanzeige] = useState(null);
  const navigate = useNavigate();

  // Effekt zum Laden der Hilfsanzeige von der API
  useEffect(() => {
    fetch(`http://localhost:3000/hilfsanzeige/${helpId}`)
      .then((response) => response.json())
      .then((data) => {
        setHilfsanzeige(data);
      })
      .catch((err) => {
      });
  }, [helpId]);

  // Handler zum Aktualisieren des Titels
  const handleTitelChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      titel: value,
    }));
  };

  // Handler zum Aktualisieren der Kategorie
  const handleKategorieChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      kategorie: value,
    }));
  };

  // Handler zum Aktualisieren des Standorts
  const handleStandortChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      standort: value,
    }));
  };

  // Handler zum Aktualisieren des Zeitraums
  const handleZeitraumChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      zeitraum: value,
    }));
  };

  // Handler zum Aktualisieren der Beschreibung
  const handleBeschreibungChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      beschreibung: value,
    }));
  };
  
  // Handler zum Absenden der aktualisierten Hilfsanzeige
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/hilfsanzeige/${helpId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hilfsanzeige),
    })
      .then((response) => response.json())
      .then((data) => {
        // Nachdem die Daten erfolgreich aktualisiert wurden, navigiere zur Konto-Seite
        navigate('/konto');
      })
      .catch((err) => {
      });
  };

  // Hauptkomponente für die Hilfsanzeige-Bearbeiten-Ansicht wird gerendert
  return (
    <div>
      {/* Prüfen, ob Hilfsanzeige existiert */}
      {hilfsanzeige && (
          <div>
            <div className="logo-container">
              <div className="logo-picture">
                <img className="logo" src={logo} alt="Logo" />
              </div>
              <p className="logo-description">
                Bearbeite deine Hilfsanzeige
              </p>
            </div>
            {/* Formular für die Bearbeitung der Hilfsanzeige */}
            <form className="helping-form">
              <div className="heling-form-inputs">
                <div>
                  <input
                      placeholder="Ich brauche Hilfe bei..."
                      type="text"
                      name="titel"
                      className="title-input"
                      value={hilfsanzeige.titel}
                      onChange={handleTitelChange}
                  />
                </div>
                <div>
                  <select className="form-select category" aria-label="Default select example" value={hilfsanzeige.kategorie} onChange={handleKategorieChange}>
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
                      value={hilfsanzeige.standort}
                      className="place-input"
                      onChange={handleStandortChange}
                  />
                  <input
                      placeholder="Zeitraum"
                      value={hilfsanzeige.zeitraum}
                      className="time-input"
                      onChange={handleZeitraumChange}
                  />
                </div>
                <div className="textarea">
                        <textarea rows="4" cols="48"
                                  placeholder="Beschreibung"
                                  value={hilfsanzeige.beschreibung}
                                  className="description-input"
                                  onChange={handleBeschreibungChange}
                        ></textarea>
                </div>
                <div className="submit-button">
                  <button onClick={handleSubmit} type="submit">
                    Speichern
                  </button>
                </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HilfsanzeigeBearbeiten;


