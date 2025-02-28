import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import './Signup.css';

const Signup_gpt = () => {
    const [pswFlag, setPswFlag] = useState(true);
    const [cnpswFlag, setCnPswFlag] = useState(true);
    const [preview, setPreview] = useState(null);
    const [base64Str, setBase64Str] = useState('');

    function removePic() {
        setPreview(null);
        setBase64Str('');
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBase64Str(reader.result.split(",")[1]); // Extract Base64 part
            };
            reader.readAsDataURL(file);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            bio: '',
            password: '',
            confirmPassword: '',
            role: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('* Required')
                .max(32, 'Should be less than 32 letters')
                .matches(/^[A-Za-z\s]+$/, "Only letters allowed"),
            email: Yup.string().email('* Enter a valid email').required('* Required'),
            password: Yup.string()
                .required('* Required')
                .min(8, 'At least 8 characters')
                .matches(/[A-Z]/, "Must contain an uppercase letter")
                .matches(/[a-z]/, "Must contain a lowercase letter")
                .matches(/\d/, "Must contain a digit")
                .matches(/[!@#$%^&*(),.?":{}|]/, "Must contain a special character"),
            confirmPassword: Yup.string()
                // .oneOf([formik.values.password], "Passwords must match")
                .required('* Required'),
            role: Yup.string().required('* Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <div className="signup-container">
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h2>Sign Up</h2>

                {/* Profile Picture Upload */}
                <div className="profile-pic">
                    <label>Profile Pic</label>
                    <div className="profile-wrapper">
                        {preview ? <img src={preview} alt="Preview" className='dp' />
                            : base64Str?.length > 0 ? <img src={`data:image/*;base64,${base64Str}`} alt="Profile" className="dp" />
                                : <img src={'user.png'} alt="Profile" className="dp" />}
                        <input type="file" accept=".png, .jpg, .jpeg" id='profilePic'
                            onChange={(event) => {
                                formik.handleChange(event);
                                setPreview(URL.createObjectURL(event.currentTarget.files[0]));
                                handleFileUpload(event);
                            }}
                        />
                    </div>
                    <div className="buttons">
                        <button type='button' onClick={removePic}>Remove</button>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="input-group">
                    <input id="name" name="name" type="text" placeholder='Enter Your Name'
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                    <label htmlFor="name">Name</label>
                    {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
                </div>

                <div className="input-group">
                    <input id="email" name="email" type="text" placeholder='Enter Your Email'
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    <label htmlFor="email">Email</label>
                    {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </div>

                <div className="input-group">
                    <input id="bio" name="bio" type="text" placeholder='Enter Your Bio'
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.bio} />
                    <label htmlFor="bio">Bio</label>
                </div>

                {/* Password Fields */}
                <div className="input-group password-group">
                    <input type={pswFlag ? "password" : 'text'} name="password"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                        placeholder=" " />
                    <label>Password</label>
                    <span className="toggle-icon" onClick={() => setPswFlag(!pswFlag)}>
                        {pswFlag ? '👁️' : '🙈'}
                    </span>
                    {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
                </div>

                <div className="input-group password-group">
                    <input type={cnpswFlag ? "password" : 'text'} name="confirmPassword"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}
                        placeholder=" " />
                    <label>Confirm Password</label>
                    <span className="toggle-icon" onClick={() => setCnPswFlag(!cnpswFlag)}>
                        {cnpswFlag ? '👁️' : '🙈'}
                    </span>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup_gpt;
