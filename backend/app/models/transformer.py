from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Transformer(Base):
    __tablename__ = "transformers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    current_load = Column(Float, default=0.0)
    health = Column(Float, default=100.0)  # 0-100 percentage
    complaint_count = Column(Integer, default=0)
    status = Column(String(30), default="normal")  # normal, warning, critical, offline
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
