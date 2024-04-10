import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';





function Log(props) {
    const [color, setColor] = useState('');

    useEffect(() => {
        switch (props.status) {
            case 'Rejected':
                setColor('danger'); break;
            case 'Approved':
                setColor('success'); break;
            default:
                setColor('warning'); // Default to warning for any other status
                break;

        };
    }, [])

    return (
        <>
            <tr>
                <th scope="row">{props.id}</th>
                <td>{props.taskName}</td>
                <td>{props.taskDesc}</td>
                <td>{props.desc}</td>
                <td>{props.by}</td>
                <td>{props.date}</td>
                <td>

                    <MDBBadge color={color} pill>
                        {props.status}
                    </MDBBadge></td>

            </tr>
        </>
    )
}

export default Log;
