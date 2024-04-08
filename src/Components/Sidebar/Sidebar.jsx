import React from 'react';
import AvailProjects from './AvailProjects';
import './Sidebar.css';


function Sidebar() {

    return (
        <>
            

            <div id="nav-bar">

                <input id="nav-toggle" type="checkbox" />
                <div id="nav-header"><a id="nav-title" href="#" >P<i class="fab fa-codepen"></i>rojects</a>
                    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
                    <hr />
                </div>

                {/*Project Menu*/}
                <div id="nav-content">
                    <div class="nav-button"><i class="fas fa-palette"></i><span>Your Work</span></div>
                    <AvailProjects />
                    <div id="nav-content-highlight"></div>
                </div>
                {/* <input id="nav-footer-toggle" type="checkbox" /> */}

            </div>
        </>
    )
};

export default Sidebar;


{/* <div id="nav-footer">
    <div id="nav-footer-heading">
        <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" /></div>
        <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</a><span id="nav-footer-subtitle">Admin</span></div>
        <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">

    </div>
</div> */}