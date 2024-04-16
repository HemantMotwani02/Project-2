import React from 'react';
import { Link } from 'react-router-dom';


function Task(props) {

    return (

        <>

            <div style={{ borderRadius: '0.6em', width: '80vw', backgroundColor: '#E0F1FD', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px ', margin: '15px 0' }}>

                <div >
                    {/* <h4>Name</h4> */}

                    <p style={{ fontWeight: 'bold' }}>Task Name:- {props.title}</p>
                </div>

                <div >
                    {/* <h4>Description</h4> */}
                    <p style={{ wordBreak: 'break-all' }}>Task Details:- {props.description} </p>
                </div>

                {/*View Logs*/}
                <div>
                    <Link to={`/logs/${props.projectId}`}>  <button style={{ width: '100px', fontSize: '12px' }} >View Logs</button>
                    </Link>
                    {/* ${props.projectId} */}
                </div>

                {/*Time*/}
                <div style={{ color: 'grey', fontSize: '13px', alignSelf: 'flex-end', margin: '20px -15px -20px 0' }}>
                    <span style={{ margin: '0 15px' }}>{props.CreatedBy}</span>
                    <span>{props.Time.split('T')[0]}</span>
                </div>
            </div>
        </>
    )
}

export default Task;


// Using Skeleton loader
// const MyComponent = React.lazy(() => import('./MyComponent'));

/*
-> Steps to implement lazy loading
1) Recognize the component for lazy loading
2) Import lazy() and suspense components from the react package
3) Use lazy() function to dynamically import the component you want to lazy load.
4) Wrap the lazy-loaded component in a suspense component.


*/