import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
// import Profile from '../Navbar/Profile';
import Task from '../Tasks/Task';
import ProjectDetails from './ProjectDetails';
import ProjectTitle from './ProjectTitle';

function Project() {
    const [projectData, setProjectData] = useState(null);
    const [userName, setUserName] = useState(null)
;
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get('http://10.0.2.63:8000/');
                setProjectData(response.data.projectdata[1]);
                setUserName(response.data.userdata.uname);
                setUserRole(response.data.userdata.urole);
                // console.log(response.data.userdata.uname);
                // console.log(response.data.userdata.urole);
                
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        }

        fetchData();
    }, []);


    // View Logs
    useEffect(() => {
        async function showLogs(id) {


        }
    }, []);



    return (
        <>
            <Navbar  userName={userName} userRole={userRole}/>
            {/* <Profile /> */}
            {/* <Sidebar /> */}
            {projectData && (
                <>
                    <ProjectTitle title={projectData.project.pname} />
                    <ProjectDetails
                        description={projectData.project.pdesc}
                        time={projectData.project.created_date}
                        Members={projectData.names.map(member => member.uname)}
                    />
                    <h3>Task</h3>

                    {projectData.tasks.map(task => (
                        <Task
                            key={task.tid}
                            title={task.tname}
                            description={task.tdesc}
                            Time={task.created_date}
                            CreatedBy={task.uname}
                            projectId={projectData.project.pid}
                        />
                    ))}

                </>
            )}
            <Footer />
        </>
    );
}

export default Project;
