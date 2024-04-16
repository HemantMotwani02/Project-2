// Sidebar.jsx
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import AvailProjects from './AvailProjects';
import './Sidebar.css';

function Sidebar({ onProjectSelect }) {
    const [projectList, setProjectList] = useState([]);
    
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await Axios.get('http://10.0.2.63:8000/');
                if (typeof response.data.projectdata === 'object') {
                    const projects = Object.keys(response.data.projectdata).map(key => {
                        const projectData = response.data.projectdata[key];
                        return {
                            pname: projectData.project.pname,
                            pid: projectData.project.pid
                        };
                    });
                    setProjectList(projects);
                } else {
                    console.error('Project data is not an object:', response.data.projectdata);
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        }
        fetchProjects();
    }, []);

    // Function to handle click on AvailProjects
    function handleProjectClick(pid) {
        console.log("Project ID:", pid);
        if (typeof onProjectSelect === 'function') {
            onProjectSelect(pid);
        }
    }

    return (
        <>
            <div id="nav-bar">
                <input id="nav-toggle" type="checkbox" />
                <div id="nav-header">
                    <a id="nav-title" href="#">Projects</a>
                    <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
                    <hr />
                </div>

                {/* Project Menu */}
                <div id="nav-content">
                    {projectList.map(project => (
                        <div onClick={() => handleProjectClick(project.pid)} key={project.pid}>
                            <AvailProjects
                                pid={project.pid}
                                pname={project.pname}
                            />
                        </div>
                    ))}
                    <div id="nav-content-highlight"></div>
                </div>
            </div>
            {/* Pass selectedPid to AnotherComponent */}
        </>
    );
}

export default Sidebar;
