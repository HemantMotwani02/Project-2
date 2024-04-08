import React from 'react';
import '../Tasks/CreateTask.css';

function CreateTask() {
    return (
        <>

            <div class="login-page">

                <div class="form">
                    <h3 style={{ margin: '0 0 30px 0' }}>Task Form</h3>
                    <form class="login-form">
                        <input type="text" placeholder="Task Name" />
                        <textarea placeholder='Task Details' colspan='30' />
                        <input type="number" placeholder="Estimate Time" />
                        {/* <input type="password" placeholder="password" /> */}
                        <button>Create Task</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateTask
