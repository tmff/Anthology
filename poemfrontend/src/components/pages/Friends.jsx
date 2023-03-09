import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../css/Friends.css';

import api from '../../js/Api.js';

let page = 1;
const fetchData = (setItems, items) => {
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
    const [data, setData] = useState(Array.from({length:20}))

    return (
        <div className='friends'>
            <InfiniteScroll
                dataLength={data.length}
            >
                {data.map((item,index) => {
                    return <div>This is div #{index+1}</div>
                })}
            </InfiniteScroll>
        </div>
    )
}