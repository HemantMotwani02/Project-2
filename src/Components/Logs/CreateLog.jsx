import Axios from 'axios';
import React, { useState } from 'react';

function CreateLog() {
    let [Description, setDescription] = useState();
    let [startTime, setStartTime] = useState();
    let [endTime, setEndTime] = useState();

    function HandleCreateTask() {

        const LogData = {
            desc: Description,
            StartTime: startTime,
            EndTime: endTime,
            uid: props.pid
        }

        const response = Axios.post('http://10.0.2.63:8000/add/task', LogData);
        console.log(response.data);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'Description':
                setDescription(value);
                break;
            case 'startTime':
                setStartTime(value);
                break;
            case 'endTime':
                setEndTime(value);
                break;
            default:
                break;
        }
    }

    function HandleResetTask() {
        setDescription('');
        setStartTime('');
        setEndTime('');
    }


    return (
        <>
            <div className="login-page" >

                <div className="form" style={{ border: '1px solid grey' }}>
                    <h3 style={{ margin: '0 0 30px 0' }}>Log</h3>
                    <form className="login-form">
                        <textarea placeholder='Description' name='Description' value={Description} onChange={handleChange} />
                        <input type="time" placeholder="Start Time" name='startTime' value={startTime} onChange={handleChange} />
                        <input type="time" placeholder="End Time" name='endTime' value={endTime} onChange={handleChange} />
                        {/* <input type="password" placeholder="password" /> */}
                        <button type='submit' onClick={HandleCreateTask}>Log</button>
                        <button id='discard-btn' type='reset' onClick={HandleResetTask}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateLog;
