const db = require('../db/connection');

class DB_FUNCTION {
    constructor(db) {
        this.db = db;
    }

    viewAllDepartments() {
        const sql = `SELECT * FROM department`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    viewAllRoles() {
        const sql = `SELECT role.id, role.title AS 'Title', department.name AS 'Dept', salary 
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    viewAllEmployees() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,
        role.title AS 'Title', role.salary, department.name as 'Dept', employee.manager_id
        from employee
        left join role on role.id = employee.role_id
        left join department on department.id = role.department_id`;
        var result = this.db.promise().query(sql).then(([rows, columns]) => { return rows });
        return result;
    }

    addDepartment(department) {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        var result = this.db.promise().query(sql, department);
        console.log(`Added ${department} to the Department Table!!`);
        return result;
    }

    addRole(role, salary, deptID) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        let params = [role, salary, deptID];
        var result = this.db.promise().query(sql, params);
        console.log(`Added ${role} to the Role Table!`);
        return result;
    }

    addEmployee(first, last, role, manager) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        let params = [first, last, role, manager];
        var result = this.db.promise().query(sql, params);
        console.log(`Added ${first} ${last} to the Employee Table!`);
        return result;
    }

}

module.exports = new DB_FUNCTION(db);