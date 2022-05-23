import React, {useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { auth } from '../firebaseConfig';

const AccountInfo = (props) => {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [ hide, setHide ] = useState("hidden")

    return (
        <div className="AccountInfo">
            <img src="assets/icon-account.svg" alt="" />
            <h1 className="headingS">Logged in as: {user.email}</h1>
            <button className="bodyM logout" onClick={logout}>Logout</button>
            <button className="close" onClick={props.closeModal}>Close</button>
        </div>
    );
};

export default AccountInfo;