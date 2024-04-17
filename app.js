const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const bodyParser = require('body-parser');
const validator = require('validator');
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
        console.log('Login Successful');
    }
    else {
        res.send('Invalid Credentials');
        console.log('Invalid Credentials');
    }
});


app.post('/Register', (req, res) => {
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



















// New
const db = require('./models/index');
const Users = db.users;

app.post('/login1', async (req, res) => {
    const { email, password } = req.body;
    try {

        let data = await Users.findOne({
            where: { email: email }
        });

        if (data) {
            res.status(200).json(data);
        }
        else {
            res.send("User does not exist");
        }

    } catch (error) {
        res.send("Error in Login");
        console.log("Error in Login", error);
    }

});

app.post('/register1', (req, res) => {
    const { name, email, password, role } = req.body;


    // if (!validator.isEmail(email)) { res.send("Enter Valid Email"); return; }
    // if (!validator.isStrongPassword(password)) { res.send("Weak Password"); return; }

    try {
        if (name == '' || email == '' || password == '' || role == '') {
            res.send("Fill all the fields");
        }
        else {
            const token = jwt.sign({ email: email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
            console.log(token);
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });

            res.status(200).send('User Registered Successfully');
            return;
        }

    } catch (error) {
        res.send("Error in Registration");
        console.log("Error in Registration");
    }

});


app.get('/Projects', (req, res) => {
    const { userId, role } = req.body;
    const result = `
    role:'Manager'
    select * from projects where managerId = ${userId}
    role:'Employee'
    select projectId from team where userId = ${userId} Join
    role:'Super Admin'
    select * from projects where created_by = ${userId}
    `
    res.send(result);
});

app.post('/Createproject', (req, res) => {
    const { userId, projectName, projectDetails, assignTo } = req.body;
    const result = `Insert project details(userId,projectName,projectDetails,assignTo)`
    if (result) { res.send({ id: userId, assign: assignTo, name: projectName, details: projectDetails }) }
    else { res.send("Error in creating Project"); }


});




//npx sequelize-cli init

/*
npx sequelize-cli model:generate
--name User
--attributes
 user_id:integer,
 name:string,
 email:string,
 password:string,
 role:enum('Super Admin','Manager','Employee'),
 created_at:date,
 created_by:integer,
 updated_at:date,
 updated_by:integer,
 deleted_at:date
*/

/*
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo --name 20240416121740-create-user.js
npx sequelize-cli db:migrate:status
*/

/*
npx sequelize-cli seed:generate --name users-add
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
*/
// Today's Update:- 
//  - Conditional Rendering