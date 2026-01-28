import os

class Config:
    # Use .replace to ensure the URL starts with 'postgresql://' for SQLAlchemy 1.4+
    raw_uri = os.getenv("DATABASE_URL", "sqlite:///local.db")
    if raw_uri.startswith("postgres://"):
        raw_uri = raw_uri.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_DATABASE_URI = raw_uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret")
