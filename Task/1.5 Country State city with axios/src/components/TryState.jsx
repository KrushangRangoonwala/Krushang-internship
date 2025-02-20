import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const TryState = () => {
    let navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [search, setSearch] = useState('');
    const [shownCountry, setShownCountry] = useState([]);
    const [totalCountry, setTotalCountry] = useState([]);
    const [country_name, setCountry_name] = useState('');
    const [toggle, setToggle] = useState(false);
    const [stateName, setStateName] = useState({});
    let c = 0;

    async function getAllCountryState() {
        try {
            let response = await axios.get('/country/get');
            let countryNames = response.data.data.map(x => ({ id: x.id, name: x.name }));

            if (countryNames.length > 0) {
                setTotalCountry(countryNames);
            } else {
                alert('First Enter At least One Country');
                navigate('/country');
            }

            response = await axios.get('/state/get');
            let statesNames = response.data.data;
            if (statesNames.length > 0) setStates(statesNames);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {
        getAllCountryState();
    }, []);

    useEffect(() => {
        let searchPattern = new RegExp(search, 'i');
        let temp = totalCountry.filter(val => searchPattern.test(val.name));
        if (temp.length > 0 || search.length > 0) setShownCountry(temp);
    }, [search, totalCountry]);

    async function addState(country_id, state_name) {
        try {
            await axios.post('/state/create', { countryMasterId: country_id, name: state_name });
        } catch (error) {
            console.error('Error adding state', error);
        } finally {
            getAllCountryState();
        }
    }

    async function editState(values) {
        try {
            await axios.put(`/state/update/${values.state_id}`, { countryMasterId: values.country, name: values.states });
        } catch (error) {
            console.error('Error updating state', error);
        } finally {
            getAllCountryState();
        }
    }

    async function deleteState(id) {
        try {
            await axios.delete(`/state/delete/${id}`);
        } catch (error) {
            console.error('Error deleting state', error);
        } finally {
            getAllCountryState();
        }
    }

    const formik = useFormik({
        initialValues: { search: '', country: '', states: '', state_id: '' },
        validationSchema: Yup.object({
            search: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            states: Yup.string().required('Required')
        }),
        onSubmit: values => {
            toggle ? editState(values) : addState(values.country, values.states);
            setToggle(false);
        }
    });

    useEffect(() => {
        formik.setValues(stateName);
    }, [stateName]);

    return (
        <>
            <Navbar />
            <div className='container2'>
                <form onSubmit={formik.handleSubmit}>
                    <h2><label>Country</label></h2>
                    <input
                        name='search'
                        id='search'
                        type='text'
                        placeholder='Search your country'
                        value={formik.values.search}
                        onChange={e => {
                            formik.handleChange(e);
                            setSearch(e.target.value);
                        }}
                    />
                    <select name='country' id='country' size='4' {...formik.getFieldProps('country')}>
                        {shownCountry.map((val, index) => (
                            <option key={index} value={val.id} onClick={() => {
                                formik.setFieldValue('search', val.name);
                                setCountry_name(val.name);
                            }}>
                                {val.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.search && formik.errors.search && <div className='error'>{formik.errors.search}</div>}
                    
                    <h2><label>States</label></h2>
                    <input
                        name='states'
                        id='states'
                        type='text'
                        placeholder='Enter new State'
                        {...formik.getFieldProps('states')}
                    />
                    {formik.touched.states && formik.errors.states && <div className='error'>{formik.errors.states}</div>}
                    
                    <input name='state_id' id='state_id' type='text' hidden {...formik.getFieldProps('state_id')} />
                    <br />
                    <button type='submit'>{toggle ? 'Edit State' : 'Add State'}</button>
                </form>
            </div>
            <div className='btnnn'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/states')}>Next</button>
            </div>
            <div style={{ margin: '0vw 20vw' }}>
                <h3>States of {country_name}</h3>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>State Name</th>
                            <th>Country Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {states.map((value, index) => (
                            <tr key={index}>
                                <td>{++c}</td>
                                <td>{value.name}</td>
                                <td>{value.country_master.name}</td>
                                <td><button>View</button></td>
                                <td>
                                    <button onClick={() => {
                                        setToggle(true);
                                        setStateName({
                                            search: value.country_master.name,
                                            country: value.country_master.id,
                                            states: value.name,
                                            state_id: value.id,
                                        });
                                    }}>Edit</button>
                                </td>
                                <td><button onClick={() => deleteState(value.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TryState;
