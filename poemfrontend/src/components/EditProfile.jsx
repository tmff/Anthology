import React, {useState} from "react";
import "./Poem.css"
import quill from "./profileImgs/IMG_0627.png"
import insta from "./profileImgs/IMG_0629.png"
import facebook from "./profileImgs/IMG_0630.JPG"
import twitter from "./profileImgs/IMG_0633.JPG"
import sun from "./profileImgs/IMG_0849.png"
import moon from "./profileImgs/IMG_0852.png"
import speaker from "./profileImgs/IMG_0853.png"
import cog from "./profileImgs/IMG_0861.JPG"
import person from "./profileImgs/IMG_0862.PNG"



const EditProfile = (props) => {

    const [name, setName] = useState(["`James Watson"])
    const [username, setUsername] = useState ("@jameswatson")
    const [blurb, setBlurb] = useState("The next Michael Rosen")

    editProfilePicture() {
        console.log("CLICKED")
    }



return (
<div className = "profileContainer"> 
    <div className = "profilePicture">
        <img src = {person} alt = "Profile picture"></img>
        <button> 
            <img src= {quill} alt = "Edit Profile Picture"> </img> 
            onClick = {editProfilePicture}
        </button>
    </div> 

    <div className = "names">
        <h4> {name} </h4>
        <h4>{username}<h4/>
    </div>

    <div className="Blurb"> 
        <h2> Blurb</h2>
        <button>
            <img src= {quill} alt = "quill"> </img> 
            onClick = {setBlurb}
        </button>
    <div/>

    <div className= "Social Media">
        <img src = {facebook} alt = "Facebook">
            {/* <a> href </a>*/}
        </img>
        <img src = {twitter} alt = "Twitter">
            {/* <a> href </a>*/}
        </img>
        <img src = {insta} alt = "Instagram">
           {/* <a> href </a>*/}
        </img>
    </div>

    <div className = "Settings">
        <h2> Settings </h2>
        <img src = {cog} alt = "Settings"></img>
        <label for="languages"> Select language </label>
        <select name= "languages" id= "languages" >
            <option value= "english">English</option>
            <option value= "french">French</option>
            <option value= "spanish">Spanish</option>
        </select>
        <img src = {sun} alt = "Sun"></img>
        <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
        </label>
        <img src = {moon} alt = "Moon"></img>

        <label for = "autoplay"> Auto-play poems</label>
        <img src = {speaker} alt = "speaker"> </img>
        <label name = "autoplay" class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
        </label>

        <label>Public</label>
        <label class="switch"/>
           <input type="checkbox"/>
           <span class="slider round"/>
        </label>
        <label>Private</label>
    </div>
         
</div>
 )
}