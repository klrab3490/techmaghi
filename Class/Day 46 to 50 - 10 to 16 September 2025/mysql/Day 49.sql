-- Database
create database company_data;
use company_data;

-- Departments Table
CREATE TABLE departments (
    deptID INT PRIMARY KEY,
    deptName VARCHAR(100) NOT NULL
);
insert into departments values
	(101, 'HR'),
    (102, 'IT'),
    (104, 'Finance');
select * from departments;
    
-- Employees Table
CREATE TABLE employees (
    empID INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    deptID INT,
    FOREIGN KEY (deptID) REFERENCES departments(deptID)
);
insert into employees values (1, 'John', 101);
insert into employees values (2, 'Alice', 102);
insert into employees values (3, 'Bob', 103);
insert into employees values (4, 'Noe', 104);
select * from employees;

-- Join
select e.empID, e.name, d.deptName from employees e inner join departments d on e.deptID = d.deptID;
select e.empID, e.name, d.deptName from employees e left join departments d on e.deptID = d.deptID;
