import React from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'



const Country = () => {
    let navigate = useNavigate();

    function previousPage() {

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
                        country: Yup.string().required('Required'),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                        navigate('/state', { state: { country: values.country}});
                    }}
                >

                    {formik =>
                        <Form>
                            <h2><label>Country</label><br /></h2>
                            <Field name="country" as="select">
                                <option value=''>Select country</option>
                                <option value='india'>India</option>
                                <option value='usa'>USA</option>
                                <option value='canada'>Canada</option>
                                <option value='russia'>Russia</option>
                                <option value='australia'>Australia</option>
                            </Field>
                            <br /><br />
                            <button type='submit'>Next</button>
                        </Form>
                    }
                </Formik>
                <button onClick={previousPage}>Previous</button>
                {/* <div>
                        <button onClick={nextPage}>Next</button>
                    </div> */}
            </div>
        </>
    )
}

export default Country
