import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css"; // Import CSS file
import axios from "axios";
import { useNavigate } from "react-router";

const Quiz = () => {
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
        console.log(user)
        Object.keys(user).length > 0 && getQuizData();
    }, [user])

    useEffect(() => {
        let quiz = JSON.parse(localStorage.getItem('quiz'));
        setuser(quiz); // runs useEffect[user]
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
        // console.log(selectedOption);
        let answer = quizData[currentQuestion].correct;
        let options = document.getElementById('options').querySelectorAll('.option-button');
        let i = 0;
        while (options[i].innerText != answer && i < quizData[currentQuestion].options.length) {
            i++;
        }
        // console.log(options[i]);
        options[i].style.backgroundColor = '#0f9912';

        if (selectedOption.innerText == options[i].innerText) {
            setCorrectCount([...correctCount, quizData[currentQuestion].id]);
        } else {
            setIncorrectCount([...incorrectCount, quizData[currentQuestion].id]);
            selectedOption.style.backgroundColor = '#b91d1d';
            // console.log(selectedOption);
        }

        setTimeout(() => {
            // Move to next question or show result
            let passingMarks;
            selectedOption.style.backgroundColor = '#007bff';
            selectedOption.style.transition= 'background-color 0.3s ease';
            options[i].style.backgroundColor = '#007bff';
            options[i].style.transition= 'background-color 0.3s ease';  // this is not working after clicking one option
            if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                switch (level) {
                    case 1: passingMarks = 3;
                        break;
                    case 2: passingMarks = 4;
                        break;
                    case 3: passingMarks = 7
                        break;
                    default:
                        break;
                }
                if(correctCount.length >= passingMarks){
                uploadResult()
                getQuizData();
                
                setLevel(level + 1);
                setCorrectCount([]);
                setIncorrectCount([]);
                setCurrentQuestion(0);
                alert(`Quiz level ${level} Completed! 🎉\nMove to next level`);
                } else {
                    alert(`Sorry, you aren't pass quiz`)
                    navigate('/')
                }
            }
        }, 2000);
    };

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

export default Quiz;
