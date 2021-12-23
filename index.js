const inquirer = require('inquirer');
const scripts = require('./lib/script');
require('console.table');

// Get All Department Data from DB
async function getDepartment() {
    // Calls the Database Class Functions & return an array of object
    let deptName = await scripts.viewAllDepartments();
    return deptName;
}

// Get All Role Data from DB
async function getRole() {
    // Calls the Database Class Functions & return an array of object
    let roleName = await scripts.viewAllRoles();
    return roleName
}

// Get All Employee from DB
async function getEmployee() {
    // Calls the Database Class Functions & return an array of object
    let allEmployee = await scripts.viewAllEmployees();
    return allEmployee;

}

// Add new Department to the Database
const addDept = () => {
    return inquirer.prompt(
            // Prompt users to enter a new department
            {
                type: 'input',
                name: 'department',
                message: 'Please enter a new Department name: '
            })
        .then(newDept => {
            // Calls the Database Class Function and pass the newDept Paramter to add to the DB
            scripts.addDepartment(newDept.department);
            return options();
        })
}

const addRole = () => {
    let department = [];
    // Get All Department and push the object into array called department
    getDepartment().then(dept => {
        dept.forEach(deptName => {
            department.push(deptName)
        })
    });
    return inquirer.prompt([
        // Prompt users for Role Name
        {
            type: 'input',
            name: 'role',
            message: 'Please enter a new Role: '
        },
        // Prompt users for the Role's Salary
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary of the role: '
        },
        // Prompt users for Department
        {
            type: 'rawlist',
            name: 'dept',
            message: 'Please select a Department',
            choices: department
        }
    ]).then(answers => {
        // Find the Department ID
        let deptID = department.find(x => {
                if (x.name === answers.dept) {
                    return x.id
                }
            }).id
            // Calls the Database Class Function and pass Paramter to add the new role to DB
        scripts.addRole(answers.role, answers.salary, deptID);
        return options();
    });
}

const addEmployee = () => {
    let allRole = [];
    let allEmployee = [];
    // Get All Role and create a new Object with ID/Title and push into array called allRole
    getRole().then(roles => {
        roles.forEach(role => {
            let newObj = {
                id: role.id,
                name: role.Title
            }
            allRole.push(newObj);
        })
    });
    // Get All Employee and create a new Object with ID/Name and push into array called allEmployee
    getEmployee().then(employees => {
        employees.forEach(employee => {
                // Create a new object with only ID & Name
                let newObj = {
                        id: employee.id,
                        name: employee.first_name + " " + employee.last_name
                    }
                    // Push object into allEmployee
                allEmployee.push(newObj);
            })
            // Push 1 more option which is No Manager into allEmployee array
        allEmployee.push({ id: null, name: "No Manager" });
    });
    return inquirer.prompt([
        // Prompt users for First Name
        {
            type: 'input',
            name: 'first',
            message: "Please enter employee's first name: "
        },
        // Prompt user for Last Name
        {
            type: 'input',
            name: 'last',
            message: "Please enter employee's last name: "
        },
        // Select from List of Existing Roles
        {
            type: 'rawlist',
            name: 'role',
            message: "Please select employee's role: ",
            choices: allRole
        },
        // Select from List of Existing Employee
        {
            type: 'rawlist',
            name: 'manager',
            message: "Please select employee's manager: ",
            choices: allEmployee
        }
    ]).then(answer => {
        // Find Role ID
        let roleID = allRole.find(id => {
                if (id.name === answer.role) {
                    return id;
                }
            }).id
            // Find Manager ID
        let managerID = allEmployee.find(id => {
            if (id.name === answer.manager) {
                return id;
            }
        }).id;
        // Calls the Database Class Function and pass Paramter to add the new employee to DB
        scripts.addEmployee(answer.first, answer.last, roleID, managerID);
        return options();
    })
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