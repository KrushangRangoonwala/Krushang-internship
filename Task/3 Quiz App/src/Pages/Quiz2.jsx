import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css"; // Import CSS file
import axios from "axios";
import { useNavigate } from "react-router";

const Quiz2 = () => {
    let navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState([]);
    const [quizData, setQuizData] = useState([{}])
    const [level, setLevel] = useState(1)
    const [user, setuser] = useState({})
    // const [category, setCategory] = useState('')
    // const options = useRef(null)


    async function getQuizData() {
        console.log(user.category);
        try {
            let response = await axios.post('/getquestions', { category: user.category, level: level });
            console.log(response.data.data)
            setQuizData(response.data.data);
        } catch (err) {
            console.log(err)
            alert('Some error occured, please try again leter');
        }
    }

    useEffect(() => {
        // console.log(user)
        // user && Object.keys(user).length > 0 && getQuizData();  // as react assign {}(null object) value to `user` from our useState hook; SO, need to check whether user is empty or not becasue if it is empty then it gives error 'cannot read property of `user`
    }, [user])

    useEffect(() => {
        let quiz = JSON.parse(localStorage.getItem('quiz'));
        if (quiz && Object.keys(quiz).length > 0) {
            setuser(quiz); // runs useEffect[user] 
        } else {
            alert('Please register your name fisrt');
            navigate('/');
        }
    }, [])

    async function uploadResult() {
        try {
            let response = await axios.post('/postresult', {
                category: user.category,
                level: level,
                usrid: user.id,
                CorrectAns: correctCount.toString(),
                IncorrectAns: incorrectCount.toString(),
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleAnswerClick = (selectedOption) => {
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
            selectedOption.style.backgroundColor = '#007bff';
            selectedOption.style.transition = 'background-color 0.3s ease';
            options[i].style.backgroundColor = '#007bff';
            options[i].style.transition = 'background-color 0.3s ease';  // this is not working after clicking one option
            if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            }
        }, 1000);
    };

    useEffect(() => {
        user && Object.keys(user).length > 0 && getQuizData();
    }, [level])

    useEffect(() => {
        if (!(currentQuestion < quizData.length - 1)) {
            if ((correctCount.length > quizData.req_n) || correctCount.length == quizData.req_n) {
                uploadResult();
                if (level <= 3) {
                    setLevel(level + 1);
                    setCorrectCount([]);
                    setIncorrectCount([]);
                    setCurrentQuestion(0);
                    alert(`Quiz level ${level} Completed! 🎉\nMove to next level`);
                } else {
                    // getAllLevelResult();
                    navigate('/result');
                }
            } else {
                alert(`Sorry, you aren't pass quiz`)
                navigate('/')
            }
        }
    }, [correctCount])

    return (
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
    );
};

export default Quiz2;
