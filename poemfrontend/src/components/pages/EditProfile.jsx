import React, { useState } from "react";
import '../../css/editProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun} from '@fortawesome/free-regular-svg-icons'; 
import {faMoon, faGear, faVolumeHigh, faFeatherPointed, faUserCircle} from '@fortawesome/free-solid-svg-icons'; 
import api from "../../js/Api"

export const EditProfile = (props) => {

    const [name, setName] = useState("James Watson");
    const [username, setUsername] = useState("@jameswatson");
    const [blurb, setBlurb] = useState("The next Michael Rosen");

    // function editProfilePicture() {
    //     console.log("CLICKED");
    //     {/* save button */ }
    // }

    // function toDarkMode = (e) => {
    //     if ( console.log( e.target.checked ) ) {
            
    //       } else {

    //       }
    // }

    // const currentSettings= (e) => {
    //     e.preventDefault();
    //     console.log("getting current settings");

    // Fetch the current user settings using get API
    //    api.get("/users/u777/settings",config)
    //     .then((res) => {
        // retrieve data from res variable
        // console.log(res);})
    //     .catch((err) => console.log(err))
 
    // Save user settings - on Save button
    //     api.post("/users/u777/settings",{
    //         language: english, // fetch from fields
    //         mode: light,
    //         autoplay: off,
    //         public: yes
    //     },config)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err))
    // }

    //  const newSettings = (e) => {
    //     e.preventDefault();
    //     console.log("saving settings");


    // }

    return (
        <div className="profileContainer">

            <div className="profilePicture">
                {/* <img src={person} alt="Profile picture"></img> */}
                <FontAwesomeIcon icon = {faUserCircle} className= "userPic"/>

                <button className="editpfp">
                     <FontAwesomeIcon icon = {faFeatherPointed} className= "quill"/>
                    {/* <img src={quill} alt="Edit Profile Picture"> </img> */}
                    {/* onClick = {editProfilePicture} */}
                </button>
            </div> 
            <div className="names">
                <h4> {name} </h4>
                <h4>{username}</h4>
            </div>

            <div className="Blurb">
                <h2> Blurb</h2>
                <button className= "editblurb">
                     <FontAwesomeIcon icon = {faFeatherPointed} className= "quill"/>
                     {/* <img src={quill} alt="quill"> </img> 
                    onClick = {setBlurb} */}
                </button>
                <p>{blurb}</p>
            </div>

            <div className="socialMedia">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <div className="facebook">
                    <a href="#" class="fa fa-facebook"></a>
                </div>
                <div className="twitter">
                    <a href="#" class="fa fa-twitter"></a>
                </div>
                <div className="instagram">
                    <a href="#" class="fa fa-instagram"></a>
                </div>
            </div>

            <div className="settings">
                <h2> Settings
                    <FontAwesomeIcon icon = {faGear} className= "cog"/>
                </h2>

                <div className= "languageSelect">
                    <label for="languages"> Select Language </label>
                    <select className="languages" id="languages" >
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div>

                <div className= "lightDarkMode">
                    <label for="theme"> Light/Dark Mode </label>
                    <FontAwesomeIcon icon = {faSun} className= "sun"/>
                    <label name = "theme" id="theme" class="switch">
                        <input type="checkbox" 
                        // onChange={toDarkMode} 
                        />
                        <span class="slider round"></span>
                    </label>
                    <FontAwesomeIcon icon = {faMoon} className= "moon"/>
                </div>


                <div className= "autoplayOption">
                    <label for="autoplay"> Auto-play Poems</label>
                    <FontAwesomeIcon icon = {faVolumeHigh} className= "speaker"/>
                    <label name="autoplay" id="autoplay" class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div>


                <div className = "publicPrivateMode">
                    <label className = "public"> Public</label>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round" />
                    </label>
                    <label className= "private"> Private</label>
                </div>
            </div>

        </div>

    );
}