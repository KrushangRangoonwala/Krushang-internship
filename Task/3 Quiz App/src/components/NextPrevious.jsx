import React from 'react'
import { useNavigate } from 'react-router'

const NextPrevious = ({ next, previous }) => {
  let navigate = useNavigate();

  return (

    <div className="image-container">
      <img src="previous.png" alt="Previous" width="50" onClick={() => navigate(`${previous}`)} />
      {next ? <img src="next.png" id='nextBtn' alt="Next" width="50" onClick={() => navigate(`${next}`)} />
        : <img src="next.png" id='hiddenNextBtn' alt="Next" width="50" style={{ opacity: '0.5' }} />}
    </div>

  )
}

export default NextPrevious
