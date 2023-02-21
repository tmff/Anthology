import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input
                    value={name}
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <br />
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@gmail.com"
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    value={pwd}
                    name="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder="********"
                />
                <button type="submit">Register Account</button>
            </form>
            <button 
                className="link-btn"
                onClick={() => props.onFormSwitch('login')}>
                    Already have an account? Login here!
                </button>
        </div>

    )

}