import React, {useContext, useEffect, useState} from 'react'
import Navigation from "./Navigation";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from 'react-modal';



const CloseButton = ({ onClick }) => (
  <button
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      color: "red",
    }}
    onClick={onClick}
  >
    &times;
  </button>
);
const Konto = () => {
    const [benutzer, setBenutzer] = useState([])
    const [helps, setHelps] = useState([])
    const [nutzername, setNutzername] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const keineAnzeigen = false
    const navigate = useNavigate();
    let hilfsanzeigen

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setNutzername(storedUsername);
      }
    }, [setNutzername]);

    useEffect(() => {
        fetch('http://localhost:3001/benutzer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBenutzer(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    useEffect(() => {
      fetch('http://localhost:3000/hilfsanzeige')
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      setHelps(data);
  
      }).catch((err) => {
          console.log(err.message);
      });
  }, []);

  const deleteProfile = (e) => {
    e.preventDefault();

    setShowPopup(true);
  };
  const cancelDelete = () => {
    setShowPopup(false);
  };
  const confirmDelete = async (id) => {
   
      // Konto löschen (Beispiel: Annahme, dass die Löschung erfolgreich ist)
      await fetch(`http://localhost:3001/benutzer/${id}`, { method: 'DELETE' });

      navigate("/")
  }
    

  if (keineAnzeigen) {
    hilfsanzeigen = (
        <div className="no-entry">
            Es sind keine Hilfseinträge vorhanden.
        </div>
    )
}
const deleteHelps = async (id) => {
  await fetch(`http://localhost:3000/hilfsanzeige/${id}`, { method: 'DELETE' });

  navigate("/hilfsanzeigen")
}

    
  
    return (
        <div>
          <Navigation />
          {
            benutzer && benutzer.map((benutzer, index) => {
              if (benutzer.nutzername === nutzername)  {
                return (
                  <div className="container">
                    <div className="header">
                      <h1>Mein Konto</h1>
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
                        <strong>Hausnummer:</strong> {benutzer.hausnummer}
                      </div>
                    </div>
                    <div className="box-container">
                      <div className="box Postleitzahl">
                        <strong>Postleitzahl:</strong> {benutzer.postleitzahl}
                      </div>
                      <div className="box Stadt">
                        <strong>Stadt:</strong> {benutzer.stadt}
                      </div>
                    </div>
                    <div className="box Email">
                      <strong>Email:</strong> {benutzer.email}
                    </div>
                    <div className="box Telefon">
                      <strong>Telefon:</strong> {benutzer.telefon}
                    </div>
                    <div className="box Nutzername">
                      <strong>Nutzername:</strong> {benutzer.nutzername}
                    </div>
                    <div className="actions">
                      <button className="action edit">
                        <NavLink to={`/editHilfsanzeige/:id`}>
                          Abmelden
                        </NavLink>            
                      </button>
                      <button className="action edit">
                      <NavLink to={``}>
                      Bearbeiten
                        </NavLink> 
                        
                      </button>
                      <button onClick={deleteProfile}>
                        Löschen
                      </button>
                      <div classname="PopUp">
                      {showPopup && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => setShowPopup(false)}
                    shouldCloseOnOverlayClick={false}
                     className="PopUp">
                    <CloseButton onClick={() => setShowPopup(false)} />
                    <h2>Möchtest du dein Konto löschen?</h2>
                    <div className="popup-buttons">
                    <button onClick={cancelDelete}>Abbrechen</button>
                    <button
                    className="action edit"
                    onClick={() => confirmDelete(benutzer._id)}>
                                         
                      Konto löschen
                    </button>
            </div>
                </Modal>
            )}
             </div>
                                    
                    </div>
                    <hr></hr>
                    <ol className="hilfsanzeigen">
                    <h1>Meine Hilfsanzeigen</h1>
                {
                    helps && helps.map((help, index)=> {
                        if (help.nutzername === nutzername)
                        return (
                            <div className="hilfen">
                                <div className="card">
                                    <li className="list-entry" data-id="$ID$">
                                        <div className="stadt titel">
                                            {help.standort}: {help.titel}
                                        </div>
                                        <div className="beschreibung">
                                            {help.beschreibung}
                                        </div>
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
                                                <button className="action edit">
                                          <NavLink
                                            to={`/EditHilfsanzeige/:id`}>
                                            Bearbeiten
                                          </NavLink>             
                                        </button>
                                        <button
                                          className="action edit"
                                          onClick={() => deleteHelps(help._id)}>
                                         
                                          Löschen
                                        </button>
                                    
                                            </div>
                                        </ul>
                                    </li>
                                </div>
                </div>
                        )
                    })
                }
                </ol>
                  </div>
             
                )
              }
            })
          }
        </div>

    )
}

export default Konto;
