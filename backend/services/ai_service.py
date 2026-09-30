import json
import httpx
from backend.config import settings
from backend.schemas import AISimplification, FinancialTerm, SimplifyRequest

SYSTEM_INSTRUCTION = """You are FinNews AI, a financial news simplification assistant.

Your job is to transform financial and economic news into accurate, neutral, easy-to-understand explanations.

Do not invent facts.
Do not add information that is not supported by the article.
Do not provide personalized financial advice.
Do not tell the user to buy, sell, or hold an asset.
Clearly distinguish facts reported in the article from explanations.
Preserve important numbers, percentages, dates, company names, and economic indicators.
Explain financial terminology using simple language.

Return structured JSON with:
{
  "simplified_headline": "string",
  "tldr": "string",
  "what_happened": "string",
  "why_it_matters": "string",
  "key_points": ["string"],
  "financial_terms": [
    {
      "term": "string",
      "simple_explanation": "string"
    }
  ]
}"""

async def simplify_article(request: SimplifyRequest) -> tuple[AISimplification, str]:
    # 1. Try Groq Llama 3.3 70B if API key is configured
    if settings.GROQ_API_KEY:
        try:
            prompt_content = f"Article Title: {request.title}\nSource: {request.source}\nDescription: {request.description}\nContent: {request.content}"
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": settings.GROQ_MODEL,
                        "messages": [
                            {"role": "system", "content": SYSTEM_INSTRUCTION},
                            {"role": "user", "content": prompt_content},
                        ],
                        "response_format": {"type": "json_object"},
                        "temperature": 0.2,
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    content = data["choices"][0]["message"]["content"]
                    parsed = json.loads(content)
                    return AISimplification(**parsed), "groq-llama-3.3-70b"
        except Exception as e:
            print(f"Groq simplification error: {e}")

    # Fallback heuristic parser
    return generate_fallback_simplification(request), "fallback-engine"

def generate_fallback_simplification(request: SimplifyRequest) -> AISimplification:
    title = request.title
    desc = request.description or request.content or "Market news event."
    return AISimplification(
        simplified_headline=title[:80] + "..." if len(title) > 80 else title,
        tldr=desc[:150] + "..." if len(desc) > 150 else desc,
        what_happened=desc,
        why_it_matters="Financial and economic shifts directly affect borrowing rates, company valuations, and everyday living costs.",
        key_points=[
            f"Key update from {request.source or 'financial reports'}.",
            "Market participants and central bankers are monitoring the long-term impact.",
            "Further regulatory and earnings disclosures will provide more clarity."
        ],
        financial_terms=[
            FinancialTerm(
                term="Inflation",
                simple_explanation="The rate at which prices of goods and services rise over time, diminishing purchasing power."
            ),
            FinancialTerm(
                term="Interest Rate",
                simple_explanation="The cost charged by lenders to borrowers for using money over time."
            )
        ]
    )
