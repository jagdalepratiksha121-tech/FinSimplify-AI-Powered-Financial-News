import React, { useState } from 'react';
import { ExternalLink, Sparkles, Clock, BookOpen, Lightbulb, ChevronRight, HelpCircle } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onOpenDetails: (article: Article) => void;
  onSelectTerm?: (term: string, explanation: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onOpenDetails,
  onSelectTerm,
}) => {
  const [imageError, setImageError] = useState(false);

  // Time format helper
  const formatTimeAgo = (dateStr: string) => {
    try {
      const now = new Date();
      const past = new Date(dateStr);
      const diffMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
      if (diffMinutes < 60) return `${Math.max(1, diffMinutes)}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
    } catch {
      return 'Recent';
    }
  };

  const categoryColors: Record<string, string> = {
    Business: 'bg-blue-50 text-blue-700 border-blue-200',
    Markets: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Economy: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    Technology: 'bg-purple-50 text-purple-800 border-purple-200',
    Banking: 'bg-amber-50 text-amber-800 border-amber-200',
    'Global Markets': 'bg-teal-50 text-teal-800 border-teal-200',
    Startups: 'bg-rose-50 text-rose-800 border-rose-200',
    Cryptocurrency: 'bg-orange-50 text-orange-800 border-orange-200',
  };

  const badgeColor = categoryColors[article.category] || 'bg-slate-100 text-slate-800 border-slate-200';
  const fallbackImg = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80';

  const simplified = article.simplified;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Article Image Container */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={imageError || !article.urlToImage ? fallbackImg : article.urlToImage}
            alt={article.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-xs ${badgeColor}`}>
              {article.category}
            </span>
          </div>

          {/* Time Badge */}
          <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3.5">
          {/* Source meta */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="font-semibold text-slate-600">{article.source.name}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-sm bg-slate-100 text-slate-500">
              Verified Source
            </span>
          </div>

          {/* AI Simplified Headline */}
          {simplified?.simplified_headline ? (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-fin-secondary uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Simplified Headline</span>
              </div>
              <h3 
                onClick={() => onOpenDetails(article)}
                className="text-base font-bold text-[#172033] hover:text-fin-secondary transition-colors leading-snug cursor-pointer line-clamp-2"
              >
                {simplified.simplified_headline}
              </h3>
            </div>
          ) : (
            <h3 
              onClick={() => onOpenDetails(article)}
              className="text-base font-bold text-[#172033] hover:text-fin-secondary transition-colors leading-snug cursor-pointer line-clamp-2"
            >
              {article.title}
            </h3>
          )}

          {/* Original Wire Headline (small italicized for comparison) */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Original Wire:
            </div>
            <p className="text-slate-600 italic line-clamp-2 leading-relaxed">
              "{article.title}"
            </p>
          </div>

          {/* Short Summary / TL;DR */}
          <div className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {simplified?.tldr || article.description}
          </div>

          {/* Why It Matters Callout */}
          {simplified?.why_it_matters && (
            <div className="p-3 rounded-xl bg-fin-accent border border-fin-accent text-xs text-slate-700 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-fin-secondary uppercase text-[10px] tracking-wider mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Why It Matters</span>
              </div>
              <p className="line-clamp-2 text-slate-700">
                {simplified.why_it_matters}
              </p>
            </div>
          )}

          {/* Jargon terms preview */}
          {simplified?.financial_terms && simplified.financial_terms.length > 0 && (
            <div className="pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Key Terms Explained:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {simplified.financial_terms.slice(0, 3).map((termItem, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectTerm?.(termItem.term, termItem.simple_explanation)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-medium transition-colors cursor-pointer"
                    title={`Click for simple explanation: ${termItem.simple_explanation}`}
                  >
                    <span>{termItem.term}</span>
                    <HelpCircle className="w-3 h-3 text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons (Section 7) */}
      <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(article)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-fin-primary hover:bg-fin-primary text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Full Breakdown</span>
        </button>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0"
          title="Open original article on publisher's site"
        >
          <span>View Source</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </article>
  );
};
