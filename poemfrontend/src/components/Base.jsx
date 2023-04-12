import '../css/App.css';
import { Footer } from './Footer';
import Sidebar from './Sidebar';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export const Base = (props) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

    return (
      <div>
        <ThemeContext.Provider value ={{theme, toggleTheme}}>
        <div className='App' id={theme}>
          { props.component }
          <div id='outer-container'>
            <div id='sidebar'>
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
            </div>
          </div>
          <Footer />
        </div>
        </ThemeContext.Provider>
      </div>
    )

}