import { useState } from 'react'
import './App.css'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Signup /> */}
     <Signin />
     </>
  )
}

export default App
