import React, { useState, useContext } from "react";
import logo from "./static/HelpingHands.png";
import { NavLink } from "react-router-dom";
import UsernameContext from "./UsernameContext";

export const Login = ({ setUsername }) => {
    const [nutzername, setNutzername] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        setUsername(nutzername);
    }

    return (
        <div className="login-page">
            <div className="logo-picture">
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <p className="logo-description">
                <h2>Anmelden</h2>
            </p>

            <form className="login-form">
                <label htmlFor="nutzername">Nutzername</label>
                <input
                    value={nutzername}
                    onChange={(e) => setNutzername(e.target.value)}
                    type="text"
                    placeholder="evaeth"
                    id="nutzername"
                    name="nutzername"
                />
                <label htmlFor="passwort">Passwort</label>
                <input
                    type="password"
                    placeholder="********"
                    id="passwort"
                    name="passwort"
                />

                <button onClick={handleLogin}>
                    <NavLink to="/hilfsanzeigen">Anmelden</NavLink>
                </button>
            </form>
            <button className="link-btn">
                <NavLink to="/Registrierung">
                    Noch kein Konto?<br></br>Jetzt registrieren
                </NavLink>
            </button>
        </div>
    );
};

export default Login;