import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router';

const Home = () => {
  // const [checkLogin, setCheckLogin] = useState([]); // error: 
  let navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    setTimeout(() => console.log(user), 500);
  }, [user]);


  useEffect(() => {
    console.log('home..')
    setTimeout(() => {
      let token = JSON.parse(localStorage.getItem('token'));
      console.log('token ', token);
      // (!token) ? navigate('./signin') : (token.length === 0) ? navigate('./signin') : setUser(token[token.length]); // still navigate() is running 
      if (!token) {
        navigate('./signin');
      } else if (token.length === 0) {
        navigate('./signin');
      } else {
        setUser(token[token.length-1]);
        console.log('user ',user);
      }      
    }, 500);
  }, [])

  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
