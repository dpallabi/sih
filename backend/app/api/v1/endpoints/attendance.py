from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import date

from app.core import database
from app.models.attendance import Attendance
from app.schemas.attendance import (
    AttendanceCreate, AttendanceResponse, AttendanceUpdate, AttendanceStats
)

router = APIRouter()

@router.post("/", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(database.get_db)):
    """Mark attendance for a student"""
    
    # Check if already marked for this date
    existing = db.query(Attendance).filter(
        Attendance.course_id == attendance.course_id,
        Attendance.student_id == attendance.student_id,
        Attendance.date == attendance.date
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")
    
    db_attendance = Attendance(**attendance.model_dump())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

@router.put("/{attendance_id}", response_model=AttendanceResponse)
async def update_attendance(attendance_id: int, attendance_update: AttendanceUpdate, db: Session = Depends(database.get_db)):
    """Update attendance record"""
    db_attendance = db.query(Attendance).filter(Attendance.attendance_id == attendance_id).first()
    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    update_data = attendance_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_attendance, field, value)
    
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

@router.get("/course/{course_id}/date/{date}", response_model=List[AttendanceResponse])
async def get_course_attendance_by_date(course_id: int, date: date, db: Session = Depends(database.get_db)):
    """Get attendance for a course on a specific date"""
    attendance = db.query(Attendance).filter(
        Attendance.course_id == course_id,
        Attendance.date == date
    ).all()
    return attendance

@router.get("/student/{student_id}/course/{course_id}", response_model=List[AttendanceResponse])
async def get_student_course_attendance(student_id: int, course_id: int, db: Session = Depends(database.get_db)):
    """Get attendance history for a student in a course"""
    attendance = db.query(Attendance).filter(
        Attendance.student_id == student_id,
        Attendance.course_id == course_id
    ).order_by(Attendance.date.desc()).all()
    return attendance

@router.get("/student/{student_id}/course/{course_id}/stats", response_model=AttendanceStats)
async def get_student_attendance_stats(student_id: int, course_id: int, db: Session = Depends(database.get_db)):
    """Get attendance statistics for a student in a course"""
    
    records = db.query(Attendance).filter(
        Attendance.student_id == student_id,
        Attendance.course_id == course_id
    ).all()
    
    if not records:
        return AttendanceStats(
            total_classes=0,
            present=0,
            absent=0,
            late=0,
            excused=0,
            attendance_rate=0.0
        )
    
    total = len(records)
    present = sum(1 for r in records if r.status == "present")
    absent = sum(1 for r in records if r.status == "absent")
    late = sum(1 for r in records if r.status == "late")
    excused = sum(1 for r in records if r.status == "excused")
    
    attendance_rate = (present / total * 100) if total > 0 else 0.0
    
    return AttendanceStats(
        total_classes=total,
        present=present,
        absent=absent,
        late=late,
        excused=excused,
        attendance_rate=round(attendance_rate, 2)
    )

@router.delete("/{attendance_id}")
async def delete_attendance(attendance_id: int, db: Session = Depends(database.get_db)):
    """Delete an attendance record"""
    db_attendance = db.query(Attendance).filter(Attendance.attendance_id == attendance_id).first()
    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    db.delete(db_attendance)
    db.commit()
    return {"message": "Attendance record deleted successfully"}