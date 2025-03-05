import { useState } from 'react'
import './App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router'
import SignUp from './Prac01/Pages/SignUp'
import SignIn from './Prac01/Pages/SignIn'
import { app } from './firebase'
import Home from './Prac01/Pages/Home'

// const db = getDatabase(app);
const auth = getAuth(app);

function App() {

  return (
    <>
      {/* <SignUp />
      <SignIn /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      {/* <button onClick={createUser}> Create User </button> */}
    </>
  )
}

export default App
