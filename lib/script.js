const db = require('../db/connection');

class DB_FUNCTION {
    constructor(db) {
        this.db = db;
    }

    // Query Database for all Department
    viewAllDepartments() {
        const sql = `SELECT * FROM department`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    // Query Database for All Role
    viewAllRoles() {
        const sql = `SELECT role.id, role.title AS 'Title', department.name AS 'Dept', salary 
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    // Query Database for All Employee
    viewAllEmployees() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,
        role.title AS 'Title', role.salary, department.name as 'Dept', employee.manager_id
        from employee
        left join role on role.id = employee.role_id
        left join department on department.id = role.department_id`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    // Insert new department in the database
    addDepartment(department) {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        var result = this.db.promise().query(sql, department);
        console.log(`Added ${department} to the Department Table!!`);
        return result;
    }

    // Insert a new role into the database
    addRole(role, salary, deptID) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        let params = [role, salary, deptID];
        var result = this.db.promise().query(sql, params);
        console.log(`Added ${role} to the Role Table!`);
        return result;
    }

    // Insert a new Employee into the database
    addEmployee(first, last, role, manager) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        let params = [first, last, role, manager];
        var result = this.db.promise().query(sql, params);
        console.log(`Added ${first} ${last} to the Employee Table!`);
        return result;
    }

}

module.exports = new DB_FUNCTION(db);