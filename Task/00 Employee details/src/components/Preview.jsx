import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const Preview = () => {
    const nevigate = useNavigate();

    function submit() {
        confirm('Are you sure you want to submit your details ?') ? nevigate('/Submit') : '';
    }

    let employee_details = JSON.parse(localStorage.getItem('employee_details'));
    let family_details = JSON.parse(localStorage.getItem('family_details'));
    let educational_details = JSON.parse(localStorage.getItem('educational_details'));

    return (
        <div style={{ padding: '30px' }}>
            <div  style={{ margin: ' 0vw 20vw' }}>
                <h3>Employee details</h3>
                <div className="container2" >
                    <span className='dataLabel'>First Name</span>
                    <span className='dataLabel'>Middle Name</span>
                    <span className='userData'>{employee_details.firstName}</span>
                    <span className='userData'>{employee_details.middleName}</span>


                    <span className='dataLabel'>Last Name</span>
                    <span className='dataLabel'>User Name</span>
                    <span className='userData'>{employee_details.lastName}</span>
                    <span className='userData'>{employee_details.userName}</span>

                    <span className='dataLabel'>Email</span>
                    <span className='dataLabel'>Contact No.</span>
                    <span className='userData'>{employee_details.email}</span>
                    <span className='userData'>{employee_details.contactNo}</span>

                    <span className='dataLabel'>Birth Date</span>
                    <span className='dataLabel'>Department</span>
                    <span className='userData'>{employee_details.dob}</span>
                    <span className='userData'>{employee_details.dept}</span>

                    <div><span>Gender</span> <span className='userData' >{employee_details.gender}</span></div>
                </div>
            </div>
            <hr />
            <br/>
            <div  style={{ margin: ' 0vw 20vw' }}>
                <h3 >Family details</h3>
                <table className='table table-striped' >
                    <tbody>
                        <tr>
                            <th>Relation</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                        </tr>


                        {family_details.map((value, index) =>
                            <tr key={index}>
                                <td>{value.relation}</td>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                                <td>{value.email}</td>
                                <td>{value.contactNo}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            <hr />
            <br/>

            <div style={{ margin: ' 0vw 20vw' }}>
                <h3 style={{ margin: 'auto' }}>Educational details</h3>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th>Qualification</th>
                            <th>Institute Name</th>
                            <th>Passout Year</th>
                            <th>Passout Marks</th>
                        </tr>


                        {educational_details.map((value, index) =>
                            <tr key={index}>
                                <td>{value.degree}</td>
                                <td>{value.colgName}</td>
                                <td>{value.passingYear}</td>
                                <td>{value.passingMark}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            <hr />

        </div>
    )
}

export default Preview
