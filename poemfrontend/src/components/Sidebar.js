import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
import Cookies from 'universal-cookie'


export default props => {
    
    const cookies = new Cookies();

    function DeleteLoginToken(){
        cookies.remove('Token')
        useNavigate().navigate('/login')
    }

    return (
        <Menu>
            <Link to={`/friends`} className='menu-item'>Friends</Link>
            <Link to={`/reading-room`} className='menu-item'>Reading Room</Link>
            <Link to={`/highlight`} className='menu-item'>Highlight</Link>
            <Link to={`/search`} className='menu-item'>Search</Link>
            <Link to={`/profile`} className='menu-item'>Profile</Link>
            <Link to={`/write`} className='menu-item'>Write</Link>
            <Link to={`/edit-profile`} className='menu-item'>Edit Profile</Link>
	        <Link to={`/privacy`} className='menu-item'>Privacy Policy</Link>
            <Link to={`/bookmarks`} className='menu-item'>Bookmarks</Link>
            <Link to={`/`} className='menu-item' onClick={DeleteLoginToken}>Logout</Link>
        </Menu>
    );
    
};

