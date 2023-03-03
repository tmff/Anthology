import axios from 'axios';
import { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import './Poem.css'

//Pass in id of poem that you want to get
export const PoemViewer = (props) => {
    const [[line1,line2,line3],setContent] = useState(['uhh','huh','mhm']);


    useEffect(() => {
        console.log("loaded")
        var path = "/poems/" + props.id;
        axios.get(path)
        .then((res) => setContent([res.data.content,'wow','that sure is a poem']))
        .catch((err) => console.log(err));
    },[])


    return(
        <div className='viewer'>
            <h1>{line1}</h1>
            <h1>{line2}</h1>
            <h1>{line3}</h1>
        </div>
    )
}