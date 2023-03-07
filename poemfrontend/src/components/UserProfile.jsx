import React, { useState } from "react";
import api from "../js/Api";
import '../css/UserProfile.css';

export const UserProfile = (props) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [blurb, setBlurb] = useState('A fledgling Edgar Allen Poe');


    function dropDown() {
        return 0;
    }

    return (
        <div className='user-profile-view'>
            <header>
                <h1 className='username-title'>
                    user_123's Anthology
                </h1>
                <div className='current-user-menu'>
                    <img className='current-user-profile' src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="Profile Picture"></img>
                    <div className='dropdown'>
                        <button onClick={dropDown()} class='dropbtn'><i class="fa-solid fa-chevron-down"></i>You</button>
                        <div id='dropdown-menu' className='dropdown-contents'>
                            <a href="#">Your Profile</a>
                            <a href="#">Account Information</a>
                            <a href="#">Settings</a>
                        </div>
                    </div>
                </div>
            </header>

            <body>

            </body>
        </div>
    )
}