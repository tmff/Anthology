import React, { useState } from "react";
  


export const Search = (props) => {
  const [searchItem, setSearchItem] = useState('')
  const [searchErrorText, setSearchErrorText] = useState('')

  function handleUserClick(){
    if(searchItem.length === 0){
      setSearchErrorText('Nothing found')
    }
    else{
      setSearchItem('Users here')
    }
  }

  
  function handlePostsClick(){
    if(searchItem.length === 0){
      setSearchErrorText('Nothing found')
    }
    else{
      setSearchItem('Posts here')
    }
  }
  
  return (
    <div className="container">
      <h2>Search</h2>
      <div className='search'>
        <input
          placeholder='Search for users or posts'
          onChange={() => {}}
          value={searchItem}
          type="text"
        />
        <button 
          className="user-button"
          onClick={handleUserClick}
        >   Users
        </button>
        <button 
          className="posts-button"
          onClick={handlePostsClick}
        >   Posts
        </button>
      </div>
      <h3>{searchItem}</h3>
      <h3>{searchErrorText}</h3>
      <h2>Daily Themes</h2>
      <p> Themes will go here.</p>
    </div>
  );
}
  
export default Search;