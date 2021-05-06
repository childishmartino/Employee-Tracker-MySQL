DROP DATABASE IF EXISTS arsenal_DB;

CREATE DATABASE arsenal_DB;

USE arsenal_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE job (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  job_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (job_id) REFERENCES job (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO department (name)
VALUES ("Player"), ("Coach"), ("Medical"), ("Executive");

INSERT INTO job (title, salary, department_id)
VALUES ("Goalkeeper", 600000, 1), ("Defender", 500000, 1), ("Midfielder", 700000, 1), ("Forward", 1000000, 1), ("Head Coach", 800000, 2),( "Assistant Coach", 400000, 2), ("Head Doctor", 1400000, 3), ("CEO", 2000000, 4);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Mikel", "Arteta", 5, NULL), ("Bernd", "Leno", 1, 1), ("Rob", "Holding", 2, 1), ("Thomas", "Partey", 3, 1), ("Alexandre", "Lacazette", 4, 1), ("Freddie", "Ljungberg", 6, 1), ("Doctor", "Mario", 7, NULL), ("Vinai", "Venkatesham", 8, NULL);


