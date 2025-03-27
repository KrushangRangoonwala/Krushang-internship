import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './taskTable.css'

const TaskTable = () => {
    const [allTasks, setAllTasks] = useState([])
    let navigate = useNavigate();

    function deleteTask(id) {
        if (confirm(`You are going to delete \ntask : ${task.title} \nAre You Sure?`)) {
            try {
                let all = localStorage.getItem('tasks')
                let updatedTasks = all.filter((x) => x.id !== id)
                localStorage.setItem(JSON.stringify(updatedTasks));
                window.location.reload();
            } catch (error) {
                console.log(error);
                // alert('Some error occured \n User is not deleted');
            }
        }
    }

    useEffect(() => {
        let temp = localStorage.getItem('tasks');
        let user = localStorage.getItem('user')
        let userTasks = temp.map(((x) => x.user_id === user.id));
        setAllTasks(userTasks);
    }, [])

    return (
        <>
            <table>
                <tr>
                    <th>Sr no.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th></th>
                    <th></th>
                </tr>

                {allTasks.map((x, i) => {
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{x.title}</td>
                        <td>{x.desc}</td>
                        <td style={{ width: '40px', textAlign: 'center' }} onClick={() => navigate(`/tasks/${x.id}`)}>
                            <NavLink><img src="pencil.png" style={{ height: '20px' }} /></NavLink>
                        </td>
                        <td style={{ width: '40px', textAlign: 'center' }} onClick={() => deleteTask(x.id)}><NavLink><img src="trash.png" style={{ height: '20px' }} /></NavLink></td>
                    </tr>
                })}
            </table>
        </>
    )
}

export default TaskTable
