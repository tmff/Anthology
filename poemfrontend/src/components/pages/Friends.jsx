import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../css/Friends.css';

import api from '../../js/Api.js';

let page = 1;
const fetchData = (setPoems, poems) => {
    api
        .get("/get-friends-poems")
        .then((res) => {
            console.log(res);
            setItems([/*...items, ...res.data*/]);
            page += 1;
        });
};

const refresh = (props) => {};

export const Friends = (props) => {
    const [poems, setPoems] = useState([])

    useEffect(() => {
        fetchData(setPoems, poems);
    },[])

    return (
        <InfiniteScroll
            className='friends'
            dataLength={poems.length}
            next={fetchData}
            hasMore={true}
            loader={<h4 className='load-msg'>Loading...</h4>}
            endMessage= {
                <p className='end-msg'>
                    <b>You have reached the end!</b>
                </p>
            }
            // TODO - refresh seems to be breaking things.
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //    <h3 className='pulldown-msg'>&#8595; Pull down to refresh!</h3>
            //}
        >
            {data.map((item,index) => {
                return <div>This is div #{index+1}</div>
            })}
        </InfiniteScroll>
    )
}