import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'

let initialValues = {
    oldPsw: '',
    newPsw: '',
    confirmNewPsw: '',
}

const ChangePasword = () => {
    const [oldPsw, setOldPsw] = useState(true);
    const [newPsw, setNewPsw] = useState(true);
    const [cnNewPsw, setCnNewPsw] = useState(true);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            oldPsw: Yup.string().required('* Required'),
            newPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', 'Contains atleast one Number Uppercase Lower case digit', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            confirmNewPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', 'Contains atleast one Number Uppercase Lower case digit', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
        }),
        onSubmit: values => {
            console.log(values)
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
                    <div className='submitBtnDiv'><button type='button'>Verify</button></div>
                    <div className='grid-box-2'>
                        <label htmlFor='newPsw'>New Password</label>
                        <div className='sideIcon'>
                            <input type={newPsw ? "password" : 'text'} className='input-text' name="newPsw" id="newPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {newPsw ? <img src='hidden.png' className='toggleIcon' onClick={() => setNewPsw(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setNewPsw(true)} />}
                        </div>                        
                        {/* {formik.touched.newPsw && formik.errors.newPsw ? (<div className='error'>{formik.errors.newPsw}</div>) : null} */}
                    </div>

                    <div className='grid-box-2'>
                        <label htmlFor='confirmNewPsw'>Confirm New Password</label>
                        <div className='sideIcon'>
                            <input type={cnNewPsw ? "password" : 'text'} className='input-text' name="confirmNewPsw" id="confirmNewPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmNewPsw} />
                            <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                            {cnNewPsw ? <img src='hidden.png' className='toggleIcon' onClick={() => setCnNewPsw(false)} />
                                : <img src='eye.png' className='toggleIcon' onClick={() => setCnNewPsw(true)} />}
                        </div>                        
                        {/* {formik.touched.confirmNewPsw && formik.errors.confirmNewPsw ? (<div className='error'>{formik.errors.confirmNewPsw}</div>) : null} */}
                    </div>
                    {((formik.touched.newPsw && formik.errors.newPsw) || (formik.touched.confirmNewPsw && formik.errors.confirmNewPsw)) ? (formik.errors.confirmNewPsw ? <div className='error'>{formik.errors.confirmNewPsw}</div> : <div className='error'>{formik.errors.confirmNewPsw}</div>) : (formik.touched.newPsw && formik.touched.confirmNewPsw && (formik.values.newPsw != formik.values.confirmNewPsw)) ? <><div className='error'> New Password isn't Matching</div></> : null}

                    {/* {(formik.touched.)} */}
                    <br />
                    <div className='submitBtnDiv'>
                        <button type="submit" className='submitBtn'>Change Password</button>
                    </div>
                </form>
                <span className='link'>Forgot Possword</span>
            </div>
        </>
    )
}

export default ChangePasword
