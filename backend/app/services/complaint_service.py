from sqlalchemy.orm import Session
from app.models.complaint import Complaint
from app.models.alert import AIAlert
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate
from app.services.gemini_service import analyze_complaint
from datetime import datetime


def get_all_complaints(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Complaint).order_by(Complaint.created_at.desc()).offset(skip).limit(limit).all()


def create_complaint(db: Session, complaint: ComplaintCreate):
    db_complaint = Complaint(
        type=complaint.type,
        severity=complaint.severity,
        latitude=complaint.latitude,
        longitude=complaint.longitude,
        details=complaint.details,
        status="pending"
    )
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    return db_complaint


async def create_complaint_with_ai(db: Session, complaint: ComplaintCreate):
    """Create a complaint and run Gemini analysis asynchronously."""
    db_complaint = create_complaint(db, complaint)

    # Run AI analysis
    analysis = await analyze_complaint(
        complaint_type=complaint.type,
        severity=complaint.severity,
        details=complaint.details
    )

    # Store AI analysis as JSON string summary
    ai_summary = analysis.get("ai_summary", "")
    recommendation = analysis.get("recommendation", "")
    ai_text = f"{ai_summary} Recommendation: {recommendation}"

    db_complaint.ai_analysis = ai_text
    db.commit()
    db.refresh(db_complaint)

    # Create an AI alert from the analysis
    alert_msg = f"{complaint.type} detected at ({complaint.latitude:.4f}, {complaint.longitude:.4f}). {ai_summary}"
    db_alert = AIAlert(
        type=analysis.get("severity_prediction", complaint.severity),
        message=alert_msg,
        confidence=analysis.get("confidence", 0.88),
        source=analysis.get("source", "system")
    )
    db.add(db_alert)
    db.commit()

    return db_complaint


def update_complaint(db: Session, complaint_id: int, update: ComplaintUpdate):
    db_complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not db_complaint:
        return None
    if update.status is not None:
        db_complaint.status = update.status
    if update.ai_analysis is not None:
        db_complaint.ai_analysis = update.ai_analysis
    db.commit()
    db.refresh(db_complaint)
    return db_complaint


def get_complaint_stats(db: Session):
    total = db.query(Complaint).count()
    resolved = db.query(Complaint).filter(Complaint.status == "resolved").count()
    pending = db.query(Complaint).filter(Complaint.status == "pending").count()
    critical = db.query(Complaint).filter(Complaint.severity == "critical").count()
    return {
        "total": total,
        "resolved": resolved,
        "pending": pending,
        "critical": critical,
        "resolution_rate": round((resolved / total * 100) if total > 0 else 0, 1)
    }
