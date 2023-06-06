import React, { useState, useEffect} from "react"
import Navigation from "./Navigation";
import { useNavigate} from "react-router-dom";
import logo from "./static/HelpingHands.png"
import Modal from "react-modal";

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

const Hilfsanzeigen = () => {
        const keineAnzeigen = false
        let hilfsanzeigen

    const [helps, setHelps] = useState([])
    const [nutzername, setNutzername] = useState([]);
    const [titel, setTitel] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
        
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

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setNutzername(storedUsername);
        }
    }, [setNutzername]);

    const handleHelps = async (currentTitle) => {
        const response = await fetch('http://localhost:3000/angebot', {
            method: 'POST',
            body:
                JSON.stringify({
                    "titel": currentTitle,
                    "nutzername": nutzername

                }),

            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res));
    }

    const deleteHelps = async (id) => {
        await fetch(`http://localhost:3000/hilfsanzeige/${id}`, { method: 'DELETE' });
    }


    const handleHelprequest = (titel, id) => {
        setTitel(titel);
        const matchingBenutzer = helps.find(
            (help) =>
                help.nutzername === nutzername
        );
        if (matchingBenutzer) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
            handleHelps(titel);
            deleteHelps(id);
            navigate("/angebotene-hilfe");
        }
    };

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
                        return (
                            <div className="hilfen">
                                <div className="card">
                                    <li className="list-entry" data-id={help._id}>
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
                                                <div className="action edit"
                                                     onClick={() => handleHelprequest(help.titel, help._id)}>
                                                    <a className="anfrage" href={"#"} >✉️<br/>Ich kann helfen
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
                        <h2>Diese Hilfsanzeige wurde von dir selbst erstellt.</h2>
                    </Modal>
                )}
            </div>
        )


}

export default Hilfsanzeigen;