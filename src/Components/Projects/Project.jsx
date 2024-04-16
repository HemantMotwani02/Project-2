// Project.jsx
import Axios from 'axios';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Placeholder from '../Placeholder';
import Sidebar from '../Sidebar/Sidebar';
import './Project.css';
import ProjectDetails from './ProjectDetails';
import ProjectTitle from './ProjectTitle';

const Task = lazy(() => import('../Tasks/Task'));

function Project(props) {
    const [projectData, setProjectData] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        if (selectedProjectId !== null) {
            // Perform actions based on the selected project ID
            console.log("Selected Project ID:", selectedProjectId);
        }
    }, [selectedProjectId]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get('http://10.0.2.63:8000/');
                setProjectData(response.data.projectdata[1]);
                setUserName(response.data.userdata.uname);
                setUserRole(response.data.userdata.urole);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        }

        fetchData();
    }, []);



    return (
        <>

            <div id='projectpage'>
                {/*Project*/}
                <div>
                    <Navbar userName={userName} userRole={userRole} />
                    {projectData && (
                        <>
                            <ProjectTitle pid={projectData.project.pid} title={projectData.project.pname} />
                            <ProjectDetails
                                description={projectData.project.pdesc}
                                time={projectData.project.created_date}
                                Members={projectData.names.map(member => member.uname)}
                            />
                            <h3>Task</h3>

                            {projectData.tasks.map(task => (
                                <Suspense fallback={<Placeholder />}>
                                    <Task
                                        key={task.tid}
                                        title={task.tname}
                                        description={task.tdesc}
                                        Time={task.created_date}
                                        CreatedBy={task.uname}
                                        projectId={projectData.project.pid}
                                    />
                                </Suspense>
                            ))}
                        </>
                    )}
                    <Footer />
                </div>


                {/*Sidebar*/}
                <div><Sidebar onProjectSelect={setSelectedProjectId} /></div>
            </div>
        </>
    );
}

export default Project;




