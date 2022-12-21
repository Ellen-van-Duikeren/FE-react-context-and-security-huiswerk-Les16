import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = React.createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: ""
    });
    const navigate = useNavigate();

    function login(email) {
        setIsAuth({isAuth: true, user: email});
        console.log("Gebruiker is ingelogd met het emailadres: " + email + "!");
        navigate('/profile');
    }

    function logout() {
        setIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        navigate('/');
    }

    const data = {
        isAuth: isAuth,
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

