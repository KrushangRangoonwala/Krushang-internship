import React, { useEffect, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
// import VerifyEmail from '../components/VerifyEmail'
import axios from 'axios'
// import Loading from '../components/Loading'
// import { userContext } from '../context/context'
// import EmailExist from '../components/EmailExist'
import { NavLink, useNavigate } from 'react-router'

// axios.defaults.baseURL = 'http://192.168.1.184:5000/user'

let initialValues = {
    name: '',
    email: '',
    psw: '',
    confirmPsw: '',

}

const SignUp2 = () => {
    const [pswFlag, setPswFlag] = useState(true);
    const [cnpswFlag, setCnPswFlag] = useState(true);
    const [toggleVerifyEmail, setToggleVerifyEmail] = useState(false);
    const [email, setEmail] = useState('!');
    let navigate = useNavigate();

    async function signUpUser(values) {
        let payload = {
            "emailId": values.email,
            "password": values.psw,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "contactNo": `${values.cNo}`,
            "birthDate": values.dob,
            "gender": values.gender,
        };
        console.log("payload ", payload)
        try {
            let res = await axios.post('/register', payload)
            let token = [];
            console.log(JSON.parse(window.atob(res.data.data.token)));
            token.push(JSON.parse(window.atob(res.data.data.token)));
            localStorage.setItem('token', JSON.stringify(token));
            navigate('/')
        } catch (error) {
            alert('You are not signed up because of some error\nplease try again leter')
            console.log(error);
        }
    }

    async function verifyEmail(email) {
        document.getElementById('loading_bg').style.display = 'flex';
        try {
            let response = await axios.post('/verifyEmail', {
                "emailId": email
            });

            console.log('verifyEmail success');
            console.log(response.data);
            document.getElementById('loading_bg').style.display = 'none';
            document.getElementById('verifybg').style.display = 'flex';
            document.getElementById('otp').focus();
        } catch (err) {
            console.log("err.response.data ", err.response.data);
            document.getElementById('loading_bg').style.display = 'none';

            console.log("err.response.data", err.response.data)
            if (!err.response.data.success) {
                alert(err.response.data.message)
                console.log('registered email');
                // confirm('Email Already Registered \n If you want to SignIn press "Okay"') && navigate('/signin');
                // alert('Email Already Registered \nIf you want to SignIn, then click on "signin"');
            } else if (err.response.data.message == "Email Already Verified") {
                console.log('Verified email');
                setToggleVerifyEmail(true)
            }
            // document.getElementById('emailExist').style.display = 'flex';
        }
    }

    useEffect(() => {
        (toggleVerifyEmail) && setEmail(formik.values.email);
        (toggleVerifyEmail) ? formik.setFieldValue('verifyEmail', true) : formik.setFieldValue('verifyEmail', false);
    }, [toggleVerifyEmail])

    useEffect(() => document.getElementById('firstName').focus(), []);


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            lastName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            email: Yup.string().email('* Enter valid email').required('* Required'),
            verifyEmail: Yup.boolean().oneOf([true], 'You need to verify your email'),
            cNo: Yup.number().required('* Required').min(5999999999, '* Enter valid Contact No').max(9999999999, '* Should be of 10-digit'),
            psw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            confirmPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            dob: Yup.date().required('* Required'),
            gender: Yup.string().required('* Required'),
            tc: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("You must accept the terms and conditions")
        }),
        onSubmit: values => {
            console.log(values);
            signUpUser(values);
        }

    })

    function Upper1stChar(str) {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
        }
    }

    return (
        <>
            <Loading />
            {/* <EmailExist /> */}

            {/* ******* remove contect just pass prop   */}
            {/* <userContext.Provider value={{ toggleVerifyEmail, setToggleVerifyEmail }}> */}
            <VerifyEmail email={formik.values.email} val={{ toggleVerifyEmail, setToggleVerifyEmail }} />
            {/* </userContext.Provider> */}

            <h1>SignUp</h1>
            <div className='form-box'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid-box'>
                        <label htmlFor="firstName">First Name</label>
                        <label htmlFor="lastName">Last Name</label>

                        <div><input id="firstName" name="firstName" type="text" className='input-text' onChange={formik.handleChange} onBlur={(e) => {
                            formik.handleBlur(e)
                            formik.setFieldValue('firstName', Upper1stChar(formik.values.firstName))
                        }
                        } value={formik.values.firstName} onFocusOut={() => console.log('sdf')} />
                            {formik.touched.firstName && formik.errors.firstName ? (<div className='error'>{formik.errors.firstName}</div>) : null}</div>

                        <div><input id="lastName" name="lastName" type="text" className='input-text' onChange={formik.handleChange} onBlur={(e) => {
                            formik.handleBlur(e)
                            formik.setFieldValue('lastName', Upper1stChar(formik.values.lastName))
                        }
                        } value={formik.values.lastName} />
                            {formik.touched.lastName && formik.errors.lastName ? (<div className='error'>{formik.errors.lastName}</div>) : null}</div>
                    </div>


                    {/* ------ <EMAIL> -------- */}
                    <div className='grid-box-2'>
                        <label htmlFor="email">Email Address</label>

                        <div className='sideIcon'>
                            <input id="email" name="email" type="email" className='input-text' onChange={(e) => {
                                formik.handleChange(e)
                                setToggleVerifyEmail(false)
                            }}
                                onBlur={formik.handleBlur} value={formik.values.email} />

                            {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}

                            {(toggleVerifyEmail) ?
                                <img src='check.png' className='toggleIcon' />
                                : (formik.values.email == email) ? setToggleVerifyEmail(true)
                                    : (formik.touched.email && !formik.errors.email) ? <span className='link' id='enterOtp' onClick={() => verifyEmail(formik.values.email)}>click to verify email</span> : null}

                            <input type="text" name="verifyEmail" id="verifyEmail" onChange={formik.handleChange} value={formik.values.verifyEmail} hidden />
                            {/* {formik.touched.verifyEmail && formik.errors.verifyEmail ? alert('You need to verify your email')  : null} */}
                            {formik.touched.verifyEmail && formik.errors.verifyEmail ? (<div className='error'>{formik.errors.verifyEmail}</div>) : null}
                        </div>
                    </div>

                    {/* ------ </EMAIL> -------- */}


                    <div className='grid-box-2'>
                        <label htmlFor="cNo">Contact No</label>
                        <div><input id="cNo" name="cNo" type="number" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cNo} />
                            {formik.touched.cNo && formik.errors.cNo ? (<div className='error'>{formik.errors.cNo}</div>) : null}</div>
                    </div>
                    <div className='grid-box-2'>
                        <label htmlFor='dob'> Birth Date</label>
                        <div><input id='dob' name='dob' type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob} />
                            {formik.touched.dob && formik.errors.dob ? <div className='error'>{formik.errors.dob}</div> : null} </div>
                    </div><br />

                    <div className='grid-box-2' ><label>Gender</label>
                        <div><label htmlFor='male'><input type="radio" name="gender" id="male" value='M' onChange={formik.handleChange} onBlur={formik.handleBlur} /> Male</label>
                            <label htmlFor='female'><input type="radio" name="gender" id="female" value='F' onChange={formik.handleChange} onBlur={formik.handleBlur} /> Female</label>
                            {formik.touched.gender && formik.errors.gender ? <div className='error'>{formik.errors.gender}</div> : null}

                            {/* {setTimeout(() => formik.values.gender == 'M' ? document.getElementById('male').checked = true : null,200)}
                            {setTimeout(() => formik.values.gender == 'F' ? document.getElementById('female').checked = true : null,200)} */}
                        </div>
                    </div>

                    <br />
                    <div className='grid-box'>
                        <label htmlFor='psw'>Password</label><br />

                        <div className='sideIcon'>
                            <input type={pswFlag ? "password" : 'text'} className='input-text' name="psw" id="psw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.psw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {pswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setPswFlag(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setPswFlag(true)} />}
                        </div>

                        <div className='sideIcon'>
                            <input type={cnpswFlag ? "password" : 'text'} className='input-text' name="confirmPsw" id="confirmPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {cnpswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setCnPswFlag(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setCnPswFlag(true)} />}
                        </div>

                        {formik.touched.psw && formik.errors.psw ? (<div className='error'>{formik.errors.psw}</div>) : null}
                        
                        {formik.touched.confirmPsw && formik.errors.confirmPsw ? (formik.touched.psw && formik.errors.psw) ? (<div className='error'>{formik.errors.confirmPsw}</div>) : (<><div></div><div className='error'>{formik.errors.confirmPsw}</div></>) : null}


                        {(formik.touched.psw && formik.touched.confirmPsw && !formik.errors.confirmPsw && !formik.errors.psw && (formik.values.psw != formik.values.confirmPsw)) ? <><div className='error'> Password isn't Matching</div></> : null}
                        {(formik.errors.psw == 'specil character error' && <p>specil character error</p>)}

                    </div>
                    <br />

                    <input type="checkbox" name="tc" id="tc" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tc} /><label htmlFor='tc'>I accept all Terms and Conition</label>
                    {formik.touched.tc && formik.errors.tc ? <div className='error'>{formik.errors.tc}</div> : null}

                    <br />
                    <br />
                    <div className='submitBtnDiv'>
                        <button type="submit" className='submitBtn'>Submit</button>
                    </div>
                </form>
            </div>
            <p style={{ textAlign: 'center' }}>Already have Account ? <NavLink to={'/signin'}>SignIn</NavLink></p>
        </>
    )
}

export default SignUp2
