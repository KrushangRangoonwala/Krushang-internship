import { useState } from 'react'
import '../App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router'

// const db = getDatabase(app);
const auth = getAuth(app);

function Prac01() {
    const [count, setCount] = useState(0)

    function createUser() {
        createUserWithEmailAndPassword(auth, 'kushrangoon@gmail.com', 'Kush@123')
            .then((value) => console.log(value));
    }

    return (
        <>
            {/* <SignUp />
            <SignIn /> */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
            {/* <button onClick={createUser}> Create User </button> */}
        </>
    )
}

export default Prac01
