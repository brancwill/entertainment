import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Link } from 'react-router-dom';

const Login = () => {

    const [ emailError, setEmailError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            setEmailError("empty")
        } else if (password === "") {
            setPasswordError("empty")
        }

    }

    return (
        <div className="Login">
            <img src="assets/logo.svg" alt="logo"/>
            <div className="form">
                <h1 className="headingL header">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={e => { setEmail(e.target.value); setEmailError("") }} className={"bodyS input " + emailError} type="email" name="email" placeholder='Email Address' />
                    <p className={"errorMessage bodyS loginemail" + emailError}>Can't be empty</p>
                    <input value={password} onChange={e => { setPassword(e.target.value); setPasswordError("") }} className={"bodyS input " + passwordError} type="password" name="password" placeholder='Password' />
                    <p className={"errorMessage bodyS loginpassword" + passwordError}>Can't be empty</p>
                    <button className="bodyM" type="submit">Login to your account</button>
                </form>
                <p className="bodyS">Don't have an account? <Link to="../signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;