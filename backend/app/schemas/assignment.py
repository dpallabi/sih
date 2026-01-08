from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Assignment Schemas
class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: datetime
    total_points: int
    assignment_type: Optional[str] = None
    file_url: Optional[str] = None

class AssignmentCreate(AssignmentBase):
    course_id: int
    is_published: bool = False

class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    total_points: Optional[int] = None
    is_published: Optional[bool] = None

class AssignmentResponse(AssignmentBase):
    assignment_id: int
    course_id: int
    created_at: datetime
    is_published: bool
    
    class Config:
        from_attributes = True

# Submission Schemas
class SubmissionBase(BaseModel):
    file_url: str

class SubmissionCreate(SubmissionBase):
    assignment_id: int
    student_id: int

class GradeSubmission(BaseModel):
    points_earned: int
    grade: Optional[str] = None
    feedback: Optional[str] = None

class SubmissionResponse(SubmissionBase):
    submission_id: int
    assignment_id: int
    student_id: int
    submission_date: datetime
    points_earned: Optional[int] = None
    grade: Optional[str] = None
    feedback: Optional[str] = None
    status: str
    graded_at: Optional[datetime] = None
    graded_by: Optional[int] = None
    
    class Config:
        from_attributes = True