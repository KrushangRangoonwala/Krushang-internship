import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Country from './Country'
import axios from 'axios'

// component name should be start with capital letters ''
// axios.defaults.baseURL = 'http://192.168.1.56:3000/'

const State = () => {
    let navigate = useNavigate();
    const [states, setStates] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `states`  
    const [search, setSearch] = useState('')
    const [shownCountry, setShownCountry] = useState([])
    console.log(shownCountry,"shownCountry")
    const [totalCountry, setTotalCountry] = useState([])
    const [country_name, setCountry_name] = useState('')
    const [toggle, setToggle] = useState(false);
    const [stateName, setStateName] = useState()
    let c = 0;

    function selectCountry(i) {
        document.getElementById('country').style.visibility = 'hidden';
        setCountry_name(shownCountry[i].name);
    }

    async function getAllCountryState() {
        let response = await axios.get('/country/get');
        let countryNames = [];
        for (let x of response.data.data) {
            countryNames.push({
                id: x.id,
                name: x.name,
            });
        }
        console.log('countryNames  ', countryNames);

        if (countryNames && countryNames.length > 0) {
            setTotalCountry(countryNames);
        } else {
            alert('First Enter Atleast One Country');
            navigate('/country');
        }

        // for state :
        response = await axios.get('/state/get');
        let statesNames = response.data.data;
        (statesNames && statesNames.length > 0) &&
            setStates(statesNames);
        console.log("statesNames ", statesNames);
    }

    useEffect(() => {
        getAllCountryState()
        // if (statesNames && statesNames.length > 0) {
        //     setStates(statesNames);
        //     console.log("statesNames ", statesNames);
        // }

        // if (countryNames && countryNames.length > 0) {
        //     console.log("countryNames ", countryNames);
        //     setTotalCountry(countryNames);
        // } else {
        //     alert('First Enter Atleast One Country');
        //     navigate('/country');
        // }
    }, [search])

    useEffect(() => {
        // console.log("useefcet states ", states)
        // localStorage.setItem('states', JSON.stringify(states));
    }, [states])

    useEffect(() => {
        console.log(search)
        document.getElementById('country').style.visibility = 'visible';
        // (search.length == 0) && setShownCountry(totalCountry);
        let temp = [];
        let searchPettern = new RegExp(search, 'i');
        console.log(totalCountry);
        temp = totalCountry.filter((val) => searchPettern.test(val.name));
        if (temp.length > 0 || search.length > 0) {
            setShownCountry(shownCountry => temp);
            console.log(shownCountry)
        }
    }, [search]);

    function checkUnique(value) {
        for (let x of states) {
            if (x.states == value && x.country == country_name) {
                console.log('x.states ', x.states, ' value ', value)
                return false
            }
        }
        return true;
    }

    function isExist(value) {
        if (search.length > 0 && shownCountry.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    async function addState(country_id, state_name) {
        let val = {
            countryMasterId: country_id,
            name: state_name
        }
        try {
            let response = await axios.post('/state/create', val)
        } catch (error) {
            console.log("error msg ", error)
        } finally {
            getAllCountryState();
        }
    }

    async function editState(values) {
        let payload = {
            countryMasterId: values.country,
            name: values.states,
        }
        try {
            let reponse = await axios.put(`/state/update/${values.state_id}`, payload);
            setStateName({
                search: '',
                country: '',
                states: '',
                state_id: '',
            })
        } catch (error) {
            console.log('error msg ', error)
        }finally{
            getAllCountryState();
        }
    } 

    async function deleteState(id) {
        try {
            let response = await axios.delete(`/state/delete/${id}`)
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllCountryState();
        }
    }

    // const handleClick=(e)=>{
    //     console.log(e.target.value,"eeeeeeeeeeeee")
    //     formi

    // }

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        serach:'', country:'' ,states: '',state_id:''
                    }}
                    validationSchema={Yup.object({
                        search: Yup.string().required('Requiredaa').test('isExist', "Country didn't registered", function (value) { return isExist(value) }),
                        country: Yup.string().required('Required'),
                        states: Yup.string().required('Required').test('checkUnique', 'State already registered', function (value) { return checkUnique(value) }),
                        state_id: Yup.string(),
                    })}
                    onSubmit={(values) => {
                        console.log('toggle ',toggle)
                        toggle ? editState(values) : addState(values.country, values.states);
                        setToggle(false);
                        // document.getElementById('states').value = '';
                    }}
                >

                    {formik => 
                        <Form>
                            {useEffect(() => {
                                formik.setValues(stateName);
                            }, [stateName])}

                            <h2><label>Country</label><br /></h2>
                            {/* <input type='text' name='search' id='search' placeholder='search your country' onChange={(e) => setSearch(e.target.value)} /> */}
                            <Field name="search" id='search' type='text' placeholder='search your country' onChange={(e) => {
                                setSearch(e?.target?.value) 
                                formik.handleChange()  
                            }} />      

                            <Field name="country" id='country' as="select" size='4'>
                                {shownCountry.map((val, index) => (
                                    <option key={index} value={val.id} onChange={() => {
                                        selectCountry(index);
                                        formik.setFieldValue('search', val.name);
                                        // formik.setFieldValue('country_id', val.id);
                                    }}> {val.name} </option>
                                ))}
                                {/* {shownCountry.map((value,index)=>(
                                    <option key={index} onChange={(e)=>{formik.setFieldValue('search', e?.target?.value)}} value={value.name}>{value.name}</option>
                                ))} */}
                            </Field>

                            {formik.touched.search && formik.errors.search ? <div className='error'>{formik.errors.search}</div> : ''}
                            <br /><br />

                            <h2><label>states</label><br /></h2>
                            <Field name="states" id='states' type='text' placeholder='Enter new State' />
                            {formik.touched.states && formik.errors.states ? <div className='error'>{formik.errors.states}</div> : ''}

                            <Field name="state_id" id='state_id' type='text' hidden />
                            {/* <Field name="country_id" id='country_id' type='text' hidden /> */}
                            <br /><br />

                            <button type='submit'>Add states</button>
                        </Form>
                    }
                </Formik>
            </div>
            <br />

            {/* <div style={{margin : 'auto',width: '500px'}}> */}
            <div className='btnnn'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/states')}>Next</button>
            </div>
            <br />
            <br />

            <div style={{ margin: ' 0vw 20vw' }}>
                <h3 >States of {country_name}</h3>
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>states Name</th>
                            <th>Country Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>

                        {states.map((value, index) =>
                            // value.country == country_name &&
                            <tr key={index}>
                                <th>{++c}</th>
                                <th>{value.name}</th>
                                <th>{value.country_master.name}</th>
                                <th><button>View</button></th>

                                <th><button onClick={() => {
                                    setToggle(true);
                                    setStateName({
                                        search: value.country_master.name,
                                        country: value.country_master.id,
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
        </>
    )
}

export default State
