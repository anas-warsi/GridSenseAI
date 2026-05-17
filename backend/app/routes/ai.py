from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.alert import AIAnalyzeRequest
from app.services.gemini_service import analyze_complaint, generate_grid_insight
from app.models.transformer import Transformer
from app.models.complaint import Complaint

router = APIRouter(prefix="/api/ai", tags=["AI Analysis"])


@router.get("/grid-summary")
async def get_grid_summary(db: Session = Depends(get_db)):
    """Generate a high-level grid operational summary."""
    transformers = db.query(Transformer).all()
    complaints = db.query(Complaint).all()
    summary = await generate_grid_insight(transformers, complaints)
    return {"summary": summary}


@router.post("/analyze")
async def analyze(request: AIAnalyzeRequest, db: Session = Depends(get_db)):
    """Run Gemini AI analysis on a complaint or manual input."""
    result = await analyze_complaint(
        complaint_type=request.type,
        severity=request.severity,
        details=request.details,
        location=request.location
    )
    return result
