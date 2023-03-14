import React, { useState } from "react";
import Dropdown from '../Dropdown'
import api from "../../js/Api";
import '../../css/UserProfile.css';

export const UserProfile = (props) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [blurb, setBlurb] = useState('A fledgling Edgar Allen Poe');

    return (
        <div className='user-profile-view'>
            <header>
                <h1 className='username-title'>
                    user_123's Anthology
                </h1>
                <Dropdown />
            </header>

            <body>

            </body>
        </div>
    )
}