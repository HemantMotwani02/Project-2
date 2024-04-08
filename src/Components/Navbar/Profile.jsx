import React from 'react'

function Profile() {
    return (
        <>
            <div style={{border:'1px solid grey',width:'250px',height:'150px',padding:'10px', borderRadius:'0.8em'}}>
                <p>Name</p>
                <p>Role</p>
                <button className=''>Log out</button>
            </div>
        </>
    )
}

export default Profile
