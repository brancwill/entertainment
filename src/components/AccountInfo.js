import React, {useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { auth } from '../firebaseConfig';
import { deleteUser } from 'firebase/auth';

const AccountInfo = (props) => {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [ classname, setClassname ] = useState("hidden")

    const handleClick = () => {
        deleteUser(auth.currentUser)
    }

    return (
        <div className="AccountInfo">
            <img src="assets/icon-account" alt="" />
            <h1 className="headingS">Logged in as: {user.email}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={() => setClassname('unhidden')}>Delete Account</button>
            <div className={classname}>
                <h1 className="headingXS">Are you sure you want to delete your account?</h1>
                <button className="affirm" onClick={handleClick}>Yes</button>
                <button className="deny" onClick={() => setClassname('hidden')}>No</button>
            </div>
            <button onClick={props.closeModal}>Close</button>
        </div>
    );
};

export default AccountInfo;