//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import api from './js/Api'
import { Writer } from './components/pages/Writer';


function App() {

  console.log(api.length);
  

  /* const toggleForm = (formName) => {
    setCurrentForm(formName);
  } */

  /* app-header is redundant for now,
  *  kind of a future proof for if we want to add anything to form header
  */
  /* if(inLogin){
    return (
    <div className='App'>
      <header />

      <div className='app-header'> 
        <div className='app-Title'>
          Anthology.
        </div>
      </div>

      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} stateChanger={setInLogin} /> : <Register onFormSwitch={toggleForm} stateChanger = {setInLogin} />
      }
    </div>
    );
  }*/
  return(
    <div className='App'>
      <Writer />
      {/* <EditProfile/> */}
      {/* <UserProfile /> */}
      <div id='outer-container'>
        <div id='sidebar'>
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
        </div>
      </div>
    </div>
  );
 
}

export default App;
