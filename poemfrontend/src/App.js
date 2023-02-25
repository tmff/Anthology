//import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
})




function App() {

  console.log(api.length);
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  /* app-header is redundant for now,
  *  kind of a future proof for if we want to add anything to form header
  */
 
  return (
   <div className="App">
    <header />
      <div className='app-header'> 
        <div className='app-Title'>
          Anthology.
        </div>
      </div>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }
   </div>
    
  );
}

export default App;
