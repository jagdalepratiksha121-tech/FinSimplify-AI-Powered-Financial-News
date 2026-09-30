import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { HowItWorks } from './components/HowItWorks';
import { StatsBar } from './components/StatsBar';
import { DashboardControls } from './components/DashboardControls';
import { LoadingBanner, NewsCardSkeleton } from './components/LoadingBanner';
import { NewsCard } from './components/NewsCard';
import { ArticleModal } from './components/ArticleModal';
import { CustomSimplifier } from './components/CustomSimplifier';
import { AboutSection } from './components/AboutSection';
import { HealthModal } from './components/HealthModal';
import { TermTooltipModal } from './components/TermTooltipModal';
import { FinancialDisclaimer } from './components/FinancialDisclaimer';
import { ThemeOption } from './components/ThemeSelector';
import { Article, HealthResponse } from './types';
import { AlertCircle, RefreshCw, Sparkles, Inbox } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Business',
  'Markets',
  'Economy',
  'Technology',
  'Banking',
  'Global Markets',
  'Startups',
  'Cryptocurrency',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'custom' | 'about'>('landing');
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(() => {
    try {
      return (localStorage.getItem('finnews_theme') as ThemeOption) || 'emerald';
    } catch {
      return 'emerald';
    }
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('finnews_theme', currentTheme);
    } catch {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'relevant'>('latest');

  // Modals & inspect
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTerm, setActiveTerm] = useState<{ term: string; explanation: string } | null>(null);
  const [healthModalOpen, setHealthModalOpen] = useState<boolean>(false);
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch health on load
  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
      }
    } catch (err) {
      console.warn('Health check error:', err);
    }
  }, []);

  // Fetch & Simplify news endpoint
  const fetchNews = useCallback(async (isSimplification = true) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isSimplification ? '/api/news/simplified' : '/api/news';
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') {
        params.set('category', selectedCategory);
      }
      if (selectedCountry) {
        params.set('country', selectedCountry);
      }
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      }
      params.set('page_size', '10');

      const res = await fetch(`${endpoint}?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Unable to fetch the latest news. Please try again.');
      }

      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.articles)) {
        setArticles(data.articles);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        throw new Error(data.message || 'Unable to fetch the latest news. Please try again.');
      }
    } catch (err: any) {
      console.error('Fetch news error:', err);
      setError(err.message || 'Connection problem. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedCountry, searchTerm]);

  // Initial load
  useEffect(() => {
    fetchHealth();
    fetchNews(true);
  }, []);

  // Filter and sort articles for UI
  const filteredArticles = articles
    .filter((art) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const catA = art.category.toLowerCase().replace(/\s+/g, '');
        const catB = selectedCategory.toLowerCase().replace(/\s+/g, '');
        if (!catA.includes(catB) && !catB.includes(catA)) return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const inTitle = art.title.toLowerCase().includes(term);
        const inDesc = (art.description || '').toLowerCase().includes(term);
        const inSimp = (art.simplified?.simplified_headline || '').toLowerCase().includes(term);
        const inTldr = (art.simplified?.tldr || '').toLowerCase().includes(term);
        const inSource = art.source.name.toLowerCase().includes(term);
        if (!inTitle && !inDesc && !inSimp && !inTldr && !inSource) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // Most relevant (has simplified summary first)
      const aScore = a.simplified ? 2 : 1;
      const bScore = b.simplified ? 2 : 1;
      return bScore - aScore;
    });

  const countSimplified = articles.filter((a) => Boolean(a.simplified)).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#172033]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        health={healthData}
        onOpenHealthModal={() => setHealthModalOpen(true)}
        onTriggerFetch={() => fetchNews(true)}
        isLoading={isLoading}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: LANDING PAGE */}
        {activeTab === 'landing' && (
          <div>
            <HeroSection
              onGetStarted={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreLatest={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Feature Highlights */}
            <FeatureCards />

            {/* How It Works 4-Step Pipeline */}
            <HowItWorks />

            {/* Live Stats Preview */}
            <StatsBar
              articlesRetrieved={articles.length}
              articlesSimplified={countSimplified}
              categoriesCount={CATEGORIES.length - 1}
              lastUpdated={lastUpdated}
            />

            {/* Landing Page Preview Feed */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1E5AA8] mb-1">
                    Featured Stories
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
                    Today's Simplified Highlights
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fin-primary hover:bg-fin-primary text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Open Full News Dashboard</span>
                </button>
              </div>

              {/* 3-Column Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((art) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    onOpenDetails={(a) => setSelectedArticle(a)}
                    onSelectTerm={(term, exp) => setActiveTerm({ term, explanation: exp })}
                  />
                ))}
              </div>
            </section>

            {/* About Section on Landing */}
            <AboutSection />
          </div>
        )}

        {/* TAB 2: DASHBOARD & NEWS */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Dashboard Controls */}
            <DashboardControls
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
              }}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFetchAndSimplify={() => fetchNews(true)}
              isLoading={isLoading}
            />

            {/* Live Stats Bar */}
            <StatsBar
              articlesRetrieved={filteredArticles.length}
              articlesSimplified={countSimplified}
              categoriesCount={CATEGORIES.length - 1}
              lastUpdated={lastUpdated}
            />

            {/* Loading Banner & Stages */}
            <LoadingBanner isLoading={isLoading} />

            {/* News Grid Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Error State (Section 14) */}
              {error && (
                <div className="mb-6 p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Unable to retrieve news feed</h4>
                      <p className="text-xs text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => fetchNews(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}

              {/* News Cards Grid */}
              {isLoading ? (
                /* Skeleton Loader Grid (Section 15 & 18) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <NewsCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredArticles.length > 0 ? (
                /* Active Articles Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      onOpenDetails={(art) => setSelectedArticle(art)}
                      onSelectTerm={(term, exp) => setActiveTerm({ term, explanation: exp })}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State (Section 14) */
                <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <Inbox className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172033] mb-1">
                    No financial news found
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    No articles matched your criteria "{searchTerm || selectedCategory}". Try selecting another category or clearing your search.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchTerm('');
                      fetchNews(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-fin-primary text-white text-xs font-semibold hover:bg-fin-primary transition-colors cursor-pointer"
                  >
                    Reset Filters & Show All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM SIMPLIFIER */}
        {activeTab === 'custom' && (
          <CustomSimplifier />
        )}

        {/* TAB 4: ABOUT & TECH */}
        {activeTab === 'about' && (
          <div>
            <AboutSection />
          </div>
        )}
      </main>

      {/* Financial Disclaimer & Footer (Section 23) */}
      <FinancialDisclaimer />

      {/* Article Full Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onAskTerm={async (term) => {
          try {
            const res = await fetch('/api/explain-term', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ term }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              setActiveTerm({ term: data.term, explanation: data.explanation });
            }
          } catch (err) {
            console.error('Term explanation error:', err);
          }
        }}
      />

      {/* Financial Term Tooltip Modal */}
      <TermTooltipModal
        term={activeTerm?.term || null}
        explanation={activeTerm?.explanation || null}
        onClose={() => setActiveTerm(null)}
      />

      {/* System Health Check Modal */}
      <HealthModal
        isOpen={healthModalOpen}
        onClose={() => setHealthModalOpen(false)}
        health={healthData}
        onRefreshHealth={fetchHealth}
      />
    </div>
  );
}
