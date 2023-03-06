import api from "../js/Api"
import { useState} from 'react';
import Cookies from 'universal-cookie';
import '../css/Poem.css'

export const Writer = (props) => {
    const [title,setTitle] = useState('');
    const [line1,setLine1] = useState('');
    const [line2,setLine2] = useState('');
    const [line3,setLine3] = useState('');

    const cookies = new Cookies();
    const token = cookies.get("Token");

    const config = {
        headers:{
            Authorization: "Token " + token
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Umm");
        var content = line1 + "\n" + line2 + "\n" + line3

        api.post("/poems/",{
            title:title,
            content:content
        },config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        //Show post
    }

    return(
        <div className='viewer'>
            <span className="dot"> </span>
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="title"><b>Title</b></label>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    id="title" 
                    name="title"
                />
                <label className="label" htmlFor="line1"><b>Poem</b></label>
                <input 
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    type="text" 
                    id="line1" 
                    name="line1"
                />
                <label className="label" htmlFor="line2"><b></b></label>
                <input 
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    type="text" 
                    id="line2" 
                    name="line2"
                />
                <label className="label" htmlFor="line3"><b></b></label>
                <input 
                    value={line3}
                    onChange={(e) => setLine3(e.target.value)}
                    type="text" 
                    id="line3" 
                    name="line3"
                />
                <br></br>
                <button type="submit"><b>Post!</b></button>
            </form>
        </div>
    )
}