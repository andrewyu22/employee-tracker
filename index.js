const inquirer = require('inquirer');
const scripts = require('./lib/script');
require('console.table');



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
                    scripts.viewAllDepartments().then(data => console.table(data)).then(options);
                    break;
                case 'View all Roles':
                    scripts.viewAllRoles().then(data => console.table(data)).then(options);
                    break;
                case 'View all Employees':
                    scripts.viewAllEmployees().then(data => console.table(data)).then(options);
                    break;
            }
        })
}

options()