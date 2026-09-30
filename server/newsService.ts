import { Article, NewsResponse } from '../src/types.js';
import { CURATED_FINANCIAL_NEWS } from './curatedData.js';

interface FetchNewsParams {
  category?: string;
  country?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getFinancialNews(params: FetchNewsParams): Promise<NewsResponse> {
  const apiKey = process.env.NEWS_API_KEY;
  const category = (params.category || 'all').toLowerCase();
  const search = params.search ? params.search.trim().toLowerCase() : '';
  const pageSize = Math.min(Math.max(params.pageSize || 10, 1), 30);

  // 1. Try real NewsAPI if key is available
  if (apiKey && apiKey.trim() !== '') {
    try {
      const url = new URL('https://newsapi.org/v2/top-headlines');
      url.searchParams.set('apiKey', apiKey);
      url.searchParams.set('pageSize', pageSize.toString());
      if (params.page) url.searchParams.set('page', params.page.toString());

      // NewsAPI supported categories: business, entertainment, general, health, science, sports, technology
      const newsApiCategoryMap: Record<string, string> = {
        business: 'business',
        markets: 'business',
        economy: 'business',
        technology: 'technology',
        banking: 'business',
        global: 'business',
        startups: 'business',
        cryptocurrency: 'business',
      };

      const mappedCategory = newsApiCategoryMap[category] || 'business';
      url.searchParams.set('category', mappedCategory);

      if (params.country && params.country !== 'global') {
        url.searchParams.set('country', params.country.toLowerCase());
      } else {
        url.searchParams.set('country', 'us');
      }

      if (search) {
        url.searchParams.set('q', search);
      }

      const res = await fetch(url.toString(), {
        headers: { 'User-Agent': 'FinNewsAI/1.0' },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && Array.isArray(data.articles) && data.articles.length > 0) {
          const articles: Article[] = data.articles
            .filter((a: any) => a.title && a.title !== '[Removed]' && a.description)
            .map((a: any, idx: number) => ({
              id: `newsapi-${Date.now()}-${idx}`,
              title: a.title,
              description: a.description || '',
              content: a.content || a.description || '',
              url: a.url || '#',
              urlToImage: a.urlToImage || getRandomFinanceImage(category),
              publishedAt: a.publishedAt || new Date().toISOString(),
              source: { name: a.source?.name || 'Financial News' },
              category: determineCategory(a.title, a.description, category),
            }));

          return {
            status: 'success',
            total: articles.length,
            category: category,
            articles: articles,
            source_type: 'live_newsapi',
          };
        }
      } else {
        console.warn('NewsAPI response not ok:', res.status, await res.text());
      }
    } catch (err) {
      console.warn('NewsAPI fetch error, falling back to curated news:', err);
    }
  }

  // 2. Curated Financial Feed Fallback (reliable, high quality, always works)
  let filtered = [...CURATED_FINANCIAL_NEWS];

  if (category !== 'all' && category !== 'general') {
    filtered = filtered.filter(a => {
      const artCat = a.category.toLowerCase().replace(/\s+/g, '');
      const reqCat = category.replace(/\s+/g, '');
      return artCat.includes(reqCat) || reqCat.includes(artCat);
    });
  }

  if (search) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(search) ||
      a.description.toLowerCase().includes(search) ||
      a.category.toLowerCase().includes(search) ||
      a.source.name.toLowerCase().includes(search)
    );
  }

  // If filtered result is empty due to strict category + search, return closest matches
  if (filtered.length === 0 && search) {
    filtered = CURATED_FINANCIAL_NEWS.filter(a =>
      a.title.toLowerCase().includes(search) ||
      a.description.toLowerCase().includes(search)
    );
  }

  // If still empty (e.g. no match found), return all curated
  if (filtered.length === 0) {
    filtered = [...CURATED_FINANCIAL_NEWS];
  }

  return {
    status: 'success',
    total: filtered.length,
    category: category,
    articles: filtered.slice(0, pageSize),
    source_type: 'curated_feed',
  };
}

function determineCategory(title: string, desc: string, defaultCat: string): string {
  const text = `${title} ${desc}`.toLowerCase();
  if (text.includes('crypto') || text.includes('bitcoin') || text.includes('ethereum') || text.includes('blockchain')) {
    return 'Cryptocurrency';
  }
  if (text.includes('bank') || text.includes('lending') || text.includes('fdic') || text.includes('basel')) {
    return 'Banking';
  }
  if (text.includes('startup') || text.includes('venture') || text.includes('seed round') || text.includes('series a')) {
    return 'Startups';
  }
  if (text.includes('inflation') || text.includes('fed') || text.includes('rate') || text.includes('cpi') || text.includes('jobs report')) {
    return 'Economy';
  }
  if (text.includes('stock') || text.includes('s&p') || text.includes('nasdaq') || text.includes('dow') || text.includes('yield')) {
    return 'Markets';
  }
  if (text.includes('tech') || text.includes('ai') || text.includes('chip') || text.includes('software')) {
    return 'Technology';
  }
  if (text.includes('europe') || text.includes('asia') || text.includes('ecb') || text.includes('global') || text.includes('china')) {
    return 'Global Markets';
  }
  return defaultCat.charAt(0).toUpperCase() + defaultCat.slice(1);
}

function getRandomFinanceImage(category: string): string {
  const images = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  ];
  return images[Math.floor(Math.random() * images.length)];
}
