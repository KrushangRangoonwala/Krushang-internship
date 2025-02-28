// this result.jsx file
import React, { useEffect, useState } from "react";
import "./result.css"; // Import CSS file
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../components/Loading";
import TryAgain from "../components/TryAgain";

const Result = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const [user, setUser] = useState({})
    const [result, setResult] = useState([{}]);
    console.log("result ",result);
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [totalCorrect, setTotalCorrect] = useState(0)
    console.log(totalCorrect,"totalCorrect")
    const [totalIncorrect, setTotalIncorrect] = useState(0)
    const [loading, setLoading] = useState(true)
    const [tryAgain, setTryAgain] = useState(false)

    function setData2() {
        console.log('sdfsd')
        let total_correct = 0;
        let total_incorrect = 0;
        let total_question = 0;
        for (let x of result) {
            total_correct += (x.correct == '' ? 0 : x.correct?.split(',').length);
            total_incorrect += (x.incorrect == '' ? 0 : x.incorrect?.split(',').length);
            total_question += x.question?.length;
        }
        setTotalCorrect(total_correct);  // here its not working 
        setTotalIncorrect(total_incorrect);  // here its not working 
        setTotalQuestions(total_question);  // here its not working 
        // still my value is not updated in page : 
        // for (let x of result) {
        //     console.log(x)
        //     setTotalCorrect((totalCorrect) => totalCorrect + x.correct?.length);   // shold not update useState in loop, instead create a varible ,then update varible, then store varible's value in state
        //     setTotalIncorrect(totalIncorrect + x.incorrect?.length);  // shold not update useState in loop, instead create a varible ,then update varible, then store varible's value in state
        //     setTotalQuestions(totalQuestions + x.question?.length);  // shold not update useState in loop, instead create a varible ,then update varible, then store varible's value in state
        // }
    }

    // useEffect(() => {
    //     console.log("Updated Total Correct:", totalCorrect);
    //     console.log("Updated Total Incorrect:", totalIncorrect);
    //     console.log("Updated Total Questions:", totalQuestions);
    // }, [totalCorrect, totalIncorrect, totalQuestions]); // Runs when these states update

    useEffect(() => {
        // console.log(result.length)
        result?.length > 0 && setData2();
        setLoading(false);
    }, [result])

    async function getTotalResult(id) {
        setLoading(true);
        try {
            setTimeout(async () => {   // it should take time to execute post request ,because server takes time to store level-3 data, othervise inserver response it only gives level-1,2 's data
                let response = await axios.get(`/getresultrow/${id}`);
                console.log(response.data.data);
                setResult(response.data.data);
                console.log(response)
                // setLoading(false);
                // setData();  //put it inside useEffect to make in synchronouse

                if (response.data.data?.length == 0) {
                    alert('Please Complete your quiz first')
                    navigate('/quiz')
                }
            }, 1000);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setTryAgain(true);
        }
    }

    useEffect(() => {
        // console.log('dfsdfsd')
        let quiz = JSON.parse(localStorage.getItem('quiz'));
        if (quiz && Object.keys(quiz).length > 0) {
            setUser(quiz);
            getTotalResult(quiz.id);
        } else {
            alert('Please give test first');
            navigate('/');
        }
    }, []);

    return (
        <>
            {loading && <Loading />}
            {tryAgain && <TryAgain />}

            <div className="gif-container">
                <img src="banners-unscreen.gif" alt="Celebration Banner" />
                <img src="celebration-unscreen.gif" alt="Celebration GIF" />
            </div>

            <div className="result-container">
                <h1 className="result-title">Quiz Result 📊</h1>
                <div className="quiz-info" style={{ marginBottom: '10px', height: '90px'}}>
                    <div className="quiz-info-left">
                        <p>Name</p>
                        <h2>{user.name}</h2>
                    </div>
                    <div className="quiz-info-right">
                        <p>Category</p>
                        <h2>{user.category}</h2>
                    </div>
                </div>
                {result && console.log(result)}
                <div className="result-box-container">
                    {result && result.map((value, index) =>   // never put curly braces after array function inside map, othervise u don't get output, and no error will display
                        <div className="result-box" key={index}>
                            <h2> {value.level == 1 ? 'Bronze' : value.level == 2 ? 'Silver' : value.level == 3 ? 'Gold' : null}</h2>
                            <p>📝 Total Questions: {value.question?.length}</p>
                            <p>✅ Correct: {value.correct == '' ? 0 : value.correct?.split(',').length} | ❌ Incorrect: {value.incorrect == '' ? 0 : value.incorrect?.split(',').length}</p>
                        </div>
                        // setTotalCorrect(totalCorrect + value.correct?.length);    // this three lines gives error : 'Too many re-renders', so put it in a diffrent functin `setData()`
                        // setTotalIncorrect(totalIncorrect + value.incorrect?.length);
                        // setTotalQuestions(totalQuestions + value.question?.length);
                    )}
                </div>

                <div className="total-box">
                    <h2>Final Score 🏆</h2>
                    <p>📊 Total Questions: {totalQuestions}</p>
                    <p>✅ Total Correct: {totalCorrect} | ❌ Total Incorrect: {totalIncorrect}</p>
                    {/* <p> Total Score: {totalScore} Points</p> */}
                </div>

                <button className="print-button" onClick={() => window.open('http://localhost:5173/printResult',"_blank")}>🖨️ Print Result</button>
            </div>
            <button type="submit" id='previousResult' className="home-button" style={{ marginTop: '15px',  }} onClick={() => navigate('/')}>
                Want to restart Quiz
            </button>
        </>
    );
};

export default Result;

// below result.css file


//chatgpt :  you make its style vertically long , but now make horizontally long 