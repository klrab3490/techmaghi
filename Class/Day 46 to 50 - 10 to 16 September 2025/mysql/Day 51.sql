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
create table students(
    student_id int primary key,
    student_name varchar(100) not null
);

create table marks(
    mark_id int primary key,
    student_id int,
    subject varchar(100) not null,
    score int not null,
    foreign key (student_id) references students(student_id)
);

-- Insert Data
insert into students (student_id, student_name) values
    (1, 'Rahul'),
    (2, 'Priya'),
    (3, 'Amit');

insert into marks (mark_id, student_id, subject, score) values
    (201, 1, 'Math', 85),
    (202, 1, 'Science', 90),
    (203, 2, 'Math', 70);

-- Task 1: Display each student's highest marks accross all subjects
select s.student_name, ifnull(max(m.score), 0) as highest_score from students s left join marks m on s.student_id = m.student_id group by s.student_name;

-- Task 2: Show all students even if they dont have any marks left join
select s.student_name, ifnull(max(m.score), 0) as highest_score from students s left join marks m on s.student_id = m.student_id group by s.student_name;

-- Task 3: Sort highest marks in descending order
select s.student_name, ifnull(max(m.score), 0) as highest_score from students s left join marks m on s.student_id = m.student_id group by s.student_name order by highest_score desc;


-- Question 4
-- Create Tables: Teachers and Courses
create table teachers(
    teacher_id int primary key,
    teacher_name varchar(100) not null
);

create table courses(
    course_id int primary key,
    course_name varchar(100) not null,
    teacher_id int not null,
    enrolled_students int not null,
    foreign key (teacher_id) references teachers(teacher_id)
);

-- Insert Data
insert into teachers (teacher_id, teacher_name) values
    (1, 'Mr. Smith'),
    (2, 'Ms. Johnson'),
    (3, 'Dr. Lee');

insert into courses (course_id, course_name, teacher_id, enrolled_students) values
    (301, 'Math', 1, 40),
    (302, 'Physics', 1, 35),
    (303, 'Chemistry', 2, 30);

-- Task 1: For each teacher, display total number of students enrolled in their courses
select t.teacher_name, ifnull(sum(c.enrolled_students), 0) as total_students from teachers t left join courses c on t.teacher_id = c.teacher_id group by t.teacher_name;

-- Task 2: Inner join to show only teachers with atleast 1 courses
select t.teacher_name, sum(c.enrolled_students) as total_students from teachers t inner join courses c on t.teacher_id = c.teacher_id group by t.teacher_name;

-- Task 3: use aggregate function sum for enrolled students
select t.teacher_name, ifnull(sum(c.enrolled_students), 0) as total_students from teachers t left join courses c on t.teacher_id = c.teacher_id group by t.teacher_name;
