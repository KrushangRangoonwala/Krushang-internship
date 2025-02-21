import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const ForgotPassword = () => {
  let navigate = useNavigate();

  async function handleForgotPassword(values) {
    let formData = new FormData();
    formData.append('emailId', values.email);
    try {
      // let res = await axios.post('/login',formData, {headers : { "Content-Type" : 'application/json'}})
      let res = await axios.post('/forgotPassword', formData, { headers: { "Content-Type": "application/json" } })  //api error : Status Code: 415 Unsupported Media Type
      // let res = await axios.post('/forgotPassword', { email : values.email }, { headers: { "Content-Type": "aplication/json" } })  //api error : Status Code: 415 Unsupported Media Type
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: { email: '' },
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
      <div className='form-box' style={{ width: '370px' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid-box-2'>
            <label htmlFor="email">Email</label>
            <div><input id="email" name="email" type="email" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}</div>
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
