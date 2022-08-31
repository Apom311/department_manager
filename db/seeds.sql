INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 80000, 1), ("Sales Lead", 55000, 2), ("Analyst", 45000, 3), ("Legal Secretary", 40000, 4), ("Marketing Manager", 120000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Square', 1, null), ('John', 'Doe', 3, 2), ('Ronald', 'McDonald', 4, 1), ('Monkey', 'Luffy', 2, null);