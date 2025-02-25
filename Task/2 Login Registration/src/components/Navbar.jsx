import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate, NavLink } from 'react-router';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.getElementById('pop_box').style.display = (toggle) ? '' : 'none'
  }, [toggle])

  function handleLogout() {
    localStorage.setItem('token', '');
  }

  return (
    <>
      <div id='pop_box' className='pop_box'>
        {role != 'admin' && <><NavLink style={{ textDecoration: 'none' }} to={'/changePassword'}> Change Password </NavLink><br /><hr />
          <NavLink style={{ textDecoration: 'none' }} to={'/forgotPassword'}> Forget Password </NavLink><br /><hr /></>}
        <NavLink style={{ textDecoration: 'none' }} to={'/signin'} onClick={handleLogout}> Logout </NavLink><br /> <hr />
      </div>

      <div className='navbar showBtn' >
        <img src='user (1).png' alt='profile img' className='profileIcon' onClick={() => setToggle(!toggle)} />

      </div>

      <div className='belowNavbar'></div>
    </>
  )
}

export default Navbar
