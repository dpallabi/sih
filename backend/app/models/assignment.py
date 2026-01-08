from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Assignment(Base):
    __tablename__ = "assignments"
    
    assignment_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey('courses.course_id'), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    due_date = Column(DateTime(timezone=True), nullable=False)
    total_points = Column(Integer, nullable=False)
    assignment_type = Column(String(50))  # homework, quiz, exam, project
    file_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_published = Column(Boolean, default=False)
    
    # Relationships
    course = relationship("Course", backref="assignments")
    submissions = relationship("Submission", back_populates="assignment")
    
    def __repr__(self):
        return f"<Assignment {self.title}>"

class Submission(Base):
    __tablename__ = "submissions"
    
    submission_id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey('assignments.assignment_id'), nullable=False)
    student_id = Column(Integer, ForeignKey('students.student_id'), nullable=False)
    submission_date = Column(DateTime(timezone=True), server_default=func.now())
    file_url = Column(String, nullable=False)
    points_earned = Column(Integer)
    grade = Column(String(5))
    feedback = Column(Text)
    status = Column(String(20), default='submitted')  # submitted, graded, late
    graded_at = Column(DateTime(timezone=True))
    graded_by = Column(Integer, ForeignKey('teachers.teacher_id'))
    
    # Relationships
    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("Student", backref="submissions")
    grader = relationship("Teacher", backref="graded_submissions")
    
    def __repr__(self):
        return f"<Submission {self.submission_id}>"