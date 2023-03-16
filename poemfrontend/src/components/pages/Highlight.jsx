import axios from "axios";
import React, {useState ,useEffect} from "react";
import api from '../../js/Api.js';
import { PoemViewer } from "../PoemViewer.jsx";
import '../../css/Highlight.css'



export const Highlight = (props) => {

    const [display,setDisplay] = useState(<h1>No poems to be seen here, check back later!</h1>);
    const [poems,setPoems] = useState([]);
    const [canVote,setCanVote] = useState(true);


    useEffect(() => {
        
        api.get('/submit-highlight-vote')
        .then((res) => {
            if(res.data.can_vote === 'false'){
                console.log(res.data.can_vote);
                setCanVote(false);
                setDisplay(<h2>Already voted today!</h2>)
                return;
            }
        })

        api.get("/get-highlight-choice")
        .then((res) => {
            if(res.data.length < 2){
                setDisplay(<h2>No poems to be seen here, check back later!</h2>);
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

    useEffect(() =>{
        if(canVote){
            setPoemsToHighlight()
        }
    },[poems])

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
        }).then((res) => {
            console.log(res)
            setDisplay(<h2>Thanks for voting! Check out the highlighted poem for your friends today!</h2>)
        })
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
            <h1>Choose your favourite!</h1>
            {display}
        </div>
    )
}