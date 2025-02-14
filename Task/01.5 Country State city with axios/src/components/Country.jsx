import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.56:3000/country';

const Country = () => {
    let navigate = useNavigate();
    const [country, setCountry] = useState([{}]);
    const [countryObj, setCountryObj] = useState({});
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([])
    async function getAllCountry() {
        try {
            let respose = await axios.get('/get');
            console.log('respose ', respose);

            let data = respose.data.data;
            console.log('respose.data.data ', data);

            (data && data.length > 0) && setCountry(data);

        } catch (err) {
            console.log('Error : ', err);
        }
    }


    async function viewCountry(id) {
        console.log(id);
        let response = await axios.put(`/get/${id}`);
        console.log(response.data.data);
    }

    async function editCountry(id, val) {
        console.log(id);
        let response = await axios.put(`/update/${id}`, val)
        getAllCountry();
    }

    async function deleteCountry(id) {
        let response = await axios.delete(`/delete/${id}`)
        getAllCountry();
    }

    async function addCountry(val) {
        let reponse = await axios.post('/create', val);
        getAllCountry();
    }

    function previousPage() {

    }



    useEffect(() => {
        getAllCountry();
    }, [])

    useEffect(() => {
        console.log("useefcet country ", country)
        localStorage.setItem('country', JSON.stringify(country));
    }, [country])

    function checkUnique(value) {
        return !(country.includes(value));
    }

    const handleEdit= async (value)=>{
        console.log(value,"value")
        let response = await axios.get(`/get/${value.id}`) 
        console.log('...  ',response)
        setData(response.data.data);
    }

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        country: '',
                        edit_id: ''
                    }}
                    validationSchema={Yup.object({
                        country: Yup.string().required('Required').test('checkUnique', 'Country already registered', function (value) { return checkUnique(value) }),
                        edit_id: Yup.string(),
                    })}

                    onSubmit={(values, formik) => {
                        // console.log(values);
                        let country = {
                            name: values.country,
                        }
                        toggle == true ? editCountry(values.edit_id, country) : addCountry(country);
                        setToggle(false);
                        // console.log(formik.touched)
                        formik.setValues({
                            country: '',
                            edit_id: ''
                        })
                        navigate('/country');
                        // location.reload();
                    }}
                >

                    {(formik) =>
                        <Form>
                            {useEffect(() => {
                                console.log(countryObj)
                                formik.setValues(countryObj);
                            }, [countryObj])}

                            <h2><label>Country</label><br /></h2>

                            <button type='button' onClick={() => {
                                setToggle(false);
                                formik.setValues({
                                    country: '',
                                    edit_id: ''
                                })
                            }}> Add </button>

                            <Field name="edit_id" id='edit_id' type='text' hidden />
                            <Field name="country" id='country' type='text' />
                            {formik.touched.country && formik.errors.country ? <div className='error'>{formik.errors.country}</div> : ''}

                            <br /><br />
                            <button type='submit'>Submit</button>
                        </Form>
                    }
                </Formik>
            </div>
            <br />

            <div className='btnnn'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/state')}>Next</button>
            </div>
            <br />
            <br />

            <div style={{ margin: ' 0vw 20vw' }}>
                <h3 >Country Names</h3>
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>Country Name</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>

                        {country.map((value, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{value.name}</th>
                                
                                <th><button onClick={() => viewCountry(value.id)}>View</button></th>
                                <th><button onClick={() => {
                                    setToggle(true);
                                    setCountryObj({ country: value.name, edit_id: value.id });
                                    handleEdit((value))
                                }}>Edit</button></th>

                                <th><button onClick={() => deleteCountry(value.id)}>Delete</button></th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Country
