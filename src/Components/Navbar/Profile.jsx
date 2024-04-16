import React from 'react';

function Profile(props) {

    function Role(id) {
        switch (id) {
            case 1: return 'Super Admin';
            case 2: return 'Manager';
            case 3: return 'Employee';
            default: return null;
        }
    }

    function handleLogOut() {

    }

    return (
        <>

            <div style={{ border: '1px solid #F0F0F0', width: '250px', height: '150px', padding: '10px', borderRadius: '0.8em', backgroundColor: "white", position: 'absolute', zIndex: '10', right: '10px' }}>
                <p>{props.userName}</p>
                <p>{Role(props.userRole)}</p>
                <button style={{ backgroundColor: '#f56161' }} onClick={handleLogOut}>Log out</button>
            </div>
        </>
    )
}

export default Profile
