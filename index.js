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
                message: 'Please enter a new Department name: ',
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log("Please enter a validate name!");
                        return false;
                    }
                }
            })
        .then(newDept => {
            // Calls the Database Class Function and pass the newDept Paramter to add to the DB
            scripts.addDepartment(newDept.department);
            return options();
        })
}

// Add New Role to the Database
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
            message: 'Please enter a new Role: ',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log("Please enter a validate role!");
                    return false;
                }
            }
        },
        // Prompt users for the Role's Salary
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary of the role: ',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter a validate Salary!')
                    return false;
                }
            }
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

// Add New Employee to the Database
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
            message: "Please enter employee's first name: ",
            validate: firstInput => {
                if (firstInput) {
                    return true;
                } else {
                    console.log('Please enter the first name!');
                    return false;
                }
            }
        },
        // Prompt user for Last Name
        {
            type: 'input',
            name: 'last',
            message: "Please enter employee's last name: ",
            validate: lastInput => {
                if (lastInput) {
                    return true;
                } else {
                    console.log('Please enter the last name!');
                    return false;
                }
            }
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
            message: "Who is the employee's manager: ",
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

const updateRole = () => {
    let newRole = [];
    let currentEmployee = [];

    // Get All Role and create a new Object with ID/Title and push into array called allRole
    getRole().then(roles => {
        roles.forEach(role => {
            let newObj = {
                id: role.id,
                name: role.Title
            }
            newRole.push(newObj);
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
            currentEmployee.push(newObj);
        })
    }).then(() => {
        return inquirer.prompt([
            // Prompt users to select an employee
            {
                type: 'rawlist',
                name: 'employee',
                message: "Select a employee to update their Role.",
                choices: currentEmployee
            },
            // Prompt users to select a new Role
            {
                type: 'rawlist',
                name: 'newRole',
                message: "Select a new Role for this Employee.",
                choices: newRole
            }
        ]).then(answers => {
            // Find Role ID
            let roleID = newRole.find(id => {
                    if (id.name === answers.newRole) {
                        return id;
                    }
                }).id
                // Find Employee ID
            let employeeID = currentEmployee.find(id => {
                if (id.name === answers.employee) {
                    return id;
                }
            }).id;
            // Calls the Database Class Function and pass Paramter to update employee's Role to DB
            scripts.updateRole(employeeID, roleID)
            return options();
        })
    })
}

const updateManager = () => {
    let allEmployee = [];
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
    }).then(() => {
        return inquirer.prompt([{
                type: 'rawlist',
                name: 'employee',
                message: "Select a employee to update their Role.",
                choices: allEmployee
            },
            {
                type: 'rawlist',
                name: 'manager',
                message: "Select a manager for this employee.",
                choices: allEmployee
            }
        ]).then(answers => {
            let employeeID = allEmployee.find(id => {
                if (id.name === answers.employee) {
                    return id;
                }
            }).id;
            let managerID = allEmployee.find(id => {
                if (id.name === answers.manager) {
                    return id;
                }
            }).id;
            scripts.updateManager(employeeID, managerID);
            return options();
        })
    })

}

const options = () => {
    return inquirer.prompt([
            // Select Options
            {
                type: 'rawlist',
                name: 'option',
                message: 'Select an option!',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'View Department Budgets', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', "Update Employee's Manager", 'End']
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
                case 'View Department Budgets':
                    scripts.viewDepartmentBudget().then(data => {
                        console.table(data);
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
                    updateRole();
                    break;
                case "Update Employee's Manager":
                    updateManager();
                    break;
                case 'End':
                    process.exit();
            }
        })
}

options()