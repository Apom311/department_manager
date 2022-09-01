const express = require('express');
// const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();
const connection = require('./config/connection');

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

const viewAllEmployees = () => {
    let sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.department_name AS 'department',
                role.salary
                FROM employee, role, department
                WHERE department.id = role.department_id
                AND role.id = employee.role_id
                ORDER BY employee.id ASC`;
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        promptUser();
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        }
    ])
    .then(answer => {
        const crit = [answer.firstName, answer.lastName]
        const roleSql = `SELECT role.id, role.title FROM role`;
        connection.promise().query(roleSql, (error, data) => {
            if (error) throw error;
            const roles = data.map(({ id, title}) => ({ name: title, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ])
            .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql = `SELECT * FROM employee`;
                connection.promise().query(managerSql, (error, data) => {
                    if (error) throw error;
                    const managers = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                    ])
                    .then(managerChoice => {
                        const manager = managerChoice.manager;
                        crit.push(manager);
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                        VALUES (?, ?, ?, ?)`;
                        connection.query(sql, crit, (error) => {
                            if (error) throw error;
                            console.log("Employee has been added!")
                            viewAllEmployees();
                        });
                    });
                });
            });
        });
    });
};

const updateRole = () => {

};

const viewAllRoles = () => {

};

const addRole = () => {

};

const viewAllDepartments = () => {

};

const addDepartment = () => {

};