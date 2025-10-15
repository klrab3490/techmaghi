create database student_data;

use student_data;

create table student(
	studentID varchar(3) primary key,
    studentName varchar(100) not null,
    studentAge int not null,
    place varchar(100) not null
);

insert into student values
( 'S1', 'Akhil', '20', 'Thrissur' ),
( 'S2', 'Manju', '18', 'Ernakulam' ),
( 'S3', 'Shareef', '13', 'Palakad' );

select * from student;