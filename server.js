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
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ]
    },
    {
    name: 'departmentAdd',
    type: 'input',
    message: 'Please enter a name for the new department',
    when: ({ initialQ }) => initialQ === 'Add a department'
    },
    {
    name: 'roleAdd',
    type: 'input',
    message: 'Please enter a name for the new role',
    when: ({ initialQ }) => initialQ === 'Add a role'
    },
    {
    name: 'employeeAddFirst',
    type: 'input',
    message: 'Please enter a first name for the new employee',
    when: ({ initialQ }) => initialQ === 'Add an employee'
    },
    {
    name: 'employeeAddLast',
    type: 'input',
    message: 'Please enter a last name for the new employee',
    when: ({ initialQ }) => initialQ === 'Add an employee'
    },





])}
