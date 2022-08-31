const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { ConnectionError } = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// const db = mysql.createConncection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'zzz',
//         database: 'movie_db'
//     },
//     console.log('connected to the movie_db database.')
// );

// app.get('/api/movies', (req, res) => {
//     db.query()
// });

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port${PORT}`);
// });

const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Select from the following:',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ]
        }
    ])
    .then((answer) => {
        const {choices} = answer;

        if(choices === 'View All Employees'){
            viewAllEmployees();
        }
        
        if(choices === 'Add Employee'){
            addEmployee();
        }

        if(choices === 'Update Employee Role'){
            updateRole();
        }

        if(choices === 'View All Roles'){
            viewAllRoles();
        }
        
        if(choices === 'Add Role'){
            addRole();
        }

        if(choices === 'View All Departments'){
            viewAllDepartments();
        }

        if(choices === 'Add Department'){
            addDepartment();
        }

        if(choices === 'Quit'){
            connection.end();
        }
    });
};