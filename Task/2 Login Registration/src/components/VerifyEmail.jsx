import React from 'react'
import './verifyEmail.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const VerifyEmail = () => {
    function resendOtp() {
        console.log('asdas')
    }

    const formik = useFormik({
        initialValues: { otp: '' },
        validationSchema: Yup.object({
            otp: Yup.string().required('required'),
        }),
        onSubmit: values => {
            console.log(values);
        }
    })
    return (

            <div id="verifybg">
                <div id='verifyEmail' >
                    <h2>Verify Email</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid-box-2'>
                        <label htmlFor='otp'> Enter OTP </label>
                        <input type="text" name="otp" id="otp" className='input-text' />
                        <div className='flexbtn'>
                            <button type='submit' id='verifyBtn'>Verify</button>
                        </div>
                        </div>
                    </form>
                    <div id='resendOtp' className='link' ><span onClick={resendOtp}>resend opt</span></div>
                </div>
            </div>
    )
}

export default VerifyEmail
