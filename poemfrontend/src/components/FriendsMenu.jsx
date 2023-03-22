import React, { useEffect, useState } from 'react';
import '../css/FriendsMenu.css';
import api from '../js/Api.js';

const FriendsMenu = (props) => {
    const [requests,setRequests] = useState([]);
    //On menu open
    useEffect(() => {
        api.get("/pending-request/")
        .then((res) => {
            console.log(res.data)
            setRequests(res.data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        if(requests){
            //console.log("Number of requests " + requests.length)
        }
    },[requests,])

    return (
        <div className="FriendsMenu">
            <ul className='items'>
                {requests.map((item) => {
                    return <li key={item.id}>{item.from_user.username}</li>
                })}
            </ul>
        </div>
    );
};

export default FriendsMenu;