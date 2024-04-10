import React from 'react'

function Profile(props) {
    return (
        <>
        
            <div style={{border:'1px solid #F0F0F0',width:'250px',height:'150px',padding:'10px', borderRadius:'0.8em',backgroundColor:"white", position:'absolute',zIndex:'10', right:'10px'}}>
                <p>{props.userName}</p>
                <p>{props.userRole}</p>
                <button style={{backgroundColor:'#f56161'}}>Log out</button>
            </div>
        </>
    )
}

export default Profile
