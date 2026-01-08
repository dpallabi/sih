from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Student Schemas
class StudentBase(BaseModel):
    student_number: str
    department: Optional[str] = None
    year_level: Optional[int] = None

class StudentCreate(StudentBase):
    user_id: int

class StudentResponse(StudentBase):
    student_id: int
    user_id: int
    gpa: Optional[int] = None
    
    class Config:
        from_attributes = True

# Teacher Schemas
class TeacherBase(BaseModel):
    employee_id: str
    department: Optional[str] = None
    specialization: Optional[str] = None

class TeacherCreate(TeacherBase):
    user_id: int

class TeacherResponse(TeacherBase):
    teacher_id: int
    user_id: int
    
    class Config:
        from_attributes = True

# Course Schemas
class CourseBase(BaseModel):
    course_code: str
    course_name: str
    description: Optional[str] = None
    credits: Optional[int] = None
    department: Optional[str] = None
    semester: Optional[str] = None
    year: Optional[int] = None
    max_students: Optional[int] = 30

class CourseCreate(CourseBase):
    teacher_id: Optional[int] = None

class CourseUpdate(BaseModel):
    course_name: Optional[str] = None
    description: Optional[str] = None
    credits: Optional[int] = None
    teacher_id: Optional[int] = None
    semester: Optional[str] = None
    year: Optional[int] = None
    max_students: Optional[int] = None

class CourseResponse(CourseBase):
    course_id: int
    teacher_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class CourseWithTeacher(CourseResponse):
    teacher: Optional[TeacherResponse] = None

class EnrollmentCreate(BaseModel):
    student_id: int
    course_id: int