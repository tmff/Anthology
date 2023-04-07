import api from "../js/Api"
import { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../css/Poem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faPaperPlane, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState([{username:""}]);


    useEffect(() => {
        if(!props.id){
            setPoemContent(props.content);
            setAuthor([props.content.author]);
        }
        else{
            var path = "/poems/" + props.id;
            api.get(path)
            .then((res) => setPoemContent(res.data))
            .catch((err) => console.log(err));
            console.log("loaded")
        }
    },[])

    function setPoemContent(data){
        setTitle(data.title)
        var splitString = ['','',''];
        splitString = data.content.split("\n");
        setContent([splitString[0],splitString[1],splitString[2]]);
    }

    if(props.highlighted){
        return(
            <div>
              <div className="colored-block">
                <h4>{title}</h4>
                <p>{line1}<br/>{line2}<br/>{line3}</p>
                <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
              </div>
                <div className='viewer highlighted'>
                    <span className="dot"> </span>
                    <h1>{title}</h1>
                    <h2>{line1}</h2>
                    <h2>{line2}</h2>
                    <h2>{line3}</h2>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
              <div className="poem">
              <div className="colored-block">
                <h4>{title}</h4>
                <p>{line1}<br/>{line2}<br/>{line3}</p>
                <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
              </div>
              <div className="light-block">
                <div className="profile-info">
                  <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                  <p className="username">{author[0].username}</p>
                </div>
                <div className="buttons">
                  <FontAwesomeIcon icon={faHeart} className="button-icon" />
                  <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                  <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                </div>
              </div>
              </div>
            </div>
        )
    }
}