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
        var result = this.db.promise().query(sql, department).then(this.db.end());
        return result;
    }

}

module.exports = new DB_FUNCTION(db);