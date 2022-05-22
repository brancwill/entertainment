import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        const handleRes = async (res) => {
            dispatch({ type: 'LOGIN', payload: res.user});
            await setDoc(doc(db, "users", res.user.uid), {bookmarks: []})
        }
        setError(null)
        await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                handleRes(res)
            })
            .catch((err) => {
                setError(err.message)
            })   
    }

    return { error, signup }
}