import axios from "axios";
import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    function registerUser(){
        axios.post('/register',{
            username: username,
            password: pwd,
            password2: pwd2,
            email: email,
            first_name: name,
            last_name: lastname,
        }).then(res => {console.log(res)})
        .catch((err) => console.log(err.toJSON()))
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">First Name</label>
                <input
                    value={name}
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name"
                />
                <label htmlFor="name">Last Name</label>
                <input
                    value={lastname}
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@gmail.com"
                />
                <label htmlFor="username">Username</label>
                <input
                    value={username}
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="username"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={pwd}
                    name="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder="********"
                />
                <label htmlFor="passwordConf">Confirm Password</label>
                <input
                    value={pwd2}
                    name="password confirmation"
                    id="passwordConf"
                    onChange={(e) => setPwd2(e.target.value)}
                    type="password"
                    placeholder="********"
                />
                <button type="submit" onClick={registerUser}>Register Account</button>
            </form>
            <button 
                className="link-btn"
                onClick={() => props.onFormSwitch('login')}>
                    Already have an account? Login here!
                </button>
        </div>
    )

}