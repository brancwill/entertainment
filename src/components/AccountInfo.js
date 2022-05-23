import React, {useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { auth } from '../firebaseConfig';
import { deleteUser } from 'firebase/auth';

const AccountInfo = (props) => {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [ hide, setHide ] = useState("hidden")

    const handleClick = () => {
        deleteUser(auth.currentUser)
    }

    return (
        <div className="AccountInfo">
            <img src="assets/icon-account.svg" alt="" />
            <h1 className="headingS">Logged in as: {user.email}</h1>
            <div className='buttonGroup'>
                <button className="bodyM logout" onClick={logout}>Logout</button>
                <button className="bodyM delete" onClick={() => setHide('unhidden')}>Delete Account</button>
            </div>
            <div className={hide}>
                <h1 className="headingXS">Are you sure you want to delete your account?</h1>
                <div className="hiddenButtons">
                    <button className="bodyM affirm" onClick={handleClick}>Yes</button>
                    <button className="bodyM deny" onClick={() => setHide('hidden')}>No</button>
                </div>
            </div>
            <button className="close" onClick={props.closeModal}>Close</button>
        </div>
    );
};

export default AccountInfo;