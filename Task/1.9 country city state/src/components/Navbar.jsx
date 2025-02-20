import './navbar.css'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let nevigate = useNavigate();
    const location = useLocation()
    var path;

    let pathname = location.pathname;
    let i = pathname.indexOf('/', 2);
    path = (i > 1) ? pathname.slice(1, i) : pathname.slice(1);
    console.log(path);
    // useEffect(async () => {
    // }, [])

    return (
        <>
        <div className="topnav">
            <span className={`${path == "" ? "active" : "navEle"}`} onClick={() => nevigate('/')}>Home</span>
            <span className={`${path == "country" ? "active" : "navEle"}`} onClick={() => nevigate('/country/view')}>Country</span>
            <span className={`${path == "state" ? "active" : "navEle"}`} onClick={() => nevigate('/state/view')}>State</span>
            <span className={`${path == "city" ? "active" : "navEle"}`} onClick={() => nevigate('/city/view')}>City</span>
        </div>
        <div style={{height: '55px'}}></div>
        </>
    )
}

export default Navbar
