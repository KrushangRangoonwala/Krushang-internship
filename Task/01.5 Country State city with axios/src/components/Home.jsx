import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    let navigate = useNavigate();
  return (
    <div>
        <Navbar/>
        <br />
        <button style={{ marginLeft: '50vw', marginRight: '50vw', borderRadius:'10px', width:'100px', backgroundColor:'#04AA6D', color: 'white', borderColor: 'white', fontSize: 'x-large'}} onClick={() => navigate('/country')}>Start</button>
    </div>
  )
}

export default Home
