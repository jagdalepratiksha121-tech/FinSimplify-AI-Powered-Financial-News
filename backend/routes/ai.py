from fastapi import APIRouter, HTTPException
from backend.schemas import SimplifyRequest, SimplifyResponse
from backend.services.ai_service import simplify_article

router = APIRouter(prefix="", tags=["AI Simplifier"])

@router.post("/simplify", response_model=SimplifyResponse)
async def simplify(request: SimplifyRequest):
    if not request.title or not request.title.strip():
        raise HTTPException(status_code=400, detail="Article title is required for simplification.")
    
    summary, provider = await simplify_article(request)
    return SimplifyResponse(
        status="success",
        summary=summary,
        provider=provider
    )
