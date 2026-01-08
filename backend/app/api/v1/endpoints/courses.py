from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core import database
from app.models.course import Course, Student, Teacher, enrollments
from app.schemas.course import (
    CourseCreate, CourseResponse, CourseUpdate, CourseWithTeacher,
    StudentCreate, StudentResponse, TeacherCreate, TeacherResponse,
    EnrollmentCreate
)

router = APIRouter()

# ============ COURSE ENDPOINTS ============

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate, db: Session = Depends(database.get_db)):
    """Create a new course"""
    
    # Check if course code already exists
    existing_course = db.query(Course).filter(Course.course_code == course.course_code).first()
    if existing_course:
        raise HTTPException(status_code=400, detail="Course code already exists")
    
    # If teacher_id provided, verify teacher exists
    if course.teacher_id:
        teacher = db.query(Teacher).filter(Teacher.teacher_id == course.teacher_id).first()
        if not teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")
    
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    return db_course

@router.get("/", response_model=List[CourseResponse])
async def get_all_courses(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    """Get all courses"""
    courses = db.query(Course).offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=CourseWithTeacher)
async def get_course(course_id: int, db: Session = Depends(database.get_db)):
    """Get a specific course by ID"""
    course = db.query(Course).filter(Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(course_id: int, course_update: CourseUpdate, db: Session = Depends(database.get_db)):
    """Update a course"""
    db_course = db.query(Course).filter(Course.course_id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Update only provided fields
    update_data = course_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_course, field, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/{course_id}")
async def delete_course(course_id: int, db: Session = Depends(database.get_db)):
    """Delete a course"""
    db_course = db.query(Course).filter(Course.course_id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(db_course)
    db.commit()
    return {"message": "Course deleted successfully"}

# ============ ENROLLMENT ENDPOINTS ============

@router.post("/enroll", status_code=status.HTTP_201_CREATED)
async def enroll_student(enrollment: EnrollmentCreate, db: Session = Depends(database.get_db)):
    """Enroll a student in a course"""
    
    # Check if student exists
    student = db.query(Student).filter(Student.student_id == enrollment.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Check if course exists
    course = db.query(Course).filter(Course.course_id == enrollment.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if already enrolled
    existing = db.query(enrollments).filter(
        enrollments.c.student_id == enrollment.student_id,
        enrollments.c.course_id == enrollment.course_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student already enrolled in this course")
    
    # Check if course is full
    current_enrollments = db.query(enrollments).filter(
        enrollments.c.course_id == enrollment.course_id
    ).count()
    if current_enrollments >= course.max_students:
        raise HTTPException(status_code=400, detail="Course is full")
    
    # Enroll student
    stmt = enrollments.insert().values(
        student_id=enrollment.student_id,
        course_id=enrollment.course_id
    )
    db.execute(stmt)
    db.commit()
    
    return {"message": "Student enrolled successfully"}

@router.get("/{course_id}/students", response_model=List[StudentResponse])
async def get_course_students(course_id: int, db: Session = Depends(database.get_db)):
    """Get all students enrolled in a course"""
    course = db.query(Course).filter(Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    return course.students

# ============ STUDENT ENDPOINTS ============

@router.post("/students/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_student(student: StudentCreate, db: Session = Depends(database.get_db)):
    """Create a student profile"""
    
    # Check if student number already exists
    existing = db.query(Student).filter(Student.student_number == student.student_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student number already exists")
    
    db_student = Student(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    
    return db_student

# ============ TEACHER ENDPOINTS ============

@router.post("/teachers/", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED)
async def create_teacher(teacher: TeacherCreate, db: Session = Depends(database.get_db)):
    """Create a teacher profile"""
    
    # Check if employee ID already exists
    existing = db.query(Teacher).filter(Teacher.employee_id == teacher.employee_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    db_teacher = Teacher(**teacher.model_dump())
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    
    return db_teacher