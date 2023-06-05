import React, {Component, useState, useEffect} from "react"
import Navigation from "./Navigation";
import logo from "./static/HelpingHands.png"

const Hilfsanzeigen = () => {
        const keineAnzeigen = false
        let hilfsanzeigen

    const [helps, setHelps] = useState([])
        
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


    if (keineAnzeigen) {
            hilfsanzeigen = (
                <div className="no-entry">
                    Es sind keine Hilfseinträge vorhanden.
                </div>
            )
        }

    return (
            <div className="hilfsanzeigen-page">
                <Navigation />
                <div className="logo-container">
                    <div className="logo-picture">
                        <img className="logo" src={logo}/>
                    </div>
                    <p className="logo-description">
                        Biete Hilfe in deiner Stadt
                    </p>
                </div>
                <div className="search-container">
                    <form className="d-flex search" role="search">
                        <input type="search" className="form-control rounded" placeholder="Standort" aria-label="Suche"
                               aria-describedby="search-addon"/>
                        <button className="btn" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="category-container">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Kategorie</option>
                        <option value="1">Kategorie 1</option>
                        <option value="2">Kategorie 2</option>
                        <option value="3">Kategorie 3</option>
                    </select>
                </div>
                <ol className="hilfsanzeigen">
                {
                    helps && helps.map((help, index)=> {
                        console.log(help.titel)
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
                                                <div className="action edit">
                                                    <a className="anfrage" href={"#"}>✉️<br/>Anfragen
                                                    </a>
                                                </div>
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

export default Hilfsanzeigen;