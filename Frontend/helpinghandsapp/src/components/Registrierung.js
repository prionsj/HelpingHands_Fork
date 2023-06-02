
import {NavLink} from "react-router-dom";
import React, { useState } from "react";
import logo from "./static/HelpingHands.png"


const Registrierung = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="registrieren-page">
          <div className="logo-picture">
            <img className="logo" src={logo}/>
          </div>
            <h2>Registrieren</h2>
      <form className="register-form" onSubmit={handleSubmit}>
     
        <div className="name_container">
          <label htmlFor="name">Vorname</label>
          <br></br>
          <input placeholder="Vorname" className="name"/>
          <br></br>
          <label htmlFor="name">Nachname</label>
          <br></br>
          <input placeholder="Nachname" className="name"/>
        </div>
        <div className="adress_container">
          <label htmlFor="name">Straße und Hausnummer</label>
          <br></br>
          <input placeholder="Mustermannstraße 1" className="otherField"/>
          <br></br>
          <label htmlFor="name">Plz und Stadt</label>
          <br></br>
          <input placeholder="78048 Musterstadt" className="otherField"/>
        </div>
        <div className="mail_container">
          <label htmlFor="email">E-Mail</label> 
          <br></br>  
          <input placeholder="E-mail" className="otherField"/>
        </div>
        <div className="username_container">
          <label htmlFor="username">Username</label> 
          <br></br>
          <input placeholder="max.mustermann" className="otherField"/>
        </div>
        <div className="pw_container">
          <label htmlFor="password">Passwort</label> 
          <br></br>
          <input placeholder="Password" className="otherField"/>
          <label htmlFor="password">Passwort wiederholen</label> 
          <br></br>
          <input placeholder="Password" className="otherField"/>
        </div>
        <div class="checkbox-text">
          <div class="checkbox-content">
            <input type="checkbox" id="termCon"/>
            <label for="termCon" class="text">Hiermit akzeptiere Ich die AGB </label>
          </div>
        </div>
        <button><NavLink to="/konto">Registrieren</NavLink></button>
      </form>
       
        </div>

    )
}
   

export default Registrierung;