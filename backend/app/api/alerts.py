from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.db import get_db
from app.models.user import User
from app.models.watchlist import Watchlist
from app.api.auth import get_current_user
from app.services.nasa import fetch_neo_feed
import requests
from app.core.config import settings

router = APIRouter()

class WatchlistAdd(BaseModel):
    asteroid_id: str
    asteroid_name: str
    alert_distance_km: Optional[float] = 10000000

@router.post("/watchlist")
def add_to_watchlist(item: WatchlistAdd, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(Watchlist).filter(
        Watchlist.user_id == current_user.id,
        Watchlist.asteroid_id == item.asteroid_id
    ).first()
    
    if existing:
        return {"message": "Already in watchlist"}
    
    watch = Watchlist(
        user_id=current_user.id,
        asteroid_id=item.asteroid_id,
        asteroid_name=item.asteroid_name,
        alert_distance_km=item.alert_distance_km
    )
    db.add(watch)
    db.commit()
    
    return {"message": "Added to watchlist"}

@router.get("/watchlist")
def get_watchlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    items = db.query(Watchlist).filter(Watchlist.user_id == current_user.id).all()
    return {"watchlist": [
        {
            "id": w.id,
            "asteroid_id": w.asteroid_id,
            "asteroid_name": w.asteroid_name,
            "alert_distance_km": w.alert_distance_km,
            "added_at": w.added_at
        } for w in items
    ]}

@router.get("/upcoming")
def get_upcoming_alerts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    watchlist = db.query(Watchlist).filter(Watchlist.user_id == current_user.id).all()
    
    alerts = []
    for item in watchlist:
        try:
            url = f"https://api.nasa.gov/neo/rest/v1/neo/{item.asteroid_id}"
            response = requests.get(url, params={"api_key": settings.NASA_API_KEY})
            asteroid = response.json()
            
            for approach in asteroid.get("close_approach_data", [])[:3]:
                distance = float(approach["miss_distance"]["kilometers"])
                if distance < item.alert_distance_km:
                    alerts.append({
                        "asteroid_name": item.asteroid_name,
                        "approach_date": approach["close_approach_date"],
                        "distance_km": distance,
                        "velocity_kmh": approach["relative_velocity"]["kilometers_per_hour"],
                        "alert_level": "HIGH" if distance < 5000000 else "MEDIUM"
                    })
        except:
            continue
    
    return {"alerts": sorted(alerts, key=lambda x: x["distance_km"])}
