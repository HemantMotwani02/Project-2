import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            case 'role': setRole(value); break;
            default: return null;
        }
    }



    function handleRegister() {
        const data = { Name: name, Email: email, Password: password, Role: role };
        // http://10.0.2.63:8000
        Axios.post('http://127.0.0.1:8000/Register', data, { withCredentials: true })
            .then(response => {
                // Handle successful response
                console.log('Data sent');
                console.log('Response data:', response.data);
            })
            .catch(error => {
                console.error('Error occurred during login:', error);
            });
    }


    return (
        <>
            {/* <h1>Register</h1> */}
            <div id="login">

                <h2><span class="fontawesome-lock"></span>Sign Up</h2>

                <form action="javascript:void(0);" method="POST">

                    <fieldset>

                        <p><label for="name">Name</label></p>
                        <p><input type="text" name='name' id="name" placeholder='Enter your name' onChange={handleChange} /></p>

                        <p><label for="email">E-mail address</label></p>
                        <p><input type="email" name='email' id="email" placeholder='Enter your email' onChange={handleChange} /></p>

                        <p><label for="password" >Password</label></p>
                        <p><input type="password" name='password' id="password" placeholder='Enter your password' onChange={handleChange} /></p>

                        <p><label for="Role" >Role</label></p>
                        <select name='role' onChange={handleChange}>
                            <option>Super Admin</option>
                            <option >Manager</option>
                            <option selected>Employee</option>
                        </select>

                        <p><input type="submit" value="Register" onClick={handleRegister} /></p>

                    </fieldset>

                </form>
                <div><Link to='/Login'>Back to Login</Link></div>
            </div>
        </>
    )
}

export default Register;
