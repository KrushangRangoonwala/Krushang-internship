import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Formik, Form, useField, Field } from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'

let india = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
let usa = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
let canada = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
let russia = ['Moscow', 'Saint Petersburg', 'Karelia', 'Komi', 'Tatarstan', 'Bashkortostan', 'Sakha (Yakutia)', 'Chuvashia', 'Dagestan', 'Ingushetia', 'Kabardino-Balkaria', 'Kalmykia', 'Karachay-Cherkessia', 'Mari El', 'Mordovia', 'North Ossetia-Alania', 'Adygea', 'Altai Republic', 'Buryatia', 'Tuva', 'Khakassia', 'Crimea', 'Primorsky Krai', 'Khabarovsk Krai', 'Amur Oblast', 'Sakhalin Oblast', 'Magadan Oblast', 'Kamchatka Krai', 'Krasnoyarsk Krai', 'Novosibirsk Oblast', 'Omsk Oblast', 'Tomsk Oblast', 'Irkutsk Oblast', 'Tyumen Oblast', 'Chelyabinsk Oblast', 'Sverdlovsk Oblast', 'Kurgan Oblast', 'Rostov Oblast', 'Volgograd Oblast', 'Astrakhan Oblast'];
let australia = ['New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'];


const State = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let country = location.state?.country;
    // console.log(country);
    const [search, setSearch] = useState('');
    const [shownStates, setShownStates] = useState([])
    const [totalStates, setTotalStates] = useState([])
    // let totalStates = []; // 

    useEffect(() => {
        // alert("switch")
        switch (country) {
            case 'india': setTotalStates(india);
                console.log(totalStates);
                break;
            case 'usa': setTotalStates(totalStates => usa);
                break;
            case 'canada': setTotalStates(totalStates => canada);
                break;
            case 'russia': setTotalStates(totalStates => russia);
                break;
            case 'australia': setTotalStates(totalStates => australia);
                break;
            default: ;
                break;
        }
    }, [])
    

    useEffect(() => {
        let temp = [];
        let searchPettern = new RegExp(search, 'i');
        console.log(totalStates);
        temp = totalStates.filter((val) => searchPettern.test(val));
        if(temp.length > 0 || search.length > 0){
            setShownStates(shownStates => temp);
            console.log(shownStates)
        }
    }, [search]);


    function previousPage() {
        console.log(shownStates);
    }

    return (
        <>
            <Navbar />
            <div className='container2'>
                <Formik
                    initialValues={{
                        state: '',
                    }}
                    validationSchema={Yup.object({
                        state: Yup.string().required('Required'),
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                        navigate('/state', { state: { country: country, state: values } });
                    }}
                >

                    {formik =>
                        <Form>
                            <h2><label>State</label><br /></h2>
                            <input type='text' name='search' id='search' placeholder='search your state' onChange={(e) => setSearch(e.target.value)} />
                            {/* <input type='text' name='search' id='search' placeholder='search your state' onChange={(e) => renderOptions(e)} /> */}

                            <Field name="state" as="select" size='4'>
                                {shownStates.map(val => (
                                    <option value={val}>{val}</option>
                                ))}
                            </Field>
                            <br /><br />
                            <button type='submit'>Next</button>
                        </Form>
                    }
                </Formik>
                <button onClick={previousPage}>Previous</button>
            </div>
        </>
    )
}

export default State
