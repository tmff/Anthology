import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../css/Friends.css';
import { PoemViewer } from '../PoemViewer';
import api from '../../js/Api.js';
// import AnthNavbar from '../Navbar';


const refresh = (props) => {};

export const Friends = (props) => {
    const [poems, setPoems] = useState(Array.from({ length: 20 }))
    const [hasMore, setHasMore] = useState(true)
    
    const fetchData = () => {
        api
            .get("/get-friends-poems/")
            .then((res) => {
                console.log(res);
                setPoems(res.data);
            });
    };

    useEffect(() =>{
        fetchData()
    },[])

    useEffect(() => {
        console.log(poems[0])
    },[poems])

    var obj;
    if (!poems.includes(undefined)) {
        return (
            <div className='friends-container'>
                <header> {/*<AnthNavbar/> */} </header>
                <InfiniteScroll
                    dataLength={poems.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4 className='load-msg'>Loading...</h4>}
                    endMessage= {
                        <p className='end-msg'>
                            <b>You have reached the end!</b>
                        </p>
                    }
                >
                    {poems.map((item) => (
                        <PoemViewer key={item.id} content={obj = {
                            title:item.title,
                            content:item.content
                        }}/>
                    ))}
                </InfiniteScroll>
            </div>
        )
    } else {
        return (
            <div className='friends-container'>
                <h1>Loading!</h1>
            </div>
        )
    }
}