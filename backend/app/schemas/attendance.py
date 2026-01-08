from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class AttendanceBase(BaseModel):
    course_id: int
    student_id: int
    date: date
    status: str  # present, absent, late, excused
    notes: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    marked_by: int

class AttendanceUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class AttendanceResponse(AttendanceBase):
    attendance_id: int
    marked_by: int
    marked_at: datetime
    
    class Config:
        from_attributes = True

class AttendanceStats(BaseModel):
    total_classes: int
    present: int
    absent: int
    late: int
    excused: int
    attendance_rate: float