from typing import List, Optional
from pydantic import BaseModel, Field

class FinancialTerm(BaseModel):
    term: str = Field(..., description="The financial or economic term")
    simple_explanation: str = Field(..., description="Plain-English explanation of the term")

class AISimplification(BaseModel):
    simplified_headline: str = Field(..., description="Clear, jargon-free headline")
    tldr: str = Field(..., description="High-level 1-sentence summary")
    what_happened: str = Field(..., description="Objective breakdown of facts")
    why_it_matters: str = Field(..., description="Real-world impact on loans, savings, jobs, or markets")
    key_points: List[str] = Field(default_factory=list, description="Bullet point facts")
    financial_terms: List[FinancialTerm] = Field(default_factory=list, description="Explained terminology")

class ArticleSource(BaseModel):
    id: Optional[str] = None
    name: str

class Article(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""
    content: Optional[str] = ""
    url: str
    urlToImage: Optional[str] = ""
    publishedAt: str
    source: ArticleSource
    category: str
    simplified: Optional[AISimplification] = None

class SimplifyRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    content: Optional[str] = ""
    source: Optional[str] = ""

class SimplifyResponse(BaseModel):
    status: str = "success"
    summary: AISimplification
    provider: Optional[str] = None

class NewsResponse(BaseModel):
    status: str = "success"
    total: int
    category: Optional[str] = None
    articles: List[Article]
    source_type: Optional[str] = "curated_feed"

class HealthResponse(BaseModel):
    status: str = "healthy"
    service: str = "FinNews AI"
    version: str = "1.0.0"
    active_ai: str
    providers: dict
