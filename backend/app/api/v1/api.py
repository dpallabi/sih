from fastapi import APIRouter
from app.api.v1.endpoints import auth, courses, assignments, attendance, chat

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(assignments.router, prefix="/assignments", tags=["assignments"])
api_router.include_router(attendance.router, prefix="/attendance", tags=["attendance"])