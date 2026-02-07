def calculate_risk_score(neo_data):
    score = 0
    
    # Hazardous status (40 points)
    if neo_data.get("is_potentially_hazardous_asteroid"):
        score += 40
    
    # Diameter (30 points max)
    diameter = neo_data.get("estimated_diameter", {}).get("meters", {}).get("estimated_diameter_max", 0)
    if diameter > 1000:
        score += 30
    elif diameter > 500:
        score += 20
    elif diameter > 100:
        score += 10
    
    # Distance (30 points max)
    approaches = neo_data.get("close_approach_data", [])
    if approaches:
        distance = float(approaches[0]["miss_distance"]["kilometers"])
        if distance < 1000000:
            score += 30
        elif distance < 5000000:
            score += 20
        elif distance < 10000000:
            score += 10
    
    return min(score, 100)

def get_risk_category(score):
    if score >= 70:
        return "CRITICAL"
    elif score >= 50:
        return "HIGH"
    elif score >= 30:
        return "MODERATE"
    else:
        return "LOW"
