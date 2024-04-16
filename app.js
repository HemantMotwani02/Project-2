const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:5173', // Change this to match your React app's URL
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => { res.send('Server'); });
app.post('/login', (req, res) => {
    console.log("Request received");

    if (req.body.email === 'test@gmail.com' && req.body.password === '123') {
        const token = jwt.sign({ email: req.body.email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
        console.log(token);
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).send('Login Successful');
    }
    else {
        res.send('Invalid Credentials');
    }
});


app.post('/Register',(req,res)=>{
    console.log(req.body);

    if (req.body.email !== '') {

        const token = jwt.sign({ email: req.body.email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
        console.log(token);
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });

        res.status(200).send('User Registered Successfully');
    }
    else {
        res.send('Registration Failed');
    }
})


app.listen(port, () => { console.log('Server Started at port: ', port) });





