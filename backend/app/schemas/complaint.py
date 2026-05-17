from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ComplaintCreate(BaseModel):
    type: str = Field(..., min_length=2, max_length=100)
    severity: str = Field(..., pattern="^(critical|high|warning)$")
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    details: Optional[str] = None


class ComplaintUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(pending|in_progress|resolved)$")
    ai_analysis: Optional[str] = None


class ComplaintResponse(BaseModel):
    id: int
    type: str
    severity: str
    latitude: float
    longitude: float
    details: Optional[str]
    status: str
    ai_analysis: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
