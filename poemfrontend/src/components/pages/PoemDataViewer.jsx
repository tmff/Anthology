import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Comment } from "../Comment";
import { PoemViewer } from "../PoemViewer";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import api, { promptLike as promptLikeAPI } from "../../js/Api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart as faSolidHeart, faPaperPlane, faUserCircle, faBookmark as faSolidBookmark, faVolumeHigh, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faBookmark as faRegularBookmark, faPaperPlaneTop } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import React from "react";


const PoemDataViewer = (props) => {

    // Load data
    const content = useLoaderData();

    import('../../css/Poem.css');
    import('../../css/PoemDataViewer.css');
    
    // States
    const [title, setTitle] = useState("");
    const [[line1,line2,line3], setContent] = useState([]);
    const [author, setAuthor] = useState("");
    const [authorProfile, setAuthorProfile] = useState(`${process.env.REACT_APP_API_ENDPOINT}/media/profile_pictures/default.jpg`);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [poemId, setPoemID] = useState(-1);
    const [bookmarked, setBookmarked] = useState(false);

    // Comments
    const [commentSending, setCommentSending] = useState(false);
    const [comments, setComments] = useState([{ author: "joemama123", comment: "yo ass so fat" }, { author: "joemama123", comment: "you gonna do smth bout it?" }]);
    const [commentInput, setCommentInput] = useState("");
    const [commentCount, setCommentCount] = useState("");

    // Functions
    const navigate = useNavigate();
    
    // Initial calls to the API
    useEffect(() => {

        console.log(content.poem.data);

        // If the content is filled already...
        if (content) {
            setProperties(content.poem.data);
        }

        // Request comments
        if (poemId === -1) return;
        
        api.get(`/get-comments/${poemId}/`).then((res) => {

            setComments(res.data.map(comment => {
                return { author: comment.user.username, comment: comment.content };
            }))
        })

    }, [content, poemId]);

    function setProperties(data) {

        setTitle(data.title);
        setContent(data.content.split("\n"));
        setAuthor(data.author);
        setLikes(data.like_count);
        setLiked(data.is_liked);
        setPoemID(data.id);
        setCommentCount(data.comment_count);
        setBookmarked(data.is_bookmarked);
    }

    function postComment(data) {

        if (commentSending) return;
        if (commentInput.length === 0) return;

        setCommentSending(true);

        api.post("/send-comment", {
            poem_id: poemId,
            comment: commentInput,
        }).then((response) => {
            setCommentSending(false);
            setCommentInput("");

            // Add a new comment
            comments.push({ author: response.data.author, comment: response.data.comment });
        }).catch(() => {
            setCommentSending(false);
        }) 
    }

    // HTML itself
    var obj;
    return (
        <div>
            <div className="widget-container">
                <PoemViewer key={ poemId } content={obj = {
                                title:title,
                                content:[line1, line2, line3].join("\n"),
                                author:author,
                                poem_id:poemId,
                                is_liked:liked,
                                like_count:likes,
                                comment_count:commentCount,
                                is_bookmarked:bookmarked,
                            }
                        }
                        highlighted={ false }
                />
                <div className="user-interactive-container">

                    <div className="comments-container">
                        <InfiniteScroll dataLength={ comments.length } >
                            <div className="comment">
                                {
                                    comments.map(comment => {
                                        return <Comment content={obj = {
                                            username:comment.author,
                                            comment:comment.comment,
                                        }}/>
                                    })
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                    
                    <div className="input-container">
                        <input className="comment-input" onChange={ (e) => setCommentInput(e.target.value) } />

                        <button onClick={ () => postComment() } className="button-icon send-icon" >
                            { commentSending ? <FontAwesomeIcon icon={ faSpinner } spinPulse /> : <FontAwesomeIcon icon={ faPaperPlane } className="button-icon send-icon" />}
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoemDataViewer;