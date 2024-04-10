import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Login.css';

function Login() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // function handleSubmit(event) {
    //     event.preventDefault(); // Prevent default form submission behavior

    //     const data = { email, password };
    //     Axios.post('http://127.0.0.1:8000/login', data)
    //         .then(response => {
    //             // Handle successful response
    //             console.log('Data sent');
    //             console.log('Response data:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error occurred during login:', error);
    //         });
    // }

    return (
        <>
            <h1>Login</h1>
            {/* <form onSubmit={handleSubmit}>
                <div classNameName="mb-3">
                    <label htmlFor="Email" classNameName="form-label">Email address</label>
                    <input type="email" classNameName="form-control" id="Email" aria-describedby="emailHelp" placeholder='Enter your email' name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div classNameName="mb-3">
                    <label htmlFor="Password" classNameName="form-label">Password</label>
                    <input type="password" classNameName="form-control" id="Password" placeholder='Enter your password' name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" classNameName="btn btn-primary">Submit</button>
            </form> */}



         
        </>
    )
}

export default Login;
