from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Attendance(Base):
    __tablename__ = "attendance"
    
    attendance_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey('courses.course_id'), nullable=False)
    student_id = Column(Integer, ForeignKey('students.student_id'), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # present, absent, late, excused
    notes = Column(Text)
    marked_by = Column(Integer, ForeignKey('teachers.teacher_id'))
    marked_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    course = relationship("Course", backref="attendance_records")
    student = relationship("Student", backref="attendance_records")
    marker = relationship("Teacher", backref="attendance_marked")
    
    def __repr__(self):
        return f"<Attendance {self.student_id} - {self.date}>"