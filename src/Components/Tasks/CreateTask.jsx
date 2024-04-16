import Axios from 'axios';
import React, { useState } from 'react';
import './CreateTask.css';

function CreateTask(props) {
    let [taskName, setTaskName] = useState();
    let [taskDetails, setTaskDetails] = useState();
    let [estimateTime, setEstimateTime] = useState();


    function HandleCreateTask() {

        const TaskCreateData = {
            tname: taskName,
            tdesc: taskDetails,
            EstimateTime: estimateTime,
            uid: props.pid
        }

        const response = Axios.post('http://10.0.2.63:8000/add/task', TaskCreateData);
        console.log(response.data);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'taskName':
                setTaskName(value);
                break;
            case 'taskDetails':
                setTaskDetails(value);
                break;
            case 'estimateTime':
                setEstimateTime(value);
                break;
            default:
                break;
        }
    }

    function HandleResetTask()
    {
        setTaskName('');
        setTaskDetails('');
        setEstimateTime('');
    }


    return (
        <>
            <div className="login-page" style={{ position: 'absolute', top: '250px', }} >

                <div className="form" style={{ border: '1px solid grey' }}>
                    <h3 style={{ margin: '0 0 30px 0' }}>Task Form</h3>
                    <form className="login-form">
                        <input type="text" placeholder="Task Name" name='taskName' value={taskName} onChange={handleChange} />
                        <textarea placeholder='Task Details' name='taskDetails' value={taskDetails} onChange={handleChange} />
                        <input type="number" placeholder="Estimate Time" name='estimateTime' value={estimateTime} onChange={handleChange} />
                        {/* <input type="password" placeholder="password" /> */}
                        <button type='submit' onClick={HandleCreateTask}>Create Task</button>
                        <button id='discard-btn' type='reset' onClick={HandleResetTask}>Discard</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateTask;
