import axios from 'axios';
import React, { useEffect } from 'react'

const PrintResult = () => {
    async function handlePrint(id) {
        try {
            const response = await axios.get(`getresult/${id}`);
            console.log(response.data.data)
            // document.documentElement.outerHTML = response.data.data;  // should it run ?
            document.open();  // Clear current document
            document.write(response.data.data);  // Write new content
            document.close();  // Close and render the document
           setTimeout(() => {
            confirm('Want to download your result ?') && window.print();
           }, 500);;
    
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    useEffect(() => {
        let quiz = JSON.parse(localStorage.getItem('quiz'));
        if (quiz && Object.keys(quiz).length > 0) {
            handlePrint(quiz.id);
        } else {
            alert('Please give test first');
            navigate('/');
        }
    }, [])

    return (
        <div>

        </div>
    )
}

export default PrintResult
