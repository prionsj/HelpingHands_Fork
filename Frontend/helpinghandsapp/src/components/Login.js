import React from 'react'
import {NavLink} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <p>Hier kann sich der User später einloggen.</p>
            <button><NavLink to="/hilfsanzeigen">Einloggen</NavLink></button>
            <button><NavLink to="/registrierung">Zur Registrierung</NavLink></button>
        </div>
    )
}

export default Login;