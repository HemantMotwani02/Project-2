import Axios from 'axios';
import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const data = { email, password };
        Axios.post('http://127.0.0.1:8000/login', data)
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder='Enter your email' name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder='Enter your password' name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login;
