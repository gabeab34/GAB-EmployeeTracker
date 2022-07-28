import dbconnect from './config/connection.js';
import inquirer from 'inquirer';


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
        viewDepartments()
        }
        if (userInput.initialQ === "View all roles") {
        viewRoles()
        }
        if (userInput.initialQ === "View all employees") {
        viewEmployees()
        }
        if (userInput.initialQ === "Add a department") {
        addDepartment()
        }
        if (userInput.initialQ === "Add a role") {
        addRole()
        }
        if (userInput.initialQ === "Add an employee") {
        addEmployee()
        }
        if (userInput.initialQ === "Update an employee role") {
        updateEmployee()
        }
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
const addRole = () => {
    dbconnect.query(`SELECT * FROM department;`, (err,res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.name, value: department.id}));
        inquirer.prompt([
        {
        name: 'roleTitle',
        type: 'input',
        message: 'Please enter a title for the new role'
        },
        {
        name: 'roleSalary',
        type: 'input',
        message: 'Please enter a salary for the new role'
        },
        {
        name: 'roleDept',
        type: 'rawlist',
        message: 'Please enter a department id for the new role',
        choices: departments
        },
    ]).then((roleInput) => {
        dbconnect.query(`INSERT INTO role SET ?`, { title: roleInput.roleTitle, salary: roleInput.roleSalary, department_id: roleInput.roledept },
        (err, res) => {
        if (err) throw err;
        Qs()
        })
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
