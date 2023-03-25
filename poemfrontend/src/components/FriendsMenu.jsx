import React, { useEffect, useState } from 'react';
import '../css/FriendsMenu.css';
import api from '../js/Api.js';

const FriendsMenu = (props) => {
    const [requests,setRequests] = useState([]);
    const [sendInput,setSendInput] = useState('');
    const [friendRes,setFriendRes] = useState(' ');
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

    function sendFriendRequest(){
        api.post('/send-friend-request',{
            to_user: sendInput,
        })
        .then((res) => {
            console.log(res.data.status)
            setFriendRes(res.data.status)
        })
        .catch((err) => {
            console.log(err)
            setFriendRes(err.response.data.error)
        })
    }


    return (
        <div className="FriendsMenu">
            <div>
                <label for="sndReq">Send Request</label>
                <input id="sndReq" name="sendReq" type="text" onChange={e => setSendInput(e.target.value)}></input>
                <div>
                    <button type="button" onClick={sendFriendRequest}></button>
                </div>
                <b1>{friendRes}</b1>

            </div>
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

