import Axios from 'axios';
import React, { useState } from 'react';

function Task() {
    const [taskname, setTaskname] = useState('');
    const [taskinfo, setTaskinfo] = useState('');

    async function TaskData() {
        const response = await Axios.get('http://10.0.2.63:8000/');
        console.log(response.data);
        setTaskname(response.data.projectdata[1].tasks[0].tname);
        setTaskinfo(response.data.projectdata[1].tasks[0].tdesc);

    }
    TaskData();

    return (

        <>
            <h1>Task</h1>
            <div style={{ border: '1px solid #D6D5D5', borderRadius: '0.8em', width: '70vw', backgroundColor: '#EFECFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px ' }}>


                {/*Project Details*/}
                <div >
                    {/* <h4>Name</h4> */}

                    <p style={{fontWeight:'bold'}}>{taskname}</p>
                </div>


                {/*Team Members*/}
                <div >
                    {/* <h4>Description</h4> */}
                    <p>{taskinfo}</p>
                </div>
            </div>
        </>
    )
}

export default Task
