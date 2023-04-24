import api, { promptLike as promptLikeAPI, promptBookmark as promptBookmarkAPI } from "../js/Api"
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart as faSolidHeart, faPaperPlane, faUserCircle, faBookmark as faSolidBookmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import { NavLink } from "react-router-dom";

import '../css/Poem.css'

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState({username:""});
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [copiedLink, setCopiedLink] = useState(false);

    useEffect(() => {

        import("../css/Poem.css");

        const cancelToken = axios.CancelToken.source();
        if (!props.id) {
            setPoemContent(props.content);
            setAuthor(props.content.author);
            setLiked(props.content.is_liked);
            setLikes(props.content.like_count);
            setComments(props.content.comment_count);
            setBookmarked(props.content.is_bookmarked);
        } else {
            var path = "/poems/" + props.id;
            api.get(path, {cancelToken: cancelToken.token})
            .then((res) => {
                setPoemContent(res.data);
                setLiked(res.data.is_liked);
                setBookmarked(res.data.is_bookmarked);
            })
            .catch((err) => {
                if(axios.isCancel(err)){
                    console.log("cancelled")
                }else{
                    console.log(err)
                }
            })
            console.log("loaded")
        }

        return () => {
            cancelToken.cancel();
        }
    },[])

    function setPoemContent(data){
        setTitle(data.title)
        var splitString = ['','',''];
        splitString = data.content.split("\n");
        setContent([splitString[0],splitString[1],splitString[2]]);
    }

    function promptLike() {

        // Set the new state
        setLiked(!liked);

        // Send an API request
        const poemId = props.content.poem_id;

        promptLikeAPI(poemId, liked).then((likes) => {
            setLikes(likes);
        });
    }

    function promptBookmark() {

        // Set the new state
        setBookmarked(!bookmarked);

        // Send an API request
        promptBookmarkAPI(props.content.poem_id, bookmarked);
    }

    function copyLink() {

        setCopiedLink(true);

        navigator.clipboard.writeText(`${window.location.origin}/poem/${props.content.poem_id}`);

        setTimeout(() => setCopiedLink(false), 3000);
    }

    const readPoem = () => {
        const synth = window.speechSynthesis;
        const utterTitle = new SpeechSynthesisUtterance(title);
        const utterLine1 = new SpeechSynthesisUtterance(line1);
        const utterLine2 = new SpeechSynthesisUtterance(line2);
        const utterLine3 = new SpeechSynthesisUtterance(line3);

        utterTitle.rate = 0.85;
        utterLine1.rate = 0.85;
        utterLine2.rate = 0.85;
        utterLine3.rate = 0.85;

        synth.speak(utterTitle);
        synth.speak(utterLine1);
        synth.speak(utterLine2);
        synth.speak(utterLine3);
    };
    
    return(
        <div data-testid="poem-viewer">
            <div className="poem">

            <div data-testid="coloured-top" className={props.highlighted ? "colored-block highlighted" : "colored-block"}>
                <NavLink to={ "/poem/" + props.content.poem_id }><h4>{ title }</h4></NavLink>
                <p>{ line1 }<br/>{ line2 }<br/>{ line3 }</p>

                <button className="bookmark-icon" onClick={ () => promptBookmark }>
                    <FontAwesomeIcon icon={ bookmarked ? faSolidBookmark : faRegularBookmark } data-tooltip-id="bookmark-tooltip" />
                </button>
            </div>
            
            <div className="light-block">
                <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <NavLink to={ "/author/" + author.username }><p className="username">{author.username}</p></NavLink> 
                </div>
                <div className="buttons">

                <button className="button-icon" onClick={ () => promptLike() }>
                    <FontAwesomeIcon icon={liked ?  faSolidHeart : faRegularHeart} className="button-icon" data-tooltip-id="like-tooltip" />
                </button>
                {likes}

                <NavLink className="button-icon" to={ `/poem/${props.content.poem_id}` }>
                    <FontAwesomeIcon icon={faCommentDots} data-tooltip-id="comment-tooltip" />
                </NavLink>
                {comments}

                <button className="button-icon" onClick={ () => readPoem() }>
                    <FontAwesomeIcon icon = {faVolumeHigh} className="button-icon" data-tooltip-id= "speech-tooltip" />
                </button>
                
                <button className="button-icon" onClick={ () => copyLink() } >
                    <FontAwesomeIcon icon={faPaperPlane} data-tooltip-id="share-tooltip" data-tooltip-content={ copiedLink ? "Copied poem link to your clipboard!" : "Share" } />
                </button>

                <Tooltip id="like-tooltip" content="Like" />
                <Tooltip id="comment-tooltip" content="Comments" />
                <Tooltip id="share-tooltip" render={({ content }) => (
                    <span>{ content }</span>
                )} />
                <Tooltip id="bookmark-tooltip" content="Bookmark" />
                <Tooltip id="speech-tooltip" content= "Read poem out loud" />
                </div>
            </div>
            </div>
        </div>
    )
}