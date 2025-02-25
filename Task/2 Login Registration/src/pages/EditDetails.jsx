import React, { useEffect, useState } from 'react'
import { Field, useFormik } from 'formik'
import * as Yup from 'yup'
import './style.css'
import "../components/usercard.css";
import VerifyEmail from '../components/VerifyEmail'
import axios from 'axios'
import Loading from '../components/Loading'
import { NavLink, useLocation, useNavigate } from 'react-router'

const EditDetails = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const [user, setUser] = useState({});
    const [initialValues, setInitialValues] = useState({})
    const [preview, setPreview] = useState(null)
    const [base64Str, setBase64Str] = useState('')
    const [showDp, setShowDp] = useState(false)

    useEffect(() => {
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

        console.log('clg ', location.state?.user)
        setUser(location.state?.user);
        let userData = {
            // profilePic: user?.image, // gives error ,it should be null because its type is file
            profilePic: '',
            firstName: location.state?.user.firstName,
            lastName: location.state?.user.lastName,
            email: location.state?.user.emailId,
            cNo: location.state?.user.contactNo,
            dob: location.state?.user.birthDate?.slice(0, 10),  // 2025-02-02T00:00:00
            gender: location.state?.user.gender,
        }
        setBase64Str(location.state?.user.image);
        formik.setValues(userData);
        console.log("userData ", userData);
        userData.gender == 'M' ? document.getElementById('male').checked = true : userData.gender == 'F' ? document.getElementById('female').checked = true : null;
    }, [])

    useEffect(() => {
        setUser(prevState => ({ ...prevState, image: base64Str }))
    }, [base64Str]);

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

    async function editUser(values) {
        try {
            let response = await axios.put(`/edit/${location.state.user.id}`, {
                "firstName": values.firstName,
                "lastName": values.lastName,
                "contactNo": `${values.cNo}`,
                "birthDate": values.dob,
                "gender": values.gender,
                "image": base64Str
            });
            if (response.data.message == "user not found") {
                alert('User not found')
            } else {
                alert('Your data edited successfully');
            }
            navigate(-1);

        } catch (err) {
            console.log(err);
        }
    }

    function Upper1stChar(str) {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            // profilePic: Yup.mixed().test("fileSize", "File size should be less than 2MB", (value) => {return value && value.size <= 2 * 1024 * 1024}),  // error: submit btn not working because of ` .test() `
            profilePic: Yup.mixed(),
            firstName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            lastName: Yup.string().required('* Required').max(15, 'should be less then 15 letters').matches(/^[a-zA-z]+$/, "Should only contains letters"),
            email: Yup.string().email('* Enter valid email').required('* Required'),
            cNo: Yup.number().required('* Required').min(5999999999, '* Enter valid Contact No').max(9999999999, '* Should be of 10-digit'),
            dob: Yup.date().required('* Required'),
            gender: Yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log(values);
            editUser(values);
        }
    })
    return (
        <>
            <h1>Edit Details</h1>
            <div className='form-box'>
                <form onSubmit={formik.handleSubmit}>
                    <label> Profile Pic
                        {(preview) ? <img src={preview} alt="Preview" className='dp' />
                            : (base64Str?.length > 0) ?
                                <img src={`data:image/*;base64,${base64Str}`} alt="Profile" className="dp" onClick={() => setShowDp(true)} />
                                : <img src={'user (1).png'} alt="Profile" className="dp" />}

                        <input type="file" accept=".png, .jpg, .jpeg" id='profilePic' name='profilePic' onBlur={formik.handleBlur}
                            onChange={(event) => {
                                formik.handleChange(event);
                                setPreview(URL.createObjectURL(event.currentTarget.files[0]));
                                handleFileUpoad(event);
                            }} value={formik.values.profilePic}
                        /></label>
                    <button type='button' onClick={cancelUpload} style={{ marginRight: '10px' }}>Cancel Upload</button>
                    <button type='button' onClick={removePic}>Remove pic</button>

                    {showDp && <div className="popup-overlay" onClick={() => setShowDp(false)}>
                        <img src={`data:image/*;base64,${base64Str}`} alt="Full Profile" className="popup-image" />
                    </div>}

                    {/* <img src={formik.values.profilePic ? formik.values.profilePic.name : null} id='dp' alt='Noitheg' style={{ display: 'none' }} />  // cannot run because formik.values.profilePic will always null value*/}

                    <br />
                    <br />
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
                                onBlur={formik.handleBlur} value={formik.values.email} disabled />

                            {/* {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null} */}
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
                        </div>
                    </div>

                    <div className='submitBtnDiv'>
                        <button type='button' className='submitBtn' onClick={() => navigate(-1)} style={{ marginRight: '20px' }}>Cancel</button>
                        <button type="submit" className='submitBtn'> Save Changes </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default EditDetails
