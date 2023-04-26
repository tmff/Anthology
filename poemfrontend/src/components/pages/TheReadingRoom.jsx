import { Link } from 'react-router-dom';
import api from '../../js/Api.js';
import { PoemViewer } from "../PoemViewer.jsx";
import axios from "axios";
import React, {useState ,useEffect} from "react";

import '../../css/ReadingRoom.css';

export const TheReadingRoom = (props) => {
  
  //define states
  const [popularPoems, setPopularPoems] = useState([]);
  const [nonPopularPoems, setNonPopularPoems] = useState([]);
  const [prevPoems, setPrevPoems] = useState([]);
  const [theme, setTheme] = useState('');
  const [tags, setTags] = useState([]);
  const [poemId, setPoemId] = useState(-1);

  //calls to API
  useEffect(() =>{
    
    const cancelToken = axios.CancelToken.source();
    api.get('/get-theme', {cancelToken: cancelToken.token})
    .then((res) => {
            console.log(res);
            setTheme(res.data.theme);
    })
    .catch((err) => {
        if(axios.isCancel(err)){
            console.log("cancelled")
        }else{
            console.log(err)
        }
    });

    if (poemId === -1) return;

    api.get(`/get-tags/${poemId}`, {cancelToken: cancelToken.token})
    .then((res) => {
            console.log(res);
            setTags(res.data);
    })
    .catch((err) => {
        if(axios.isCancel(err)){
            console.log("cancelled")
        }else{
            console.log(err)
        }
    });
    api.get('/get-popular', {cancelToken: cancelToken.token})
    .then((res) => {
            console.log(res);
            setPopularPoems(res.data)
    })
    .catch((err) => {
        if(axios.isCancel(err)){
            console.log("cancelled")
        }else{
            console.log(err)
        }
    });

    api.get('/get-others', {cancelToken: cancelToken.token})
    .then((res) => {
            console.log(res);
            setNonPopularPoems(res.data)
    })
    .catch((err) => {
        if(axios.isCancel(err)){
            console.log("cancelled")
        }else{
            console.log(err)
        }
    });

    api.get('/get-prev', {cancelToken: cancelToken.token})
    .then((res) => {
            console.log(res);
            setPrevPoems(res.data)
    })
    .catch((err) => {
        if(axios.isCancel(err)){
            console.log("cancelled")
        }else{
            console.log(err)
        }
    });
    
    return () => {
      cancelToken.cancel();
  }
},[poemId])

  //HTML 
  var obj;
  return (
    <div>
      <h1>The Reading Room</h1>
      <h4>Discover poetry by other writers</h4>

      <div className="row">
        <h3>Today's popular poems on <span className="highlight">{theme}</span></h3>
        
        <div className="poem-container">
          {popularPoems.map((item) => {console.log(item); return (             
                            <PoemViewer key={item.id} content={obj = {
                                title:item.title,
                                content:item.content,
                                author:item.author,
                                poem_id:item.id,
                                is_liked:item.is_liked,
                                like_count:item.like_count,
                                comment_count:item.comment_count,
                                is_bookmarked:item.is_bookmarked,
                              }}
                              highlighted={false}
                          />
                      );
                  })}
          <div className="tag-container">
             {popularPoems.map((item) => (
              item.tags.map((tag) => (
              <div className="poem-tag">
                {/* Link component creates a link to the Search page with theme as query parameter */}
                <Link to={`/search/?searchTerm=${tag}`} className="poem-tag-link" 
                underline="none" variant="soft">#{tag}</Link>
              </div>
            ))
          ))}
      </div>
    </div>
  </div>

      <div className="row">
        <h3>Discover other poems on <span className="highlight">{theme}</span></h3>
        {/* Discover non-featured poems with the same theme */}
        <div className="poem-container">
          {nonPopularPoems.map((item) => {console.log(item); return (             
                            <PoemViewer key={item.id} content={obj = {
                                title:item.title,
                                content:item.content,
                                author:item.author,
                                poem_id:item.id,
                                is_liked:item.is_liked,
                                like_count:item.like_count,
                                comment_count:item.comment_count,
                                is_bookmarked:item.is_bookmarked,
                              }}
                              highlighted={false}
                          />
                      );
                  })}
          <div className="tag-container">
             {nonPopularPoems.map((item) => (
              item.tags.map((tag) => (
              <div className="poem-tag">
                {/* Link component creates a link to the Search page with theme as query parameter */}
                <Link to={`/search/?searchTerm=${tag}`} className="poem-tag-link" 
                underline="none" variant="soft">#{tag}</Link>
              </div>
            ))
          ))}
      </div>
    </div>
  </div>

      <div className="row">
        <h3>Discover previous poems</h3>
        {/* poems from previous days */}
        <div className="poem-container">
          {prevPoems.map((item) => {console.log(item); return (             
                            <PoemViewer key={item.id} content={obj = {
                                title:item.title,
                                content:item.content,
                                author:item.author,
                                poem_id:item.id,
                                is_liked:item.is_liked,
                                like_count:item.like_count,
                                comment_count:item.comment_count,
                                is_bookmarked:item.is_bookmarked,
                              }}
                              highlighted={false}
                          />
                      );
                  })}
          <div className="tag-container">
             {prevPoems.map((item) => (
              item.tags.map((tag) => (
              <div className="poem-tag">
                {/* Link component creates a link to the Search page with theme as query parameter */}
                <Link to={`/search/?searchTerm=${tag}`} className="poem-tag-link" 
                underline="none" variant="soft">#{tag}</Link>
              </div>
            ))
          ))}
      </div>
    </div>
  </div>
  </div>
  );
}

export default TheReadingRoom;

