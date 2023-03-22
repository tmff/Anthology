import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../css/Friends.css';
import '../../css/App.css';
import { PoemViewer } from '../PoemViewer';
import api from '../../js/Api.js';
import FriendsMenu from '../FriendsMenu';
// import AnthNavbar from '../Navbar';


const refresh = (props) => {};

export const Friends = (props) => {
    const [poems, setPoems] = useState(Array.from({ length: 20 }))
    const [hasMore, setHasMore] = useState(false)
    const [highlightedPoem, setHighlightedPoem] = useState(-1)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const fetchData = () => {
        api.get("/get-friends-poems/")
        .then((res) => {
                console.log(res);
                setPoems(res.data);
        })
        .catch((err) => {console.log(err)});
        
        api.get("/get-highlight")
        .then((res) => {
            if(res.status === 200){
                setHighlightedPoem(res.data.poem);
            }
        })
        .catch((err) => {console.log(err)});

    };

    useEffect(() =>{
        fetchData()
    },[])

    useEffect(() => {
        console.log(poems[0])
    },[poems])

    const top = {
        position:"relative",
        top:-220,
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    var obj;
    if (!poems.includes(undefined)) {
        return (
            <div className='friends-container'>
                <header> {/*<AnthNavbar/> */} </header>
                <button onClick={handleMenuToggle}>Add Friends</button>
                {isMenuOpen && <FriendsMenu />}
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
                    <div>
                        {poems.map((item) => (              
                            <PoemViewer key={item.id} content={obj = {
                                title:item.title,
                                content:item.content,
                                author:item.author,
                            }}
                            highlighted={highlightedPoem === item.id ? true : false}
                            />
                        ))}
                    </div>
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