import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

const ViewCity = () => {
    const [city, setCity] = useState([])
    // const [totalCountry, setTotalCountry] = useState([])
    const [totalState, setTotalState] = useState([])
    const [state_name, setState_name] = useState('')

    let navigate = useNavigate();
    let c = 0;

    async function getCityByState(i) {
        if (i == 'getAllCity') {
            console.log(i)
            setAllCity();
        } else {
            setState_name(totalState[i].name);
            let response = await axios.get(`city/get/${totalState[i].id}`);
            setCity(response.data.data.city_masters)
        }
    }
 
    async function setAllCity() {
        let response = await axios.get('/city/get');
        let cityNames = response.data.data;
        (cityNames && cityNames.length > 0) && setCity(cityNames);
        setState_name('');
    }

    // async function getAllCountry() {
    //     let response = await axios.get('/country/get');
    //     let countryNames = [];
    //     for (let x of response.data.data) {
    //         countryNames.push({
    //             id: x.id,
    //             name: x.name,
    //         });
    //     }

    //     if (countryNames && countryNames.length > 0) {
    //         setTotalCountry(countryNames);
    //     } else {
    //         alert('First Add Atleast One Country');
    //         navigate('/country');
    //     } 
    // }
    async function getAllStates() {
        let response = await axios.get('/state/get');
        let stateNames = [];
        for (let x of response.data.data) {
            stateNames.push({
                id: x.id,
                name: x.name,
            });
        }

        if (stateNames && stateNames.length > 0) {
            setTotalState(stateNames);
        } else {
            alert('First Add Atleast One State');
            navigate('/State');
        }
    }

    useEffect(() => {
        getAllStates();
        setAllCity();
    }, [])

    async function deleteCity(id) {
        let ciName = city.find((x) => x.id == id);
        console.log(ciName)
        try {
            (confirm(`Are you sure you want to delete City Name : ${ciName.name}`)) && await axios.delete(`/city/delete/${id}`)
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllStates();
            setAllCity();
        }
    }

    return (
        <>
            <Navbar />
            <button onClick={() => navigate('/city')}>Add</button>

            {/* <select name="country" id='country'>
                <option value='' onClick={setAllCity}>Select Country</option>

                {totalCountry.map((val, index) => (
                    <option key={index} value={val.id} onClick={() => getStatebyCountry(val.id)}> {val.name} </option>
                ))}
            </select> */}

            <select name="states" id='states' onChange={(e) => getCityByState(e.target.value)}>
                <option value='getAllCity' >Select State</option>

                {totalState.map((val, index) => (
                    <option key={index} value={index}> {val.name} </option>
                ))}
            </select>

            <div style={{ margin: ' 0vw 20vw' }}>
                {(state_name.length == 0) ? <h3> Total Cities of All Country</h3> : <h3 >Cities of {state_name}</h3>}
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>City Name</th>
                            {(state_name.length == 0) && <th>State Name</th>}
                            <th></th>
                            <th></th>
                        </tr>


                        {city.map((value, index) =>
                            <tr key={index}>
                                {/* {(value.country_master) && console.log('value ', value)} */}
                                <th>{++c}</th>
                                <th>{value.name}</th>
                                {(state_name.length == 0) && <th>{value.state_master.name}</th>}

                                <th><button onClick={() => navigate(`/city/${value.id}`)}>Edit</button></th>

                                <th><button onClick={() => deleteCity(value.id)}>Delete</button></th>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewCity
