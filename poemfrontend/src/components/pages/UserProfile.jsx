import React, { useState, useEffect } from "react";
import Dropdown from '../Dropdown'
import api from "../../js/Api";
import '../../css/UserProfile.css';
import axios from "axios";

export const UserProfile = (props) => {
    const [name, setName] = useState('');
    const [blurb, setBlurb] = useState('A fledgling Edgar Allen Poe');
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [picture, setPicture] = useState()
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
            api.get("/edit-profile", {cancelToken: cancelToken.token})
            .then((res) => {
                setName(res.data.name);
                setBlurb(res.data.bio);
                setFacebook(res.data.facebook)
                setTwitter(res.data.twitter)
                setInstagram(res.data.instagram)
            })
            .catch((err) => {
                if(axios.isCancel(err)){
                    console.log("cancelled")
                }else{
                    console.log(err)
                }
            })
            console.log("loaded")

            api.get("/edit-picture", {cancelToken: cancelToken.token})
            .then((res) => {
                setPicture(res.data.profile_picture)
            })
            .catch((err) => {
                if(axios.isCancel(err)){
                    console.log("cancelled")
                }else{
                    console.log(err)
                }
            })
            console.log("loaded")

            // api.get("/get-friends", {cancelToken: cancelToken.token})
            // .then((res) => {
            //     setFriends(res.data)
            //     console.log(res.data)
            // })
            // .catch((err) => {
            //     if(axios.isCancel(err)){
            //         console.log("cancelled")
            //     }else{
            //         console.log(err)
            //     }
            // })
            // console.log("loaded")

        return () => {
            cancelToken.cancel();
        }
    },[])


    return (
        <div className='user-profile-view'>
            <header>
                <h1 className='username-title'>
                    {name}'s Anthology
                </h1>
                {/* <Dropdown />  */}
            </header>

            <body>
                <img src= {picture} alt= "profile picture" className="profile-picture"/>

                <div className="followers">
                    <table>
                        <tr>
                            <td className="follower-label">Followers: &nbsp;  &nbsp; </td>
                            <td className="following-label">Following: &nbsp;  &nbsp; </td>
                        </tr>
                        <tr>
                            <td className="follower-count">{followerCount}</td>
                            <td className="following-count">{followingCount}</td>
                        </tr>
                    </table>
                </div>

                <div className="edit-profile-link">
                    <a href="/edit-profile">
                        <button className="edit-profile-btn">Edit Profile</button>
                    </a>
                </div>

                <div className="Blurb">
                    <h2>{blurb}</h2>
                </div>

                <div className="socialMedia">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <div className="facebook">
                        <a href={facebook} class="fa fa-facebook"></a>
                    </div>
                    <div className="twitter">
                        <a href={twitter} class="fa fa-twitter"></a>
                    </div>
                    <div className="instagram">
                        <a href={instagram} class="fa fa-instagram"></a>
                    </div>
                </div>
            </body>
        </div>
    )
}