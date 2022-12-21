import React from 'react';
import {Link} from 'react-router-dom';

function SignUp() {
    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form>
                <label htmlFor="username">
                    gebruikersnaam
                    <input type="text" id="username"/>
                </label>
                <label htmlFor="emailadress">
                    emailadres
                    <input type="email" id="emailadress"/>
                </label>
                <label htmlFor="password">
                    wachtwoord
                    <input type="password" id="password"/>
                </label>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;