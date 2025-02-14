import './navbar.css'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'; 

const Navbar = () => {
    let nevigate = useNavigate();
    const location=useLocation()
    console.log(location,"location")

    return (
        <div className="topnav">
            <span className={`${location.pathname ==="/"?"active":"navEle"}`} onClick={() => nevigate('/')}>Home</span>
            <span className={`${location.pathname ==="/country"?"active":"navEle"}`} onClick={() => nevigate('/country')}>Country</span>
            <span className={`${location.pathname ==="/state"?"active":"navEle"}`} onClick={() => nevigate('/state')}>State</span>
            <span className={`${location.pathname ==="/city"?"active":"navEle"}`} onClick={() => nevigate('/city')}>City</span>
        </div>
    )
} 

export default Navbar
