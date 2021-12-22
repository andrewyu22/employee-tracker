const inquirer = require('inquirer');
const scripts = require('./lib/script');
require('console.table');

async function getDepartment() {
    let deptName = await scripts.viewAllDepartments();
    return deptName;
}

async function getRole() {
    let roleName = await scripts.viewAllRoles();
    return roleName
}

async function getEmployee() {
    let allEmployee = await scripts.viewAllEmployees();
    return allEmployee;

}

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
    let department = [];
    getDepartment().then(dept => {
        dept.forEach(x => {
            department.push(x)
        })
    });
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
            type: 'rawlist',
            name: 'dept',
            message: 'Please select a Department',
            choices: department
        }
    ]).then(answers => {
        let deptID = department.find(x => {
            if (x.name === answers.dept) {
                return x.id
            }
            return;
        }).id
        scripts.addRole(answers.role, answers.salary, deptID);
        return options();
    });
}

const addEmployee = () => {
    // let allRole;
    // let allEmployee;
    // scripts.viewAllRoles().then(data => {
    //     allRole = data;
    //     scripts.viewAllEmployees().then(employee => {
    //         allEmployee = employee;
    //         console.log(allEmployee)
    //     });
    //     return data.map(x => { return x.Title });
    // }).then(roles => {
    let role = [];
    let employee = [];
    getRole().then(roles => {
        roles.forEach(x => {
            let newObj = {
                id: x.id,
                name: x.Title
            }
            role.push(newObj);
        })
    })
    getEmployee().then(employees => {
        employees.forEach(x => {
            let newObj = {
                id: x.id,
                name: x.first_name + " " + x.last_name
            }
            employee.push(newObj);
        })
        employee.push({ id: null, name: "No Manager" });
    })
    return inquirer.prompt([{
                type: 'input',
                name: 'first',
                message: "Please enter employee's first name: "
            },
            {
                type: 'input',
                name: 'last',
                message: "Please enter employee's last name: "
            },
            {
                type: 'rawlist',
                name: 'role',
                message: "Please select employee's role: ",
                choices: role
            },
            {
                type: 'rawlist',
                name: 'manager',
                message: "Please select employee's manager: ",
                choices: employee
            }
        ]).then(answer => {
            let roleID = role.find(x => {
                if (x.name === answer.role) {
                    return x;
                }
            }).id
            let managerID = employee.find(x => {
                if (x.name === answer.manager) {
                    return x;
                }
            }).id;
            scripts.addEmployee(answer.first, answer.last, roleID, managerID);
            return options();
        })
        // })
}

const options = () => {
    return inquirer.prompt([
            // Select Options
            {
                type: 'rawlist',
                name: 'option',
                message: 'Select an option!',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'End']
            }
        ])
        .then(answer => {
            switch (answer.option) {
                case 'View all Departments':
                    getDepartment().then(data => {
                        console.table(data)
                        options();
                    });
                    break;
                case 'View all Roles':
                    getRole().then(data => {
                        console.table(data)
                        options();
                    });
                    break;
                case 'View all Employees':
                    getEmployee().then(data => {
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
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    break;
                case 'End':
                    process.exit();
            }
        })
}

options()