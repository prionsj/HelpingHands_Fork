import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHands.png";

const AngeboteneHilfe = () => {

    const [nutzername, setNutzername] = useState([]);
    const [angebote, setAngebote] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    useEffect(() => {
        fetch('http://localhost:3000/angebot')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAngebote(data);

            }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
            <div>
                <Navigation />
                <div className="logo-container">
                    <div className="logo-picture">
                        <img className="logo" src={logo}/>
                    </div>
                    <p className="logo-description">
                        Biete Hilfe in deiner Stadt
                    </p>
                </div>
                <ol className="hilfsanzeigen">

                </ol>
            </div>
    )
}

export default AngeboteneHilfe;