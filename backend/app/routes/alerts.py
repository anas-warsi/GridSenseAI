from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.alert import AIAlert
from app.schemas.alert import AlertResponse

router = APIRouter(prefix="/api/alerts", tags=["AI Alerts"])


@router.get("", response_model=List[AlertResponse])
def get_alerts(
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return db.query(AIAlert).order_by(AIAlert.created_at.desc()).limit(limit).all()
