import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@gmail.com"
                    id="password"
                    name="password"
                />
                <label htmlFor="password">password</label>
                <input
                    value={pass}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
            </form>
            <button
                className="link-btn"
                onClick={() => props.onFormSwitch('register')}>
                    Don't have an account? Register here!
            </button>         
        </div>

    )

}