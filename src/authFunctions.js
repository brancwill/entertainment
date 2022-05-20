import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseConfig"

export const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error.message)
    }
}

// export const login = async () => {
    
// }

// export const logout = async () => {
    
// }