import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useContext( AuthContext )

    async function register(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/register',
                {
                    username: username,
                    email: email,
                    password: password,
                })
            console.log("Response in register: " + response);
            console.log("De gebruiker is geregistreerd");
            //of onderstaande en direct door naar login met zelfde gegevens
            login(response.data.accessToken);
            // of onderstaande met redirect naar login en zelf met de nieuwe gegevens inloggen
            // navigate('/signin')
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendiharum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda,
                consequuntur deserunt doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={register}>
                <label htmlFor="username">
                    gebruikersnaam
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label htmlFor="emailadress">
                    emailadres
                    <input
                        type="email"
                        id="emailadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password">
                    wachtwoord
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                >
                    Registreren
                </button>

            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default Register;