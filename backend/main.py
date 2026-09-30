from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.routes import health, news, ai

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Complex Financial News. Made Simple. AI-powered financial and business news simplifier.",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes under /api
app.include_router(health.router, prefix=settings.API_PREFIX)
app.include_router(news.router, prefix=settings.API_PREFIX)
app.include_router(ai.router, prefix=settings.API_PREFIX)

@app.get("/")
def read_root():
    return {
        "service": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "status": "online",
        "documentation": "/docs",
        "api_endpoints": [
            f"{settings.API_PREFIX}/health",
            f"{settings.API_PREFIX}/news",
            f"{settings.API_PREFIX}/simplify",
            f"{settings.API_PREFIX}/news/simplified"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
