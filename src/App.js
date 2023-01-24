import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import './App.css';
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth} = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="content">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
              <Route exact path="/register" element={<Register/>}/>
              <Route exact path="/signin" element={<SignIn/>}/>
          </Routes>
      </div>
    </>
  );
}

export default App;
