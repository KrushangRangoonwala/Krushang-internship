import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'

const cardStyles = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    textAlign: "center",
};

const containerStyles = {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    margin: "0",
};

const headingStyles = {
    margin: "0 0 10px",
    color: "#333",
};

const paragraphStyles = {
    margin: "5px 0",
    color: "#555",
    fontSize: "14px",
};

const ViewState = () => {
    const [details, setDetails] = useState({});
    let { id } = useParams();

    async function view(id) {
        let response = await axios.get(`http://192.168.1.56:3000/state/getStateId/${id}`);
        setDetails(response.data.data);
    }

    useEffect(() => {
        view(id);
    }, []);


    return (
        <>
            <div style={containerStyles}>
                <div style={cardStyles}>
                    <h2 style={headingStyles}>{details.name}</h2>
                    <p style={paragraphStyles}>
                        <strong>ID:</strong> {details.id}
                    </p>
                    <p style={paragraphStyles}>
                        <strong>Country ID:</strong> {details.countryMasterId}
                    </p>
                    <p style={paragraphStyles}>
                        <strong>Created At:</strong> {details.createdAt}
                    </p>
                    <p style={paragraphStyles}>
                        <strong>Updated At:</strong> {details.updatedAt}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ViewState
