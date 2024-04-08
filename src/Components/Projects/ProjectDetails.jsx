import Axios from 'axios';
import React, { useState } from 'react';

function ProjectDetails() {
  const [projectData, setProjectData] = useState('');
  const [team, setTeam] = useState([]);

  async function TaskData() {
    const response = await Axios.get('http://10.0.2.63:8000/');
    console.log(response.data);

    setProjectData(response.data.projectdata[1].project.pdesc);
    setTeam(response.data.projectdata[1].names[1].uname);
    console.log("teams:\n", team);

  }
  TaskData();

  return (

    <>
      <h1>Project Details</h1>
      <div style={{ border: '1px solid #D6D5D5', borderRadius: '0.8em', width: '70vw', backgroundColor: '#EFECFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px ' }}>


        {/*Project Details*/}
        <div style={{ margin: '0 0 25px 0' }}>
          <h4>Details</h4>

          <p>{projectData}</p>
        </div>


        {/*Team Members*/}
        <div >
          <h4>Team Members</h4>
          <ul>
            <li>{team}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails
