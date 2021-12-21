const inquirer = require('inquirer');
const scripts = require('./lib/script');
require('console.table');

const addDept = () => {
    return inquirer.prompt({
            type: 'input',
            name: 'department',
            message: 'Please enter a new Department name: '
        })
        .then(newDept => {
            scripts.addDepartment(newDept.department);
            return options();
        })
}

const addRole = () => {
    let dataSet;
    scripts.viewAllDepartments().then(data => {
            dataSet = data;
            return data.map(x => { return x.name });
        })
        .then(dept => {
            return inquirer.prompt([{
                    type: 'input',
                    name: 'role',
                    message: 'Please enter a new Role: '
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter the salary of the role: '
                },
                {
                    type: 'list',
                    name: 'dept',
                    message: 'Please select a Department',
                    choices: dept
                }
            ]).then(answers => {
                let deptID = dataSet.filter(x => {
                    if (x.name === answers.dept) {
                        return x.id;
                    }
                })[0].id;
                scripts.addRole(answers.role, answers.salary, deptID);
                return options();
            });
        })
}

const options = () => {
    return inquirer.prompt([
            // Select Options
            {
                type: 'list',
                name: 'option',
                message: 'Select an option!',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
            }
        ])
        .then(answer => {
            switch (answer.option) {
                case 'View all Departments':
                    scripts.viewAllDepartments().then(data => {
                        console.table(data)
                        options();
                    });
                    break;
                case 'View all Roles':
                    scripts.viewAllRoles().then(data => {
                        console.table(data)
                        options();
                    });
                    break;
                case 'View all Employees':
                    scripts.viewAllEmployees().then(data => {
                        console.table(data)
                        options();
                    });
                    break;
                case 'Add Department':
                    addDept();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    break;
                case 'Update Employee Role':
                    break;
            }
        })
}

options()