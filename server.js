import mysql from 'mysql';
import inquirer from 'inquirer';


const connect = mysql.createConnection({
    host: 'localhost',
    port: 3003,
    user: 'root',
    password: process.env.password,
    database: 'employeeDB',
})

StartQs = () => {
    inquirer.prompt([
    {
    name: 'initialQ',
    type: 'list',
    message: 'Welcome to the employee database. Please select the action you would like to perform.',
    choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role' ]
    },   
])}
