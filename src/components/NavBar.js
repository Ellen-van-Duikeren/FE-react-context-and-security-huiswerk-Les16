import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, logout, username} = useContext(AuthContext);

    // console.log("User uit navbar: " + user);
    return (
        <nav>

            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>


            {isAuth &&
                <>
                    <span>{username}</span>
                    <button
                        type="button"
                        onClick={logout}
                    >
                        Log out
                    </button>
                </>
            }

            {!isAuth &&
                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Registreren
                    </button>
                </div>
            }
        </nav>
    );
}

export default NavBar;

