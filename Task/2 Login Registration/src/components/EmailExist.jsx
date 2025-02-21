import React from 'react'
import './verifyEmail.css'
import { NavLink, useNavigate } from 'react-router'

const EmailExist = () => {
    let navigate = useNavigate();
    
    return (
        <div id='emailExist' className='popup_bg'>
            <div className='popup_div' onClick={() => console.log('clicked')}> Email already Exist in Database. <br />
                Do you want to <span className='link'><NavLink to='/signin'> Signin </NavLink></span>?

            <button onClick={() => document.getElementById('emailExist').style.display = 'none'}> Cancel </button>
            <button onClick={() => navigate('/signin')}> SignIn </button> </div>
        </div>
    )
}

export default EmailExist
