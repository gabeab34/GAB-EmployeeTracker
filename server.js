import mysql from 'mysql2';
import inquirer from 'inquirer';
// import table from 'console.table'
// const cTable = require('console.table');
import sequelize from 'sequelize';
import 'dotenv/config'
// import { SELECT } from 'sequelize/types/query-types';

const dbconnect = new sequelize(process.env.MYSQLURI)

dbconnect.authenticate().then(() => {
    console.log('Connection to database established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Qs = async () => {
    const userInput = await inquirer.prompt([
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
    .then(async (userInput) => {
        if (userInput.initialQ === "View all departments") {
        viewDepartment()
        }
        if (userInput.initialQ === "View all roles") {
        viewRoles()
        }
        if (userInput.initialQ === "View all employees") {
        viewEmployees()
        }
    })


}

const viewDepartment = async () =>
    await dbconnect.query(`SELECT * FROM department ORDER BY id ASC;`, function (err, res) {
        if (err) throw err;
        console.table(res);
    });

// function viewDepartment() {
//     dbconnect.query("SELECT * FROM department", function (err, results) {
//       console.table(results);
//     });
//   }

// const viewDepartment = async () => {
//     let data = await dbconnect.promise().query('SELECT * from department');
//     console.table(data[0])
// }

Qs()
