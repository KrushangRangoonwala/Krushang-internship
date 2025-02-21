import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router';

const Home = () => {
  // const [checkLogin, setCheckLogin] = useState([]); // error: 
  let navigate = useNavigate()

  useEffect(() => {
    console.log('home..')
    setTimeout(() => {
      let token = JSON.parse(localStorage.getItem('token'));
      console.log('token ', token);
      (!token) ? navigate('./signin') : (token.length === 0) && navigate('./signin'); // still navigate() is running 
    }, 500);
  }, [])

  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
