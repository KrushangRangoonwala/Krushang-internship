import { useState } from 'react'
// import './App.css'
import './components/navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from '../App';
import City from './components/City'
import State from './components/State'
import Country from './components/Country'
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewCountry from './components/viewCountry';
import ViewState from './components/ViewState';
import TryState from './components/TryState';
import TryByMeState from './components/TryByMeState'
import CityTry from './components/CityTry';
import ViewCity from './components/ViewCity';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/city' element={<City />} /> */}
          <Route path='/city' element={<CityTry />} />
          <Route path='/country' element={<Country />} />
          <Route path='/country/:id' element={<ViewCountry />} /> 
          <Route path='/state/:id' element={<ViewState />} /> 
          <Route path='/city/:id' element={<ViewCity />} /> 
          {/* <Route path='/state' element={<TryState />} /> */}
          {/* <Route path='/state' element={<State />} /> */}
          <Route path='/state' element={<TryByMeState />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App