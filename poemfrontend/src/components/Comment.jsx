import { useNavigate } from "react-router-dom";


export const Comment = (props) => {

    const username = props.content.username; 
    const comment = props.content.comment;
    const profileImg = props.content.profile_image;

    const navigate = useNavigate();

    return (
        <div className="comment-container">
            <img src={ profileImg } alt="./profile_pictures/default.jpg" onClick={ navigate(`/author/${username}`) } />
            <div className="name-and-comment">
                <h3 onClick={ navigate(`/author/${username}`) }>{ username }</h3>
                <p>{ comment }</p>
            </div>
        </div>
    )
}