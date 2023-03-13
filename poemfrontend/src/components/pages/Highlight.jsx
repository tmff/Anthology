import axios from "axios";
import React, {useState ,useEffect} from "react";
import api from '../../js/Api.js';
import { PoemViewer } from "../PoemViewer.jsx";
import '../../css/Highlight.css'



export const Highlight = (props) => {

    const [display,setDisplay] = useState(<h1>No poems to be seen here, check back later!</h1>)

    useEffect(() => {
        api.get("/get-highlight-choice")
        .then((res) => {
            setPoemsToHighlight(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    function setPoemsToHighlight(data){
        if(data.length < 2){
            setDisplay(<h1>No poems to be seen here, check back later!</h1>);
        }else{
            var item1 = data[0];
            var item2 = data[1];
            var obj1,obj2
            setDisplay(
                <div className="container">
                    <div onClick={chooseOne}>
                        <PoemViewer content={obj1 = {
                            title:item1.title,
                            content:item1.content
                        }} />
                    </div>
                    <div onClick={chooseTwo}>
                        <PoemViewer content={obj2 = {
                            title:item2.title,
                            content:item2.content
                        }}/>
                    </div>
                </div>
            )
        }
    }
    
    function chooseOne(){
        console.log("Yo");
    }

    function chooseTwo(){

    }

    return(
        <div>
            <h1>Choose your favourite!</h1>
            {display}
        </div>
    )
}