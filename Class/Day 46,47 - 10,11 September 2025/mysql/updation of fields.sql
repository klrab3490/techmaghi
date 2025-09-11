create database college_data;

use college_data;

CREATE TABLE student_Data (
    rollNo INT PRIMARY KEY,
    studentName VARCHAR(100) NOT NULL,
    studentCourse VARCHAR(100) NOT NULL,
    admissionYear YEAR NOT NULL
);

INSERT INTO student_Data (rollNo, studentName, studentCourse, admissionYear)
VALUES
  (101, 'Rahul A B', 'Computer Science', 2023),
  (102, 'Abhishek K', 'Mechanical Engineering', 2022),
  (103, 'Anjali M', 'Electronics', 2024),
  (104, 'Vikram S', 'Civil Engineering', 2021);

select * from student_Data;

insert into student_Data values (105, 'Anjali Sharma', 'BCA', 2025);

update student_Data set studentCourse='MCA' where rollNo = 105;

update student_Data set admissionYear = 2025 where admissionYear = 2024;

update student_data set studentName = 'Anjali S. Sharma' where rollNo = 105;
