import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { promptLike as promptLikeAPI } from "../js/Api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart as faSolidHeart, faPaperPlane, faUserCircle, faBookmark as faSolidBookmark, faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';

import '../../css/Poem.css';
import '../../css/PoemDataViewer.css';

const PoemDataViewer = (props) => {

    // Load data
    const content = useLoaderData();
    
    // States
    const [title, setTitle] = useState("");
    const [[line1,line2,line3], setContent] = useState([]);
    const [author, setAuthor] = useState("");
    const [authorProfile, setAuthorProfile] = useState("profile_pictures/default.jpg");
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState([]);
    const [likes, setLikes] = useState(0);

    // Functions
    const navigate = useNavigate();
    
    // Initial calls to the API
    useEffect(() => {

        // If the content is filled already...
        if (content) {
            setProperties(content);
            return;
        }


    })

    // Reactive calls to the API
    function promptLike() {
        
        setLiked(!liked);

       // promptLikeAPI(poemId, liked).then(likes => {
       //     setLikes(likes);
       // });
    }

    function setProperties(data) {
        setTitle(data.title);
        setContent([data.line1, data.line2, data.line3]);
        setAuthor(data.author);
    }

    // HTML itself
    return (
        <div>
            <div className="top-bar">
                <button className="back-arrow" />
            </div>
            <div className="data-container">
                <div className="poem-container">
                    <h1>{ title }</h1>
                    <h3>{ line1 }</h3>
                    <h3>{ line2 }</h3>
                    <h3>{ line3 }</h3>
                </div>
                <div className="user-interactive-container">
                    <div className="data-container">
                        <img src={ authorProfile } alt="profile_pictures/default.jpg" onClick={ navigate(`/author/${author}`) } />
                        
                        <div className="author">
                            <p onClick={ navigate(`/author/${author}`) }>{ author }</p>
                            <div className="button-container">
                                <FontAwesomeIcon icon={liked ?  faSolidHeart : faRegularHeart} className="button-icon" onClick={ promptLike } data-tooltip-id="like-tooltip" />
                                {likes}
                            </div>
                        </div>
                    </div>

                    <InfiniteScroll dataLength={ comments.length }>
                        <div className="comments-container">
                            {
                                comments.map(comment => {
                                    return <Comment />
                                })
                            }
                        </div>
                    </InfiniteScroll>
                    <div className="input-container">
                        <input />
                        <button />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoemDataViewer;