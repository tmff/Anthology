import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

export default props => {
    
    return (
        <Menu>
            <a className='menu-item' href='/'>
                Home
            </a>
            <a className='menu-item' href='/'>
                Discover
            </a>
            <a className='menu-item' href='/'>
                A
            </a>
            <a className='menu-item' href='/'>
                Search
            </a>
            <a className='menu-item' href='/'>
                Profile
            </a>
        </Menu>
    );
    
};

