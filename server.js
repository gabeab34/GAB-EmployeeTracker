import dbconnect from './config/connection.js';
import inquirer from 'inquirer';
// import table from 'console.table'
// const cTable = require('console.table');


const Qs = async () => {
   await inquirer.prompt([
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
    ])
    .then((userInput) => {
        if (userInput.initialQ === "View all departments") {
        viewDepartments()
        }
        if (userInput.initialQ === "View all roles") {
        viewRoles()
        }
        if (userInput.initialQ === "View all employees") {
        viewEmployees()
        }
        // if (userInput.initialQ === "Update an employee role") {

        // }
    })


}


const viewDepartments = () => {
    dbconnect.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    });
    Qs()
  }

const viewRoles = () => {
    dbconnect.query("SELECT * FROM role", function (err, res) {
    console.table(res);
    });
    Qs()
  }

const viewEmployees = () => {
    dbconnect.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
    });
    Qs()
  }  







  
// const viewDepartment = async () => {
//     let data = await dbconnect.promise().query('SELECT * from department');
//     console.table(data[0])
// }

// const viewDepartments = async () =>
//     await dbconnect.query(`SELECT * FROM department ORDER BY id ASC;`, function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });





Qs();
