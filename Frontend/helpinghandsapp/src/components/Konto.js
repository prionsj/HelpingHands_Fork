import React, {useContext, useEffect, useState} from 'react'
import Navigation from "./Navigation";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import logo from "./static/HelpingHandsWhite.png";

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
    const [isDataSaved, setIsDataSaved] = useState(true);
    const location = useLocation();
    const updatedUsername = location?.state?.updatedUsername; // Erhalten Sie den aktualisierten Nutzernamen aus dem state-Objekt

  const navigate = useNavigate();
  let hilfsanzeigen;
    const keineAnzeigen = false



    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setNutzername(storedUsername);
      }
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/benutzer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBenutzer(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, [updatedUsername]);

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


const deleteHelps = async (id) => {
  await fetch(`http://localhost:3000/hilfsanzeige/${id}`, { method: 'DELETE' });

  navigate("/hilfsanzeigen")
}

const deleteUserConfirmation = async (id) => {
  
    setShowPopup(true);
 

}
const deleteUser = async (id) => {
  await fetch(`http://localhost:3001/benutzer/${id}`, { method: 'DELETE' });

  navigate("/")
}
const handleBearbeiten = (benutzerId) => {
  navigate(`/benutzerbearbeiten/${benutzerId}`);
};

const handleBearbeiten2 = (helpId) => {
  navigate(`/hilfsanzeigebearbeiten/${helpId}`);
};


    return (
        <div>
          <Navigation />
          {
            benutzer && benutzer.map((benutzer, index) => {
              if (benutzer.nutzername === nutzername)  {
                return (
                  <div className="container">
                      <div className="logo-container">
                          <div className="logo-picture">
                              <img className="logo" src={logo} alt="Logo" />
                          </div>
                          <p className="logo-description">
                              Dein Konto
                          </p>
                      </div>
                    <div className="header">
                      <h1>Benutzerdaten</h1>
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
                        <strong>Nr.:</strong> {benutzer.hausnummer}
                      </div>
                    </div>
                    <div className="box-container">
                      <div className="box Postleitzahl">
                        <strong>PLZ:</strong> {benutzer.postleitzahl}
                      </div>
                      <div className="box Stadt">
                        <strong>Stadt:</strong> {benutzer.stadt}
                      </div>
                    </div>
                    <div className="box-container">
                        <div className="box Email">
                          <strong>Email:</strong> {benutzer.email}
                        </div>
                    </div>
                    <div className="box-container">
                        <div className="box Telefon">
                          <strong>Telefon:</strong> {benutzer.telefon}
                        </div>
                    </div>
                    <div className="box-container">
                        <div className="box Nutzername">
                          <strong>Nutzername:</strong> {benutzer.nutzername}
                        </div>
                    </div>
                    <div className="konto-buttons">
                      <button className="konto-button"
                              onClick={() => handleBearbeiten(benutzer._id)}>Bearbeiten
                      </button>
                      <button className="konto-button"
                          onClick={deleteUserConfirmation}>Löschen
                      </button>
                      <button className="konto-button logout">
                        <NavLink to={`/`}>Abmelden</NavLink>
                      </button>

                            {showPopup && (
                                <Modal
                                    isOpen={true}
                                    onRequestClose={() => setShowPopup(false)}
                                    shouldCloseOnOverlayClick={false}
                                    style={{
                                        content: {
                                            width: "300px",
                                            height: "400px",
                                            margin: "auto",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "red",
                                            border: "2px solid red",
                                        },
                                        overlay: {
                                            background: "rgba(0, 0, 0, 0.5)",
                                        },
                                    }}
                                >
                              
                                    <CloseButton onClick={() => setShowPopup(false)} />
                                    <h2>Möchtest du dein Konto Löschen?</h2>
                                    <button onClick={() => deleteUser(benutzer._id)}>
                                      Löschen
                                    </button>
                                      <button onClick={() => setShowPopup(false)}>
                                          Abbrechen
                                      </button>
                                </Modal>
                            )}
                                    
                                            </div>
                    <hr></hr>
                    <ol className="hilfsanzeigen">
                        <div className="header">
                            <h1>Meine Hilfsanzeigen</h1>
                        </div>
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
                                            <button className="konto-button hilfsanzeige-bearbeiten" onClick={() => handleBearbeiten2(help._id)}>Bearbeiten
                                               
                                               </button>
                                               <button className="konto-button" onClick={() => deleteHelps(help._id)}>
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