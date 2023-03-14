import api from "../../js/Api"
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import '../../css/LogReg.css'

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errText,setErrText] = useState('');
    const navigate = useNavigate();

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

            // Sets the cookie and redirects to the friends page
            cookies.set('Token',res.data.token);
            navigate("/friends");

            // props.stateChanger(false);

        })
        .catch(err => handleLoginErrors(err))
        //.then(res => cookies.set("token",res.response.data))

    }

    function handleLoginErrors(err){

        // Check if the error response exists - if it doesn't, then it's an internal error
        if (err.response == null) {
            console.log(err);
            return;
        }

        // Check the status codes of the response
        if(err.response.status === 400){
            setErrText(err.response.data.non_field_errors);
        }
        else{
            console.log(err.response);
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
            <Link to={`/register`} className="link-btn">Don't have an account? Register here!</Link>  
            <Link to={`/GDPR`} className="link-btn">GDPR Policy</Link>
        </div>

    )

}