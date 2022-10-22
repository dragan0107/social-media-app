import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Topbar from '../Topbar/Topbar';
import './Layout.css';

const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="layout">
            <Topbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
