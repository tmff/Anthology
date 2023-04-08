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
        const cancelToken = axios.CancelToken.source();
        api.get('/submit-highlight-vote',{cancelToken: cancelToken.token})
        .then((res) => {
            if(res.data.can_vote === 'false'){
                console.log(res.data.can_vote);
                setCanVote(false);
                setDisplay(<h2>Already voted today!</h2>)
                return;
            }
        })
        .catch((err) => {
            if(axios.isCancel(err)){
                console.log("cancelled")
            }else{
                console.log(err)
            }
        })


        api.get("/get-highlight-choice",{cancelToken: cancelToken.token})
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
            if(axios.isCancel(err)){
                console.log("cancelled")
            }else{
                console.log(err)
            }
        })

        return () => {
            cancelToken.cancel();
        }
    },[])

    useEffect(() =>{
        if(canVote){
            setPoemsToHighlight()
        }
    },[poems])

    function setPoemsToHighlight(){
        if(poems.length == 0)return;
        var obj1,obj2;
        console.log(poems[0].author)
        setDisplay(
            <div className="container">
                <div onClick={chooseOne}>
                    <PoemViewer content={obj1 = {
                        title:poems[0].title,
                        content:poems[0].content,
                        author:poems[0].author,
                        poem_id:poems[0].id,
                        is_liked:poems[0].is_liked,
                        like_count:poems[0].like_count,
                        comment_count:poems[0].comment_count,
                        is_bookmarked:poems[0].is_bookmarked,
                    }} />
                </div>
                <div onClick={chooseTwo}>
                    <PoemViewer content={obj2 = {
                        title:poems[1].title,
                        content:poems[1].content,
                        author:poems[1].author,
                        poem_id:poems[1].id,
                        is_liked:poems[1].is_liked,
                        like_count:poems[1].like_count,
                        comment_count:poems[1].comment_count,
                        is_bookmarked:poems[1].is_bookmarked,
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
