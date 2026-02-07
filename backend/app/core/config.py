import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./asteroid.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "wKSqeq0zhecHL0AdjVbhZbfymeFLXymKbybN69de")
    NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 1440

settings = Settings()
