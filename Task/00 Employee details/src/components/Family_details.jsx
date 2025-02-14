import React, { useState, useEffect } from 'react'
// import '../App.css'
import { Formik, Form, useField, Field, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const name = props.id || props.name;

    return <>
        <label htmlFor={name}>{label}</label>
        <input className='' {...field} {...props} />
    </>
}



let obj = {
    relation: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '', // should not null ,error : `value` prop on `input` should not be null.
}

function showForm() {
    document.getElementById('form').style.display = 'block';
    document.getElementById('addBtn').style.visibility = 'hidden';
}

function showAddBtn() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('addBtn').style.visibility = 'visible';
}

const Family_details = () => {
    const [member, setMember] = useState([])
    // useStates
    const nevigate = useNavigate();
    // console.log(useFormikContext)
    // const { setValues } = useFormikContext();
    // console.log(setValues)

    function findMember(email) {
        let c = 0;
        for (let x in member) {
            console.log("x['email'] ", x['email'], "x['email']==email ", x.email == email);
            if (x['email'] == email) {
                return c;
            } else {
                c++;
            }
        }
    }

    function deleteMember(email) {
        let m = member;
        let c = findMember(email);
        m.splice(c, 1);
        setMember(member => m);     // setMember(member => member.splice(c, 1)); NOT WORKING    
        console.log("member ", member)
    }

    // const UpdateMember = () => {
    //     console.log('inside updateMember')  
    //     const { setValues } = useFormikContext();
    //     setValues(member[c])
    //     return null;
    // } 
    
    function editMember(email) {
        // const { setValues } = useFormikContext();
        // console.log("setValues ",setValues);
        let c = findMember(email);
        setValues(member[c])
        // <UpdateMember/>  //not working 
        showForm();
    }

    function nextPage() {
        if (member.length == 0) {
            alert("You should include atleast one family member's details.");
        } else {
            localStorage.setItem('family_details', JSON.stringify(member));
            nevigate('/educational_details');
        }
    }

    function previousPage() {
        let f = JSON.parse(localStorage.getItem('family_details'));
        (f != member) ? localStorage.setItem('family_details', JSON.stringify(member)) : '';
        nevigate('/');
    }

    function onload() {
        let f = JSON.parse(localStorage.getItem('family_details'));
        (f) ? setMember(f) : '';
    }

    function checkUnique(field, value) {
        if (value != 'brother' && value != 'sister') {
            if (member.length > 0) {
                console.log('uniqe')
                for (let y of member) {
                    if (y[field] == value) {
                        console.log("y[field] ", y[field]);
                        console.log("value ", value)
                        return false;
                    }
                }
            }
        }
        return true;
    }

    useEffect(() => {
        onload();
    }, []);

    return (
        <div style={{ margin: '2vh 5vw', width: '400px' }}>
            <button id='addBtn' onClick={showForm}>+ Add Member</button>
            {/* <br /><br /> */}
            <div id='form' style={{ display: 'none' }}>
                <Formik
                    initialValues={obj}
                    validationSchema={Yup.object({
                        relation: Yup.string().required('Required').test('checkUnique', 'Cannot take same relation multiple times', function (value) { return checkUnique('relation', value) }),
                        // relation: Yup.string().required('Required').test('checkUnique', 'Cannot take same relation multiple times', (value) => value != 'father'),
                        firstName: Yup.string().required('Required').max(15, 'should be under 15 characters'),
                        lastName: Yup.string().required('Required').max(15, 'should be under 15 characters'),
                        email: Yup.string().email('Invalid email address').required('Required').test('checkUnique', 'Cannot take same email multiple times', function (value) { return checkUnique('email', value) }),
                        contactNo: Yup.number().required('Required').min(5999999999, 'Invalid Contact no.').max(9999999999, 'Invalid Contact no.').test('checkUnique', 'Cannot take same Concat no. multiple times', function (value) { return checkUnique('contactNo', value) }),
                    })}
                    onSubmit={(values => {
                        // console.log(values);
                        // console.log(typeof member);
                        // console.log(member);
                        // let mem = member.push(values)  // error : member.push is not function
                        // console.log('type of member ', typeof member);

                        // if (member.length > 0) {
                        //     for (let x in values) {
                        //         for (let y of member) {
                        //             if (y[x] == values[x])
                        //     }
                        //     }
                        // }
                        setMember(old_member => [...old_member, values]);
                        console.log(member);
                        showAddBtn();
                        document.getElementById('container').reset();
                    })}

                >
                    {formik => (

                        <Form id='container' className='container'>
                            {/* <div id='container'> */}
                            <label>Relation</label>
                            <Field name="relation" component="select">
                                <option value=''>select relation</option>
                                <option value='father'>Father</option>
                                <option value='mother'>Mother</option>
                                <option value='sister'>Sister</option>
                                <option value='brother'>Brother</option>
                                <option value='wife'>Wife</option>
                            </Field>
                            {formik.touched.relation && formik.errors.relation ? <><p></p><div className='error'>{formik.errors.relation}</div></> : ''}

                            <InputText label='First Name' type='text' name='firstName' id='firstName' placeholder='Enter First name' />
                            {formik.touched.firstName && formik.errors.firstName ? <><p></p><div className='error'>{formik.errors.firstName}</div></> : ''}

                            <InputText label='Last Name' type='text' name='lastName' id='lastName' placeholder='Enter Last name' />
                            {formik.touched.lastName && formik.errors.lastName ? <><p></p><div className='error'>{formik.errors.lastName}</div></> : ''}

                            <InputText label='email' type='email' name='email' id='email' placeholder='abc@gmail.com' />
                            {formik.touched.email && formik.errors.email ? <><p></p><div className='error'>{formik.errors.email}</div></> : ''}

                            <InputText label='Contact No.' name='contactNo' id='contactNo' placeholder='9898989898' />
                            {formik.touched.contactNo && formik.errors.contactNo ? <><p></p><div className='error'>{formik.errors.contactNo}</div></> : ''}

                            <button type='submit'>Done</button>
                            {/* </div> */}
                        </Form>
                    )}
                </Formik>
                <button onClick={showAddBtn}>Cancel</button>
            </div>
            <br />
            <br />

            <table className='table table-striped' style={{ width: '40vw' }}>
                <tbody>
                    <tr>
                        <th>Relation</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact No.</th>
                        <th></th>
                        <th></th>
                    </tr>


                    {member.length > 0 && member.map((value, index) =>       // error solveby : 'member.length > 0 &&'
                        <tr key={index}>
                            <td>{value.relation}</td>
                            <td>{value.firstName}</td>
                            <td>{value.lastName}</td>
                            <td>{value.email}</td>
                            <td>{value.contactNo}</td>
                            <td><button onClick={() => deleteMember(value.email)}>Delete</button></td>
                            <td><button onClick={() => editMember(value.email)}>Edit</button></td>
                        </tr>
                    )}

                </tbody>
            </table>

            <button onClick={previousPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
        </div>
    )
}

export default Family_details

