import React, { useEffect, useState } from "react";
import "./home.css"; // Import CSS file
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.baseURL = 'http://192.168.1.184:7000/quiz'
// http://localhost:5173/
const Home = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let quiz = JSON.parse(localStorage.getItem('quiz'));
    if (quiz?.name) {
      formik.setFieldValue('name', quiz.name);
    }
  }, [])

  async function addUser(name) {
    try {
      let response = await axios.post('/create', { name: name });
      console.log("response.data.data ", response.data.data)
      localStorage.setItem('quiz', JSON.stringify(response.data.data))
      navigate('/category');
    } catch (err) {
      console.log(err);
      alert('Some error occured\nplease try agin leter');
    }
  }

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[A-Za-z\s]{2,25}$/, "Name should only contain letters and spaces, with a minimum of 2 characters.")
        .required("* Required"),
    }),
    onSubmit: values => {
      console.log('onsubmit values ', values);
      addUser(values.name);
    }
  })

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Fun Quiz! 🎉</h1>
      <img src="quiz.png" alt="Thinking" className="home-image" />
      <img src="answer.png" alt="Answer" className="home-image" />

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="home-input"
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}

        <button type="submit" className="home-button">
          Next
        </button>
      </form>
    </div>
  );
};

export default Home;
