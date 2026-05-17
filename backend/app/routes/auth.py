from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.alert import Admin
from app.schemas.alert import AuthRequest, AuthResponse

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login(credentials: AuthRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == credentials.username).first()
    if not admin or admin.password != credentials.password:
        return AuthResponse(success=False, message="Invalid credentials.")
    return AuthResponse(success=True, message="Authentication successful.", role="admin")
