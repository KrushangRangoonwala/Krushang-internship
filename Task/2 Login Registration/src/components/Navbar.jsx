import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate, NavLink } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  function toggleShow(){
    document.getElementById('pop_box').style.display = (toggle) ? '' : 'none';
    setToggle(!toggle);  
  }

  useEffect(() => toggleShow(),[])

  return (
    <>
      <div id='pop_box' className='pop_box'>
        <NavLink style={{textDecoration: 'none'}} to={'/changePassword'}> Change Password </NavLink><br /><hr />
        <NavLink style={{textDecoration: 'none'}} to={'/signin'}> Switch User </NavLink><br /><hr />
        <NavLink style={{textDecoration: 'none'}} to={'/signup'}> Logout </NavLink><br /> <hr />
      </div>

      <div className='navbar showBtn' >
        <img src='user-account.png' alt='profile img' className='profileIcon' onClick={toggleShow}/>
        <img src='Screenshot 2025-02-20 095142.png' className='profileBg' />
      </div>

      <div className='belowNavbar'></div>
    </>
  )
}

export default Navbar
