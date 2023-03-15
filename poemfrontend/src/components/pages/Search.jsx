import { useState } from "react";


function Search() {
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [displayItems, setDisplayItems] = useState(false);



  // Handling of displaying users and posts
  function handleOptionSelect(option) {
    setSelectedOption(option);
    setDisplayItems(true);
    if(option === 'Users'){
      setUserResults([]);
      <h2>Users here</h2>
      userResults.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.bio}</p>
        </div>
      ))
    }
    else{
      setPostResults([]);
      <h2>Posts here</h2>
      postResults.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))
    }
  }



  return (
    <div className="container">
      <h2>Search</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for Users and Posts"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* Dropdown menu for users and posts */}
      <select value={selectedOption}
        onChange={(e) => handleOptionSelect(e.target.value)}>
        <option>Users</option>
        <option>Posts</option>
      </select>

      {/* Items displayed here */}
      <div>
        {displayItems && (
          <div>
            <h2>{selectedOption} here</h2>
          </div>
        )}
      </div>

      {/* Daily Themes Section */}
      <h2>Daily Themes</h2>
      <p> Themes will go here.</p>
    </div>
  );
}
  
export default Search;