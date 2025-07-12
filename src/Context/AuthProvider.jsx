import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../FireBase/firebase';
const provider=new GoogleAuthProvider()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const createUser = (email, Password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, Password);
    }
    const updateUserProfile=(profilePic)=>{
        return updateProfile(auth.currentUser,profilePic)
    }
    const signIn = (email, Password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, Password);
    }
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('user in auth', currentUser)
            setLoading(false)
        })
        return () => {
            unSubcribe()
        }
    }, [])

    const userInfo = {
        user,
        setUser,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        logOut,
        loading
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;