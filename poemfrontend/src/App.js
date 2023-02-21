//import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { useState } from 'react';

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



   /* DEFAULT REACT APP BS
   
   
   <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    
  );
}

export default App;
