import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, BookOpen, Lightbulb, CheckCircle2, HelpCircle, Share2, Copy, Check } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onAskTerm: (term: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onAskTerm,
}) => {
  const [copied, setCopied] = useState(false);
  const [customTerm, setCustomTerm] = useState('');

  if (!article) return null;

  const simplified = article.simplified;

  const handleCopySummary = () => {
    if (!simplified) return;
    const textToCopy = `FinNews AI Summary: ${simplified.simplified_headline}\n\nTL;DR: ${simplified.tldr}\n\nWhy It Matters: ${simplified.why_it_matters}\n\nSource: ${article.source.name}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickExplain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTerm.trim()) return;
    onAskTerm(customTerm.trim());
    setCustomTerm('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-fin-primary text-white p-5 sm:p-6 flex items-start justify-between gap-4 sticky top-0 z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-slate-300">
                {article.source.name} • {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {simplified?.simplified_headline || article.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              title="Copy simplified summary"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Original Wire Comparison Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Original Wire Headline
            </div>
            <div className="text-slate-800 italic font-medium leading-relaxed">
              "{article.title}"
            </div>
          </div>

          {/* 1. TL;DR Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fin-secondary">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Executive TL;DR</span>
            </div>
            <div className="p-4 rounded-2xl bg-fin-accent border border-fin-accent text-sm text-[#172033] leading-relaxed font-normal">
              {simplified?.tldr || article.description}
            </div>
          </div>

          {/* 2. What Happened? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <BookOpen className="w-4 h-4 text-fin-primary" />
              <span>What Happened?</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {simplified?.what_happened || article.content || article.description}
            </p>
          </div>

          {/* 3. Why It Matters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16803C]">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>Why It Matters to Retail Investors & Consumers</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 text-sm text-emerald-950 leading-relaxed font-normal">
              {simplified?.why_it_matters || 'Market policy directly alters credit card APRs, home mortgages, savings yields, and public equity valuations.'}
            </div>
          </div>

          {/* 4. Key Points */}
          {simplified?.key_points && simplified.key_points.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Points
              </div>
              <ul className="space-y-2.5">
                {simplified.key_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Financial Terms Explained (Section 8 & 9) */}
          {simplified?.financial_terms && simplified.financial_terms.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Important Financial Terms</span>
                <span className="text-[11px] font-normal text-slate-400">Plain English Definitions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {simplified.financial_terms.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-fin-primary mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-fin-secondary" />
                      <span>{item.term}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.simple_explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Term Explainer Inside Modal */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              Encountered another unfamiliar term in this article?
            </div>
            <form onSubmit={handleQuickExplain} className="flex gap-2">
              <input
                type="text"
                value={customTerm}
                onChange={(e) => setCustomTerm(e.target.value)}
                placeholder="e.g. Yield Curve, EBITDA, Quantitative Easing..."
                className="flex-1 px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-fin-secondary"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs bg-fin-secondary hover:bg-fin-secondary text-white font-medium rounded-xl transition-colors cursor-pointer"
              >
                Explain Term
              </button>
            </form>
          </div>

        </div>

        {/* Modal Footer (Section 17) */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Source: <span className="font-semibold text-slate-700">{article.source.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fin-primary hover:bg-fin-primary text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Read Original Article</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
