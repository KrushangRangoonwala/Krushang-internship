import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './allUser.css'
import { NavLink, useNavigate } from 'react-router';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    let navigate = useNavigate();

    async function deleteUser(user) {
        console.log('deleteuser')
        if (confirm(`You are going to delete \nuser_id : ${user.id} \nuser name : ${user.firstName} ${user.lastName} \nAre You Sure?`)) {
            try {
                let response = await axios.delete(`/delete/${user.id}`);
                setAllUser(allUser.filter(val => val.id != user.id));
            } catch (error) {
                console.log(error);
                // alert('Some error occured \n User is not deleted');
            }
        }
    }

    async function getAllUser() {
        try {
            let response = await axios.get('/getalluser');
            setAllUser(response.data.data)
            // setAllUser([...allUser,response.data.data])  // bcs of this data cannot rendered on page table
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("allUser ", allUser);
    }, [allUser])

    useEffect(() => {
        getAllUser();
    }, [])

    return (
        <>
            {/* <div className='table-container'> */}
            <table>
                {/* <thead> */}
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact No.</th>
                        <th>Email ID</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {/* </thead> */}

                    {allUser.map((value, index) =>
                        <tr key={index}>
                            <td>{value.id}</td>
                            <td style={{ width: '40px', textAlign: 'center' }}> <img src={value.image ? `data:image/*;base64,${value.image}` : "user (1).png"} style={{ height: '30px', width: '30px' ,borderRadius: '100%'}} /> </td>
                            <td>{value.firstName}</td>
                            <td>{value.lastName}</td>
                            <td>{value.contactNo}</td>
                            <td>{value.emailId}</td>
                            <td>{value.birthDate.slice(0, 10)}</td>
                            <td>{(value.gender == 'M') ? 'male' : (value.gender == 'F') ? 'female' : null}</td>
                            <td>{value.role}</td>
                            <td style={{ width: '40px', textAlign: 'center' }} onClick={() => navigate(`/editDetails/${value.id}`, { state: { user: value } })}><NavLink><img src="pencil.png" style={{ height: '20px' }} /></NavLink></td>
                            <td style={{ width: '40px', textAlign: 'center' }} onClick={() => deleteUser(value)}><NavLink><img src="trash.png" style={{ height: '20px' }} /></NavLink></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* </div> */}
        </>
    )
}

export default AllUser
