import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'

let initialValues = {
    email: '',
    psw: '',
}

const Signin = () => {
    const [pswFlag, setPswFlag] = useState(true);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email().required('* Required'),
            psw: Yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log(values)
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
                <span className='link'>Forgot Possword</span>
            </div>
        </>
    )
}

export default Signin
