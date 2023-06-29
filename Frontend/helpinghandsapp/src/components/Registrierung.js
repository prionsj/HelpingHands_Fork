import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "./static/HelpingHandsWhite.png";
import Modal from 'react-modal';

export const handleRegistration = async (event, benutzer, vorname, nachname, straße, hausnummer, postleitzahl, stadt, email,
  telefon, nutzername, passwort, navigate, setShowPopup, setShowPopup2) => {
  event.preventDefault();
  const matchingNutzername = benutzer.find(
    (benutzer) =>
      benutzer.nutzername === nutzername
  );
  const matchingEmail = benutzer.find(
    (benutzer) =>
      benutzer.email === email
  );
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
    setShowPopup2(true);
  } else {
    setShowPopup(false);
    setShowPopup2(false);
    await fetch('http://localhost:3001/benutzer', {
      method: 'POST',
      body: JSON.stringify({
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
    });
    navigate("/");
  }
};

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
        setBenutzer(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="registrieren-page">
      <div className="logo-container">
        <div className="logo-picture">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <p className="logo-description">Registrierung</p>
      </div>
      <form className="register-form">
        {/* Form fields */}
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
  );
};

export default Registrierung;
