from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate, ComplaintResponse
from app.services import complaint_service

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])


@router.get("", response_model=List[ComplaintResponse])
def get_complaints(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db)
):
    return complaint_service.get_all_complaints(db, skip=skip, limit=limit)


@router.post("", response_model=ComplaintResponse, status_code=201)
async def create_complaint(complaint: ComplaintCreate, db: Session = Depends(get_db)):
    try:
        return await complaint_service.create_complaint_with_ai(db, complaint)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create complaint: {str(e)}")


@router.patch("/{complaint_id}", response_model=ComplaintResponse)
def update_complaint(
    complaint_id: int,
    update: ComplaintUpdate,
    db: Session = Depends(get_db)
):
    updated = complaint_service.update_complaint(db, complaint_id, update)
    if not updated:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return updated


@router.get("/stats/summary")
def get_complaint_stats(db: Session = Depends(get_db)):
    return complaint_service.get_complaint_stats(db)
