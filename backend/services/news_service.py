import httpx
from typing import Optional, List
from backend.config import settings
from backend.schemas import Article, ArticleSource, NewsResponse

CURATED_ARTICLES = [
    {
        "id": "py-001",
        "category": "Economy",
        "title": "Federal Reserve Holds Benchmark Rate Steady at 5.25%-5.50% Amid Persistent Inflation Signals",
        "description": "The Federal Open Market Committee voted unanimously to maintain the federal funds target range, citing resilient consumer spending and sticky core services inflation.",
        "content": "Federal Reserve policymakers left borrowing costs at a two-decade high following their two-day policy session in Washington. Chair Jerome Powell underscored that while headline price pressures have moderated from their 2022 peaks, core inflation components remain elevated.",
        "url": "https://www.federalreserve.gov/monetarypolicy.htm",
        "urlToImage": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        "publishedAt": "2026-09-30T10:00:00Z",
        "source": {"name": "Federal Reserve / Reuters"}
    },
    {
        "id": "py-002",
        "category": "Markets",
        "title": "S&P 500 Touches Fresh All-Time High Driven by Semiconductor Rally and Robust Big Tech Earnings",
        "description": "Wall Street benchmark indices gained as chipmakers led a technology rebound, offsetting concerns over prolonged high interest rates.",
        "content": "The S&P 500 index crossed another record milestone on heavy trading volume, powered by a surge in leading semiconductor manufacturers. Investor appetite for generative artificial intelligence infrastructure continues to outpace macroeconomic headwinds.",
        "url": "https://www.bloomberg.com/markets",
        "urlToImage": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
        "publishedAt": "2026-09-30T09:30:00Z",
        "source": {"name": "Bloomberg Markets"}
    },
    {
        "id": "py-003",
        "category": "Technology",
        "title": "Cloud Hyperscalers Announce Combined $180 Billion AI Infrastructure Capex for Current Fiscal Year",
        "description": "Tech giants ramp up investments in custom silicon, high-bandwidth memory, and liquid-cooled data facilities to support growing enterprise AI deployment demands.",
        "content": "Leading enterprise cloud providers have collectively signaled unprecedented capital expenditure forecasts totaling approximately $180 billion over the next twelve months.",
        "url": "https://www.wsj.com/tech",
        "urlToImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        "publishedAt": "2026-09-30T08:45:00Z",
        "source": {"name": "The Wall Street Journal"}
    },
    {
        "id": "py-004",
        "category": "Banking",
        "title": "Global Regulators Finalize Basel III Endgame Capital Rules with Eased Lending Buffer Requirements",
        "description": "Banking authorities unveil refined framework that reduces proposed capital hike from 19% to 9%, averting fears of immediate consumer credit contraction.",
        "content": "The Federal Reserve, FDIC, and OCC presented a calibrated version of the Basel III Endgame bank capital package. Following extensive lobbying, the mandated risk buffer was reduced.",
        "url": "https://www.ft.com/banking",
        "urlToImage": "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80",
        "publishedAt": "2026-09-30T08:00:00Z",
        "source": {"name": "Financial Times"}
    }
]

async def fetch_financial_news(
    category: Optional[str] = "all",
    country: Optional[str] = "us",
    search: Optional[str] = None,
    page: int = 1,
    page_size: int = 10
) -> NewsResponse:
    # 1. Check if NewsAPI key is provided
    if settings.NEWS_API_KEY:
        try:
            params = {
                "apiKey": settings.NEWS_API_KEY,
                "category": "business" if category in ["all", "markets", "economy", "banking"] else category,
                "pageSize": page_size,
                "page": page,
                "country": country or "us"
            }
            if search:
                params["q"] = search

            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get("https://newsapi.org/v2/top-headlines", params=params)
                if res.status_code == 200:
                    data = res.json()
                    articles: List[Article] = []
                    for idx, a in enumerate(data.get("articles", [])):
                        if a.get("title") and a.get("title") != "[Removed]":
                            articles.append(
                                Article(
                                    id=f"newsapi-{idx}",
                                    title=a.get("title", ""),
                                    description=a.get("description", ""),
                                    content=a.get("content", ""),
                                    url=a.get("url", "#"),
                                    urlToImage=a.get("urlToImage", ""),
                                    publishedAt=a.get("publishedAt", ""),
                                    source=ArticleSource(name=a.get("source", {}).get("name", "NewsAPI")),
                                    category=category or "Business"
                                )
                            )
                    return NewsResponse(
                        status="success",
                        total=len(articles),
                        category=category,
                        articles=articles,
                        source_type="live_newsapi"
                    )
        except Exception as e:
            print(f"NewsAPI error in python service: {e}")

    # Fallback to curated articles
    results = [Article(**a) for a in CURATED_ARTICLES]
    if category and category.lower() != "all":
        results = [a for a in results if a.category.lower() == category.lower()]
    if search:
        s = search.lower()
        results = [a for a in results if s in a.title.lower() or s in (a.description or "").lower()]

    return NewsResponse(
        status="success",
        total=len(results),
        category=category,
        articles=results[:page_size],
        source_type="curated_feed"
    )
