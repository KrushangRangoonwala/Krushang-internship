import React, { useState, useEffect } from 'react'
// import '../App.css'
import { Formik, Form, useField, Field } from 'formik'
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
    degree: '',
    colgName: '',
    passingYear: '',
    passingMark: '',
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
    const [details, setDetails] = useState([])
    const nevigate = useNavigate();

    function deleteDetails(dg) {
        let c = 0;
        console.log(details);
        console.log(dg);
        for (let x of details) {
            console.log(x.degree);
            if (x['degree'] == dg) {
                let m = details;
                console.log("m before ", m)
                m.splice(c, 1);
                console.log("m after ", m);

                setDetails(details => m);
                console.log("details ", details)
            } else {
                c++;
            }
        }
    }


    function nextPage() {
        if (details.length == 0) {
            alert("You should include atleast your last Qulification's details");
        } else {
            localStorage.setItem('educational_details', JSON.stringify(details));
            console.log(details);
            nevigate('/preview');
        }
    }

    function previousPage() {
        let d = JSON.parse(localStorage.getItem('educational_details'));
        (d != details) ? localStorage.setItem('educational_details', JSON.stringify(details)) : '';
        nevigate('/family_details');
    }

    function onload() {
        let d = JSON.parse(localStorage.getItem('educational_details'));
        (d) ? setDetails(d) : '';
    }

    function checkUnique(field, value) {
        if (details.length > 0) {
            console.log('uniqe')
            for (let y of details) {
                if (y[field] == value) {
                    console.log("y[field] ", y[field]);
                    console.log("value ", value)
                    return false;
                }
            }
        }
        return true;
    }

    useEffect(() => {
        onload();
    }, []);

    let dg = ['Secondary', 'Higher secondary', 'Bachelor', 'Master', 'Phd']

    return (
        <div style={{ margin: '2vh 5vw', width: '400px' }}>
            <button id='addBtn' onClick={showForm}>+ Add Details</button>
            {/* <br /><br /> */}
            <div id='form' style={{ display: 'none' }}>
                <Formik
                    initialValues={obj}    // should not use `{{obj}}`
                    validationSchema={Yup.object({
                        degree: Yup.string().required('Required').test('checkUnique', 'choose diffrent Qualification', function (value) { return checkUnique('degree', value) }),
                        colgName: Yup.string().required('Required'),
                        passingYear: Yup.date(),
                        passingMark: Yup.number().required('Required').max(10, 'Enter correct mark'),
                    })}
                    onSubmit={(values => {
                        console.log(values);
                        // console.log(typeof details);
                        // console.log(details);
                        // let mem = details.push(values)  // error : details.push is not function
                        // console.log('type of details ', typeof details);


                        setDetails(old_details => [...old_details, values]);
                        console.log(details);
                        showAddBtn();
                        document.getElementById('container').reset();
                    })}

                >
                    {formik =>
                        <Form id='container' className='container'>

                            <label>Degree</label>
                            <Field name="degree" component="select">
                                <option value=''>select degree</option>
                                <option value='Secondary'>Secondary</option>
                                <option value='Higher secondary'>Higher Secondary</option>
                                <option value='Bachelor'>Bachelor</option>
                                <option value='Master'>Master</option>
                                <option value='Phd'>Phd</option>
                            </Field>
                            {formik.touched.degree && formik.errors.degree ? <><p></p><div className='error'>{formik.errors.degree}</div></> : ''}

                            <InputText label='College Name' type='text' name='colgName' id='colgName' placeholder='Enter College name' />
                            {formik.touched.colgName && formik.errors.colgName ? <><p></p><div className='error'>{formik.errors.colgName}</div></> : ''}

                            <InputText label='Passing Year' type='month' name='passingYear' id='passingYear' />
                            {formik.touched.passingYear && formik.errors.passingYear ? <><p></p><div className='error'>{formik.errors.passingYear}</div></> : ''}

                            <InputText label='Passing Marks' name='passingMark' id='passingMark' />
                            {formik.touched.passingMark && formik.errors.passingMark ? <><p></p><div className='error'>{formik.errors.passingMark}</div></> : ''}

                            <button type='submit'>Done</button>
                            {/* </div> */}
                        </Form>
                    }
                </Formik>
                <br />
                <button onClick={showAddBtn}>Cancel</button>
            </div>
            <br />
            <br />

            {/* <table className='table'> */}
            <table className='table table-striped' style={{ width: '40vw' }}>
                <tbody>
                    <tr>
                        <th>Qualification</th>
                        <th>Institute Name</th>
                        <th>Passout Year</th>
                        <th>Passout Marks</th>
                        <th></th>
                    </tr>

                    {details.length > 0 && details.map((value, index) =>
                        <tr key={index}>
                            <td>{value.degree}</td>
                            <td>{value.colgName}</td>
                            <td>{value.passingYear}</td>
                            <td>{value.passingMark}</td>
                            <td><button onClick={() => deleteDetails(value.degree)}>Delete</button></td>
                        </tr>
                    )}

                </tbody>
            </table>

            <button onClick={previousPage}>Previous</button>
            <button onClick={nextPage}>Show Preview</button>
        </div>
    )
}

export default Family_details

// why i cannot get 