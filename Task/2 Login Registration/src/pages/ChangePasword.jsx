import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router'

let initialValues = {
    oldPsw: '',
    newPsw: '',
    confirmNewPsw: '',
}

// useEffect(() => document.getElementById('oldPsw').focus(), []);  // If write useEffect outside main functional component (in this page `ChangePasword`), then it will run before `ChangePasword` component amount to page. So, it give error that "Cannot get element thats id is 'oldPsw'"

const ChangePasword = () => {
    let navigate = useNavigate();
    const [oldPsw, setOldPsw] = useState(true);
    const [newPsw, setNewPsw] = useState(true);
    const [cnNewPsw, setCnNewPsw] = useState(true);

    useEffect(() => {
        document.getElementById('oldPsw').focus();
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
    }, [])

    async function handleChangePassword(values) {
        let token = JSON.parse(localStorage.getItem('token'));
        let userObj = token[token.length - 1];
        try {
            let response = await axios.post('/changePassword', { 'Id': userObj.Id, 'oldPassword': values.oldPsw, 'newPassword': values.newPsw });
            navigate('/');
            alert('Your Password Changed Successfully');
        } catch (error) {
            console.log(error);
            if (error.response.data.message == "Incorrect Old Password") {
                // confirm('Old Password is Incorrect \nIf you forgot password press "Ok"') && navigate('/forgotPassword');
                alert('Incorrect Old Password \nIf you forget Password, then click on "Forget Password"');
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            oldPsw: Yup.string().required('* Required'),
            newPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            confirmNewPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
        }),
        onSubmit: values => {
            console.log(values)
            handleChangePassword(values);
        }
    })

    return (
        <>
            <h1>Change Password</h1>

            <div className='form-box' style={{ width: '370px' }}>
                <form onSubmit={formik.handleSubmit}>

                    <div className='grid-box-2'>
                        <label htmlFor='oldPsw'>Old Password</label>
                        <div className='sideIcon'>
                            <input type={oldPsw ? "password" : 'text'} className='input-text' name="oldPsw" id="oldPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.oldPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {oldPsw ? <img src='hidden.png' className='toggleIcon' onClick={() => setOldPsw(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setOldPsw(true)} />}
                        </div>
                        {formik.touched.oldPsw && formik.errors.oldPsw ? (<div className='error'>{formik.errors.oldPsw}</div>) : null}
                    </div>
                    <div className='grid-box-2'>
                        <label htmlFor='newPsw'>New Password</label>
                        <div className='sideIcon'>
                            <input type={newPsw ? "password" : 'text'} className='input-text' name="newPsw" id="newPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {newPsw ? <img src='hidden.png' className='toggleIcon' onClick={() => setNewPsw(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setNewPsw(true)} />}
                        </div>
                    </div>

                    <div className='grid-box-2'>
                        <label htmlFor='confirmNewPsw'>Confirm New Password</label>
                        <div className='sideIcon'>
                            <input type={cnNewPsw ? "password" : 'text'} className='input-text' name="confirmNewPsw" id="confirmNewPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmNewPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {cnNewPsw ? <img src='hidden.png' className='toggleIcon' onClick={() => setCnNewPsw(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setCnNewPsw(true)} />}
                        </div>
                    </div>
                    {((formik.touched.newPsw && formik.errors.newPsw) || (formik.touched.confirmNewPsw && formik.errors.confirmNewPsw)) ? (formik.errors.confirmNewPsw ? <div className='error'>{formik.errors.confirmNewPsw}</div> : <div className='error'>{formik.errors.newPsw}</div>) : (formik.touched.newPsw && formik.touched.confirmNewPsw && (formik.values.newPsw != formik.values.confirmNewPsw)) ? <><div className='error'> New Password isn't Matching</div></> : null}
                    <br />
                    <div className='submitBtnDiv'>
                        <button type="submit" className='submitBtn'>Change Password</button>
                    </div>
                </form>
                <span className='link' onClick={() => navigate('/forgotPassword')}>Forgot Old Possword</span>
            </div>
        </>
    )
}

export default ChangePasword
