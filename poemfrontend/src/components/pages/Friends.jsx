import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../css/Friends.css';
import { PoemViewer } from '../PoemViewer';
import api from '../../js/Api.js';

let page = 1;

const refresh = (props) => {};

export const Friends = (props) => {
    const [poems, setPoems] = useState(Array.from({ length: 20 }))
    const [hasMore, setHasMore] = useState(true)
    
    const fetchData = () => {
        api
            .get("/get-friends-poems")
            .then((res) => {
                console.log(res);
                setPoems([...poems, ...res.data]);
                page += 1;
            });
    };
    var obj;
    return (
        <div className='friends-container'>
            <header className='fake-navbar'>
                <h1 className='app-title'>Anthology</h1>
            </header>
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
                {poems.map((i, index) => (
                    <div className='poem-view'>
                        <PoemViewer content={obj = {
                            content:"bleh\nmeh\numm"
                        }}/>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}