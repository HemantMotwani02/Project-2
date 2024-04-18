const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');
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
const Projects = db.projects;
const Teams = db.teams;

// Login
app.post('/login1', async (req, res) => {
    const { email, password } = req.body;
    try {

        let data = await Users.findOne({
            where: { email: email }
        });

        if (data) {
            const passwordMatch = await bcrypt.compare(password, data.password);
            if (passwordMatch) {
                const token = jwt.sign({ email: email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
                res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });
                res.status(200).send("Login Successfully");
                console.log("Login Successfully");
            }
            else {
                res.send("Wrong Password");
                console.log("Wrong Password");
            }
        }
        else {
            res.send("User does not exist");
        }

    } catch (error) {
        res.send("Error in Login");
        console.log("Error in Login", error);
    }

});


// Register
app.post('/register1', async (req, res) => {
    const { name, email, password, role } = req.body;


    try {

        if (!name || !email || !password || !role) { return res.status(400).json({ error: "Fill all the fields" }); }
        // if (!validator.isEmail(email)) { res.send("Enter Valid Email"); return; }
        // if (!validator.isStrongPassword(password)) { res.send("Weak Password"); return; }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = await Users.create({ name: name, email: email, password: hashedPassword, role: role });
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });
            res.status(200).json({ message: "User Registered Successfully" });
            console.log("User Registered Successfully");
        }

    } catch (error) {
        res.send("Error in Registration");
        console.log("Error in Registration");
    }

});



// Display Projects
app.get('/Projects', async (req, res) => {
    const { id, role } = req.body;

    // Projects for Super Admin
    if (role === "Super Admin") {
        let data = await Projects.findAll({
            where: { created_by: id }
        });

        res.status(200).json({ data });
    }
    // Projects for Manager
    else if (role === "Manager") {
        let data = await Projects.findAll({
            attributes: ['project_id', 'project_name', 'project_details', 'created_by', 'createdAt'],
            where: { manager_id: id }
        });
        res.status(200).json({ data });
    }
    // Projects for Employee
    else if (role === "Employee") {

        let data = await Teams.findAll({
            attributes: ['project_id'],
            where: { user_id: id }
        });

        let userProjects = await Teams.findOne({
            where: { project_id: data[0].project_id }
        });
        res.status(200).json({ userProjects });
    }
});




app.post('/Createproject', async (req, res) => {
    const { id, manager_id, project_name, project_details, role } = req.body;
    const newProject = await Projects.create({ manager_id: manager_id, project_name: project_name, project_details: project_details, created_by: id, updated_by: id, createdAt: new Date(), updatedAt: new Date() });
    
    if (newProject) {
        res.status(200).json({ newProject });
    }
    else { res.send("Error in creating project"); }
    
});
