import api from "../js/Api"
import { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../css/Poem.css'

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);
    const [title,setTitle] = useState("");


    useEffect(() => {
        console.log("loaded")
        var path = "/poems/" + props.id;
        api.get(path)
        .then((res) => setPoemContent(res.data))
        .catch((err) => console.log(err));
    },[])

    function setPoemContent(data){
        setTitle(data.title)
        var splitString = ['','',''];
        splitString = data.content.split("\n");
        setContent([splitString[0],splitString[1],splitString[2]]);
    }


    return(
        <div className='viewer'>
            <span class="dot"> </span>
            <h1>{title}</h1>
            <h2>{line1}</h2>
            <h2>{line2}</h2>
            <h2>{line3}</h2>
        </div>
    )
}