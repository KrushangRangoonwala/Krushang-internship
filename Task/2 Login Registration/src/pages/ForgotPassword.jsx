import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'

const ForgotPassword = () => {
  let navigate = useNavigate();
  let location = useLocation();

  async function handleForgotPassword(values) {  
    try {
      let res = await axios.post('/forgotPassword', { 'emailId' : values.email }) 
      alert('New Password sent on your email.');
      console.log(res.data);
      navigate('/signin');
    } catch (error) {    
      console.log(error); // if remove semicolon then next line alert is not working
      (error.response.data.message == "Email not Registered") && alert('Entered Email is not registered \nCheck your entered email');
    }
  }

useEffect(() => {
  console.log("location.email ",location.email);
  document.getElementById('email').focus();

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
},[]);

  const formik = useFormik({
    initialValues: { email: location.email },
    validationSchema: Yup.object({
      email: Yup.string().email().required('* Required'),
    }),
    onSubmit: values => {
      console.log(values);
      handleForgotPassword(values);
    }
  })


  return (
    <>
      <h1>Forgot Password</h1>
      <h5> Please Check Email correctly, because your new password will sent on this email</h5>
      <div className='form-box' style={{ width: '370px' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid-box-2'>
            <label htmlFor="email">Email</label>
            <div><input id="email" name="email" type="email" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              { formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}</div>
          </div>

          <br />
          <div className='submitBtnDiv'>
            <button type="submit" className='submitBtn'>Send Email</button>
          </div>
        </form>
        <span className='link' onClick={() => navigate('/signin')}>Want to Try SignIn?</span><br />
      </div>
    </>
  )
}

export default ForgotPassword
