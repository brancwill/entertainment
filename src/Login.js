import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Link } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';

Modal.setAppElement(document.querySelector("#Login"))

const Login = () => {

    const [ emailError, setEmailError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ openError, setOpenError ] = useState(false)
    const { error, login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            setEmailError("empty")
        } else if (password === "") {
            setPasswordError("empty")
        } else {
            login(email, password)
            if (error !== null) {
                setOpenError(true)
            }
        }

    }

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            width: "30vw",
            height: "30vh",
            backgroundColor: "#161D2F",
            color: "#FC4747",
            borderRadius: "10px",
            textAlign: "center",
            margin: "10% auto 0",
            padding: "0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20%"
        }
    }

    const closeErrorModal = () => {
        setOpenError(false)
    }

    return (
        <div id="Login" className="Login">
            <Modal className="alertModal" isOpen={openError} onRequestClose={closeErrorModal} style={modalStyles} shouldCloseOnOverlayClick={true}> 
                <p className='bodyM'>{error}</p>
                <button className="bodyM" onClick={closeErrorModal}>Close</button>
            </Modal>
            <img src="assets/logo.svg" alt="logo"/>
            <div className="form">
                <h1 className="headingL header">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={e => { setEmail(e.target.value); setEmailError("") }} className={"bodyS input " + emailError} type="email" name="email" placeholder='Email Address' />
                    <span className={"span" + emailError}></span>
                    <input value={password} onChange={e => { setPassword(e.target.value); setPasswordError("") }} className={"bodyS input " + passwordError} type="password" name="password" placeholder='Password' />
                    <span className={"span" + passwordError}></span>
                    <button className="bodyM" type="submit">Login to your account</button>
                </form>
                <p className="bodyS">Don't have an account? <Link to="../signup">Sign Up</Link></p>
                <p className="bodyS">or <Link to="../guest">Continue as Guest</Link></p>
            </div>
        </div>
    );
};

export default Login;