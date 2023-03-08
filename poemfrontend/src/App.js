//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import { Login } from './components/pages/Login'
import { Register } from './components/pages/Register';
import { PoemViewer } from './components/PoemViewer';
import { EditProfile } from './components/pages/EditProfile';
import { useState} from 'react';
import axios from 'axios';
import api from './js/Api'
import Cookies from 'universal-cookie';
import { Writer } from './components/pages/Writer';
import { UserProfile } from './components/pages/UserProfile';
import { redirect } from 'react-router-dom';

export async function loader() {

  const cookies = new Cookies();

  // If the user isn't logged in, redirect to the login page
  if (cookies.get("Token") == null) return redirect("/login");

  // Redirect to home page
  return redirect("/friends");
}


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
      {/* <UserProfile> */}
      <div id='outer-container'>
        <div id='sidebar'>
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
        </div>
      </div>
    </div>

  );
 
}

export default App;
