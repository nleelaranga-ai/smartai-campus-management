import os
from datetime import timedelta

class Config:
    # Automatically convert postgres:// to postgresql:// for SQLAlchemy 1.4+
    database_url = os.getenv("DATABASE_URL", "sqlite:///campus.db")
    if database_url and database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-campus-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
