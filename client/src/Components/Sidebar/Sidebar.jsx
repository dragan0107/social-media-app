import React from 'react';
import CloseFriend from '../CloseFriend/CloseFriend';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-top-list">
                <li className="sidebar-top-list-item">
                    <i className="sidebar-top-icon fas fa-envelope"></i>
                    <span className="icon-span">Chats</span>
                </li>
                <li className="sidebar-top-list-item">
                    <i className="sidebar-top-icon fas fa-play-circle"></i>
                    <span className="icon-span">Videos</span>
                </li>
                <li className="sidebar-top-list-item">
                    <i className="sidebar-top-icon fas fa-users"></i>
                    <span className="icon-span groups-span">Groups</span>
                </li>
                <li className="sidebar-top-list-item">
                    <i className="sidebar-top-icon fas fa-briefcase"></i>
                    <span className="icon-span ">Jobs</span>
                </li>
                <li className="sidebar-top-list-item">
                    <i className="sidebar-top-icon fas fa-pager"></i>
                    <span className="icon-span">Pages</span>
                </li>
            </ul>
            <span className="close-friends">Close friends</span>
            <hr className="sidebar-hr" />
            <ul className="friends-list-sidebar">
                <CloseFriend />
                <CloseFriend />
                <CloseFriend />
                <CloseFriend />
                <CloseFriend />
                <CloseFriend />
                <CloseFriend />
            </ul>
        </div>
    );
};

export default Sidebar;
