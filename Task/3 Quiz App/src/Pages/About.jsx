import React, { useEffect } from "react";
import "./about.css"; // Import CSS file
import { useNavigate } from "react-router";
import NextPrevious from "../components/NextPrevious";

const About = () => {
  let navigate = useNavigate();

  useEffect(() => {
    document.getElementById('hiddenNextBtn').style.display = 'none';
  },[])

  return (
    <>
    <img src='doubt-unscreen.gif' className="gif-RHS"/>
    <img src='start-unscreen.gif' className="gif-LHS"/>
      <div className="about-container">
        <h1 className="about-title">📜 Quiz Rules</h1>
        <ul className="about-rules">
          <li> <img src="mark.png" className="right_mark" /> Each quiz has multiple-choice questions.</li>
          {/* <li> <img src="mark.png" className="right_mark" /> Select the best answer before time runs out! ⏳</li> */}
          <li> <img src="mark.png" className="right_mark" /> No second chances—think carefully! 🤔</li>
          <li> <img src="mark.png" className="right_mark" /> Each correct answer gives you points. 🎯</li>
          <li> <img src="mark.png" className="right_mark" /> Aim for the highest score and have fun! 🎉</li>
          {/* <li> <img src="mark.png" className="right_mark" /> Aim for the highest score and have fun! 🎉</li> */}
          <br/>
          <b>Quiz Structure</b>
          <li> <img src="mark.png" className="right_mark" /> Quiz has 3 levels </li>
          <li> 🎯 Total and Passing Marks for each level</li>
          <li ><table style={{ marginLeft: 'auto', marginRight: 'auto'}}><tbody>
            <tr>
              <th style={{ paddingRight: '60px'}}></th>
              <th style={{ paddingRight: '10px'}}>Total marks</th>
              <th style={{ paddingRight: '10px'}}>Passing marks</th>
            </tr>
            <tr>
              <td>Bronze</td>
              <td className="marks">5</td>
              <td className="marks">4</td>
            </tr>
            <tr>
              <td>Silver</td>
              <td className="marks">5</td>
              <td className="marks">3</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td className="marks">10</td>
              <td className="marks">7</td>
            </tr>
            </tbody></table></li>
            <li> <img src="mark.png" className="right_mark" /> You can't quit the Quiz, once it start 🏁</li>
        </ul>
      </div>
      <button className="about-button" onClick={() => {
        confirm('Are you sure, you want to start Quiz ? ') && navigate('/quiz')}}>
        Start Quiz 🚀
      </button>

      <NextPrevious previous={'/category'}/>
    </>
  );
};

export default About;
