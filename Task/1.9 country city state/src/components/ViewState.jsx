import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

const ViewState = () => {
    const [states, setStates] = useState([])
    const [totalCountry, setTotalCountry] = useState([])
    const [country_name, setCountry_name] = useState('')
  
    let navigate = useNavigate();
    let c = 0;

    async function getStatebyCountry(i) {
        if(i == 'getAllState'){
            getAllState();
        }else{
        console.log(totalCountry[i].name);
        setCountry_name(totalCountry[i].name);
        let response = await axios.get(`state/get/${totalCountry[i].id}`);
        setStates(response.data.data.state_masters)
        }
    }

    async function getAllState(){
        let response = await axios.get('/state/get');
        let statesNames = response.data.data;
        (statesNames && statesNames.length > 0) && setStates(statesNames);
        setCountry_name('');
    }

    async function getAllCountry() {
        let response = await axios.get('/country/get');
        let countryNames = [];
        for (let x of response.data.data) {
            countryNames.push({
                id: x.id,
                name: x.name,
            });
        }

        if (countryNames && countryNames.length > 0) {
            setTotalCountry(countryNames);
        } else {
            alert('First Add Atleast One Country');
            navigate('/country');
        } 
    }

    useEffect(() => {
        getAllCountry();
        getAllState();
    }, [])

    async function deleteState(id) {
        let sName = states.find((x) => x.id == id);
        console.log(sName)
        try {
            (confirm(`Are you sure you want to delete State Name : ${sName.name}`)) && await axios.delete(`/state/delete/${id}`)
        } catch (error) {
            console.log('error msg ', error)
        } finally {
            getAllCountry();
            getAllState();
        }
    }

    return (
        <>
        <Navbar/>
            <button onClick={() => navigate('/state')}>Add</button>

            <select name="country" id='country' onChange={(e) => {getStatebyCountry(e.target.value)}}> // here how to get value of selected option
                <option value='getAllState' >Select Country</option>
                {/* <option value='' onClick={getAllState}>Select Country</option> */}

                {totalCountry.map((val, index) => (
                    <option key={index} value={index} > {val.name} </option>
                    // <option key={index} value={val.id} onClick={() => {getStatebyCountry(val.id)}}> {val.name} </option>
                ))}
            </select>

                <div style={{ margin: ' 0vw 20vw' }}>
                    {(country_name.length == 0) ? <h3> Total States of All Country</h3> : <h3 >States of {country_name}</h3>}
                    <table className='table table-striped' >
                        <tbody>
                            <tr>
                                <th>Sr no.</th>
                                <th>states Name</th>
                                {(country_name.length == 0) && <th>Country Name</th>}
                                <th></th>
                                <th></th>
                            </tr>


                            {states.map((value, index) =>
                                <tr key={index}>
                                    {/* {(value.country_master) && console.log('value ', value)} */}
                                    <th>{++c}</th>
                                    <th>{value.name}</th>
                                    {(country_name.length == 0) && <th>{value.country_master.name}</th>}

                                    <th><button onClick={() => navigate(`/state/${value.id}`)}>Edit</button></th>

                                    <th><button onClick={() => deleteState(value.id)}>Delete</button></th>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default ViewState
