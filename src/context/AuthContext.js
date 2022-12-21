import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = React.createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: ""
    });
    const navigate = useNavigate();

    function login(email) {
        setAuth({isAuth: true, user: email});
        console.log("Gebruiker is ingelogd met het emailadres: " + email + "!");
        navigate('/profile');
    }

    function logout() {
        setAuth({isAuth: false, user: ""});
        console.log("Gebruiker is uitgelogd!");
        navigate('/');
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

