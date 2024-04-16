import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Log from './Log';
const Log = lazy(() => import('./Log'));

function Logs() {
    const { projectId } = useParams();
    const [logdata, setLogdata] = useState([]);
    const [logCount, setLogCount] = useState(0);

    // View Logs
    useEffect(() => {
        console.log(projectId);

        async function showLogs(id) {
            const response = await Axios.get(`http://10.0.2.63:8000/logs/${id}`);;
            setLogdata(response.data.logdata);
            setLogCount(response.data.logdata.length);
            console.log(logdata);
        }
        // response.data.logdata.lid
        // response.data.logdata.ldata
        // response.data.logdata.uname
        // response.data.logdata.created_date
        // response.data.logdata.logstatus


        showLogs(projectId);

    }, []);

    return (
        <>
            <h2>Total Logs ({logCount})</h2>

            <MDBTable align='middle'>

                <MDBTableHead dark>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Task Name</th>
                        <th scope='col'>Task Description</th>
                        <th scope='col'>Log Description</th>
                        <th scope='col'>Created By</th>
                        <th scope="col">Log Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>

                    <Suspense fallback='{Logs are Loading...}'>
                        {logdata.map(log => <Log id={log.lid} desc={log.logdata} by={log.uname} date={log.created_date} status={log.logstatus} taskName={log.tname} taskDesc={log.tdesc} />)}
                    </Suspense>

                    {/* <Log /> */}
                </MDBTableBody>

            </MDBTable>

        </>
    )
}

export default Logs;



//danger
//warning



















