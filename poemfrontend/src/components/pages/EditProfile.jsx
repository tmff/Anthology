import React, { useState } from "react";
<<<<<<< HEAD:poemfrontend/src/components/EditProfile.jsx
import '../css/editProfile.css'
import api from "../js/Api"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import quill from "./profileImgs/IMG_0627.jpg"
=======
import '../../css/editProfile.css'
import api from "../../js/Api"


>>>>>>> 7c29d265a9252009282ce76c667e6ac75053d2a2:poemfrontend/src/components/pages/EditProfile.jsx

export const EditProfile = (props) => {

    const [name, setName] = useState("James Watson");
    const [username, setUsername] = useState("@jameswatson");
    const [blurb, setBlurb] = useState("The next Michael Rosen");

    // function editProfilePicture() {
    //     console.log("CLICKED");
    //     {/* save button */ }
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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <i class="fa fa-user-circle-o"></i>
                {/* <button>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/font-awesome.min.css"/>
                    <i class="fa fa-feather-pointed"></i>
                    {/* <img src={quill} alt="Edit Profile Picture"> </img> 
                    {/* onClick = {editProfilePicture} 
                </button> */}
            </div> 
            <div className="names">
                <h4> {name} </h4>
                <h4>{username}</h4>
            </div>

            <div className="Blurb">
                <h2> Blurb</h2>
                <p>{blurb}</p>
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <button class="btn"><i class="fa-solid fa-feather"></i></button> */}
                {/* <button>
                     <img src={quill} alt="quill"> </img> *
                    onClick = {setBlurb}
                </button> */}
            </div>

            <div className="socialMedia">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
                <a href="#" class="fa fa-instagram"></a>
            </div>

            <div className="settings">
                <h2> Settings
                    <i class="fa fa-cog"></i>
                </h2>
                <div>
                    <label for="languages"> Select language </label>
                    <select name="languages" id="languages" >
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div>

                <div>
                    <i class="fa fa-sun-o"></i>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                    <i class="fa fa-moon-o"></i>
                </div>


                <div>
                    <label for="autoplay"> Auto-play poems</label>
                    <i class="fa fa-volume-up"></i>
                    <label name="autoplay" id="autoplay" class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div>


                <div>
                    <label>Public</label>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round" />
                    </label>
                    <label>Private</label>
                </div>
            </div>

        </div>

    );
}