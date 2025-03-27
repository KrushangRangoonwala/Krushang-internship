import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import "./signup.css";
import { useNavigate } from 'react-router';

let c = 1;

const SignUp = () => {

    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    // const [togglePopUp, setTogglePopUp] = useState(false);
    // const [errorPopup, setErrorPopup] = useState(false)
    // const [loader, setLoader] = useState(false);

    function handleSignUp(values) {
        let d = localStorage.getItem('c');
        // d ? 
        d ? localStorage.setItem('c', d) : localStorage.setItem('c', c);
        id++;
        // setLoader(true);
        const payload = {
            id: id,
            name: values.name,
            email: values.email,
            password: values.password,
            authority: values.authority,
        }
        localStorage.setItem('user', JSON.stringify(payload));
        // const token = values.email.map((x,i) => `${x}${i}`);
        // console.log("token ",token)
        localStorage.setItem('token', values.email);
        navigate('/tasks');
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            authority: 'user'
        },
        validationSchema: yup.object({
            name: yup.string().required('* Required').matches(/^[A-Za-z\s]{2,25}$/, "* invalid name"),
            email: yup.string().required('* Required').email('* Not valide email'),
            password: yup.string().required('* Required').min(8, '* must be more then 8 character')
                .test('uppercase', '* atleast one Uppercase letter required', (value) => /[A-Z]/.test(value))
                .test('lowercase', '* atleast one Lowercase letter required', (value) => /[a-z]/.test(value))
                .test('digit', '* atleast one digit required', (value) => /\d/.test(value))
                .test('special_char', '* atleast one Special Character required', (value) => /[!@#$%^&*(),.?":{}|]/.test(value)),
            confirmPassword: yup.string().required('* Required').min(8, '* must be more then 8 character')
                .test('uppercase', '* atleast one Uppercase letter required', (value) => /[A-Z]/.test(value))
                .test('lowercase', '* atleast one Lowercase letter required', (value) => /[a-z]/.test(value))
                .test('digit', '* atleast one digit required', (value) => /\d/.test(value))
                .test('special_char', '* atleast one Special Character required', (value) => /[!@#$%^&*(),.?":{}|]/.test(value)), authority: yup.string().required('* Required'),
            authority: yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log("values ", values);
            handleSignUp(values);
        }
    })

    function Upper1stChar(str) {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
        }
    }

    return (
        <>
            <div className="center">
                <div className="auth-container">
                    <div className="signup-container" style={{ height: 'auto' }}>
                        <form className="signup-form" onSubmit={formik.handleSubmit} style={{ boxShadow: '0 0px 0px rgba(0, 0, 0, 0.1)', padding: '0px' }}>

                            <div className='input-div-container'>
                                <input id='name' type="text" name="name" placeholder="Full Name"
                                    style={formik.touched.name && formik.errors.name && { marginBottom: '40px' }}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        formik.handleBlur(e)
                                        formik.setFieldValue('name', Upper1stChar(formik.values.name))
                                    }}
                                    value={formik.values.name}
                                    required
                                />
                                {formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div>) : null}
                            </div>

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

                            <div className='input-div-container sideIcon'>
                                <input type={toggleConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword" placeholder="Confirm Password" style={formik.touched.confirmPassword && formik.errors.confirmPassword && { marginBottom: '40px' }}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}
                                    required
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className='error'>{formik.errors.confirmPassword}</div>) : null}

                                {formik.touched.confirmPassword && formik.touched.password && !formik.errors.confirmPassword && !formik.errors.password && formik.values.confirmPassword !== formik.values.password ? (<div className='error'> * Password isn't matching</div>) : null}

                                {toggleConfirmPassword ? <img src='view.png' className='toggleIcon' onClick={() => setToggleConfirmPassword(false)} />
                                    : <img src='hidden.png' className='toggleIcon' onClick={() => setToggleConfirmPassword(true)} />}
                            </div>
                            <br />
                            <label name='authority'>Role </label>
                            <select name='authority'
                                onChange={formik.handleChange}
                                // onBlur={(e) => formik.handleBlur(e)}
                                value={formik.values.authority}>
                                <option value='user' selected>User</option>
                                <option value='manager'>Manager</option>
                                <option value='admin'>Admin</option>
                            </select>
                            {formik.errors.authority ? (<div className='error'>{formik.errors.authority}</div>) : null}

                            <br />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
