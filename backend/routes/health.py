from fastapi import APIRouter
from backend.config import settings
from backend.schemas import HealthResponse

router = APIRouter(prefix="", tags=["Health"])

@router.get("/health", response_model=HealthResponse)
async def get_health():
    active_ai = "Groq Llama 3.3 70B" if settings.GROQ_API_KEY else "Fallback Intelligence Engine"
    return HealthResponse(
        status="healthy",
        service=settings.PROJECT_NAME,
        version=settings.VERSION,
        active_ai=active_ai,
        providers={
            "groq": bool(settings.GROQ_API_KEY),
            "newsapi": bool(settings.NEWS_API_KEY),
        }
    )
