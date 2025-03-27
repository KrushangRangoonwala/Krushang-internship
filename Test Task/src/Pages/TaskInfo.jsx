import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup'

let q = 1;

const TaskInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [Task, setTask] = useState({})
    const [updateTaskId, setUpdateTaskId] = useState()

    function handleAddTask(values) {
        let d = JSON.parse(localStorage.getItem('q'));
        let id = d ? localStorage.setItem('q', d) : localStorage.setItem('q', q);
        id++;
        let user_id = JSON.parse(localStorage.getItem('user'))
        let allUSerTasks = JSON.parse(localStorage.getItem('task')) || []
        // setLoader(true);
        const payload = {
            id: id,
            user_id: user_id.id,
            title: values.title,
            desc: values.desc,
        }
        allUSerTasks.push(payload)
        localStorage.setItem('tasks', JSON.stringify(allUSerTasks));
        navigate('/tasks');
    }

    function handleUpdateTask(values) {
        // let d = localStorage.getItem('q');
        // let id = d ? localStorage.setItem('q', d) : localStorage.setItem('q', c);
        // id++;
        let user_id = JSON.parse(localStorage.getItem('user'));
        let allUSerTasks = JSON.parse(localStorage.getItem('task'));
        let tempTask = allUSerTasks.filter((x) => x.id !== id)
        // setLoader(true);
        const payload = {
            id: updateTaskId,
            user_id: user_id.id,
            title: values.title,
            desc: values.desc,
        }
        tempTask.push()
        localStorage.setItem('tasks', JSON.stringify(payload));
        navigate('/tasks');
    }

    useEffect(() => {
        if (id) {
            let tasks = JSON.parse(localStorage.getItem('task'))
            let t = tasks.filter((x) => x.id === id);
            setTask(t);
            formik.setValues(t);
            setUpdateTaskId(t.id);
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            desc: '',
        },
        validationSchema: yup.object({
            title: yup.string().required('* Required'),
            desc: yup.string().required('* Required'),
        }),
        onSubmit: values => {
            console.log("values ", values);
            id ? handleUpdateTask(values) : handleAddTask(values);
        }
    })
    return (
        <>
            <div className="center">
                <div className="auth-container">
                    <div className="signup-container" style={{ height: 'auto' }}>

                        <form className="signup-form" onSubmit={formik.handleSubmit} style={{ boxShadow: '0 0px 0px rgba(0, 0, 0, 0.1)', padding: '0px' }}>

                            <div className='input-div-container'>
                                <input id='title'
                                    type="text" name="title" placeholder="Title" style={formik.touched.title && formik.errors.title && { marginBottom: '40px' }}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}
                                    required
                                />
                                {formik.touched.title && formik.errors.title ? (<div className='error'>{formik.errors.title}</div>) : null}
                            </div>

                            <div className='input-div-container'>
                                <textarea id='desc' rows={5} cols={43}
                                    name="desc" placeholder="Description about Task"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.desc}
                                    required />

                                {/* <input id='desc'
                                    type="text" name="desc" placeholder="Description about Task" style={formik.touched.desc && formik.errors.desc && { marginBottom: '40px' }}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.desc}
                                    required
                                /> */}
                                {formik.touched.desc && formik.errors.desc ? (<div className='error'>{formik.errors.desc}</div>) : null}
                            </div>

                            <br />
                            <button type="submit">{id ? 'Edit Task' : 'Add Task'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskInfo
