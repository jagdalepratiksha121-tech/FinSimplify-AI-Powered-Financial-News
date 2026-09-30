import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "FinNews AI"
    TAGLINE: str = "Complex Financial News. Made Simple."
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Environment variables
    NEWS_API_KEY: str = os.getenv("NEWS_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    
    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "*"
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
