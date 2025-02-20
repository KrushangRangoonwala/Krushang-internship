import { useState } from 'react'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ChangePasword from './pages/ChangePasword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/changePassword' element={<ChangePasword/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
