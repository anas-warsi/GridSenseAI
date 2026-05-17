from pydantic import BaseModel
from typing import Optional


class TransformerResponse(BaseModel):
    id: int
    name: str
    current_load: float
    health: float
    complaint_count: int
    status: str
    latitude: Optional[float]
    longitude: Optional[float]

    class Config:
        from_attributes = True
