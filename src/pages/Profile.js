import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function Profile() {

    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [privateContent, setPrivateContent] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        async function getPrivateContent() {
            try {
                const response = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                })
                console.log(response);
                setPrivateContent(response.data);
            } catch (e) {
                console.error(e)
            }
        }
        void getPrivateContent();
        return function cleanup() {
            controller.abort();
        }
    }, []);



    return (
        <>
            {isAuth &&
                <>
                    <h1>Profielpagina</h1>
                    <h2>Welkom {user.username}</h2>
                    <section>
                        <h2>Gegevens</h2>
                        <p><strong>Gebruikersnaam:</strong>{user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </section>
                    <section>
                        <h2>{privateContent.title}</h2>
                      <p>{privateContent.content}</p>
                    </section>
                    <p>Terug naar de <Link to="/">Homepagina</Link></p>
                </>
            }
        </>
    );
}

export default Profile;