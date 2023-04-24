import React, { useEffect, useState } from 'react';
import api from '../../js/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faPaperPlane, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

export const Search = () => {

  import('../../css/Search.css');

  const [searchType, setSearchType] = useState('users'); // default to searching for users
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
        })
        .catch((err) => console.log(err));
    } else if(searchType === 'posts'){
        api.get(`/get-posts?title=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data);
        })
        .catch((err) => console.log(err));
    } else if(searchType === 'tags') {
      api.get(`/get-tagged-poems?tags.title=${searchTerm}`)
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [searchTerm, searchType]);




  function display(searchType){
    if(searchType === 'users'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((user) => (
                <div key={user.id} className='user-search-block'>
                  <div className='profile-info'>
                    <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                    <p className='username' key={user.id}>{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </ul>
          )}
        </div>
      )
    }
    else if(searchType === 'posts'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((post) => (
                <div key={post.id + '_title'}>
                  <div className="colored-block">
                    <h4>{post.title}</h4>
                    <p key={post.id + '_content'}>{post.content}</p>
                    <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
                  </div>
                  <div className="light-block">
                    <div className="profile-info">
                        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                        <p className="username">{`${post.author && post.author.username}`}</p>
                    </div>
                    <div className="buttons">
                        <FontAwesomeIcon icon={faHeart} className="button-icon" />
                        <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                        <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        )}
        </div> 
      )
    }
    else if(searchType === 'tags'){
      return(
        <div>
          {searchResults.length > 0 && (
          <ul>
            <div className='posts-users-container'>
              {searchResults.map((post) => (
                <div key={post.id + '_tags.title'}>
                  <div className="colored-block">
                    <h4>{post.title}</h4>
                    <p key={post.id + '_content'}>{post.content}</p>
                    <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
                  </div>
                  <div className="light-block">
                    <div className="profile-info">
                        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                        <p className="username">{`${post.author && post.author.username}`}</p>
                    </div>
                    <div className="buttons">
                        <FontAwesomeIcon icon={faHeart} className="button-icon" />
                        <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                        <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        )}
        </div>
      )
    }
    
 }
  

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    // if(searchTerm.startsWith('#')) {
    //   setSearchType('tags');
    // }
  
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