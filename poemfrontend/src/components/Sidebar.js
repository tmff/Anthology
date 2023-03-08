import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom'
import '../css/Sidebar.css';

export default props => {
    
    return (
        <Menu>
            <Link to={`/friends`} className='menu-item'>Friends</Link>
            <Link to={`/discover`} className='menu-item'>Discover</Link>
            <Link to={`/what`} className='menu-item'>A</Link>
            <Link to={`/search`} className='menu-item'>Search</Link>
            <Link to={`/profile`} className='menu-item'>Profile</Link>
            <Link to={`/write`} className='menu-item'>Write</Link>
            <Link to={`/edit-profile`} className='menu-item'>Edit Profile</Link>
        </Menu>
    );
    
};

