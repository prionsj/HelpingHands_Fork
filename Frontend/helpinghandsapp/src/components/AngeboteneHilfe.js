import React, { useEffect, useState} from 'react'
import Navigation from "./Navigation";
import logo from "./static/HelpingHands.png";

const AngeboteneHilfe = () => {

    const [nutzername, setNutzername] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

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
            </div>
    )
}

export default AngeboteneHilfe;