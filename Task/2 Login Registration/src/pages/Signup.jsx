import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import VerifyEmail from '../components/VerifyEmail'

let initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    cNo: '',
    psw: '',
    confirmPsw: '',
    dob: '',
    gender: '',
    tc: '',
}

const Signup = () => {
    const [pswFlag, setPswFlag] = useState(true);
    const [cnpswFlag, setCnPswFlag] = useState(true);
    const [toggleVerifyEmail, setToggleVerifyEmail] = useState(false)

    function enterOtp() {
        document.getElementById('verifybg').style.display = 'flex';
        console.log('sdfsf')
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            lastName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            email: Yup.string().email('* Enter valid email').required('* Required'),
            cNo: Yup.number().required('* Required').min(5999999999, '* Enter valid Contact No').max(9999999999, '* Should be of 10-digit'),
            psw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', 'Contains atleast one Number Uppercase Lower case digit', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            confirmPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', 'Contains atleast one Number Uppercase Lower case digit', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            dob: Yup.date().required('* Required'),
            gender: Yup.string().required('* Required'),
            tc: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("You must accept the terms and conditions")
        }),
        onSubmit: values => {
            console.log(values);
        }

    })
    return (
        <>
            <VerifyEmail />
            <h1>SignUp</h1>
            <div className='form-box'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid-box'>
                        <label htmlFor="firstName">First Name</label>
                        <label htmlFor="lastName">Last Name</label>

                        <div><input id="firstName" name="firstName" type="text" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                            {formik.touched.firstName && formik.errors.firstName ? (<div className='error'>{formik.errors.firstName}</div>) : null}</div>

                        <div><input id="lastName" name="lastName" type="text" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
                            {formik.touched.lastName && formik.errors.lastName ? (<div className='error'>{formik.errors.lastName}</div>) : null}</div>
                    </div>

                    <div className='grid-box-2'>
                        <label htmlFor="email">Email Address</label>
                        
                        <div className='sideIcon'><input id="email" name="email" type="email" className='input-text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
                        {formik.touched.email && !formik.errors.email ? <span className='link' id='enterOtp' onClick={enterOtp}>click to verify email</span> : null}
                        { toggleVerifyEmail && <img src='check.png' className='toggleIcon'/>}
                    </div>
                    </div>
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
                        <div><label htmlFor='male'><input type="radio" name="gender" id="male" onChange={formik.handleChange} value={formik.values.gender == 'male'} /> Male</label>
                            <label htmlFor='female'><input type="radio" name="gender" id="female" onChange={formik.handleChange} value={formik.values.gender == 'female'} /> Female</label>
                            {formik.touched.gender && formik.errors.gender ? <div className='error'>{formik.errors.gender}</div> : null}
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

                        {((formik.touched.psw && formik.errors.psw) || (formik.touched.confirmPsw && formik.errors.confirmPsw)) ? (formik.errors.confirmPsw ? <div className='error'>{formik.errors.confirmPsw}</div> : <div className='error'>{formik.errors.psw}</div>) : (formik.touched.psw && formik.touched.confirmPsw && (formik.values.psw != formik.values.confirmPsw)) ? <><div className='error'> Password isn't Matching</div></> : null}
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
        </>
    )
}

export default Signup
