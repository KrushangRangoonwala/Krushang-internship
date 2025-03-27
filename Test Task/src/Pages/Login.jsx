import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import * as yup from 'yup'
import "./signup.css";

let c = 1;

const Login = () => {
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);

    function handleLogIn(values) {
        let d = localStorage.getItem('c');
        // setLoader(true);
        const payload= {
            email: values.email,
            password: values.password,
        }
        localStorage.setItem('user',JSON.stringify(payload));
        d ? localStorage.setItem('c',d) : localStorage.setItem('c',c);
        // const token = values.email.map((x,i) => `${x}${i}`);
        // console.log("token ",token)
        localStorage.setItem('token',values.email);
        navigate('/tasks');

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().required('* Required').email('* Not valide email'),
            password: yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log("values ", values);
            handleLogIn(values);
        }
    })
    return (
        <>
            <div className="center">
                <div className="auth-container">
                    <div className="signup-container" style={{ height: 'auto' }}>
                        
                        <form className="signup-form" onSubmit={formik.handleSubmit} style={{ boxShadow: '0 0px 0px rgba(0, 0, 0, 0.1)', padding: '0px' }}>

                            <div className='input-div-container'>
                                <input id='email'
                                    type="email" name="email" placeholder="Email" style={formik.touched.email && formik.errors.email && { marginBottom: '40px' }}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                                    required
                                />
                                {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
                            </div>

                            <div className='input-div-container sideIcon'>
                                <input type={togglePassword ? 'text' : 'password'}
                                    name="password" placeholder="Password" style={formik.touched.password && formik.errors.password && { marginBottom: '40px' }}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                                    required
                                />
                                {formik.touched.password && formik.errors.password ? (<div className='error'>{formik.errors.password}</div>) : null}

                                {togglePassword ? <img src='view.png' className='toggleIcon' onClick={() => setTogglePassword(false)} />
                                    : <img src='hidden.png' className='toggleIcon' onClick={() => setTogglePassword(true)} />}
                            </div>

                            <br />
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
