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


  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
   <div className="App">
    <head>
      <div className="app-title"><h1>Anthology</h1></div>
    </head>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }
   </div>
    
  );
}

export default App;
