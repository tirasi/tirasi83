from fastapi import APIRouter
from typing import Optional
from app.services.nasa import fetch_neo_feed
from app.services.risk import calculate_risk_score, get_risk_category

router = APIRouter()

@router.get("/feed")
def get_neo_feed(start_date: Optional[str] = None, end_date: Optional[str] = None):
    data = fetch_neo_feed(start_date, end_date)
    
    asteroids = []
    for date, neos in data.get("near_earth_objects", {}).items():
        for neo in neos:
            approach = neo["close_approach_data"][0] if neo["close_approach_data"] else {}
            risk_score = calculate_risk_score(neo)
            
            asteroids.append({
                "id": neo["id"],
                "name": neo["name"],
                "diameter_m": neo["estimated_diameter"]["meters"]["estimated_diameter_max"],
                "is_hazardous": neo["is_potentially_hazardous_asteroid"],
                "velocity_kmh": approach.get("relative_velocity", {}).get("kilometers_per_hour"),
                "distance_km": approach.get("miss_distance", {}).get("kilometers"),
                "approach_date": approach.get("close_approach_date"),
                "risk_score": risk_score,
                "risk_category": get_risk_category(risk_score)
            })
    
    return {"count": len(asteroids), "asteroids": asteroids}
