import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useField, useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Country from './Country'
import axios from 'axios'

const City = () => {
    let navigate = useNavigate();
    const [states, setStates] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `states`  
    const [totalCountry, setTotalCountry] = useState([])
    const [totalState, setTotalState] = useState([])
    let initialValues = { country: '', states: '', city: '', city_id: '' };
    let c = 0;
    let { id } = useParams('id');

    async function setStateByCountry(country_id) {
        if (country_id == '') {
            getAllState();
            document.getElementById('states').disabled = true;
        } else {
            console.log('country_id ', country_id)
            let response = await axios.get(`state/get/${country_id}`);
            // await console.log('totalState ',totalState)
            console.log(response.data)
            setTotalState(response.data.data.state_masters)
            document.getElementById('states').disabled = false;
        }
    }

    async function getCityById(id) {
        let response = await axios.get(`city/getCityId/${id}`);
        let cityData = response.data.data;

        response = await axios.get(`/state/getStateId/${cityData.stateMasterId}`)
        let country_id = response.data.data.countryMasterId;
        setStateByCountry(country_id);

        formik.setValues({
            country: country_id,
            states: cityData.stateMasterId,
            city_id: cityData.id,
            city: cityData.name,
        })
        document.getElementById('states').disabled = false;
        document.getElementById('city').disabled = false;

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

    async function getAllState() {
        let response = await axios.get('/state/get');
        let stateNames = [];
        for (let x of response.data.data) {
            stateNames.push({
                id: x.id,
                name: x.name,
            });
        }
        if (stateNames && stateNames.length > 0) {
            setTotalState(stateNames);
        } else {
            alert('First Add Atleast One State');
            navigate('/country');
        }
    }

    useEffect(() => {
        getAllCountry();
        (id) && getCityById(id);
    }, [])

    async function addCity(values) {
        let val = {
            stateMasterId: values.states,
            name: values.city
        }
        console.log(val);
        try {
            let response = await axios.post('/city/create', val)
            formik.setValues(initialValues)
            formik.touched.country = false;
            formik.touched.states = false;
            formik.touched.city = false;
        } catch (error) {
            console.log("error msg ", error)
        } finally {
            getAllState();
        }
    }

    async function editCity(values) {
        let payload = {
            stateMasterId: values.states,
            name: values.city,
        }
        try {
            let reponse = await axios.put(`/city/update/${values.city_id}`, payload);
            formik.setValues(initialValues)
            formik.touched.country = false;
            formik.touched.states = false;
            formik.touched.city = false;
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllCountry();
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            country: Yup.string().required('Required'),
            states: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            city_id: Yup.string(),
        }),
        onSubmit: values => {
            console.log("values ", values);
            if (id) {
                editCity(values);
                setTimeout(() => navigate('/city/view'), 300);
            } else {
                addCity(values);
            }
        }
    })

    // useEffect(() => ,[formik.values.country]);

    return (
        <>
            <Navbar />
            <div className='container2'>

                <form onSubmit={formik.handleSubmit}>

                    <h2><label>Country</label></h2><br />
                    <select name="country" id='country'
                        onChange={(e) => {
                            formik.handleChange(e);
                            console.log('val.id ', e.target.value);
                            formik.setFieldValue('country', e.target.value);
                            setStateByCountry(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                    >
                        <option value='' >Select Country</option>

                        {totalCountry.map((val, index) => (
                            <option key={index} value={val.id}> {val.name} </option>  // onClick is not workin in option
                        ))}
                    </select>
                    {/* <select name="country" id='country'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                    >
                        <option value='' >Select Country</option>

                        {totalCountry.map((val, index) => (
                            <option key={index} value={val.id} onClick={() => {  // onClick is not working
                                console.log('val.id ',val.id);
                                formik.setFieldValue('country', val.id);
                                setStateByCountry(val.id);
                              } }> {val.name} </option>
                        ))}
                    </select> */}
                    {formik.touched.country && formik.errors.country ? <div className='error'>{formik.errors.country}</div> : ''}

                    <h2><label>State</label></h2><br />
                    <select name="states" id='states'
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue('states', e.target.value)
                            e.target.value == '' ? document.getElementById('city').disabled = true : document.getElementById('city').disabled = false;
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.states}
                    disabled>
                        <option value='' >Select State</option>

                        {totalState.map((val, index) => (
                            <option key={index} value={val.id} > {val.name} </option>
                        ))}
                    </select>
                    {formik.touched.states && formik.errors.states ? <div className='error'>{formik.errors.states}</div> : ''}

                    <br /><br />
                    <h2><label>City</label><br /></h2>
                    <input name='city' id='city' type='text'
                        placeholder={id ? 'Update State' : 'Enter new City'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city} disabled/>
                    {formik.touched.city && formik.errors.city ? <div className='error'>{formik.errors.city}</div> : ''}

                    <input type="text" name="city_id" id="city_id" hidden />
                    <br /><br />

                    <button onClick={() => {
                        formik.setFieldValue('country', '');
                        formik.setFieldValue('states', '');
                    }}>Clear</button>
                    <button type="submit">{id ? 'Edit City' : 'Add City'}</button>
                </form>
            </div >
            <button onClick={() => navigate('/city/view')}>View</button>
            <br />
            <br />
        </>
    )
}

export default City
