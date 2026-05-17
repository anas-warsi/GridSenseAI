from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(100), nullable=False)
    severity = Column(String(20), nullable=False)  # critical, high, warning
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    details = Column(Text, nullable=True)
    status = Column(String(30), default="pending")  # pending, in_progress, resolved
    ai_analysis = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
