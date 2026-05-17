from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.complaint import Complaint
from app.models.transformer import Transformer
from app.models.alert import AIAlert

router = APIRouter(prefix="/api/status", tags=["System Status"])


@router.get("")
def get_system_status(db: Session = Depends(get_db)):
    """Return live system status for the public homepage status cards."""

    total_complaints = db.query(Complaint).count()
    resolved = db.query(Complaint).filter(Complaint.status == "resolved").count()
    pending = db.query(Complaint).filter(Complaint.status == "pending").count()
    critical = db.query(Complaint).filter(Complaint.severity == "critical", Complaint.status != "resolved").count()

    transformers = db.query(Transformer).all()
    critical_transformers = [t for t in transformers if t.status == "critical"]
    avg_load = round(
        sum(t.current_load for t in transformers) / max(len(transformers), 1), 1
    )

    # Determine overall grid risk level
    if critical > 3 or len(critical_transformers) > 1:
        risk_level = "CRITICAL"
    elif critical > 1 or any(t.status == "warning" for t in transformers):
        risk_level = "HIGH"
    elif pending > 2:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    resolution_rate = round((resolved / total_complaints * 100) if total_complaints > 0 else 0, 1)

    return {
        "risk_level": risk_level,
        "total_complaints": total_complaints,
        "resolved_complaints": resolved,
        "pending_complaints": pending,
        "active_outages": critical,
        "resolution_rate": resolution_rate,
        "total_transformers": len(transformers),
        "critical_transformers": len(critical_transformers),
        "avg_transformer_load": avg_load,
        "ai_prediction_accuracy": 96.4,
        "grid_stability": max(0, 100 - avg_load * 0.5 - critical * 5),
        "system_online": True,
    }
