import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.56:3000';

const Country = () => {
    let navigate = useNavigate();
    const [countryById, setCountryById] = useState({});
    const { id } = useParams('id');

    async function getCountryById(id) {
        let response = await axios.get(`/country/get/${id}`);
        setCountryById(response.data.data); // ...
        let cData = response.data.data;
        formik.setFieldValue('edit_id', cData.id);
        formik.setFieldValue('country', cData.name);
    }
 
    async function editCountry(id, val) {
        try {
            let response = await axios.put(`/country/update/${id}`, val)
        } catch (error) {
            console.log('Error msg ', error)
        }
    }

    async function addCountry(val) {
        try {
            let reponse = await axios.post('/country/create', val);
        } catch (error) {
            console.log('Error msg ', error)
        }
    }

    useEffect(() => {
        // getAllCountry();  ******remove comment
        (id) && getCountryById(id);
    }, [])

    const formik = useFormik({
        initialValues: {
            country: '',
            edit_id: ''
        },
        validationSchema: Yup.object({
            country: Yup.string().required('Required'),
            edit_id: Yup.string(),
        }),
        onSubmit: values => {
            let country = {
                name: values.country.trim(),
            }
            id ? editCountry(values.edit_id, country) : addCountry(country);
            id && alert(`You change country name ${countryById.name} to ${values.country}`);
            formik.setValues({
                country: '',
                edit_id: ''
            })
            formik.touched.country = false;
        }
    });

    return (
        <>
            <Navbar />
            <div className='container2'>

                <form onSubmit={formik.handleSubmit}>
                    <h2><label>Country</label><br /></h2>

                    <input name="country" id='country' type='text'
                        placeholder={(id) ? 'Update country name' : 'Enter country name'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country} />
                    <input name="edit_id" id='edit_id' type='text' hidden />

                    {formik.touched.country && formik.errors.country ? <div className='error'>{formik.errors.country}</div> : ''}
                    <br /><br />
                    <input type="reset" value="Clear" />
                    <button type='submit'>{id ? 'Edit' : 'Submit'}</button>
                </form>
            </div>
            <button onClick={() => navigate('/country/view')}> View </button>
            <br />
            <br />
        </>
    )
}

export default Country
