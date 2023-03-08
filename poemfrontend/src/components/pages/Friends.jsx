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
        <div className="friends">
            <p>Hello</p>
        </div>
    )
}