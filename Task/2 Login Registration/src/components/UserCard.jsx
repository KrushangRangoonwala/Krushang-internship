import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import AllUser from "./AllUser";

const UserCard = ({ user }) => {
    let navigate = useNavigate();
    const [showDp, setShowDp] = useState(false)

    return (
        <>
            <div className="user-card">
                <NavLink >
                    <img id='pic'
                        src={(user.image?.length > 0) ? `data:image/*;base64,${user.image}` : 'user (1).png'}
                        alt="Profile"
                        className="profile-pic"
                        onMouseOver={(e) => {
                            e.target.style.opacity = '0.5'
                        }}
                        onMouseOut={(e) => {
                            e.target.style.opacity = '1'
                        }}
                        onClick={() => user.image?.length > 0 && setShowDp(true)}
                    />
                </NavLink>
                {/* {user.image?.length > 0 && } */}
                {showDp && <div className="popup-overlay" onClick={() => setShowDp(false)}>
                    <img src={`data:image/*;base64,${user.image}`} alt="Full Profile" className="popup-image" />
                </div>}
                <button className="edit-btn" onClick={() => navigate('/editDetails', { state: { user: user } })}>
                    <NavLink><img src="pencil.png" style={{ height: '20px' }} /></NavLink> {/* Edit icon (You can replace with an actual icon from FontAwesome or Material UI) */}
                </button>

                <h2>{user.firstName} {user.lastName}</h2>
                <p><strong>Email:</strong> <span>{user.emailId}</span></p>
                <p><strong>Contact:</strong> <span>{user.contactNo}</span></p>
                <p><strong>Birth Date:</strong> <span>{new Date(user.birthDate).toDateString()}</span></p>
                <p><strong>Gender:</strong> <span>{user.gender === "M" ? "Male" : "Female"}</span></p>
                <p><strong>Role:</strong> <span>{user.role}</span></p>
            </div>

            <br />
            <br />
            {/* {user.role == 'admin' && <AllUser />} */}
            {user.role == 'admin' && <AllUser />}
        </>
    );
};

export default UserCard;
