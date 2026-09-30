from fastapi import APIRouter, Query
from typing import Optional
from backend.schemas import NewsResponse
from backend.services.news_service import fetch_financial_news
from backend.services.ai_service import simplify_article
from backend.schemas import SimplifyRequest

router = APIRouter(prefix="", tags=["News"])

@router.get("/news", response_model=NewsResponse)
async def get_news(
    category: Optional[str] = Query("all", description="Financial category"),
    country: Optional[str] = Query("us", description="Country code"),
    search: Optional[str] = Query(None, description="Search keyword"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50)
):
    return await fetch_financial_news(
        category=category,
        country=country,
        search=search,
        page=page,
        page_size=page_size
    )

@router.get("/news/simplified", response_model=NewsResponse)
async def get_simplified_news(
    category: Optional[str] = Query("all"),
    country: Optional[str] = Query("us"),
    search: Optional[str] = Query(None),
    page_size: int = Query(6, ge=1, le=20)
):
    news = await fetch_financial_news(
        category=category,
        country=country,
        search=search,
        page=1,
        page_size=page_size
    )
    
    # Simplify each article
    for article in news.articles:
        if not article.simplified:
            try:
                sim, _ = await simplify_article(
                    SimplifyRequest(
                        title=article.title,
                        description=article.description,
                        content=article.content,
                        source=article.source.name
                    )
                )
                article.simplified = sim
            except Exception as e:
                print(f"Error simplifying article {article.id}: {e}")

    return news
