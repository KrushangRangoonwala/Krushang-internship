// import './App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Employee_details from './components/Employee_details'
import Family_details from './components/Family_details'
import Educational_details from './components/Educational_details'
import Preview from './components/Preview'
// import 'bootstrap/dist/css/bootstrap.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employee_details />} />
          <Route path='/family_details' element={<Family_details />} />
          <Route path='/educational_details' element={<Educational_details />} />
          <Route path='/preview' element={<Preview/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
