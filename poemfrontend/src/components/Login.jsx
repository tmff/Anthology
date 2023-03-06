import api from "../js/Api"
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import '../css/LogReg.css'

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errText,setErrText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    }
    const errorStyle = {
        color: 'red',
        fontWeight: 'bold',
    }

    const cookies = new Cookies();

    function setLoginToken(){
        //set label to error
        setErrText('');
        if(username.length === 0 || pwd.length === 0){
            setErrText('Password or Username empty')
            return;
        }

        
        api.post('/api-token-auth',{
            username: username,
            password: pwd
        }).then(function (res) {
            cookies.set('Token',res.data.token);
            props.stateChanger(false);
        })
        .catch(err => handleLoginErrors(err.response))
        //.then(res => cookies.set("token",res.response.data))

    }

    function handleLoginErrors(response){
        if(response.status === 400){
            setErrText(response.data.non_field_errors);
        }
        else{
            console.log(response);
        }
    }
    

    return (
        <div className="auth-form-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username"><b>Username</b></label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="username"
                    id="username"
                    name="username"
                />
                <br/>
                <label htmlFor="password"><b>Password</b></label>
                <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <h4 style = {errorStyle}>{errText}</h4>
                <button id="submit" type="submit" onClick={setLoginToken}>Log In</button>
            </form>
            <button
                className="link-btn"
                onClick={() => props.onFormSwitch('register')}>
                    Don't have an account? Register here!
            </button>         
        </div>

    )

}