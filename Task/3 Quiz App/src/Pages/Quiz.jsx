import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css"; // Import CSS file
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import TryAgain from "../components/TryAgain";

const Quiz = () => {
    let navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState([]);
    const [quizData, setQuizData] = useState([{}])
    const [level, setLevel] = useState(0)
    const [user, setuser] = useState({})
    const [passingMarks, setPassingMarks] = useState(0)
    const [toggleNextLevel, setToggleNextLevel] = useState(false);
    const ignoreFirstRender = useRef(true)
    const [loading, setLoading] = useState(true)
    const [tryAgain, setTryAgain] = useState(false)
    // const [category, setCategory] = useState('')
    // const options = useRef(null)


    async function getQuizData() {
        setLoading(true);
        console.log('level ', level)
        console.log(user.category);
        try {
            let response = await axios.post('/getquestions', { category: user.category, level: level });
            console.log(response.data.data);
            setQuizData(response.data.data);
            setPassingMarks(response.data.req_n);
            setLoading(false);
        } catch (err) {
            console.log(err)
            alert('Some error occured, please try again leter');
            setLoading(false)
            setTryAgain(true)
        }
    }

    // useEffect(() => {
    //     console.log(user)
    //     user && Object.keys(user).length > 0 && getQuizData();  // as react assign {}(null object) value to `user` from our useState hook; SO, need to check whether user is empty or not becasue if it is empty then it gives error 'cannot read property of `user`
    // }, [user])

    useEffect(() => {
        let quiz = JSON.parse(localStorage.getItem('quiz'));
        if (quiz && Object.keys(quiz).length > 0) {
            setuser(quiz); // runs useEffect[user] 
            setLevel(1);
        } else {
            alert('Please register your name fisrt');
            navigate('/');
        }
    }, [])

    async function uploadResult() {
        setLoading(true);
        try {
            let response = await axios.post('/postresult', {
                category: user.category,
                level: level,
                usrid: user.id,
                CorrectAns: correctCount.toString(),
                IncorrectAns: incorrectCount.toString(),
            })
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    function disableOptionBtn(toggle){
        let options = document.getElementById('options').querySelectorAll('.option-button');
        let i = 0;
        while (i < options.length) {
            toggle ? options[i].disabled = true : options[i].disabled = false;
            i++;
        }
    }

    const handleAnswerClick = (selectedOption) => {
        disableOptionBtn(true);
        let answer = quizData[currentQuestion].correct;
        let options = document.getElementById('options').querySelectorAll('.option-button');
        let i = 0;
        while (options[i].innerText != answer && i < quizData[currentQuestion].options.length) {
            i++;
        }
        options[i].style.backgroundColor = '#0f9912';

        if (selectedOption.innerText == options[i].innerText) {
            setCorrectCount([...correctCount, quizData[currentQuestion].id]);
        } else {
            setIncorrectCount([...incorrectCount, quizData[currentQuestion].id]);
            selectedOption.style.backgroundColor = '#b91d1d';
        }


        // Move to next question or show result
        setTimeout(() => {
            // let passingMarks;
            selectedOption.style.backgroundColor = '#007bff';
            selectedOption.style.transition = 'background-color 0.3s ease';
            options[i].style.backgroundColor = '#007bff';
            options[i].style.transition = 'background-color 0.3s ease';  // this is not working after clicking one option
            console.log('correctCount.length ', correctCount.length);
            if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setToggleNextLevel(true)
            }
            disableOptionBtn(false);
        }, 1000);
    };

    useEffect(() => {
        level != 0 && getQuizData();
    }, [level])

    useEffect(() => {
    //     console.log(" currentQuestion ", currentQuestion, "quizData.length ", quizData.length)
    //     console.log(!(currentQuestion < quizData.length - 1) && !ignoreFirstRender)
        if (ignoreFirstRender.current) {
            console.log(ignoreFirstRender.current);
            ignoreFirstRender.current = false;
            return;
        }
console.log(toggleNextLevel)
        if (toggleNextLevel) {
            console.log("correctCount.length ", correctCount.length, " res.data.req_n ", passingMarks)
            if (correctCount.length >= passingMarks) { // chatGpt solve this  : here correctCount is not update,  from above setCorrectCount takes time to update , any solution?
                uploadResult();
                if (level < 3) {
                    setLevel(level + 1);
                    setToggleNextLevel(false);
                    setCorrectCount([]);
                    setIncorrectCount([]);
                    setCurrentQuestion(0);
                    alert(`Quiz level ${level} Completed! 🎉\nMove to next level`);
                } else {
                    // getAllLevelResult();
                    // setTimeout(() => {
                        
                    // }, timeout);
                    navigate('/result');
                }

            } else {
                alert(`Sorry, you aren't pass quiz`)
                navigate('/')
            }
        }
    }, [toggleNextLevel, correctCount])

    return (
        <>
            {loading && <Loading />}
            {tryAgain && <TryAgain />}
            <div className="quiz-container">

                <h1 className="quiz-title">Quiz Time! 🎯</h1>
                <div className="quiz-title2">
                    <h3> </h3>
                    <h3 className="quiz-title" > <img src='start.png' height={30} /> Level: {level}</h3>
                </div>
                <div className="quiz-info">
                    <div className="quiz-info-left">
                        <p>📝 Total Questions: {quizData?.length}</p>
                        <p>❓ Question {currentQuestion + 1} of {quizData?.length}</p>
                    </div>
                    <div className="quiz-info-right">
                        <p>✅ Correct: {correctCount.length}</p>
                        <p>❌ Incorrect: {incorrectCount.length}</p>
                    </div>
                </div>

                <br />
                {/* <br/> */}
                <div className="question-box">
                    <h2>{quizData && quizData[currentQuestion].question}</h2>
                    <div className="options" id='options'>
                        {quizData && quizData[currentQuestion].options?.map((option, index) => (
                            <button key={index} className="option-button" onClick={(e) => handleAnswerClick(e.target)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Quiz;
