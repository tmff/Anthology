import axios from "axios";
import React, {useState ,useEffect} from "react";
import api from '../../js/Api.js';
import { PoemViewer } from "../PoemViewer.jsx";
import '../../css/Highlight.css'



export const Highlight = (props) => {

    const [display,setDisplay] = useState(<h1>No poems to be seen here, check back later!</h1>)
    const [poems,setPoems] = useState([]);



    useEffect(() => {
        api.get("/get-highlight-choice")
        .then((res) => {
            if(res.data.length < 2){
                setDisplay(<h1>No poems to be seen here, check back later!</h1>);
            }
            else{
                setPoems([res.data[0],res.data[1]])
                setPoemsToHighlight();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    useEffect(() =>{setPoemsToHighlight()},[poems])

    function setPoemsToHighlight(){
        if(poems.length == 0)return;
        var obj1,obj2;
        setDisplay(
            <div className="container">
                <div onClick={chooseOne}>
                    <PoemViewer content={obj1 = {
                        title:poems[0].title,
                        content:poems[0].content
                    }} />
                </div>
                <div onClick={chooseTwo}>
                    <PoemViewer content={obj2 = {
                        title:poems[1].title,
                        content:poems[1].content
                    }}/>
                </div>
            </div>
        )
        
    }

    function chooseOne(){
        castVote(poems[0].id,poems[1].id);
    }

    function chooseTwo(){
        castVote(poems[1].id,poems[0].id);
    }

    function castVote(id,losId){
        console.log("Voting for " + id);
        api.post('submit-highlight-vote',
        {
            poem_id:id,
            losing_id:losId
        }).then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    const top = {
        position:"relative",
        top:-250,
    }
    return(
        <div>
            <div style={top}>
                <h1>Highlight</h1>
            </div>
            <h2>Choose your favourite!</h2>
            {display}
        </div>
    )
}