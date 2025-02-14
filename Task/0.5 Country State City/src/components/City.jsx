import React from 'react'
import Navbar from './Navbar'


const City = () => {
    function renderCity(){
        
    }

    function previousPage(){

    }
    function nextPage(){
        
    }

    return (
        <div>
            <Navbar />
            <div className='container2'>
                <h2><label>Country</label><br /></h2>
                <select>
                    <option value=''>Select country</option>
                    <option value='india'>India</option>
                    <option value='usa'>USA</option>
                    <option value='canada'>Canada</option>
                    <option value='russia'>Russia</option>
                    <option value='australia'>Australia</option>
                </select><br /><br />
                <div>
                    <button onClick={previousPage}>Previous</button>
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default City
