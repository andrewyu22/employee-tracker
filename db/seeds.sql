INSERT INTO department (name) 
VALUES 
    ('Business'),
    ('IT'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales', 10000, 1),
    ('KAM', 5000, 1),
    ('IT Support', 100000, 2),
    ('Software Engineer', 200000, 2),
    ('AR', 5000, 3),
    ('AP', 5000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
    ('Andrew', 'Yu', 4),
    ('John', 'Watson', 5),
    ('Patrick', 'Chow', 6),
    ('Vik', 'Chowdury', 1),
    ('Sandra', 'Brown', 2 )