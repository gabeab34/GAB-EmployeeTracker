DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT
    department_name VARCHAR(20) NOT NULL
);