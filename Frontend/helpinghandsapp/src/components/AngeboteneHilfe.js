import React, {useContext} from 'react'
import Navigation from "./Navigation";
import UsernameContext from "./UsernameContext";

const AngeboteneHilfe = () => {

    const username = useContext(UsernameContext)

    return (
            <div>
                <Navigation />
                <h1>Angebotene Hilfe</h1>
                <p>Hier stehen später Hilfseinträge, bei denen ich geholfen habe.</p>
            </div>
    )
}

export default AngeboteneHilfe;