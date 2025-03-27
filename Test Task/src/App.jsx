import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Pages/Login'
import TasksList from './Pages/TasksList'
// import ViewTask from './Pages/ViewTask'
import SignUp from './Pages/SignUp'
import TaskInfo from './Pages/TaskInfo'
import { userContext } from './Context/context';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [cc, setcc] = useState(localStorage.getItem('c'))

  return (
    <>
      <userContext.Provider value={{user,token,cc,setUser,setToken,setcc}}>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/addTask' element={<TaskInfo />} />
            <Route path='/editTask/:id' element={<TaskInfo />} />
            <Route path='/login' element={<Login />} />
            <Route path='/tasks' element={<TasksList />} />
            {/* <Route path='/tasks/:id' element={<ViewTask />} /> */}
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
