from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

# Association table for student enrollments
enrollments = Table(
    'enrollments',
    Base.metadata,
    Column('student_id', Integer, ForeignKey('students.student_id'), primary_key=True),
    Column('course_id', Integer, ForeignKey('courses.course_id'), primary_key=True),
    Column('enrollment_date', DateTime(timezone=True), server_default=func.now()),
    Column('status', String(20), default='active')
)

class Student(Base):
    __tablename__ = "students"
    
    student_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True, nullable=False)
    student_number = Column(String(50), unique=True, nullable=False)
    department = Column(String(100))
    year_level = Column(Integer)
    gpa = Column(Integer)
    
    # Relationships
    user = relationship("User", backref="student_profile")
    courses = relationship("Course", secondary=enrollments, back_populates="students")
    
    def __repr__(self):
        return f"<Student {self.student_number}>"

class Teacher(Base):
    __tablename__ = "teachers"
    
    teacher_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True, nullable=False)
    employee_id = Column(String(50), unique=True, nullable=False)
    department = Column(String(100))
    specialization = Column(String(100))
    
    # Relationships
    user = relationship("User", backref="teacher_profile")
    courses = relationship("Course", back_populates="teacher")
    
    def __repr__(self):
        return f"<Teacher {self.employee_id}>"

class Course(Base):
    __tablename__ = "courses"
    
    course_id = Column(Integer, primary_key=True, index=True)
    course_code = Column(String(20), unique=True, nullable=False)
    course_name = Column(String(200), nullable=False)
    description = Column(String)
    credits = Column(Integer)
    department = Column(String(100))
    teacher_id = Column(Integer, ForeignKey('teachers.teacher_id'))
    semester = Column(String(20))
    year = Column(Integer)
    max_students = Column(Integer, default=30)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    teacher = relationship("Teacher", back_populates="courses")
    students = relationship("Student", secondary=enrollments, back_populates="courses")
    
    def __repr__(self):
        return f"<Course {self.course_code}>"