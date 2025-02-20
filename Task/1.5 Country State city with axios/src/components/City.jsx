import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Country from './Country'

// component name should be start with capital letters ''

const State = () => {
    let navigate = useNavigate();
    const [cities, setCities] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `cities`  
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')

    const [shownCountry, setShownCountry] = useState([])
    const [totalCountry, setTotalCountry] = useState([])
    const [country_name, setCountry_name] = useState('')

    const [shownStates, setShownStates] = useState([])
    const [totalStates, setTotalStates] = useState([])
    const [states_name, setStates_name] = useState('')
    let c = 0;

    function delCon(i) {
        // console.log(i)
        // let temp= []; 
        // temp = cities;
        // temp.splice(i,1);
        // console.log(temp); // ths gives correct answer
        // setCities(temp);  // but this is not working
        setCities(prevcities => prevcities.filter((_, index) => index !== i));  // usign this, setCities function works
    }

    function previousPage() {

    }

    function selectCountry(i) {
        // document.getElementById('search').value = shownCountry[i];
        // console.log("search val ", document.getElementById('search').value);
        document.getElementById('country').style.visibility = 'hidden';
        setCountry_name(shownCountry[i]);

        document.getElementById('states').style.visibility = 'visible';
        let statesNames = JSON.parse(localStorage.getItem('states'));
        if (statesNames && statesNames.length > 0) {
            console.log("statesNames ", statesNames);
            setShownStates(statesNames);
        } else {
            alert('First Enter Atleast One State in ', shownCountry[i]);
            navigate('/state');
        }
    }

    function selectState(i) {
        // document.getElementById('search2').value = shownStates[i].states;
        // console.log("search val state ", document.getElementById('search2').value);
        document.getElementById('states').style.visibility = 'hidden';
        setStates_name(shownStates[i].states);
    }

    useEffect(() => {
        let countryNames = JSON.parse(localStorage.getItem('country'));
        let statesNames = JSON.parse(localStorage.getItem('states'));
        let citiesNames = JSON.parse(localStorage.getItem('cities'));

        if (citiesNames && citiesNames.length > 0) {
            setCities(citiesNames);
            console.log("citiesNames ", citiesNames);
        }

        if (countryNames && countryNames.length > 0) {
            console.log("countryNames ", countryNames);
            setTotalCountry(countryNames);
        } else {
            alert('First Enter Atleast One Country');
            navigate('/country');
        }

        if (statesNames && statesNames.length > 0) {
            console.log("statesNames ", statesNames);
            setTotalStates(statesNames);
        } else {
            alert('First Enter Atleast One state');
            navigate('/state');
        }
    }, [])

    useEffect(() => {
        console.log("useefcet cities ", cities)
        localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities])

    useEffect(() => {
        document.getElementById('country').style.visibility = 'visible';
        let temp = [];
        // console.log(search.length);
        // console.log(totalCountry)
        if (search.length != 0) {
            let searchPettern = new RegExp(search, 'i');
            console.log(totalCountry);
            temp = totalCountry.filter((val) => searchPettern.test(val));
            if (temp.length > 0 || search.length > 0) {
                setShownCountry(shownCountry => temp);
                console.log(shownCountry)
            }
        } else {
            setShownCountry(shownCountry => totalCountry);
        }
    }, [search]);

    useEffect(() => {
        document.getElementById('states').style.visibility = 'visible';
        let temp = [];
        if (search2.length != 0) {
            let searchPettern = new RegExp(search2, 'i');
            console.log(totalStates);
            temp = totalStates.filter((val) => searchPettern.test(val.states));
            console.log(temp)
            if (temp.length > 0 || search.length > 0) {
                setShownStates(setShownStates => temp);
                console.log(shownStates)
            }
        } else {
            setShownStates(setShownStates => totalStates);
        }
    }, [search2]);

    function checkUnique(value) {
        for (let x of cities) {
            if (x.cities == value && x.country == country_name && x.states == states_name) {
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

    function isExist2(value) {
        if (search2.length > 0 && shownStates.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        cities: '',
                    }}
                    validationSchema={Yup.object({
                        search: Yup.string().required('Requiredaa').test('isExist', "Country didn't registered", function (value) { return isExist(value) }),
                        search2: Yup.string().required('Requireda').test('isExist2', "State didn't registered", function (value) { return isExist2(value) }),
                        country: Yup.string().required('Required'),
                        states: Yup.string().required('Required'),
                        cities: Yup.string().required('Required').test('checkUnique', 'City already registered', function (value) { return checkUnique(value) }),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                        setCities(val => [...val, values]);
                        // setCities([...cities, values]);
                    }}
                >

                    {formik =>
                        <Form>
                            <h2><label>Country</label><br /></h2>
                            {/* <input type='text' name='search' id='search' placeholder='search your country' onChange={(e) => setSearch(e.target.value)} /> */}
                            <Field name="search" id='search' type='text' placeholder='search your country' onChange={(e) => {
                                formik.handleChange(e)
                                setSearch(e.target.value)
                            }} />
                            <Field name="country" id='country' as="select" size='4'>
                                {shownCountry.map((val, index) => (
                                    <option key={index} value={val} onClick={() =>{
                                        formik.setFieldValue('search', val)
                                        selectCountry(index)
                                    }}>{val}</option>
                                ))}
                            </Field>
                            {formik.touched.search && formik.errors.search ? <div className='error'>{formik.errors.search}</div> : ''}  
                            <br /><br />

                            <h2><label>State</label><br /></h2>
                            {/* <input type='text' name='search2' id='search2' placeholder='search your state' onChange={(e) => setSearch2(e.target.value)} /> */}
                            <Field name="search2" id='search2' type='text' placeholder='search your state' onChange={(e) => {
                                formik.handleChange(e)
                                setSearch2(e.target.value) }} />
                            <Field name="states" id='states' as="select" size='4'>
                                {shownStates.map((val, index) => (
                                    val.country == country_name &&
                                    <option key={index} value={val.states} onClick={() => {
                                        formik.setFieldValue('search2', val.states)
                                        selectState(index) }}>{val.states}</option>
                                ))}
                            </Field>
                            {formik.touched.search2 && formik.errors.search2 ? <div className='error'>{formik.errors.search2}</div> : ''}
                            {formik.touched.search2 && formik.errors.search2 ? console.log('search2') : ''}
                            
                            <br /><br />

                            <h2><label>cities</label><br /></h2>
                            <Field name="cities" id='cities' type='text' />
                            {formik.touched.cities && formik.errors.cities ? <div className='error'>{formik.errors.cities}</div> : ''}
                            <br /><br />
                            <button type='submit'>Add cities</button>
                        </Form>
                    }
                </Formik>
            </div>
            <br />

            <div className='btnnn'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/city')}>Next</button>
            </div>
            <br />
            <br />

            <div style={{ margin: ' 0vw 20vw' }}>
                <h3 >cities of {states_name} of {country_name}</h3>
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>cities Name</th>
                            <th></th>
                        </tr>

                        {cities.map((value, index) =>
                            value.states == states_name && value.country == country_name &&
                            <tr key={index}>
                                <th>{++c}</th>
                                <th>{value.cities}</th>
                                <th><button onClick={() => delCon(index)}>Delete</button></th>
                            </tr>

                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default State
