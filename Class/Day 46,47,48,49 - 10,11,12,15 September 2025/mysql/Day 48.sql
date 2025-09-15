use college_data;

create table college_Students(
	rollNo int primary key,
    studentName varchar(100) not null,
    studentCourse varchar(100) not null,
    adminssionYear year not null,
    studentMark int not null check (studentMark between 0 and 100)
);

insert into college_Students 
values
	(101, 'Rahul Metha', 'BCA', 2024, 78),
	(102, 'Sneha Sharma', 'BBA', 2023, 85),
	(103, 'Amit Kumar', 'BCA', 2025, 92),
	(104, 'Priya Nair', 'BCom', 2024, 67),
	(105, 'Anjali Sharma', 'BCA', 2025, 88);
    
-- Question 1
insert into college_Students values (106, 'Ravi Verma', 'BBA', 2024, 81);
-- Question 2 
update college_Students set studentMark=75 where studentName='Priya Nair';
-- Question 3
delete from college_Students where rollNo = 103;
-- Question 4
select * from college_Students where studentCourse = 'BCA';
-- Question 5
select * from college_Students where studentMark = (select Max(studentMark) from college_Students );
-- Question 6 
select * from college_Students where adminssionYear = 2025 and studentMark > 85;
-- Question 7
select studentCourse, count(studentCourse) as Student_count from college_Students group by studentCourse;
-- Question 8
select studentName from college_Students where studentName like 'A%';
-- Question 9
select avg(studentMark) from college_Students where studentCourse = 'BCA';
-- Question 10
select * from college_Students order by studentMark;
select * from college_Students where studentMark = ( select distinct studentMark from college_Students order by studentMark desc limit 1 offset 1 );
