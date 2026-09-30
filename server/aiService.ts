import { GoogleGenAI, Type } from '@google/genai';
import { AISimplification } from '../src/types.js';

const SYSTEM_INSTRUCTION = `You are FinNews AI, a financial news simplification assistant.

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
  "key_points": ["string", "string"],
  "financial_terms": [
    {
      "term": "string",
      "simple_explanation": "string"
    }
  ]
}`;

interface SimplifyParams {
  title: string;
  description?: string;
  content?: string;
  source?: string;
}

// In-memory cache to avoid repeated AI calls for the same article
const simplificationCache = new Map<string, AISimplification>();

export async function simplifyFinancialNews(params: SimplifyParams): Promise<{
  summary: AISimplification;
  provider: 'groq-llama-3.3-70b' | 'gemini-3.8-flash' | 'intelligent-fallback';
}> {
  const cacheKey = `${params.title.toLowerCase().trim()}`;
  if (simplificationCache.has(cacheKey)) {
    return {
      summary: simplificationCache.get(cacheKey)!,
      provider: 'intelligent-fallback',
    };
  }

  const promptContent = `
Article Title: ${params.title}
Source: ${params.source || 'Financial News Wire'}
Description: ${params.description || 'N/A'}
Article Content: ${params.content || params.description || params.title}
`;

  // 1. Try Groq API first if GROQ_API_KEY is present (per prompt spec)
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey && groqKey.trim() !== '') {
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            { role: 'user', content: promptContent },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2,
        }),
      });

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        const contentStr = data.choices?.[0]?.message?.content;
        if (contentStr) {
          const parsed = JSON.parse(contentStr) as AISimplification;
          if (isValidSimplification(parsed)) {
            simplificationCache.set(cacheKey, parsed);
            return { summary: sanitizeSimplification(parsed), provider: 'groq-llama-3.3-70b' };
          }
        }
      } else {
        console.warn('Groq API error:', groqResponse.status, await groqResponse.text());
      }
    } catch (err) {
      console.warn('Groq simplification failed, falling back to Gemini:', err);
    }
  }

  // 2. Try Gemini API using @google/genai (supported out of the box in AI Studio)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim() !== '') {
    try {
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContent,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              simplified_headline: { type: Type.STRING },
              tldr: { type: Type.STRING },
              what_happened: { type: Type.STRING },
              why_it_matters: { type: Type.STRING },
              key_points: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              financial_terms: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    simple_explanation: { type: Type.STRING },
                  },
                  required: ['term', 'simple_explanation'],
                },
              },
            },
            required: [
              'simplified_headline',
              'tldr',
              'what_happened',
              'why_it_matters',
              'key_points',
              'financial_terms',
            ],
          },
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text) as AISimplification;
        if (isValidSimplification(parsed)) {
          simplificationCache.set(cacheKey, parsed);
          return { summary: sanitizeSimplification(parsed), provider: 'gemini-3.8-flash' };
        }
      }
    } catch (err) {
      console.warn('Gemini simplification failed, using heuristic fallback:', err);
    }
  }

  // 3. Fallback heuristic simplification (prevents ever crashing on network/key errors)
  const fallback = generateHeuristicSimplification(params);
  simplificationCache.set(cacheKey, fallback);
  return { summary: fallback, provider: 'intelligent-fallback' };
}

function isValidSimplification(obj: any): boolean {
  return (
    obj &&
    typeof obj.simplified_headline === 'string' &&
    typeof obj.tldr === 'string' &&
    typeof obj.what_happened === 'string' &&
    typeof obj.why_it_matters === 'string' &&
    Array.isArray(obj.key_points) &&
    Array.isArray(obj.financial_terms)
  );
}

function sanitizeSimplification(data: AISimplification): AISimplification {
  return {
    simplified_headline: data.simplified_headline || 'Key developments in financial news today.',
    tldr: data.tldr || 'Important financial updates summarized for everyday investors.',
    what_happened: data.what_happened || 'Companies and regulatory agencies reported major strategic developments.',
    why_it_matters: data.why_it_matters || 'Economic decisions affect corporate valuations, consumer borrowing, and retirement portfolios.',
    key_points: data.key_points?.length ? data.key_points : [
      'Key market indicators responded to fresh announcements.',
      'Analysts continue to monitor macroeconomic implications.',
      'Investors should keep track of upcoming quarterly reports.'
    ],
    financial_terms: data.financial_terms?.length ? data.financial_terms : [
      {
        term: 'Macroeconomic',
        simple_explanation: 'Relating to large-scale economic factors like interest rates, employment, and national output.'
      }
    ]
  };
}

function generateHeuristicSimplification(params: SimplifyParams): AISimplification {
  const title = params.title || 'Financial Market Update';
  const desc = params.description || params.content || 'Major economic and market announcement.';

  // Detect common financial terms
  const termsFound: { term: string; simple_explanation: string }[] = [];
  const textToScan = `${title} ${desc}`.toLowerCase();

  const termGlossary: Record<string, string> = {
    'inflation': 'The rate at which prices for goods and services are rising over time, diminishing purchasing power.',
    'interest rate': 'The proportion of a loan that is charged as interest to the borrower, set as a benchmark by the central bank.',
    'federal reserve': 'The central banking system of the United States that manages the nation\'s money supply and loan rates.',
    's&p 500': 'A stock market index tracking the stock performance of 500 of the largest companies listed on US stock exchanges.',
    'revenue': 'The total amount of money brought in by a company\'s operations, measured over a set amount of time.',
    'etf': 'Exchange-Traded Fund: An investment vehicle that holds a basket of assets like stocks or bonds and trades on an exchange.',
    'dividend': 'A distribution of a portion of a company\'s earnings to a class of its shareholders.',
    'recession': 'A significant, widespread, and prolonged downturn in economic activity across a country.',
    'bull market': 'A financial market of a group of securities in which prices are rising or are expected to rise.',
    'bear market': 'A market condition in which prices are falling by 20% or more, characterized by widespread pessimism.',
    'capex': 'Capital Expenditures: Funds used by a company to acquire, upgrade, and maintain physical assets like property and equipment.',
    'yield': 'The income return on an investment, such as the interest or dividends received from holding a particular security.',
  };

  for (const [key, val] of Object.entries(termGlossary)) {
    if (textToScan.includes(key)) {
      termsFound.push({
        term: key.charAt(0).toUpperCase() + key.slice(1),
        simple_explanation: val,
      });
      if (termsFound.length >= 3) break;
    }
  }

  if (termsFound.length === 0) {
    termsFound.push({
      term: 'Market Sentiment',
      simple_explanation: 'The overall attitude of investors toward a particular financial market or security.',
    });
    termsFound.push({
      term: 'Liquidity',
      simple_explanation: 'How easily an asset can be converted into cash without affecting its market price.',
    });
  }

  return {
    simplified_headline: title.length > 80 ? `${title.slice(0, 77)}...` : title,
    tldr: desc.length > 150 ? `${desc.slice(0, 147)}...` : desc,
    what_happened: desc || 'Market participants reported new developments that influence broader financial expectations.',
    why_it_matters: 'Market changes impact everyday borrowing rates, corporate earnings, and retirement investments.',
    key_points: [
      `Key announcement from ${params.source || 'financial reports'}.`,
      'Analysts are assessing the impact on industry growth and inflation benchmarks.',
      'Further disclosures are expected in upcoming regulatory filings.',
    ],
    financial_terms: termsFound,
  };
}
