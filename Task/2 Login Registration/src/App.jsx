import { useEffect, useState } from 'react'
// import './App.css'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ChangePasword from './pages/ChangePasword'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  const [count, setCount] = useState(0)
  const [checkLogin, setCheckLogin] = useState([]);

  // useEffect(() => {
    // setCheckLogin(localStorage.getItem('token'));
    // console.log('sdfafddf');
  // })  //on LogOut it should run OR on every api request it should be run

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/changePassword' element={<ChangePasword />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
