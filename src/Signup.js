import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from './hooks/useSignup';
import Modal from 'react-modal/lib/components/Modal';

Modal.setAppElement(document.querySelector("#Login"))

const Signup = () => {

    const [ emailError, setEmailError ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ repeatError, setRepeatError ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repeat, setRepeat ] = useState("")
    const [ openErrorNoMatch, setOpenErrorNoMatch ] = useState(false)
    const [ openSuccess, setOpenSuccess ] = useState(false)
    const [ openError, setOpenError ] = useState(false)
    const { error, signup } = useSignup()

    const closeErrorNoMatchModal = () => {
        setOpenErrorNoMatch(false)
    }
    const closeErrorModal = () => {
        setOpenError(false)
    }
    const closeSuccessModal = () => {
        setOpenSuccess(false)
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
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            setEmailError("empty")
        } else if (password === "") {
            setPasswordError("empty")
        } else if (repeat === "") {
            setRepeatError("empty")
        } else if (password !== repeat) {
            setOpenErrorNoMatch(true)
        } else {
            signup(email, password)
            if (error !== null) {
                setOpenError(true)
            }
        }
    }
    return (
        <div id="Login" className="Login">
            <Modal className="alertModal" isOpen={openErrorNoMatch} onRequestClose={closeErrorNoMatchModal} style={modalStyles} shouldCloseOnOverlayClick={true}> 
                <p className='bodyM'>Passwords do not match.</p>
                <button className="bodyM" onClick={closeErrorNoMatchModal}>Close</button>
            </Modal>
            <Modal className="alertModal" isOpen={openError} onRequestClose={closeErrorModal} style={modalStyles} shouldCloseOnOverlayClick={true}> 
                <p className='bodyM'>{error}</p>
                <button className="bodyM" onClick={closeErrorModal}>Close</button>
            </Modal>
            <Modal className="alertModal" isOpen={openSuccess} onRequestClose={closeSuccessModal} style={modalStyles} shouldCloseOnOverlayClick={true}> 
                <p className='bodyM'>Account Successfully Created! <Link to="../">Home</Link></p>
                <button className="bodyM" onClick={closeSuccessModal}>Close</button>
            </Modal>
            <img src="assets/logo.svg" alt="logo"/>
            <div className="form">
                <h1 className="headingL header">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={e => { setEmail(e.target.value); setEmailError("") }} className={"bodyS input " + emailError} type="email" name="email" placeholder='Email Address' />
                    <span className={"span" + emailError}></span>
                    <input value={password} onChange={e => { setPassword(e.target.value); setPasswordError("") }} className={"bodyS input " + passwordError} type="password" name="password" placeholder='Password' />
                    <span className={"span" + passwordError}></span>
                    <input value={repeat} onChange={e => { setRepeat(e.target.value); setRepeatError("") }} className={"bodyS input " + repeatError} type="password" name="password" placeholder='Repeat Password' />
                    <span className={"span" + repeatError}></span>
                    <button className="bodyM" type="submit">Create an account</button>
                </form>
                <p className="bodyS">Already have an account? <Link to="../login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;