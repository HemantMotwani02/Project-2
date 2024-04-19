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

// app.post('/login', (req, res) => {
//     console.log("Request received");

//     if (req.body.email === 'test@gmail.com' && req.body.password === '123') {
//         const token = jwt.sign({ email: req.body.email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
//         console.log(token);
//         res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });
//         // res.setHeader('Access-Control-Allow-Credentials', 'true');
//         res.status(200).send('Login Successful');
//         console.log('Login Successful');
//     }
//     else {
//         res.send('Invalid Credentials');
//         console.log('Invalid Credentials');
//     }
// });


// app.post('/Register', (req, res) => {
//     console.log(req.body);

//     if (req.body.email !== '') {

//         const token = jwt.sign({ email: req.body.email, }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
//         console.log(token);
//         res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, });

//         res.status(200).send('User Registered Successfully');
//     }
//     else {
//         res.send('Registration Failed');
//     }
// })


app.listen(port, () => { console.log('Server Started at port: ', port) });






















// New
const db = require('./models/index');
const Users = db.users;
const Projects = db.projects;
const Teams = db.teams;
const Tasks = db.tasks;
const Logs = db.log;

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        let data = await Users.findOne({
            where: { email: email, deleted_at: null }
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
app.post('/Register', async (req, res) => {
    const { name, email, password, role } = req.body;


    try {
        let data = await Users.findOne({
            where: { email: email }
        });
        if (data) { res.send('User already exist'); return; }

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


// Delete
app.delete('/DeleteUser', async (req, res) => {
    const { user_id } = req.body;
    let removeUser = await Users.update({ deleted_at: new Date() }, {
        where: { user_id: user_id }
    });
    res.status(200).send("Account Deleted");

});

// Display Projects
app.get('/Projects', async (req, res) => {
    const { id, role } = req.body;

    // Projects for Super Admin
    if (role === "Super Admin") {
        let data = await Projects.findAll({
            where: { created_by: id, deleted_at: null }
        });

        res.status(200).json({ data });
    }
    // Projects for Manager
    else if (role === "Manager") {
        let data = await Projects.findAll({
            attributes: ['project_id', 'project_name', 'project_details', 'created_by', 'createdAt'],
            where: { manager_id: id, deleted_at: null }
        });
        res.status(200).json({ data });
    }
    // Projects for Employee
    else if (role === "Employee") {

        let data = await Teams.findAll({
            attributes: ['project_id'],
            where: { user_id: id, deleted_at: null }
        });

        let userProjects = await Teams.findOne({
            where: { project_id: data[0].project_id }
        });
        res.status(200).json({ userProjects });
    }
});



// Create Project
app.post('/Createproject', async (req, res) => {
    const { id, manager_id, project_name, project_details, role } = req.body;
    const newProject = await Projects.create({ manager_id: manager_id, project_name: project_name, project_details: project_details, created_by: id, updated_by: id, createdAt: new Date(), updatedAt: new Date() });

    if (newProject) {
        res.status(200).json({ newProject });
    }
    else { res.send("Error in creating project"); }

});


//Edit Project
app.put('/UpdateProject', async (req, res) => {
    const { project_id, project_name, project_details, user_id } = req.body;
    let response = await Projects.update({ project_name: project_name, project_details: project_details, updated_by: user_id, updatedAt: new Date() }, {
        where: {
            project_id: project_id
        }
    });
    if (response) {
        res.status(200).json({ response });
    }
    else { res.send("Error in updating the project"); }
});



// Create Task
app.post('/CreateTask', async (req, res) => {
    const { user_id, project_id, task_name, task_details, estimate_time } = req.body;
    const newTask = await Tasks.create({ project_id: project_id, task_name: task_name, task_details: task_details, estimate_time: estimate_time, status: "Open", created_by: user_id, updated_by: user_id, createdAt: new Date(), updatedAt: new Date() });

    if (newTask) { res.status(200).send(newTask); }
    else { res.send("Error in creating task"); }
});



// Add Log
app.post('/AddLog', async (req, res) => {
    const { task_id,start_time,end_time,description,user_id} = req.body;
    const newLog = await Tasks.create({task_id:task_id,start_time:start_time,end_time:end_time,description:description,status:"Pending",created_by:user_id,updated_by:user_id,createdAt:new Date(),updatedAt:new Date()});
    if(newLog)
    {
        res.status(200).send("New Log Created");
    }
    else{res.send("Error in creating log");}
});



// Show Logs
app.post('/ShowLogs', async (req, res) => {
    const { } = req.body;
});


// LogStatus
app.put('/LogStatus', async (req, res) => {
    const { log_id, task_id, status } = req.body;
    const newStatus = Logs.update({ status: status }, {
        where: { log_id: log_id, task_id: task_id }
    });

    if (newStatus) { res.status(200).send("Log Status updated"); }
    else { res.send("Error in updating log status"); }
});