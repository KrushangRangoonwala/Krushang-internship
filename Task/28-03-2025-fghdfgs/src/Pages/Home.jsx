import axios from 'axios'
import './home.css'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [allUserData, setAllUserData] = useState([{}])
    const [searchUserData, setSearchUserData] = useState([{}])
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchUserData(params) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                console.log("response ", response.data);
                setAllUserData(response.data);
                setSearchUserData(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData();
    }, [])

    useEffect(() => {
        console.log('search ', search);
        const data = allUserData.filter((val) => {
            // console.log(val?.name)
            // console.log(val?.username)
            return val?.name?.includes(search) || val?.username?.includes(search)
        })
        setSearchUserData(data)
    }, [search])

    return (
        <>
            <div className="category-container">
                <h1 style={{ textAlign: 'center' }}>All Users</h1>
                {/* <br/> */}
                <div className='search-div'>
                    <input id='search' name='search' type='text' placeholder='Search by Name and UserName' className='search-input' onChange={(e) => setSearch(e.target.value)} />
                </div>
                {/* <br/> */}
                <br />

                <div className="grid-container">
                    {console.log(allUserData[0])}
                    {searchUserData.map((val, index) => (
                        <div key={index} className="grid-item" onClick={() => { }}>
                            <div>{val.name} </div>
                            <div>{val.username}</div>
                            <div>{val.email}</div>
                            <div>{val.phone}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
