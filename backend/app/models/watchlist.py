from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from app.db import Base

class Watchlist(Base):
    __tablename__ = "watchlist"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    asteroid_id = Column(String, nullable=False)
    asteroid_name = Column(String, nullable=False)
    alert_distance_km = Column(Float, default=10000000)
    added_at = Column(DateTime, default=datetime.utcnow)
