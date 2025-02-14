import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import '../App.css'
import './style.css'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const name = props.id || props.name;

    return <>
        <label htmlFor={name}>{label}</label>
        <input className='' {...field} {...props} />
    </>
}

// let obj = {
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     userName: '',
//     email: '',
//     contactNo: undefined, // should not null ,error : `value` prop on `input` should not be null.
//     dob: undefined, // should not null
//     dept: '',
//     gender: ''
// }

const Employee_details = () => {
    const nevigate = useNavigate();
    let e;
    const initialValue ={
        firstName: '',
        middleName: '',
        lastName: '',
        userName: '',
        email: '',
        contactNo: '', // should not null ,error : `value` prop on `input` should not be null.
        dob: '', // should not null
        dept: '',
        gender: ''
    }

    // function onload() {
    //     let e = JSON.parse(localStorage.getItem('employee_details'));
    //     if (e) {
    //         // setInitialValue(prevState => ({
    //         //     ...prevState,
    //         //     ...e 
    //         // }));

    //         for (let x in e) {
    //             switch (x) {
    //                 case 'gender':
    //                     console.log(e[x]);
    //                     e[x] == 'male' ? document.getElementById(e[x]).checked = true : document.getElementById(e[x]).checked = true;
    //                     break;
    //                 default:
    //                     // console.log("before ",document.getElementById(x).value);
    //                     document.getElementById(x).value = e[x];
    //                     // console.log("after ",document.getElementById(x).value);
    //                     // setInitialValue(previousState => ({  // is it set for initialValue ?
    //                     //     ...previousState,
    //                     //     x : e[x],   
    //                     // })); 
    //                     break;
    //             }
    //         }
    //         console.log('initialValue ', initialValue);  // i have locaStorage this : {firstName: "gfdgdgdfg", middleName: "sdfsdf", lastName: "Rangoonwala", userName: "sdfsdf",…} , this statement gives me this why "{firstName: '', middleName: '', lastName: '', userName: '', email: '', …}  "
    //     }
    // }
   
    // useEffect(() => {
    //     // let e = JSON.parse(localStorage.getItem('employee_details'))
    //     // // console.log(typeof e)
    //     // if (e) {
    //     //     console.log(e);
    //     //     setInitialValue(previousState => ({
    //     //         ...previousState,
    //     //         e,
    //     //     }));
    //     //     console.log('sdfs ',initialValue);
    //     //     console.log('onload..')
    //     // }
    //     // onload();
        
    // }, []);


    let f = true;
    
    // document.getElementById('firstName').addEventListener('change',function(){
    //     console.log('handle')
    //     formik.handleChange();
    // })
    // let d = new Date();
    // console.log("d  ",d.getFullYear());
   
    let dt = new Date(new Date() - (3600 * 24 * 365 * 1000 * 18));
    let curDate = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
    console.log("DOB should be more than  ",curDate)

    return (
        <div style={{ margin: '2vh 5vw', width: '430px' }}>
            <Formik
                initialValues={initialValue}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('Required').max(15, 'should be under 15 characters').matches(/^[a-z]+$/i, { message: 'only contain letters, no space/ digit/ symbols ' }),
                    middleName: Yup.string().required('Required').max(15, 'should be under 15 characters').matches(/^[a-zA-z]+$/, { message: 'Should only contain letters' }),
                    lastName: Yup.string().required('Required').max(15, 'should be under 15 characters').matches(/^[a-zA-z]+$/, { message: 'Should only contain letters' }),
                    // userName: Yup.string().required('Required').max(35, 'should be under 35 characters'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    contactNo: Yup.number().required('Required').min(5999999999, 'Invalid Contact no.').max(9999999999, 'Invalid Contact no.'),
                    // dob: Yup.date().required('Required').min('2025-01-01', "ytou should be 18+"),
                    dob: Yup.date().required('Required').max(curDate, "you should be 18+"),
                    // dob: Yup.date().required('Required').min(new Date(new Date() - (3600*24*365*1000*18)), 'Your age should be more than 18years' ),
                    dept: Yup.string().required('Required'),
                    gender: Yup.string().required('Required')
                })}
                onSubmit={(values => {
                    values.userName = values.firstName + "_" + values.lastName;
                    console.log(values);
                    localStorage.setItem('employee_details', JSON.stringify(values));
                    nevigate('/family_details');
                })}
            >

                {(formik) => (
                    
                    <Form id='container' className='container'>
                        
                        {/* {e = JSON.parse(localStorage.getItem('employee_details'))}
                        {f && e && formik.setValues(e)}
                        {f=false} --> this 3 line code gives error*/}  

                        {useEffect(() => {
                            e = JSON.parse(localStorage.getItem('employee_details'))
                            e && formik.setValues(e)
                        }, [])}

                        <InputText label='First Name' type='text' name='firstName' id='firstName'  placeholder='Enter First name' />
                        {formik.touched.firstName && formik.errors.firstName ? <><p></p><div className='error'>{formik.errors.firstName}</div></> : ''}

                        <InputText label='Middle Name' type='text' name='middleName' id='middleName'  placeholder='Enter Middle name' />
                        {formik.touched.middleName && formik.errors.middleName ? <><p></p><div className='error'>{formik.errors.middleName}</div></> : ''}

                        <InputText label='Last Name' type='text' name='lastName' id='lastName'  placeholder='Enter Last name' />
                        {formik.touched.lastName && formik.errors.lastName ? <><p></p><div className='error'>{formik.errors.lastName}</div></> : ''}

                        <InputText label='User Name' type='text' name='userName' id='userName'  placeholder='Will create by us' data-toggle="tooltip" data-placement="top" title="Your Username will be generated by us using your First Name and Last Name" readOnly />
                        {/* {formik.touched.userName && formik.errors.userName ? <><p></p><div className='error'>{formik.errors.userName}</div></> : ''} */}

                        <InputText label='email' type='email' name='email' id='email'  placeholder='abc@gmail.com' />
                        {formik.touched.email && formik.errors.email ? <><p></p><div className='error'>{formik.errors.email}</div></> : ''}

                        <InputText label='Contact No.' name='contactNo' id='contactNo'  placeholder='9898989898' />
                        {formik.touched.contactNo && formik.errors.contactNo ? <><p></p><div className='error'>{formik.errors.contactNo}</div></> : ''}


                        <InputText label='Birth Date' type='date' name='dob' id='dob'  />
                        {formik.touched.dob && formik.errors.dob ? <><p></p><div className='error'>{formik.errors.dob}</div></> : ''}

                        {/* <label htmlFor='dob'>Birth Date</label>
                            <input type="date" name="dob" id="dob" /> */}

                        <InputText label='Department' name='dept' id='dept'  placeholder='Frontend' />
                        {formik.touched.dept && formik.errors.dept ? <><p></p><div className='error'>{formik.errors.dept}</div></> : ''}

                        <label>Gender</label>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label><Field type='radio' name='gender' id='male' value='male' /> Male</label></td>
                                    <td><label><Field type='radio' name='gender' id='female' value='female' /> Female</label></td>
                                </tr>
                            </tbody>
                        </table>
                        {formik.touched.gender && formik.errors.gender ? <><p></p><div className='error'>{formik.errors.gender}</div></> : ''}

                        <button type='submit'>Next</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Employee_details


// how to access `values` outside <formik>
