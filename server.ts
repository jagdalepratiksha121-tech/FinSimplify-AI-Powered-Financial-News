import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getFinancialNews } from './server/newsService.js';
import { simplifyFinancialNews } from './server/aiService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Security & parsing middleware
  app.use(express.json({ limit: '1mb' }));

  // CORS middleware for safe cross-origin access
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // 1. Health check endpoint (Section 13)
  app.get('/api/health', (req: Request, res: Response) => {
    const hasGroq = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== '');
    const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
    const hasNewsApi = Boolean(process.env.NEWS_API_KEY && process.env.NEWS_API_KEY.trim() !== '');

    let activeLlm = 'Intelligent Financial Engine (Fallback)';
    if (hasGroq) {
      activeLlm = 'Groq (Llama 3.3 70B)';
    } else if (hasGemini) {
      activeLlm = 'Google Gemini (gemini-3.8-flash)';
    }

    res.json({
      status: 'healthy',
      service: 'FinNews AI',
      version: '1.0.0',
      active_ai: activeLlm,
      providers: {
        groq: hasGroq,
        gemini: hasGemini,
        newsapi: hasNewsApi,
      },
      timestamp: new Date().toISOString(),
    });
  });

  // 2. News endpoint (Section 10)
  app.get('/api/news', async (req: Request, res: Response) => {
    try {
      const { category, country, page, page_size, search } = req.query;

      const pageSizeNum = page_size ? parseInt(page_size as string, 10) : 10;
      const pageNum = page ? parseInt(page as string, 10) : 1;

      const newsResult = await getFinancialNews({
        category: category as string,
        country: country as string,
        search: search as string,
        page: isNaN(pageNum) ? 1 : pageNum,
        pageSize: isNaN(pageSizeNum) ? 10 : pageSizeNum,
      });

      res.json(newsResult);
    } catch (error: any) {
      console.error('Error in /api/news:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to fetch the latest news. Please try again.',
      });
    }
  });

  // 3. AI Simplification endpoint (Section 11)
  app.post('/api/simplify', async (req: Request, res: Response) => {
    try {
      const { title, description, content, source } = req.body;

      if (!title || typeof title !== 'string' || title.trim() === '') {
        res.status(400).json({
          status: 'error',
          message: 'Title is required for news simplification.',
        });
        return;
      }

      const result = await simplifyFinancialNews({
        title,
        description,
        content,
        source,
      });

      res.json({
        status: 'success',
        summary: result.summary,
        provider: result.provider,
      });
    } catch (error: any) {
      console.error('Error in /api/simplify:', error);
      res.status(500).json({
        status: 'error',
        message: 'AI simplification is temporarily unavailable. Please try again.',
      });
    }
  });

  // 4. Combined endpoint (Section 12)
  app.get('/api/news/simplified', async (req: Request, res: Response) => {
    try {
      const { category, country, search, page_size } = req.query;

      const limit = Math.min(page_size ? parseInt(page_size as string, 10) : 8, 12);

      // 1. Fetch news
      const newsResult = await getFinancialNews({
        category: category as string,
        country: country as string,
        search: search as string,
        pageSize: limit,
      });

      // 2. Simplify articles in parallel with safe error isolation
      const simplifiedArticles = await Promise.all(
        newsResult.articles.map(async (article) => {
          // If article already has precomputed high quality simplification and no external Groq/Gemini key is forced,
          // we can retain it, or simplify fresh if not present
          if (article.simplified) {
            return article;
          }

          try {
            const aiRes = await simplifyFinancialNews({
              title: article.title,
              description: article.description,
              content: article.content,
              source: article.source.name,
            });
            return {
              ...article,
              simplified: aiRes.summary,
            };
          } catch (aiErr) {
            console.warn(`Simplification failed for article ${article.id}:`, aiErr);
            return article;
          }
        })
      );

      res.json({
        status: 'success',
        total: simplifiedArticles.length,
        category: newsResult.category,
        source_type: newsResult.source_type,
        articles: simplifiedArticles,
      });
    } catch (error: any) {
      console.error('Error in /api/news/simplified:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to fetch and simplify news. Please try again.',
      });
    }
  });

  // 5. Financial Term Quick Explainer endpoint
  app.post('/api/explain-term', async (req: Request, res: Response) => {
    try {
      const { term } = req.body;
      if (!term || typeof term !== 'string') {
        res.status(400).json({ status: 'error', message: 'A term is required.' });
        return;
      }

      const simplification = await simplifyFinancialNews({
        title: `Financial Concept: ${term}`,
        description: `Explain what "${term}" means in everyday words for beginners.`,
      });

      res.json({
        status: 'success',
        term,
        explanation: simplification.summary.tldr || simplification.summary.what_happened,
        details: simplification.summary,
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: 'Failed to explain term.' });
    }
  });

  // Client handling: Vite dev server or static dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FinNews AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
