import React, { useState } from "react";
import './editProfile.css'
import api from "../js/Api"
import quill from "./profileImgs/IMG_0627.jpg"
import insta from "./profileImgs/IMG_0629.PNG"
import facebook from "./profileImgs/IMG_0630.PNG"
import twitter from "./profileImgs/IMG_0633.PNG"
import sun from "./profileImgs/IMG_0849.PNG"
import moon from "./profileImgs/IMG_0852.PNG"
import speaker from "./profileImgs/IMG_0853.PNG"
import cog from "./profileImgs/IMG_0861.JPG"
import person from "./profileImgs/IMG_0862.PNG"



export const EditProfile = (props) => {

    const [name, setName] = useState(["James Watson"]);
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

            {/* <div className="profilePicture">
                <img src={person} alt="Profile picture"></img>
                <button>
                    <img src={quill} alt="Edit Profile Picture"> </img>
                    onClick = {editProfilePicture}
                </button>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
               <button class="btn"><i class="fa fa-home"></i></button>
            </div>  */}
            <div className="names">
                <h4> {name} </h4>
                <h4>{username}</h4>
            </div>

            <div className="Blurb">
                <h2> Blurb</h2>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <button class="btn"><i class="fa-solid fa-feather"></i></button>
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

                {/* <div className="container" >              <img src={facebook} alt="Facebook" ></img></div>
                <div className="container" >   
                
                <img src={twitter} alt="Twitter"></img>
                </div>
                <div className="container" >   
                <img src={insta} alt="Instagram"></img> 
                </div> */}
                {/* <i class="fa-brands fa-instagram" style="font-size:48px; color:red"></i> */}
            </div>

            <div className="settings">
                <h2> Settings
                    {/* <img src={cog} alt="Settings"></img> */}
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
                    {/* <img src={sun} alt="Sun"></img> */}
                    <i class="fa fa-sun-o"></i>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                    {/* <img src={moon} alt="Moon"></img> */}
                    <i class="fa fa-moon-o"></i>
                </div>


                <div>
                    <label for="autoplay"> Auto-play poems</label>
                    {/* <img src={speaker} alt="speaker"> </img> */}
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