INSERT INTO department (name) 
VALUES 
    ('Business'),
    ('IT'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales', 100000, 1),
    ('KAM', 50000, 1),
    ('IT Support', 100000, 2),
    ('Software Engineer', 200000, 2),
    ('Lead Tech Engineer', 300000, 2),
    ('AR', 50000, 3),
    ('AP', 50000, 3),
    ('VP of Finance', 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Andrew', 'Yu', 5, null),
    ('John', 'Watson', 4, 1),
    ('Patrick', 'Chow', 3, 1),
    ('Stella', 'Qian', 8, null)
    ('Vik', 'Chowdury', 6, 4),
    ('Sandra', 'Brown', 7, 4);