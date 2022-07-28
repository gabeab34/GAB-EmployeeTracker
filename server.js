import dbconnect from './config/connection.js';
import inquirer from 'inquirer';
const cTable = import('console.table');

const Qs = async () => {
   await inquirer.prompt([
    {
    name: 'initialQ',
    type: 'list',
    message: 'Welcome to the employee database. Please select the action you would like to perform.',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ]
    },
    ])
    .then((userInput) => {
        if (userInput.initialQ === "View all departments") {
        viewDepartments().then(Qs)
        }
        if (userInput.initialQ === "View all roles") {
        viewRoles().then(Qs)
        }
        if (userInput.initialQ === "View all employees") {
        viewEmployees().then(Qs)
        }
        if (userInput.initialQ === "Add a department") {
        addDepartment()
        }
        if (userInput.initialQ === "Add a role") {
        addRole().then(Qs)
        }
        if (userInput.initialQ === "Add an employee") {
        addEmployee()
        }
        if (userInput.initialQ === "Update an employee role") {
        updateEmployee()
        }
    })


}


const viewDepartments = async () => {
    let data = await dbconnect.promise().query("SELECT * FROM department");
    console.table(data[0]);
    };

const viewRoles = async () => {
    let data = await dbconnect.promise().query("SELECT * FROM role");
    console.table(data[0]);
    };
    
  
const viewEmployees = async () => {
    let data = await dbconnect.promise().query("SELECT * FROM employee");
    console.table(data[0]);
    };
   
  

const addDepartment = () => {
    inquirer.prompt([
    {
        name: 'departmentAdd',
        type: 'input',
        message: 'Please enter a name for the new department'
    },
    ]).then((deptName) => {
        dbconnect.query(`INSERT INTO department SET ?`, { name: deptName.departmentAdd })
        Qs()
    })
};
const addRole = async () => {
 let departments = await dbconnect.promise().query(`SELECT name,id AS value FROM department`);
        console.log( 'departments: ', departments[0])
        inquirer.prompt([
        {
        name: 'title',
        type: 'input',
        message: 'Please enter a title for the new role'
        },
        {
        name: 'salary',
        type: 'input',
        message: 'Please enter a salary for the new role'
        },
        {
        name: 'department_id',
        type: 'rawlist',
        message: 'Please enter a department id for the new role',
        choices: departments[0]
        },
    ]).then((roleInput) => {
        dbconnect.query(`INSERT INTO role SET ?`, roleInput,
        (err, res) => {
        if (err) throw err;
        })
    })
 };

const addEmployee = () => {
    dbconnect.query(`SELECT * From role;`, (err,res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id}));
        dbconnect.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}))
        inquirer.prompt([
        {
        name: 'firstName',
        type: 'input',
        message: 'Please enter the first name of the new employee'
        },
        {
        name: 'lastName',
        type: 'input',
        message: 'Please enter the last name of the new employee'
        },
        {
        name: 'role',
        type: 'rawlist',
        message: 'Please enter the role of the new employee',
        choices: roles
        },
        {
        name: 'manager',
        type: 'rawlist',
        message: 'Please enter the manager of the new employee',
        choices: employees
        }

    ]).then((employeeInput) => {
        dbconnect.query(`INSERT INTO employee SET ?`, { first_name: employeeInput.firstName, last_name: employeeInput.lastName, role_id: employeeInput.role, manager_id: employeeInput.manager},
        (err, res) => {
        if (err) throw err;
        Qs()
      })
     })
    })
 })
};

const updateEmployee = () => {
    dbconnect.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id}));
        dbconnect.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
            inquirer.prompt([
            {
            name: 'employee',
            type: 'rawlist',
            message: 'Please choose the employee you want to update the role for',
            choices: employees
            },
            {
            name: 'empRole',
            type: 'rawlist',
            message: 'Please choose the new role for the employee',
            choices: roles
            },
         ]).then((updateInput) => {
            dbconnect.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: updateInput.empRole},{ id: updateInput.employee }],
            (err, res) => {
            if (err) throw err;
            Qs()
            }
         )}
     )}
  )}
)};


Qs();
