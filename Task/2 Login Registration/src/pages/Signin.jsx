import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

let initialValues = {
    email: '',
    psw: '',
}

const Signin = () => {
    const [pswFlag, setPswFlag] = useState(true);
    let navigate = useNavigate()

    async function handleSignIn(values) {
        let formData = new FormData();
        formData.append('emailId', values.email);
        formData.append('password', values.psw);

        let res = await axios.post('/login', formData, { headers: { "Content-Type": 'application/json' } })

        let token = [];
        console.log(JSON.parse(window.atob(res.data.data.token)));
        token.push(JSON.parse(window.atob(res.data.data.token)));
        localStorage.setItem('token', JSON.stringify(token));
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email().required('* Required'),
            psw: Yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log(values);
            handleSignIn(values);
            navigate('/',{ replace : true });
        }
    })

    return (
        <>
            <h1>SignIn</h1>
            <div className='form-box' style={{ width: '370px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid-box-2'>
                        <label htmlFor="email">Email</label>
                        <div><input id="email" name="email" type="email" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}</div>
                    </div>

                    <div className='grid-box-2'>
                        <label htmlFor='psw'>Password</label>
                        <div className='sideIcon'>
                            <input type={pswFlag ? "password" : 'text'} className='input-text' name="psw" id="psw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.psw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {pswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setPswFlag(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setPswFlag(true)} />}
                        </div>
                        {formik.touched.psw && formik.errors.psw ? (<div className='error'>{formik.errors.psw}</div>) : null}
                    </div>

                    <br />
                    <div className='submitBtnDiv'>
                        <button type="submit" className='submitBtn'>SignIn</button>
                    </div>
                </form>
                <span className='link' onClick={() => navigate('/signup')}>Create an account</span><br />
                <span className='link' onClick={() => navigate('/forgotPassword')}>Forgot Possword</span>
            </div>
        </>
    )
}

export default Signin
