import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
            // check of er nog een token in Local Storage staat
            console.log("Context wordt gerefresht!");
            const storedToken = localStorage.getItem("token");
            // ZO JA: decodeer de token en haal de nieuwe data op en zet deze in de state:
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken)
                if (Math.floor(Date.now() / 1000) < decodedToken.exp) {
                    console.log( "De gebruiker is NOG STEEDS ingelogd." )
                    void fetchUserData(storedToken, decodedToken.sub);
                }
            } else {
                // ZO NEE:
                setAuth({
                    ...auth,
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        }, [] );


    function login(token) {
        console.log(token);
        console.log("De gebruiker is ingelogd");
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        void fetchUserData(token, decodedToken.sub, "/profile");
    }

    async function fetchUserData(token, id, redirect) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response);
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    // nooit password hierin zetten
                    id: response.data.id,
                },
                status: "done"
            });
            // als iemand op een andere pagina dan de profile page de page refresht dan moet deze op die pagina blijven
            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                ...auth,
                status: "done",
            })
        }
    }

    function logout() {
        console.log("Gebruiker is uitgelogd!");
        localStorage.removeItem("token");
        navigate('/signin');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        });
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

