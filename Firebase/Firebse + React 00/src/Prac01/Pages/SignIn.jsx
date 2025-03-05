import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useRef } from 'react'
import { app } from '../../firebase';
import { useNavigate } from 'react-router';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    function signInUser() {
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((value) => {
                console.log("Success ", value);
                navigate('/');
            })
            .catch((err) => console.log('error ', " err.length ", err.length, "  \n", err));
    }

    function signInWithGoogle() {
        signInWithPopup(auth, googleProvider);
    }

    return (
        <>
            <h2>Sign In</h2>
            <label> Email</label>
            <input type='email' name='email' ref={email} placeholder='Enter email' /><br /><br />
            <label> Password</label>
            <input type='text' name='password' ref={password} placeholder='Enter Password' /><br /><br />
            <button type='submit' onClick={signInUser}> Sign In </button>

            <p style={{ color: 'cornflowerblue', cursor: 'pointer' }} onClick={signInWithGoogle}>want to Sign In with Google</p>
        </>
    )
}

export default SignIn
