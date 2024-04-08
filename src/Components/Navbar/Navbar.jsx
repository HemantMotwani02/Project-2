
import React from 'react';

function Header() {
    

    function menu() {
        const profile = document.getElementsByClassName('profile');
        profile.style.display = 'none';
    }
    return (
        <>
            <div style={{ display: 'flex', border: '1px solid grey', padding: '10px', width: '80vw', justifyContent: "space-between", alignItems: 'center' }}>
                <input type="search" placeholder='Search Projects' style={{ padding: '0 0 0 40px', backgroundColor: 'white', border: '1px solid grey', borderRadius: '0.4em', height: '35px' }} />
                <img src='../../../public/profile.png' alt='profile' style={{ height: '45px' }} className='profile' onClick={menu} />
            </div>
        </>
    )
};

export default Header;