import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useRef } from 'react'
import { app } from '../../firebase';
import { useNavigate } from 'react-router';

const auth = getAuth(app);

const SignUp = () => {
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    function createUser() {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((value) => {console.log(value)
                navigate('/')
            });
    }

    return (
        <>
            <h2>Sign Up</h2>
            <label> Email</label>
            <input type='email' name='email' ref={email} placeholder='Enter email' /><br/><br/>
            <label> Password</label>
            <input type='text' name='password' ref={password} placeholder='Enter Password' /><br/><br/>
            <button type='submit' onClick={createUser}> Sign Up </button>
        </>
    )
}

export default SignUp
