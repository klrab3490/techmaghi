-- Database
create database test;
use test;

-- Question 1
-- Create Tables: Products and Sales
create table products(
    product_id int primary key,
    product_name varchar(100) not null,
    price int not null
);

create table sales(
    sale_id int primary key,
    product_id int,
    quantity int not null,
    sale_date date not null,
    foreign key (product_id) references products(product_id)
);

-- Insert Data into Products
insert into products (product_id, product_name, price) values
    (1, 'Laptop', 80000),
    (2, 'Mobile', 25000),
    (3, 'Tablet', 20000);

-- Insert Data into Sales
insert into sales (sale_id, product_id, quantity, sale_date) values
    (101, 1, 2, '2025-08-01'),
    (102, 2, 5, '2025-08-02'),
    (103, 1, 1, '2025-08-03');

-- Task 1:
select p.product_name, sum(s.quantity) as total_quantity from products p join sales s on p.product_id = s.product_id group by p.product_name;

-- Task 2: Show all products even if  they have no sales
select p.product_id, p.product_name, ifnull(sum(s.quantity), 0) as total_quantity from products p left join sales s on p.product_id = s.product_id group by p.product_id, p.product_name;

-- Task 3: Order the result by total quantity sold(highest to lowest)
select p.product_id, p.product_name, ifnull(sum(s.quantity), 0) as total_quantity from products p left join sales s on p.product_id = s.product_id group by p.product_id, p.product_name order by total_quantity desc;

-- Question 2
-- Create Tables: Departments and Employees 
create table department(
    dept_id int primary key,
    dept_name varchar(100) not null
);

create table employees(
    emp_id int primary key,
    emp_name varchar(100) not null,
    dept_id int,
    salary int not null,
    foreign key (dept_id) references departments(dept_id)
);

-- Insert 
insert into department (dept_id, dept_name) values
    (10, 'HR'),
    (20, 'Finance'),
    (30, 'IT');

insert into employees (emp_id, emp_name, dept_id, salary) values
    (1, 'John', 10, 40000),
    (2, 'Alice', 20, 55000),
    (3, 'Bob', 30, 60000),
    (4, 'Mary', 30, 65000);

-- Task 1: Find average salary of employees in each department
select d.dept_name, ifnull(avg(e.salary), 0) as avg_salary from department d left join employees e on d.dept_id = e.dept_id group by d.dept_name;

-- Task 2: List all departments even if no employees
select d.dept_name, ifnull(count(e.emp_id), 0) as employee_count from department d right join employees e on d.dept_id = e.dept_id group by d.dept_name;

-- Task 3: Round average salary to 2 decimal places
select d.dept_name, ifnull(round(avg(e.salary), 2), 0) as avg_salary from department d left join employees e on d.dept_id = e.dept_id group by d.dept_name;


-- Question 3
-- Craete Tables: Students and Marks