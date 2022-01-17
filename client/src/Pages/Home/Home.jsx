import React, { useContext } from 'react';
import './Home.css';
import Feed from '../../Components/Feed/Feed';
import RightBar from '../../Components/RightBar/RightBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import { AuthContext } from '../../Context/AuthContext';

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed profile={false} />
                <RightBar />
            </div>
        </>
    );
};

export default Home;
