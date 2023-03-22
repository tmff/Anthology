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
            <ul className='accrej'>
                {requests.map((item) => {
                    return (
                        <div>
                            <li key={item.id} className='username'>{item.from_user.username}</li>
                            <button>accept</button>
                            <button>reject</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
};

export default FriendsMenu;

