import React from 'react';

function ProjectTitle() {
    return (
        <>

            {/* <div>
                <h3>Project Title</h3>
                <p>Status</p>
                <button>Create Task</button>
            </div> */}

            <div style={{ border: '1px solid #D6D5D5', borderRadius: '0.8em', width: '70vw', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px ' }}>
                {/*Project Details*/}
                <div style={{ margin: '0 0 25px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '65vw' }}>
                    <h2>Project Title</h2>
                    <p>Status</p>
                </div>
                <button>Create Task</button>
            </div>
        </>
    )
}

export default ProjectTitle
