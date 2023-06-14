import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HilfsanzeigeBearbeiten = () => {
  const { helpId } = useParams();
  const [hilfsanzeige, setHilfsanzeige] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/hilfsanzeige/${helpId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHilfsanzeige(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [helpId]);

  const handleTitelChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      titel: value,
    }));
  };

  const handleKategorieChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      kategorie: value,
    }));
  };

  const handleStandortChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      standort: value,
    }));
  };

  const handleZeitraumChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      zeitraum: value,
    }));
  };

  const handleBeschreibungChange = (event) => {
    const { value } = event.target;
    setHilfsanzeige((prevHilfsanzeige) => ({
      ...prevHilfsanzeige,
      beschreibung: value,
    }));
  };
  

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
        console.log('Benutzerdaten wurden aktualisiert:', data);
        setIsSaved(true);
        // Nachdem die Daten erfolgreich aktualisiert wurden, navigiere zur Konto-Seite
        navigate('/konto');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  return (
    <div>
      {hilfsanzeige && (
        <form>
          {/* Benutzerdaten bearbeiten */}
          <h2>Bearbeite deine Daten</h2>
         
                <div className="heling-form-inputs">
                    <div>
                        <input
                            placeholder="Ich brauche Hilfe bei..."

            type="text"
            name="titel"
            value={hilfsanzeige.titel}
            onChange={handleTitelChange}
          />
                    </div>
                    <div>
                        <select className="form-select category" aria-label="Default select example" value={hilfsanzeige.kategorie} onChange={handleKategorieChange}>
                            <option selected>Kategorie</option>
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
                    <div>
                        <input
                            placeholder="Beschreibung"
                            value={hilfsanzeige.beschreibung}
                            className="description-input"
                            onChange={handleBeschreibungChange}
                        />
                    </div>
  
                </div>
         


  
          <button onClick={handleSubmit} type="submit">
            Speichern 
          </button>
        </form>
      )}
    </div>
  );
}

export default HilfsanzeigeBearbeiten;



