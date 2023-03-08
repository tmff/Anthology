import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import api from '../../js/Api.js';
import axios from "axios";

let page = 1;
const fetchData = (setItems, items) => {
    axios
        .get(/* api endpoint link goes here */)
        .then((res) => {
            setItems([/*...items, ...res.data*/]);
            page += 1;
        });
};

const refresh = (setItems) => {};

export const Friends = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData(setItems, items);
    },[])

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={true}
            loader={<h4 className='load-msg'>Loading...</h4>}
            endMessage= {
                <p className='end-msg'>
                    <b>You have reached the end!</b>
                </p>
            }
            refreshFunction={this.refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
                <h3 className='pulldown-msg'>&#8595; Pull down to refresh!</h3>
            }
        >
        <div className="friends">
            
        </div>
        </InfiniteScroll>
    )
}