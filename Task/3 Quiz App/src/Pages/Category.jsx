import React, { useEffect, useRef, useState } from "react";
import "./Category.css"; // Import CSS file
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import NextPrevious from "../components/NextPrevious";
import axios from "axios";
import * as Yup from 'yup';
import Loading from "../components/Loading";
import TryAgain from "../components/TryAgain";


const Category = () => {
  let navigate = useNavigate();
  const doneImg = useRef(null);
  const [category, setCategory] = useState([])
  const [toggleDone, setToggleDone] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tryAgain, setTryAgain] = useState(false)

  // let items = ["Math 🧮", "Science 🔬", "History 📜", "Geography 🌍", "Sports ⚽", "Animals 🦁", "Geography 🌍", "Sports ⚽", "Geography 🌍", "Sports ⚽", "Geography 🌍", "Sports ⚽"];

  async function getCategory() {
    setLoading(true);
    try {
      let response = await axios.get('/getcategory');
      console.log(response.data.data);
      setCategory(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Some error occured, please try agin leter");
      setLoading(false);
      setTryAgain(true);
    }
  }

  // useEffect(() => getCategory(), []) // this not valid because arraow function without {} (curly braces) should return a value
  useEffect(() => {
    let quiz = JSON.parse(localStorage.getItem('quiz'));
    if (quiz && Object.keys(quiz).length > 0) {
      getCategory()
    } else {
      alert('Please register your name fisrt');
      navigate('/');
    }
  }, [])

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required("* Required"),
    }),
    onSubmit: values => {
      console.log('onsubmit values ', values);
      let quiz = JSON.parse(localStorage.getItem('quiz'));
      if (quiz?.name) {
        quiz.category = values.name;
        localStorage.setItem('quiz', JSON.stringify(quiz));
        setToggleDone(true);
        // doneImg.current.style.display = 'block'
      } else {
        alert('Please first enter your name');
        navigate('/');
      }
    }
  })

  return (
    <>
     {loading && <Loading />}
     {tryAgain && <TryAgain />}

      <div className="category-container">
        <h1>Select Category of Quiz</h1>
        <div className="grid-container">
          {category.map((val, index) => (
            <div key={index} className="grid-item" onClick={() => {
              setToggleDone(false)
              formik.setFieldValue('name', val)
            }}>
              {val}
            </div>
          ))}
        </div>
      </div>

      <div className="home-container" style={{ position: 'relative' }}>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" placeholder="Select category" className="home-input" name='name' disabled
            onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name ? (<div style={{ margin: '10px', fontFamily: 'monospace' }}>{formik.errors.name}</div>) : null}

          <button type="submit" className="home-button">
            Done
          </button>
          {/* <img src='thumbs-up.png' alt='done' className="done" ref={doneImg} /> */}
        </form>
      </div>

      {toggleDone ? <NextPrevious next={'about'} previous={'/'} /> : <NextPrevious previous={'/'} />}
      {/* <div className="image-container">
        <img src="previous.png" alt="Previous" width="50" onClick={() => navigate('/')} />
        <img src="next.png" alt="Next" width="50" onClick={() => navigate('/about')} />
      </div> */}
    </>
  );
};

export default Category;
