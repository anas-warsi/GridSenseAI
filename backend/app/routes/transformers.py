from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.transformer import Transformer
from app.schemas.transformer import TransformerResponse

router = APIRouter(prefix="/api/transformers", tags=["Transformers"])


@router.get("", response_model=List[TransformerResponse])
def get_transformers(db: Session = Depends(get_db)):
    return db.query(Transformer).all()
