import './navbar.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
    let nevigate = useNavigate();

    return (
        <div className="topnav">
            <span className="active" onClick={() => nevigate('/')}>Home</span>
            <span onClick={() => nevigate('/country')}>Country</span>
            <span onClick={() => nevigate('/state')}>State</span>
            <span onClick={() => nevigate('/city')}>City</span>
        </div>
    )
} 

export default Navbar
