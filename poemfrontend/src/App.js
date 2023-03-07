//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PoemViewer } from './components/PoemViewer';
import { EditProfile } from './components/EditProfile';
import { useState} from 'react';
import axios from 'axios';
import api from './js/Api'
import Cookies from 'universal-cookie';
import { Writer } from './components/Writer';
import { UserProfile } from './components/UserProfile';


function App() {

  console.log(api.length);
  const [currentForm, setCurrentForm] = useState('login');
  const cookies = new Cookies();
  //Checks if has login token
  const [inLogin, setInLogin] = useState(cookies.get("Token") == null);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  /* app-header is redundant for now,
  *  kind of a future proof for if we want to add anything to form header
  */
  if(inLogin){
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
  }
  return(
    <div className='App'>
<<<<<<< HEAD
      {/* <Writer /> */}
      <EditProfile/>
=======
      <Writer />
      {/* <EditProfile/> */}
      {/* <UserProfile /> */}
>>>>>>> e91e705a2bfe614201f3a181b32c123ab8c61228
      <div id='outer-container'>
        <div id='sidebar'>
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
        </div>
      </div>
    </div>

  );
 
}

export default App;
