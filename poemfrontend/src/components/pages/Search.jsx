import React, { useEffect, useState } from 'react';
import api from '../../js/Api';
import '../../css/Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { PoemViewer } from "../PoemViewer";

export const Search = () => {
  const [searchType, setSearchType] = useState('users'); // default to searching for users
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tempSearch, setTempSearch] = useState('')
  //const [postSearchOption, setPostSearchOption] = useState('title');


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    if(searchType === 'users') {
      api.get(`/get-users?username=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data);
          setTempSearch('users')
        })
        .catch((err) => console.log(err));
    } else if(searchType === 'posts'){
        api.get(`/get-posts?title=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data);
          setTempSearch('posts')
        })
        .catch((err) => console.log(err));
    } else if(searchType === 'tags') {
        api.get(`/get-tagged-poems?tags.title=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data);
          setTempSearch('tags')
        })
        .catch((err) => console.log(err));
    }
  }, [searchTerm, searchType]);


  var obj;

  function display(searchType){
    if(tempSearch === 'users'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((user) => (
                <div key={user.id} className='user-search-block'>
                  <div className='profile-info'>
                    <FontAwesomeIcon icon={faUserCircle} className="profile-icon"/>
                    <NavLink to={ "/profile/" + user.username }>
                      <p className='username' key={user.id}>{user.username}</p>                    
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </ul>
          )}
        </div>
      )
    }
    else if(tempSearch === 'posts'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((post) => (
                <PoemViewer key={post.id} content={obj = {
                            title:post.title,
                            content:post.content,
                            author:post.author,
                            poem_id:post.id,
                            is_liked:post.is_liked,
                            like_count:post.like_count,
                            comment_count:post.comment_count,
                            is_bookmarked:post.is_bookmarked,
                        }}/>
              ))}
            </div>
          </ul>
        )}
        </div> 
      )
    }
    else if(tempSearch === 'tags'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((post) => (
                <PoemViewer key={post.id} content={obj = {
                            title:post.title,
                            content:post.content,
                            author:post.author,
                            poem_id:post.id,
                            is_liked:post.is_liked,
                            like_count:post.like_count,
                            comment_count:post.comment_count,
                            is_bookmarked:post.is_bookmarked,
                        }}/>
              ))}
            </div>
          </ul>
        )}
        </div>
      )
    }
    
 }

  // const resetSearchBox = (searchType) => {
  //   if(searchType === 'posts'){
  //     setTempSearch([])
  //   }
  // }
  

  const handleSearchTypeChange = (event) => {
    //resetSearchBox(searchType)
    setSearchType(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='search-container'>
      <h2>Search</h2>
      <div>
        <input id="search-term" type="text" value={searchTerm} onChange={handleSearchTermChange} />
        <select id="search-type" value={searchType} onChange={handleSearchTypeChange}>
          <option value="users">Users</option>
          <option value="posts">Posts</option>
          <option value="tags">Tags</option>
        </select>
      </div>
      <div>
        {display(searchType)}
      </div>
      {/* Daily Themes Section */}
      <h2>Daily Themes</h2>
      <div className='daily-themes-section'>
        <p>Haiku</p>
        <p>Nature</p>
        <p>Love</p>
        <p>War</p>
      </div>      
    </div>
    
  );
}

// <div key={post.id + '_title'}>
                //   <li>{post.title}</li>
                //   <li key={post.id + '_content'}>{post.content}</li>
                // </div>