import '../css/App.css';
import { Footer } from './Footer';
import Sidebar from './Sidebar';
import api from "../js/Api";
import axios from "axios";
import { useState, useEffect } from 'react';

export const Base = (props) => {
  const [currentTheme, setCurrentTheme] = useState ()

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    api.get("/edit-mode", {cancelToken: cancelToken.token})
            .then((res) => {
                const theme = (res.data.dark_mode)
                if (!theme) {
                    setCurrentTheme("light");
                    console.log(currentTheme);
                }else{
                    setCurrentTheme("dark");
                    console.log(currentTheme);
                }
            })
            .catch((err) => {
                if(axios.isCancel(err)){
                    console.log("cancelled")
                }else{
                    console.log(err)
                }
            })
            console.log("loaded")

    return () => {
      cancelToken.cancel();
  }
},[])
  
    return (
      <div>
        <div className='App' id={currentTheme}>
          { props.component }
          <div id='outer-container'>
            <div id='sidebar'>
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )

}