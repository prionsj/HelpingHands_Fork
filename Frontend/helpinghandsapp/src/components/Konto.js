import React from 'react'
import Navigation from "./Navigation";

const Konto = () => {
    return (
        <div className="container"> 
        <div className="header">
          <h1>Mein Konto</h1>
        </div>
        <div className="box"> 
          <p><strong>Vorname:</strong> Ayse </p>
          <p><strong>Nachname:</strong> Kocak</p>
        </div>
        <div className="box"> 
          <p><strong>Straße:</strong> Rappenweg</p>
          <p><strong>Hausnummer:</strong> 6</p>
        </div>
        <div className="box"> 
          <p><strong>Postleitzahl:</strong> 743873</p>
          <p><strong>Stadt:</strong> Villingen</p>
        </div>
        <div className="box"> 
          <p><strong>Email:</strong> asxjsaco</p>
          <p><strong>Telefon:</strong> 283720</p>
        </div>
        <div className="box"> 
          <p><strong>Nutzername:</strong> dckjdj</p>
          <p><strong>Passwort:</strong> ********</p>
        </div>
      </div>
    )
}

export default Konto;