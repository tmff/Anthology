import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import '../css/PoemDataViewer.css';

export const Comment = (props) => {

    const [username, setUsername] = useState(""); 
    const [comment, setComment] = useState("");
    const [showReplies, setShowReplies] = useState(false);

    useEffect(() => {
        setUsername(props.content.username);
        setComment(props.content.comment);
    })

    return (
        <div className="comment-container">
            <div className="name-and-comment">
                <NavLink to={ `/author/${username}` }><b>{ username }</b></NavLink>  
                <br />{ comment }
                
            </div>
        </div>
    )
}