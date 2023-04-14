import React, { useEffect, useState } from "react";
import '../../css/editProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun} from '@fortawesome/free-regular-svg-icons'; 
import {faMoon, faGear, faVolumeHigh, faFeatherPointed, faUserCircle} from '@fortawesome/free-solid-svg-icons'; 
import api from "../../js/Api"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const EditProfile = (props) => {

    const [picture, setPicture] = useState('/media/profile_pictures/default.jpg')
    const [inputs, setInputs] = useState({});
    const [isPrivate, setPrivate] = useState (false);
    const [dark, setDark] = useState(false);
    const [currentPic, setCurrentPic] = useState ()
    const [currentTheme, setCurrentTheme] = useState ()
    const [currentPrivacy, setCurrentPrivacy] = useState()
    const navigate = useNavigate();
    

    const handleChange = (event) => {
      const targetName = event.target.name;
      const targetValue = event.target.value;
      setInputs(values => ({...values, [targetName]: targetValue}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs.bioIn)
      const config =  {headers: {'content-type': 'multipart/form-data'}}
      let form_data = new FormData();
      if (inputs.name != null) form_data.append('name', inputs.name);
      if (inputs.bio!= null) form_data.append('bio', inputs.bio);
      if (inputs.facebook != null) form_data.append('facebook', inputs.facebook);
      if (inputs.twitter != null) form_data.append('twitter', inputs.twitter);
      if (inputs.instagram != null) form_data.append('instagram', inputs.instagram);
      api.post('/edit-profile', form_data, config)
        .then((res) => {
          console.log(res.data);
          alert("Your changes have been saved ");
      })
      .catch(err => console.log(err))
    navigate("/profile");
    };
    
    const onImageChange = (e) => {
        console.log(e.target.files[0]);
        console.log(e.target.value);
        setPicture (e.target.files[0]);
        console.log(picture);
    }

    const handleImageSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const config =  {headers: {'content-type': 'multipart/form-data'}}
        let image_data = new FormData();
        image_data.append('profile_picture', picture, picture.name);
        api.post('/edit-picture', image_data, config)
            .then(res => {
                console.log(res.data);
                alert("Your changes have been saved ");
            })
            .catch(err => console.log(err))  
        navigate("/profile");
      };

useEffect(() => {
      const cancelToken = axios.CancelToken.source();
      api.get("/edit-picture", {cancelToken: cancelToken.token})
      .then((res) => {
          setCurrentPic(res.data.profile_picture)
      })
      .catch((err) => {
          if(axios.isCancel(err)){
              console.log("cancelled")
          }else{
              console.log(err)
          }
      })
      console.log("loaded")

      api.get("/edit-mode", {cancelToken: cancelToken.token})
            .then((res) => {
                const theme = (res.data.dark_mode)
                const privacy = (res.data.is_private)
                if (!theme) {
                    setCurrentTheme("light");
                    console.log(currentTheme);
                }else{
                    setCurrentTheme("dark");
                    console.log(currentTheme);
                }
                
                if(!privacy) {
                    setCurrentPrivacy("public")
                }else {
                    setCurrentPrivacy("private")
                }
            })
            .catch((err) => {
                if(axios.isCancel(err)){
                    console.log("cancelled")
                }else{
                    console.log(err)
                }
            })
            console.log("loaded")

        return () => {
            cancelToken.cancel();
        }

  return () => {
      cancelToken.cancel();
  }
},[])
    // const handlePrivateMode= (e)=> {
    //     if (e.target.checked) {
    //     setPrivate(true);
    //     console.log(e.target.checked)
    //     console.log(isPrivate)
    //     }
    //     else {
    //         setPrivate(false);
    //         console.log('"else"')
    //         console.log(isPrivate)
    //     }
    // }

      const handlePrivateMode= (e)=> {
        setPrivate(true);
      }

      const handlePublicMode = (e) => {
        setPrivate(false);
      }

      const handleLightMode = (e) => {
        setDark(false);
      }

      const handleDarkMode = (e) => {
        setDark(true);
      }

      function submitPreferences(){
        const config =  {headers: {'content-type': 'multipart/form-data'}}
        let mode_data = new FormData();
        mode_data.append('is_private', isPrivate);
        mode_data.append('dark_mode', dark);
        api.post('/edit-mode', mode_data, config)
            .then(res => {
                console.log(res.data);
                console.log("Your changes have been saved");
                alert("Your changes have been saved ");
            })
            .catch(err => {
                console.log(err);
                alert("Your changes have NOT been saved " +err);
            }) 
         navigate("/profile");
      };


    return (
        <div className="profileContainer">
            {/* <div className={`App ${theme}`}></div> */}
            <div className="profilePicture">
                <h1>Edit your profile</h1>
                <h4>Change Profile Picture:</h4>
                {/* <FontAwesomeIcon icon = {faUserCircle} className= "userPic"/> */}
                <img src = {currentPic} alt="profile picture"/>
                {/* <br/> */}
                <form onSubmit={handleImageSubmit}>
                    <input type="file" 
                           accept="image/png, image/jpeg" 
                           onChange={onImageChange} 
                           id="image" 
                           name="image"
                    />
                    <br/>
                    <input type="submit" value="Upload image"></input> 
                </form>
                {/* <button className="editpfp">
                     <FontAwesomeIcon icon = {faFeatherPointed} className= "quill"/>
                    {/* <img src={quill} alt="Edit Profile Picture"> </img> */}
                    {/* onClick = {editProfilePicture} *
                </button> */}
            </div> 
            <div className="names">
                <form onSubmit={handleSubmit}>
                    <label>Name
                    <br></br>
                     <input 
                        type="text" 
                        name="name" 
                        value={inputs.name || " "} 
                        onChange={handleChange}
                    />
                     </label>
                     <label>Blurb
                    <br></br>
                    <input 
                        type="text" 
                        name="bio" 
                        value={inputs.bio || " "} 
                        onChange={handleChange}
                    />
                    </label>
                     <label>Connect Facebook
                     <br></br>
                     <input 
                        type="url" 
                        name="facebook" 
                        value={inputs.facebook || " "} 
                        onChange={handleChange}
                    />
                     </label>
                     <label>Connect Twitter
                     <br></br>
                     <input 
                        type="url" 
                        name="twitter" 
                        value={inputs.twitter || " "} 
                        onChange={handleChange}
                    />
                     </label>
                     <label>Connect Instagram
                     <br></br>
                     <input 
                        type="url" 
                        name="instagram" 
                        value={inputs.instagram || " "} 
                        onChange={handleChange}
                    />
                     </label>
                 <input type="submit" value="Update details" />
                </form>
            </div>

            <div className="Blurb">
                       </div>


            <div className="settings">
                <h2> Settings
                    <FontAwesomeIcon icon = {faGear} className= "cog"/>
                </h2>

                {/* <div className= "languageSelect">
                    <label for="languages"> Select Language </label>
                    <select className="languages" id="languages" >
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div> */}

                {/* <div className= "lightDarkMode">
                    <label for="theme"> Light/Dark Mode </label>
                    <FontAwesomeIcon icon = {faSun} className= "sun"/>
                    <label name = "theme" id="theme" class="switch">
                        <input type="checkbox" 
                        />
                        <span class="slider round"></span>
                    </label>
                    <FontAwesomeIcon icon = {faMoon} className= "moon"/>
                </div> */}


                {/* <div className= "autoplayOption">
                    <label for="autoplay"> Auto-play Poems</label>
                    <FontAwesomeIcon icon = {faVolumeHigh} className= "speaker"/>
                    <label name="autoplay" id="autoplay" class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div> */}

                <form onSubmit={submitPreferences}> 
                <div className = "publicPrivateMode">
                <h4>Your account is currently {currentPrivacy} </h4>
                    <button onClick={handlePrivateMode}>
                        Private
                    </button>
                    <button onClick={handlePublicMode}>
                        Public
                    </button>
                    {/* <label className = "public"> Public</label>
                    <label class="switch">
                        <input type="checkbox" 
                         name="isPrivate"
                         onChange = {handlePrivateMode} 
                        //  checked = {isPrivate}
                         />
                        <span class="slider round" />
                    </label>
                    <label className= "private"> Private</label> */}
                </div>
                <div className="themeSetting">
                    <p> </p>
                    <h4>The current theme is {currentTheme} </h4>
                    <button onClick= {handleLightMode}>
                        Light Mode
                    </button>
                    <button onClick= {handleDarkMode}>
                        Dark Mode
                    </button>
                </div>
                {/* <h4>Save Preferences:</h4> */}
                {/* <input type="submit" value="Save Settings" /> */}
                </form>
            </div>

        </div>

    );
}