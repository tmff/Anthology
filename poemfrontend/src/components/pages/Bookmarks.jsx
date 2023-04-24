import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../js/Api";
import InfiniteScroll from "react-infinite-scroll-component";
import { PoemViewer } from "../PoemViewer";

export const Bookmarks = (props) => {

    const [poems, setPoems] = useState([]);

    useEffect(() =>{
        const cancelToken = axios.CancelToken.source();
        api.get("/get-bookmarks/", { cancelToken: cancelToken.token }).then((res) => {
            console.log(res);
            setPoems(res.data);
        }).catch((err) => {
            if (axios.isCancel(err)) {
                console.log("cancelled")
            } else {
                console.log(err)
            }
        });
    });

    if (poems.includes(undefined)) return (<div className="bookmarks-container">Loading...</div>)

    var obj;
    return (
        <div className="bookmarks-container">
            <InfiniteScroll
                    dataLength={poems.length}
                    hasMore={false}
                    loader={<h4 className='load-msg'>Loading...</h4>}
                    endMessage= {
                        <p className='end-msg'>
                            <b>You have reached the end!</b>
                        </p>
                    }>
                {
                    poems.map(item => {
                        if (item === undefined) return null;
                        if (item.poem === undefined) return null;
                        return (
                        <PoemViewer key={item.poem.id} content={obj = {
                            title:item.poem.title,
                            content:item.poem.content,
                            author:item.poem.author,
                            poem_id:item.poem.id,
                            is_liked:item.poem.is_liked,
                            like_count:item.poem.like_count,
                            comment_count:item.poem.comment_count,
                            is_bookmarked:item.poem.is_bookmarked,
                        }} highlighted={ false }/>)
                    })
                }
            </InfiniteScroll>
        </div>
    )
}