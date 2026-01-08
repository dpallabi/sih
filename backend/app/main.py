from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.database import engine, Base

# Import all models to create tables
from app.models.user import User
from app.models.course import Course, Student, Teacher, enrollments
from app.models.assignment import Assignment, Submission
from app.models.attendance import Attendance

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Student System API",
    description="Backend API for Student Management System",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "Smart Student System API",
        "version": "2.0.0",
        "features": [
            "Authentication",
            "Course Management",
            "Assignments & Grading",
            "Attendance Tracking",
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}