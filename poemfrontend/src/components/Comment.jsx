import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import '../css/PoemDataViewer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import api from "../js/Api";

let replyingID = -1;

export const Comment = (props) => {

    const [id, setID] = useState(-1);
    const [username, setUsername] = useState(""); 
    const [comment, setComment] = useState("");
    const [self, setSelf] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replyCount, setReplyCount] = useState(-1);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        setID(props.content.id);
        setUsername(props.content.username);
        setComment(props.content.comment);
        setSelf(props.content.self);
        if (props.content.reply_count !== -1) setReplyCount(props.content.reply_count);
    })

    function deleteComment() {

        if (!window.confirm("You're about to delete a comment - do you want to confirm this action?"));

        // 
        api.delete("/delete-comment", { data: { comment_id: id } }).then(() => {
            props.removeComment(id);
        })
    }

    function promptReply() {
        replyingID = replyingID === id ? -1 : id;
        props.promptReply(id, username);
    }

    function removeReply(id) {
        console.log("Removing reply " + id);
        setReplies(replies.filter(reply => reply.id !== id));
    }

    function fetchReplies() {

        api.get("/get-replies/" + id + "/").then(res => {
            setReplies(res.data.map(reply => {
                return { 
                    author: reply.user.username, 
                    comment: reply.content, 
                    self: reply.self, 
                    id: reply.id, 
                };
            }))

            setShowReplies(true);
        });
    }

    var obj;
    return (
        <div className="comment-container" >
            <div className="name-and-replies">
                <div className="name-and-comment" style={{ 
                    background: replyingID === id ? "var(--periwinkle)" : "none",
                    }}>

                    <NavLink to={ `/author/${username}` }><b>{ username }</b></NavLink>  
                    <br />{ comment }
                    <br />
                    { replyCount > 0 && 
                        <div className="replies-header">
                            <button className="comment-icon" onClick={ showReplies ? () => setShowReplies(false) : () => fetchReplies() }>
                                <FontAwesomeIcon icon={ showReplies ? faChevronUp : faChevronDown } />
                            </button>
                            { replyCount } Replies
                        </div>
                    }
                </div>
                {
                    showReplies &&
                        <div className="replies-container">
                            {
                                replies.map(reply => <Comment key={ reply.id } removeComment={ removeReply } promptReply={ props.promptReply } content={obj = {
                                    username: reply.author,
                                    comment: reply.comment,
                                    self: reply.self,
                                    id: reply.id,
                                    reply_count: -1,
                                }}/>)
                            }
                        </div>
                }
            </div>
            

            <div className="comment-button-container">

                { replyCount !== -1 && <button className="comment-icon" onClick={ () => promptReply() } >
                    <FontAwesomeIcon icon={ faReply } />
                </button> }

                { self && 
                <button className="comment-icon" onClick={ () => deleteComment() }>
                    <FontAwesomeIcon icon={ faTrash } />
                </button> }
            </div>
        </div>
    )
}