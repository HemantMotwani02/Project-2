import React from 'react';
import './CreateTask.css';

function CreateTask() {
    return (
        <>

            <div class="login-page" style={{ position: 'absolute', top: '250px', }}>

                <div class="form" style={{ border: '1px solid grey' }}>
                    <h3 style={{ margin: '0 0 30px 0' }}>Task Form</h3>
                    <form class="login-form">
                        <input type="text" placeholder="Task Name" />
                        <textarea placeholder='Task Details' colspan='30' />
                        <input type="number" placeholder="Estimate Time" />
                        {/* <input type="password" placeholder="password" /> */}
                        <button>Create Task</button>
                        <button id='discard-btn' type='reset'>Discard</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateTask
