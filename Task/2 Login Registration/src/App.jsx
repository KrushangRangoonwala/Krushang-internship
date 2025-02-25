import { useEffect, useState } from 'react'
// import './App.css'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ChangePasword from './pages/ChangePasword'
import ForgotPassword from './pages/ForgotPassword'
import EditDetails from './pages/EditDetails'

function App() {
  const [count, setCount] = useState(0)
  const [checkLogin, setCheckLogin] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/changePassword' element={<ChangePasword />} />
          <Route path='/editDetails' element={<EditDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
