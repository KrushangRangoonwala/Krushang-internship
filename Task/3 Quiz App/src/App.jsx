import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import Category from './Pages/Category'
import About from './Pages/About'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'
import PrintResult from './Pages/PrintResult'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/about' element={<About />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/result' element={<Result />} />
          <Route path='/printResult' element={<PrintResult />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
