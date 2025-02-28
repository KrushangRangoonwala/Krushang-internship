// this my sinup.jsx file give style and animation in it and give css code
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import './signup.css'


const Signup = () => {
    const [pswFlag, setPswFlag] = useState(true);
    const [cnpswFlag, setCnPswFlag] = useState(true);
    const [preview, setPreview] = useState(null);
    const [base64Str, setBase64Str] = useState('');

    function removePic() {
        setPreview(null);
        setBase64Str('')
    }

    function cancelUpload() {
        setPreview(null);
        base64Str != '' && setBase64Str(location.state?.user.image)
    }

    function handleFileUpoad(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; // Extract Base64 part
                console.log("Base64:", base64String);
                setBase64Str(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            bio: '',
            profilepicture: '',
            password: '',
            confirmPassword: '',
            role: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('* Required').max(32, 'should be less then 32 letters').matches(/^[A-Za-z\s]+$/, "Should only contains letters"),
            email: Yup.string().email('* Enter valid email').required('* Required'),
            bio: Yup.string(),
            profilepicture: Yup.mixed(),
            psw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            confirmPsw: Yup.string().required('* Required').min(8, 'more then 8 character').test('unique', '* Should Contains Atleast one Uppercase, Lowercase, Digit, Special Character ', (value) => /[!@#$%^&*(),.?":{}|]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)),
            role: Yup.string().required('* Required'),
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
                            <label> Profile Pic
                                {(preview) ? <img src={preview} alt="Preview" className='dp' />
                                    : (base64Str?.length > 0) ?
                                        <img src={`data:image/*;base64,${base64Str}`} alt="Profile" className="dp" onClick={() => setShowDp(true)} />
                                        : <img src={'user.png'} alt="Profile" className="dp" />}

                                <input type="file" accept=".png, .jpg, .jpeg" id='profilePic' name='profilePic' onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                        setPreview(URL.createObjectURL(event.currentTarget.files[0]));
                                        handleFileUpoad(event);
                                    }} value={formik.values.profilePic}
                                />
                            </label>
                            <button type='button' onClick={cancelUpload} style={{ marginRight: '10px' }}>Cancel Upload</button>
                            <button type='button' onClick={removePic}>Remove pic</button>
                        </div>

                        <input className='input-text' id="name" name="name" type="text" placeholder='Enter Your Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                        {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}

                        <input className='input-text' id="email" name="email" type="text" placeholder='Enter Your emai' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}

                        <input className='input-text' id="bio" name="bio" type="text" placeholder='Enter Your Bio' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.bio} />
                        {formik.touched.bio && formik.errors.bio ? (<div>{formik.errors.bio}</div>) : null}


                        {/* <div className=''> */}
                            {/* <label htmlFor='psw'>Password</label><br /> */}

                            <div className='sideIcon'>
                                <input type={pswFlag ? "password" : 'text'} placeholder='Enter Password' className='input-text' name="psw" id="psw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.psw} />
                                <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                                {pswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setPswFlag(false)} />
                                    : <img src='eye.png' className='toggleIcon' onClick={() => setPswFlag(true)} />}
                            </div>
                            {formik.touched.psw && formik.errors.psw ? (<div className='error'>{formik.errors.psw}</div>) : null}

                            <div className='sideIcon'>
                                <input type={cnpswFlag ? "password" : 'text'} placeholder='COnfirm Password'className='input-text' name="confirmPsw" id="confirmPsw" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPsw} />
                                <img src='Screenshot 2025-02-20 095142.png' className='toggleIcon' />
                                {cnpswFlag ? <img src='hidden.png' className='toggleIcon' onClick={() => setCnPswFlag(false)} />
                                    : <img src='eye.png' className='toggleIcon' onClick={() => setCnPswFlag(true)} />}
                            </div>
                            {formik.touched.confirmPsw && formik.errors.confirmPsw ? (formik.touched.psw && formik.errors.psw) ? (<div className='error'>{formik.errors.confirmPsw}</div>) : (<><div></div><div className='error'>{formik.errors.confirmPsw}</div></>) : null}


                            {(formik.touched.psw && formik.touched.confirmPsw && !formik.errors.confirmPsw && !formik.errors.psw && (formik.values.psw != formik.values.confirmPsw)) ? <><div className='error'> Password isn't Matching</div></> : null}
                            {/* {(formik.errors.psw == 'specil character error' && <p>specil character error</p>)} */}
                        {/* </div> */}

                        <input className='input-text' id="role" name="role" type="text" placeholder='User' disabled onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} />
                        {formik.touched.role && formik.errors.role ? (<div>{formik.errors.role}</div>) : null}
                    </div>
                    <br/>
                    <br/>
                    <button type='submit' > SignUp </button>
                </form>
            </div>
        </>
    )
}

export default Signup
