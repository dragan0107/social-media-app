import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';

function App() {
    const { user } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="login" element={!user ? <Login /> : <Home />} />
            <Route
                path="profile/:username"
                element={user ? <Profile /> : <Login />}
            />
            <Route path="register" element={!user ? <Register /> : <Home />} />
        </Routes>
    );
}

export default App;
