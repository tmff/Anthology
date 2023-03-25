import api from "../js/Api"
import { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../css/Poem.css'
import axios from "axios";

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState([{username:""}]);


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if(!props.id){
            setPoemContent(props.content);
            setAuthor([props.content.author]);
        }
        else{
            var path = "/poems/" + props.id;
            api.get(path, {cancelToken: cancelToken.token})
            .then((res) => {
                setPoemContent(res.data)
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

    if(props.highlighted){
        return(
            <div>
                <div>
                    <h1>{author[0].username}</h1>
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
                <div>
                    <img></img>
                    <h1>{author[0].username}</h1>
                </div>
                <div className='viewer'>
                    <span className="dot"> </span>
                    <h1>{title}</h1>
                    <h2>{line1}</h2>
                    <h2>{line2}</h2>
                    <h2>{line3}</h2>
                </div>
            </div>
        )
    }
}