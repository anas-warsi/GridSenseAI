from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class AlertResponse(BaseModel):
    id: int
    type: str
    message: str
    confidence: float
    source: str
    created_at: datetime

    class Config:
        from_attributes = True


class AuthRequest(BaseModel):
    username: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)


class AuthResponse(BaseModel):
    success: bool
    message: str
    role: Optional[str] = None


class AIAnalyzeRequest(BaseModel):
    complaint_id: Optional[int] = None
    type: str
    severity: str
    details: Optional[str] = None
    location: Optional[str] = None
