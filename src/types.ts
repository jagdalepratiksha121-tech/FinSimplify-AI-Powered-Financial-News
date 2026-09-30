export interface FinancialTerm {
  term: string;
  simple_explanation: string;
}

export interface AISimplification {
  simplified_headline: string;
  tldr: string;
  what_happened: string;
  why_it_matters: string;
  key_points: string[];
  financial_terms: FinancialTerm[];
}

export interface ArticleSource {
  id?: string | null;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: ArticleSource;
  category: string;
  simplified?: AISimplification;
}

export interface NewsResponse {
  status: 'success' | 'error';
  total: number;
  category?: string;
  articles: Article[];
  source_type?: 'live_newsapi' | 'curated_feed';
  message?: string;
}

export interface SimplifyResponse {
  status: 'success' | 'error';
  summary: AISimplification;
  provider?: string;
  message?: string;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded';
  service: string;
  version: string;
  providers: {
    groq: boolean;
    gemini: boolean;
    newsapi: boolean;
  };
  active_ai: string;
  timestamp: string;
}
