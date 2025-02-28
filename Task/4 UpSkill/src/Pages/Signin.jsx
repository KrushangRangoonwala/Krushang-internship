// this my sinup.jsx file give style and animation in it and give css code
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import './signup.css'


const Signin = () => {
    const [pswFlag, setPswFlag] = useState(true);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('* Enter valid email').required('* Required'),
            psw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
        }),
        onSubmit: values => {
            console.log(values);
        }
    })
    return (
        <>
            <div className='form-box'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid-box-2'>
<div>
                        <input className='input-text' id="email" name="email" type="text" placeholder='Enter Your emai' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
                        </div>

                        {/* <div className='grid-box-2'> */}
                        {/* <label htmlFor='psw'>Password</label> */}
                        <div>
                        <div className='sideIcon'>
                            <input type={pswFlag ? "password" : 'text'} className='input-text' name="psw" id="psw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.psw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {pswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setPswFlag(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setPswFlag(true)} />}
                        </div>
                        {formik.touched.psw && formik.errors.psw ? (<div className='error'>{formik.errors.psw}</div>) : null}
                    </div>
                    </div>
                    <br />
                    <div className='submitBtnDiv'>
                        <button type="submit" className='submitBtn'>SignIn</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin
