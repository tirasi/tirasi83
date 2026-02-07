from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, neos, alerts
from app.db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Asteroid Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(neos.router, prefix="/neos", tags=["Asteroids"])
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])

@app.get("/")
def root():
    return {"message": "Asteroid Tracker API", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
