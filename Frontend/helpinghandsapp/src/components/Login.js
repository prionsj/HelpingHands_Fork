import React, { useState } from "react";
import logo from "./static/HelpingHands.png"
import {NavLink} from "react-router-dom";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="login-page">
             <div className="logo-picture">
                    <img className="logo" src={logo}/>
             </div>
             <p className="logo-description">
             <h2>Anmelden</h2>
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="deine.email@gmail.com" id="email" name="email" />
                <label htmlFor="password">Passwort</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                
                <button><NavLink to="/hilfsanzeigen">Anmelden</NavLink></button>
            </form>
            <button className="link-btn"><NavLink to="/Registrierung">Noch kein Konto?<br></br>Jetzt registrieren</NavLink></button>
        </div>
    )
}
    export default Login;
