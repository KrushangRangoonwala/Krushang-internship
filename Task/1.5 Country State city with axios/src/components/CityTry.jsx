import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useField, useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Country from './Country'
import axios from 'axios'

// 
// component name should be start with capital letters ''
// axios.defaults.baseURL = 'http://192.168.1.56:3000/'

const CityTry = () => {
    let navigate = useNavigate();
    const [states, setStates] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `states`  
    const [search, setSearch] = useState('')
    const [shownCountry, setShownCountry] = useState([])
    const [totalCountry, setTotalCountry] = useState([])
    const [country_name, setCountry_name] = useState('')
    const [toggle, setToggle] = useState(false);
    const [shownStates, setShownStates] = useState([])

    const [initialValues, setInitialValues] = useState({ search: '', country_id: '', states: '', state_id: '' })
    let c = 0;

    function selectCountry(i) {
        document.getElementById('country_id').style.visibility = 'hidden';
        setCountry_name(shownCountry[i].name);
        stateByCountry(shownCountry[i].id);
    }

    async function stateByCountry(country_id) {         // ********************** working on this
        let response = await axios.get(`city/get/${country_id}`);
        setStates(response.data.data.city_masters)
    }

    async function getAllCountryState() {
        let response = await axios.get('/state/get');
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
            alert('First Enter Atleast One Country');
            navigate('/country');
        }

        // for state :
        response = await axios.get('/city/get');
        let statesNames = response.data.data;
        (statesNames && statesNames.length > 0) && setStates(statesNames);
    }

    useEffect(() => {
        getAllCountryState()
    }, [])

    useEffect(() => {
        document.getElementById('country_id').style.visibility = 'visible';
        let temp = [];
        let searchPettern = new RegExp(search, 'i');
        temp = totalCountry.filter((val) => searchPettern.test(val.name));
        if (temp.length > 0 || search.length > 0) {
            setShownCountry(shownCountry => temp);
        }
    }, [search]);

    async function addState(country_id, state_name) {
        let val = {
            stateMasterId: country_id,
            name: state_name
        }
        try {
            let response = await axios.post('/city/create', val)
            formik.setValues(initialValues)
            formik.touched.search = false;
            formik.touched.states = false;
        } catch (error) {
            console.log("error msg ", error)
        } finally {
            getAllCountryState();
        }
    }

    async function editState(values) {
        let payload = {
            stateMasterId: values.country_id,
            name: values.states,
        }
        try {
            let reponse = await axios.put(`/city/update/${values.state_id}`, payload);
            formik.setValues(initialValues)
            formik.touched.search = false;
            formik.touched.states = false;
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllCountryState();
        }
    }

    async function deleteState(id) {
        try {
            let response = await axios.delete(`/city/delete/${id}`)
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllCountryState();
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            search: Yup.string().required('Required'),
            country_id: Yup.string(),
            states: Yup.string().required('Required'),
            state_id: Yup.string(),
        }),
        onSubmit: values => {
            console.log("values ", values)
            console.log('toggle ', toggle)
            toggle ? editState(values) : addState(values.country_id, values.states);
            setToggle(false);
        }
    })

    return (
        <>
            <Navbar />
            <div className='container2'>

                <form onSubmit={formik.handleSubmit}>

                    <h2><label>State</label></h2><br />
                    <input name='search' id='search' type='text' placeholder='search your state' onChange={(e) => {
                        formik.handleChange(e)
                        setSearch(e.target.value)
                    }} onBlur={formik.handleBlur} value={formik.values.search} />

                    <select name="country_id" id='country_id' size='4'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country_id}
                    >
                        <option value='' onClick={async () => {  //async await neccessary
                            await getAllCountryState();    // must execute 1st
                            await setCountry_name('');      // must execute next , if u run this first then `{(country_name.length > 0) ?` this line run 1st and in 'setStates' we have all previous country's state
                        }}>Select Country</option>

                        {shownCountry.map((val, index) => (
                            <option key={index} value={val.id} onClick={() => {
                                formik.setFieldValue('search', val.name);
                                formik.setFieldValue('country_id', val.id);   // *********
                                selectCountry(index);
                            }}> {val.name} </option>
                        ))}
                    </select>
                    {formik.touched.search && formik.errors.search ? <div className='error'>{formik.errors.search}</div> : ''}

                    <br /><br />
                    <h2><label>City</label><br /></h2>
                    <input name='states' id='states' type='text' placeholder='Enter new City' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.states} />
                    {formik.touched.states && formik.errors.states ? <div className='error'>{formik.errors.states}</div> : ''}

                    <input type="text" name="state_id" id="state_id" hidden />
                    <br /><br />
                    <button type="submit">{toggle ? 'Edit City' : 'Add City'}</button>
                </form>

            </div >
            <br />

            <div className='btnnn'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/states')}>Next</button>
            </div>
            <br />
            <br />

            {(country_name.length > 0) ?
                <div style={{ margin: ' 0vw 20vw' }}>
                    <h3 >States of {country_name}</h3>
                    <table className='table table-striped' >
                        <tbody>
                            <tr>
                                <th>Sr no.</th>
                                <th>City Name</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>

                            {states.map((value, index) =>
                                <tr key={index}>
                                    <th>{++c}</th>
                                    <th>{value.name}</th>

                                    <th><button onClick={() => navigate(`/city/${value.id}`)}>View</button></th>

                                    <th><button onClick={() => {
                                        setToggle(true);
                                        formik.setValues({
                                            search: country_name,
                                            country_id: value.stateMasterId,
                                            states: value.name,
                                            state_id: value.id,
                                        })
                                    }}>Edit</button></th>

                                    <th><button onClick={() => deleteState(value.id)}>Delete</button></th>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div> 
                :
                <div style={{ margin: ' 0vw 20vw' }}>
                    <h3> Total Cities of All States</h3>
                    <table className='table table-striped' >
                        <tbody>
                            <tr>
                                <th>Sr no.</th>
                                <th>City Name</th>
                                <th>State Name</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>

                            {states.map((value, index) =>
                                <tr key={index}>
                                    <th>{++c}</th>
                                    <th>{value.name}</th>
                                    <th>{value.state_master.name}</th>
                                    <th><button onClick={() => navigate(`/city/${value.id}`)}>View</button></th>

                                    <th><button onClick={() => {
                                        setToggle(true);
                                        formik.setValues({
                                            search: value.state_master.name,
                                            country_id: value.state_master.id,
                                            states: value.name,
                                            state_id: value.id,
                                        })
                                    }}>Edit</button></th>

                                    <th><button onClick={() => deleteState(value.id)}>Delete</button></th>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default CityTry