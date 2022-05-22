import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT'})
            })
    }

    return { logout }
}