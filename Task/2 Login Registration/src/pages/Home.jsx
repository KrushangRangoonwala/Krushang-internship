import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router';
import UserCard from '../components/UserCard';
import AllUser from '../components/AllUser';
import '../components/allUser.css'
import axios from 'axios';


const Home = () => {
  let navigate = useNavigate()
  const [user, setUser] = useState({})

  async function getUser() {
    try {
      let token = JSON.parse(localStorage.getItem('token'));
      let userObj = token[token.length - 1];
      let response = await axios(`/get/${userObj.Id}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error)
      // console.log("catch")
      if (error.response.data.message == "Record Not Found") {
        alert('User is not Found');
        navigate('/signin');
      }
    }
  }

  useEffect(() => {
    getUser();
    setTimeout(() => {
      let token = JSON.parse(localStorage.getItem('token'));
      console.log('token ', token);
      if (!token) {
        alert('Please first SignIn')
        navigate('/signin');
      } else if (token.length === 0) {
        alert('Please first SignIn')
        navigate('/signin');
      }
    }, 500);
  }, [])

  return (
    <>
      <Navbar role={user.role}/>
      <div>
        <div className='table-container' style={{ paddingTop: '0px' }}>
          <UserCard user={user}/>
        </div>
      </div>
    </>
  )
}

export default Home