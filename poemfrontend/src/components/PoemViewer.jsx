import api from "../js/Api"
import { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../css/Poem.css'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart as faSolidHeart, faPaperPlane, faUserCircle, faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
// import {useSpeechSynthesis} from 'react-speech-kit';
import axios from "axios";

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState({username:""});
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    // const {speak} = useSpeechSynthesis();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if(!props.id){
            setPoemContent(props.content);
            setAuthor(props.content.author);
            setLiked(props.content.is_liked);
            setLikes(props.content.like_count);
            setComments(props.content.comment_count);
        }
        else{
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
        const request = liked ? api.delete('/remove-poem-like', { data: { poem_id: poemId } }) : api.post('/like-poem', { poem_id: poemId });
        request.then((res) => {
            console.log(res.data);
            setLikes(res.data.likes);
        }).catch((err) => {
            console.log(err);
        });
    }

    function promptBookmark() {

        // Set the new state
        setBookmarked(!bookmarked);
    }

    // function readPoem () {
    //     speak({text: title, rate: 0.85})
    //     speak({text: line1, rate: 0.85})
    //     speak({text: line2, rate: 0.85})
    //     speak({text: line3, rate: 0.85})
    // }
    
    return(
        <div data-testid="poem-viewer">
            <div className="poem">
            <div data-testid="coloured-top" className={props.highlighted ? "colored-block highlighted" : "colored-block"}>
                <h4>{title}</h4>
                <p>{line1}<br/>{line2}<br/>{line3}</p>
                <FontAwesomeIcon icon={bookmarked ? faSolidBookmark : faRegularBookmark} className="bookmark-icon" onClick={ promptBookmark } data-tooltip-id="bookmark-tooltip" />
            </div>
            <div className="light-block">
                <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">{author.username}</p>
                </div>
                <div className="buttons">

                <FontAwesomeIcon icon={liked ?  faSolidHeart : faRegularHeart} className="button-icon" onClick={ promptLike } data-tooltip-id="like-tooltip" />
                {likes}
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" data-tooltip-id="comment-tooltip" />
                {comments}
                {/* <FontAwesomeIcon icon = {faVolumeHigh} className="button-icon" data-tooltip-id= "speech-tooltip" onClick= {readPoem} /> */}

                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" data-tooltip-id="share-tooltip" />

                <Tooltip id="like-tooltip" content="Like" />
                <Tooltip id="comment-tooltip" content="Comments" />
                <Tooltip id="share-tooltip" content="Share" />
                <Tooltip id="bookmark-tooltip" content="Bookmark" />
                {/* <Tooltip id="speech-tooltip" content= "Read poem out loud" /> */}
                </div>
            </div>
            </div>
        </div>
    )
}