import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

const Country = () => {
    let navigate = useNavigate();
    const [country, setCountry] = useState([])

    function delCon(i) {
        // console.log(i)
        // let temp= []; 
        // temp = country;
        // temp.splice(i,1);
        // console.log(temp); // ths gives correct answer
        // setCountry(temp);  // but this is not working
        setCountry(prevCountry => prevCountry.filter((_, index) => index !== i));
    }

    function previousPage() {

    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('country'));
        console.log("country ", country);
        if (data && data.length > 0) {
            setCountry(data);
        }

        // for navbar
        // let collection = document.getElementsByClassName('navEle');
        // console.log(collection[3]);
        // collection[0].setAttribute('class', 'navEle');
        // collection[1].setAttribute('class', 'active navEle');
        // collection[2].setAttribute('class', 'navEle');
        // collection[3].setAttribute('class', 'navEle');
    }, [])

    useEffect(() => {
        console.log("useefcet country ", country)
        localStorage.setItem('country', JSON.stringify(country));
    }, [country])

    function checkUnique(value){
        return !(country.includes(value));
    }

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        country: '',
                    }}
                    validationSchema={Yup.object({
                        country: Yup.string().required('Required').test('checkUnique','Country already registered',function (value){ return checkUnique(value)} ),
                    })}
                    onSubmit={(values) => {
                        console.log(values.country);
                        setCountry(val => [...val, values.country])
                    }}
                >

                    {formik =>
                        <Form>
                            <h2><label>Country</label><br /></h2>
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
                        </tr>

                        {country.map((value, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{value}</th>
                                <th><button onClick={() => delCon(index)}>Delete</button></th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Country
