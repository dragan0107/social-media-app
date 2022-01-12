import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';

function App() {
    const user = true;
    return (
        <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="login" element={<Login />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}

export default App;
