import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

const ViewCountry = () => {
    let navigate = useNavigate();
    const [country, setCountry] = useState([])

    useEffect(() => {
        getAllCountry();
    }, []);

    async function deleteCountry(id) {
        let cName = country.find((x) => x.id == id);
        console.log('cName ',cName);
        try {
            (confirm(`Are you sure you want to delete Country Name : " ${cName.name} "`)) && await axios.delete(`/country/delete/${id}`);
        } catch (error) {
            console.log('Error msg ',error);
        }finally{
            getAllCountry();
        }
    }

    async function getAllCountry() {
        try {
            let respose = await axios.get('/country/get');
            let data = respose.data.data;

            (data && data.length > 0) && setCountry(data);

        } catch (err) {
            console.log('Error : ', err);
        }
    }

    return (
        <>
        <Navbar/>
        <button onClick={() => navigate('/country')}>Add</button>
            <div style={{ margin: ' 0vw 20vw' }}>
                <h3 >Country Names</h3>
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Sr no.</th>
                            <th>Country Name</th>
                            <th></th>
                            <th></th>
                        </tr>

                        {country.map((value, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{value.name}</th>

                                <th><button onClick={() => navigate(`/country/${value.id}`)}> Edit </button></th>

                                <th><button onClick={() => deleteCountry(value.id)}>Delete</button></th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewCountry
