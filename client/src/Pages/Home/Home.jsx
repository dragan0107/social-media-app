import React, { useEffect } from 'react';
import './Home.css';
import Feed from '../../Components/Feed/Feed';
import RightBar from '../../Components/RightBar/RightBar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Cookies from 'js-cookie';

const Home = () => {
    return (
        <>
            <div className="homeContainer">
                <Sidebar />
                <Feed profile={false} />
                <RightBar />
            </div>
        </>
    );
};

export default Home;
