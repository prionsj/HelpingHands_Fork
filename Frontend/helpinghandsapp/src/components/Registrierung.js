
import {useNavigate, NavLink} from "react-router-dom";
import React, { useEffect,useState } from "react";
import logo from "./static/HelpingHandsWhite.png"
import Modal from 'react-modal';


export const Registrierung = () => {

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

    const [vorname, setVorname] = useState('');
    const [nachname, setNachname] = useState('');
    const [straße, setStraße] = useState('');
    const [hausnummer, setHausnummer] = useState('');
    const [postleitzahl, setPostleitzahl] = useState('');
    const [stadt, setStadt] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [nutzername, setNutzername] = useState('');
    const [passwort, setPasswort] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [benutzer, setBenutzer] = useState([]);
    const [showPopup2, setShowPopup2] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/benutzer')
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setBenutzer(data);

            }).catch((err) => {
            //console.log(err.message);
        });
    }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();
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
       const response = await fetch('http://localhost:3001/benutzer', {
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
       })//.then(res => console.log(res));
       navigate("/");
     }
   }


    return (
      <div className="registrieren-page">
          <div className="logo-container">
              <div className="logo-picture">
                  <img className="logo" src={logo}/>
              </div>
              <p className="logo-description">
                  Registrierung
              </p>
          </div>
      <form className="register-form">
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
            <button onClick={handleSubmit} type="submit">
                Registrieren
            </button>
        </div>
      </form>
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
              <h2>Für die Registrierung müssen alle Datenfelder ausgefüllt werden.</h2>
            </Modal>
        )}
          {showPopup2 && (
              <Modal
                  isOpen={true}
                  onRequestClose={() => setShowPopup2(false)}
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
                  <CloseButton onClick={() => setShowPopup2(false)} />
                  <h2>Der Benutzername oder die Email wurde bereits zur Registrierung verwendet.</h2>
              </Modal>
          )}
    </div>

    )
  }
    
   

export default Registrierung;