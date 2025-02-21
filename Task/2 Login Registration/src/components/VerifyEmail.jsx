import React, { useContext } from 'react'
import './verifyEmail.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userContext } from '../context/context'
import axios from 'axios'

const VerifyEmail = ({ email }) => {
    let val = useContext(userContext)

    function resendOtp() {
        console.log('asdas')
    }

    async function verifyOtp(otp) {
        try {
            let res = await axios.post('/verifyOTP', {
                "emailId": email,
                "OTP": otp,
            })
            document.getElementById('verifybg').style.display = 'none'
            val.setToggleVerifyEmail(true);
        } catch (error) {
            console.log('sdfsdfsdf')
            console.log(error);
            document.getElementById('otpErr').style.display = 'block';
        }
    }

    function removePopup(){
        document.getElementById('verifybg').style.display = 'none';
    }

    const formik = useFormik({
        initialValues: { otp: '' },
        validationSchema: Yup.object({
            otp: Yup.string().required('required').min(6, '* should of 6 character').max(6, '* Should be 6 charaters'),
        }),
        onSubmit: values => {
            console.log(values);
            verifyOtp(values.otp);
            formik.setFieldValue('otp','');
            formik.touched.otp = false;
            document.getElementById('otpErr').style.display = 'none';

        }
    })
    return (

        <div id="verifybg" className='popup_bg' > 
            <div className='popup_div'>
                <h2>Email is Verified</h2>
                <h5>Enter OTP which is sent on your email</h5>
                <form onSubmit={formik.handleSubmit}>
                    
                    <div className='grid-box-2'>
                        <label htmlFor='otp'> Enter OTP </label>
                        <input type="text" name="otp" id="otp" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.otp}/>
                        
                        {formik.touched.otp && formik.errors.otp ? (<div className='error'>{formik.errors.otp}</div>) : null}
                        <span id='otpErr' className='error' style={{ display: 'none' }}>OTP is incorrect</span>

                        <div className='flexbtn'>
                            <button type='submit' id='verifyBtn'>Verify</button>
                        </div>
                    </div>

                </form>
                <button onClick={removePopup}>Cancel</button>
                <div id='resendOtp' className='link' ><span onClick={resendOtp}>resend opt</span></div>
            </div>
        </div>
    )
}

export default VerifyEmail
