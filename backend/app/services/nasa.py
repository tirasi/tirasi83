import requests
from datetime import datetime, timedelta
from app.core.config import settings

def fetch_neo_feed(start_date=None, end_date=None):
    if not start_date:
        start_date = datetime.now().strftime("%Y-%m-%d")
    if not end_date:
        end_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
    
    url = "https://api.nasa.gov/neo/rest/v1/feed"
    params = {
        "start_date": start_date,
        "end_date": end_date,
        "api_key": settings.NASA_API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()
