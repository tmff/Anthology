import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PoemDataViewer = (props) => {
    
    // States
    const [title, setTitle] = useState("");
    const [[line1,line2,line3], setContent] = useState([]);
    const [author, setAuthor] = useState("");
    const [authorProfile, setAuthorProfile] = useState("profile_pictures/default.jpg");
    const [comments, setComments] = useState([]);
    const poemId = props.poemId;

    // Functions
    const navigate = useNavigate();
    
    // Initial calls to the API
    useEffect(() => {

    })

    // Reactive calls to the API
    function promptLike() {
        
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

PoemDataViewer.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string,
        line1: PropTypes.string,
        line2: PropTypes.string,
        line3: PropTypes.string,
        author: PropTypes.string,
        like_count: PropTypes.number,
        is_liked: PropTypes.bool,
    }),
    id: PropTypes.string,
}

export default PoemDataViewer;