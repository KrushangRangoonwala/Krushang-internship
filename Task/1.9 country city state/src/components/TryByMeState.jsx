import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useField, useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Country from './Country'
import axios from 'axios'

const TryByMeState = () => {
    let navigate = useNavigate();
    const [states, setStates] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `states`  
    const [totalCountry, setTotalCountry] = useState([])
    let initialValues = { search: '', country: '', states: '', state_id: '' };
    let c = 0;
    let { id } = useParams('id');

    async function getStateById(id) {
        let response = await axios.get(`state/getStateId/${id}`);
        let stateData = response.data.data;
        formik.setValues({
            country: stateData.countryMasterId,
            states: stateData.name,
            state_id: stateData.id,
        })
    }
    

    async function getAllCountry() {
        let response = await axios.get('/country/get');
        let countryNames = [];
        for (let x of response.data.data) {
            countryNames.push({
                id: x.id,
                name: x.name,
            });
        }
        if (countryNames && countryNames.length > 0) {
            setTotalCountry(countryNames);
        } else {
            alert('First Add Atleast One Country');
            navigate('/country');
        }
    }

    useEffect(() => {
        getAllCountry();
        (id) && getStateById(id);
    }, [])

    async function addState(values) {
        let val = {
            countryMasterId: values.country,
            name: values.states
        }
        try {
            let response = await axios.post('/state/create', val)
            formik.setValues(initialValues)
            formik.touched.country = false;
            formik.touched.states = false;
        } catch (error) {
            console.log("error msg ", error)
        } finally {
            // getAllCountry();
        }
    }

    async function editState(values) {
        let payload = {
            countryMasterId: values.country,
            name: values.states,
        }
        try {
            let reponse = await axios.put(`/state/update/${values.state_id}`, payload);
            formik.setValues(initialValues)
            formik.touched.country = false;
            formik.touched.states = false;
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            // getAllCountry();
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            country: Yup.string().required('Required'),
            states: Yup.string().required('Required'),
            state_id: Yup.string(),
        }),
        onSubmit: values => {
            console.log("values ", values)
            if(id){
                editState(values);
                setTimeout(() => navigate('/state/view'), 300);
            }else{
                addState(values);
            }
        }
    })

    return (
        <>
            <Navbar />
            <div className='container2'>

                <form onSubmit={formik.handleSubmit}>

                    <h2><label>Country</label></h2><br />
                    <select name="country" id='country'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                    >
                        <option value='' >Select Country</option>

                        {totalCountry.map((val, index) => (
                            <option key={index} value={val.id} onClick={() => formik.setFieldValue('country', val.id) }> {val.name} </option>
                        ))}
                    </select>
                    {formik.touched.country && formik.errors.country ? <div className='error'>{formik.errors.country}</div> : ''}
 
                    <br /><br />
                    <h2><label>states</label><br /></h2>
                    <input name='states' id='states' type='text'
                        placeholder={id ? 'Update State' : 'Enter new State'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.states} />
                    {formik.touched.states && formik.errors.states ? <div className='error'>{formik.errors.states}</div> : ''}

                    <input type="text" name="state_id" id="state_id" hidden />
                    <br /><br />
                    
                    <button onClick={() => {
                        formik.setFieldValue('country','');
                        formik.setFieldValue('states','');
                    }}>Clear</button>
                    <button type="submit">{id ? 'Edit State' : 'Add States'}</button>
                </form>
            </div >
            <button onClick={() => navigate('/state/view')}>View</button>
            <br />
            <br />
        </>
    )
}

export default TryByMeState
