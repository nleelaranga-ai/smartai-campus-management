import os

class Config:
    # Get the URL and fix the postgres:// vs postgresql:// issue for Neon
    database_url = os.getenv("DATABASE_URL", "sqlite:///campus.db")
    if database_url and database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secure-dev-key")
