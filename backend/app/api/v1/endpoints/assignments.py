from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.core import database
from app.models.assignment import Assignment, Submission
from app.schemas.assignment import (
    AssignmentCreate, AssignmentResponse, AssignmentUpdate,
    SubmissionCreate, SubmissionResponse, GradeSubmission
)

router = APIRouter()

# ============ ASSIGNMENT ENDPOINTS ============

@router.post("/", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
async def create_assignment(assignment: AssignmentCreate, db: Session = Depends(database.get_db)):
    """Create a new assignment"""
    db_assignment = Assignment(**assignment.model_dump())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@router.get("/course/{course_id}", response_model=List[AssignmentResponse])
async def get_course_assignments(course_id: int, db: Session = Depends(database.get_db)):
    """Get all assignments for a course"""
    assignments = db.query(Assignment).filter(Assignment.course_id == course_id).all()
    return assignments

@router.get("/{assignment_id}", response_model=AssignmentResponse)
async def get_assignment(assignment_id: int, db: Session = Depends(database.get_db)):
    """Get a specific assignment"""
    assignment = db.query(Assignment).filter(Assignment.assignment_id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@router.put("/{assignment_id}", response_model=AssignmentResponse)
async def update_assignment(assignment_id: int, assignment_update: AssignmentUpdate, db: Session = Depends(database.get_db)):
    """Update an assignment"""
    db_assignment = db.query(Assignment).filter(Assignment.assignment_id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    update_data = assignment_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_assignment, field, value)
    
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@router.delete("/{assignment_id}")
async def delete_assignment(assignment_id: int, db: Session = Depends(database.get_db)):
    """Delete an assignment"""
    db_assignment = db.query(Assignment).filter(Assignment.assignment_id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    db.delete(db_assignment)
    db.commit()
    return {"message": "Assignment deleted successfully"}

# ============ SUBMISSION ENDPOINTS ============

@router.post("/submit", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_assignment(submission: SubmissionCreate, db: Session = Depends(database.get_db)):
    """Submit an assignment"""
    
    # Check if assignment exists
    assignment = db.query(Assignment).filter(Assignment.assignment_id == submission.assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    # Check if already submitted
    existing = db.query(Submission).filter(
        Submission.assignment_id == submission.assignment_id,
        Submission.student_id == submission.student_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Assignment already submitted")
    
    # Check if late
    status_value = "submitted"
    if datetime.utcnow() > assignment.due_date:
        status_value = "late"
    
    db_submission = Submission(
        **submission.model_dump(),
        status=status_value
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

@router.put("/grade/{submission_id}", response_model=SubmissionResponse)
async def grade_submission(submission_id: int, grading: GradeSubmission, teacher_id: int, db: Session = Depends(database.get_db)):
    """Grade a submission"""
    db_submission = db.query(Submission).filter(Submission.submission_id == submission_id).first()
    if not db_submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    db_submission.points_earned = grading.points_earned
    db_submission.grade = grading.grade
    db_submission.feedback = grading.feedback
    db_submission.status = "graded"
    db_submission.graded_at = datetime.utcnow()
    db_submission.graded_by = teacher_id
    
    db.commit()
    db.refresh(db_submission)
    return db_submission

@router.get("/assignment/{assignment_id}/submissions", response_model=List[SubmissionResponse])
async def get_assignment_submissions(assignment_id: int, db: Session = Depends(database.get_db)):
    """Get all submissions for an assignment"""
    submissions = db.query(Submission).filter(Submission.assignment_id == assignment_id).all()
    return submissions

@router.get("/student/{student_id}/submissions", response_model=List[SubmissionResponse])
async def get_student_submissions(student_id: int, db: Session = Depends(database.get_db)):
    """Get all submissions by a student"""
    submissions = db.query(Submission).filter(Submission.student_id == student_id).all()
    return submissions