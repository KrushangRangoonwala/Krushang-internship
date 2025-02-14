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
    const [states, setStates] = useState([])  // unexpacted error : solution : should not define any variable with `state` instead use this `states`  
    const [search, setSearch] = useState('')
    const [shownCountry, setShownCountry] = useState([])
    const [totalCountry, setTotalCountry] = useState([])
    const [country_name, setCountry_name] = useState('')
    let c = 0;

    function delCon(i) {
        // console.log(i)
        // let temp= []; 
        // temp = states;
        // temp.splice(i,1);
        // console.log(temp); // ths gives correct answer
        // setStates(temp);  // but this is not working
        setStates(prevstates => prevstates.filter((_, index) => index !== i));  // usign this, setStates function works
    }

    function previousPage() {

    }

    function selectCountry(i) {
        // document.getElementById('search').value = shownCountry[i];
        document.getElementById('country').style.visibility = 'hidden';
        setCountry_name(shownCountry[i]);
    }

    useEffect(() => {
        let countryNames = JSON.parse(localStorage.getItem('country'));
        let statesNames = JSON.parse(localStorage.getItem('states'));
        if (statesNames && statesNames.length > 0) {
            setStates(statesNames);
            console.log("statesNames ", statesNames);
        }

        if (countryNames && countryNames.length > 0) {
            console.log("countryNames ", countryNames);
            setTotalCountry(countryNames);
        } else {
            alert('First Enter Atleast One Country');
            navigate('/country');
        }

        // for navbar
        // let collection = document.getElementsByClassName('navEle');
        // console.log(collection[3]);
        // collection[0].setAttribute('class', 'navEle');
        // collection[1].setAttribute('class', 'navEle');
        // collection[2].setAttribute('class', 'active navEle');
        // collection[3].setAttribute('class', 'navEle');
    }, [])

    useEffect(() => {
        console.log("useefcet states ", states)  // chatgpt : this gives empty array ,why ?
        localStorage.setItem('states', JSON.stringify(states));
    }, [states])

    useEffect(() => {
        document.getElementById('country').style.visibility = 'visible';
        let temp = [];
        let searchPettern = new RegExp(search, 'i');
        console.log(totalCountry);
        temp = totalCountry.filter((val) => searchPettern.test(val));
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

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        states: '',
                    }}
                    validationSchema={Yup.object({
                        search: Yup.string().required('Requiredaa').test('isExist', "Country didn't registered", function (value) { return isExist(value) }),
                        country: Yup.string().required('Required'),
                        states: Yup.string().required('Required').test('checkUnique', 'State already registered', function (value) { return checkUnique(value) }),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                        setStates(val => [...val, values]);
                        document.getElementById('states').value = '';
                        // setStates([...states, values]);
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
                                    <option key={index} value={val} onClick={() => {
                                        formik.setFieldValue('search', val)
                                        selectCountry(index)
                                    }}> {val} </option>
                                ))}
                            </Field>
                            {formik.touched.search && formik.errors.search ? <div className='error'>{formik.errors.search}</div> : ''}
                            <br /><br />

                            <h2><label>states</label><br /></h2>
                            <Field name="states" id='states' type='text' placeholder='Enter new State' />
                            {formik.touched.states && formik.errors.states ? <div className='error'>{formik.errors.states}</div> : ''}
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
                            <th></th>
                        </tr>

                        {states.map((value, index) =>
                            value.country == country_name &&
                            <tr key={index}>
                                <th>{++c}</th>
                                <th>{value.states}</th>
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
