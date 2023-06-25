import React, { useState, useContext, useEffect } from "react";
import logo from "./static/HelpingHands.png";
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

// Ausgelagerte handleLogin-Funktion
export const handleLogin = (event, nutzername, passwort, benutzer, navigate, setShowPopup) => {
    event.preventDefault()
    const matchingBenutzer = benutzer.find(
        (benutzer) => benutzer.nutzername === nutzername && benutzer.passwort === passwort
    );
    if (matchingBenutzer) {
        setShowPopup(false);
        localStorage.setItem('username', nutzername);
        navigate("/hilfsanzeigen");
    } else {
        setShowPopup(true);
    }
};

export const Login = () => {
    const navigate = useNavigate();
    const [nutzername, setNutzername] = useState("");
    const [passwort, setPasswort] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [benutzer, setBenutzer] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/benutzer")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBenutzer(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('username', nutzername);
    }, [nutzername]);

    return (
        <div className="login-page">
            <div className="logo-picture">
                <img className="login logo" src={logo} alt="Logo" />
            </div>

            <form className="login-form">
                <label htmlFor="nutzername">Benutzername</label>
                <input
                    value={nutzername}
                    onChange={(e) => setNutzername(e.target.value)}
                    type="text"
                    placeholder="Benutzername"
                    id="nutzername"
                    name="nutzername"
                />
                <label htmlFor="passwort">Passwort</label>
                <input
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                />
                <div className="login-button">
                <button onClick={(event) => handleLogin(event, nutzername, passwort, benutzer, navigate, setShowPopup)}>
                    Anmelden
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
                    <h2>Benutzername oder Passwort ist inkorrekt</h2>
                </Modal>
            )}
            <div className="register-now">
                <button className="link-btn">
                    <NavLink to="/Registrierung">
                        Noch kein Konto?
                        <br></br>Jetzt registrieren
                    </NavLink>
                </button>
            </div>
        </div>
    );
};

export default Login;
