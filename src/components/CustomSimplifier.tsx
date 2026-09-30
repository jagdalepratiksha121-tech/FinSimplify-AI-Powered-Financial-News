import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, HelpCircle, AlertCircle, FileText } from 'lucide-react';
import { AISimplification } from '../types';

export const CustomSimplifier: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('Wall Street Wire');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AISimplification | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const samplePresets = [
    {
      label: 'FOMC Interest Rate Decision',
      title: 'Federal Reserve Maintains Benchmark Rate Amid Persistent Sticky Core Services Inflation',
      content: 'The Federal Open Market Committee concluded its policy meeting with a unanimous consensus to keep the federal funds rate pegged at 5.25%-5.50%. Chair Jerome Powell reiterated the Committee commitment to achieving the 2% inflation target, citing that shelter metrics and non-housing services require more consistent disinflationary corroboration before monetary easing commences.',
      source: 'Bloomberg / Reuters',
    },
    {
      label: 'Hyperscaler Capex Guidance',
      title: 'Cloud Hyperscalers Guide $180B Annual Capex on Custom Tensor Accelerators and HBM Memory',
      content: 'Tech giants announced an aggregate acceleration in capital expenditures to expand next-generation accelerated computing clusters. Operating margins contracted slightly due to upfront depreciation schedules and multi-gigawatt utility power purchase agreements.',
      source: 'Wall Street Journal',
    },
    {
      label: 'Yield Curve Inversion',
      title: '2-Year and 10-Year Treasury Yield Curve Flattens as Fixed-Income Traders Reprice Duration Risk',
      content: 'The 10-year Treasury yield hovered at 4.22% while the policy-sensitive 2-year note settled at 4.45%, maintaining an inverted curve slope. Bond market participants expressed heightened scrutiny over upcoming auction underwriting volumes and debt ceiling issuance schedules.',
      source: 'Financial Times',
    },
  ];

  const handleSelectPreset = (preset: typeof samplePresets[0]) => {
    setTitle(preset.title);
    setContent(preset.content);
    setSource(preset.source);
    setError(null);
  };

  const handleSimplify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a headline or article title.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          source: source.trim() || 'Financial News',
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setResult(data.summary);
        setProvider(data.provider || 'AI Engine');
      } else {
        setError(data.message || 'AI simplification is temporarily unavailable. Please try again.');
      }
    } catch (err: any) {
      setError('Connection problem. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#F7F9FC] min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fin-accent text-fin-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-fin-secondary" />
            <span>Interactive AI Tool</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">
            Simplify Any Financial News Article
          </h2>
          <p className="text-sm text-slate-500">
            Paste any complex headline, central bank speech, earnings report, or textbook paragraph to see our AI breakdown in action.
          </p>
        </div>

        {/* Preset sample buttons */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 text-center sm:text-left">
            Or choose a complex real-world example:
          </div>
          <div className="flex flex-wrap gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSimplify} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Headline or Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Federal Reserve Maintains Interest Rates Amid Persistent Inflation"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] focus:outline-hidden focus:ring-2 focus:ring-[#1E5AA8]/20 focus:border-[#1E5AA8]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Body / Paragraphs (Optional)
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste excerpt, article text, or FOMC statement here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] focus:outline-hidden focus:ring-2 focus:ring-[#1E5AA8]/20 focus:border-[#1E5AA8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Source Name
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Bloomberg, CNBC, WSJ"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] focus:outline-hidden focus:ring-2 focus:ring-[#1E5AA8]/20 focus:border-[#1E5AA8]"
                />
                <div className="mt-3 text-[11px] text-slate-400">
                  Powered by Llama 3.3 70B & Gemini 3.8 Flash.
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setContent('');
                setResult(null);
                setError(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Clear Fields
            </button>

            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-fin-primary hover:bg-fin-primary text-white text-sm font-semibold shadow-md shadow-black/15 hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-amber-300 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Simplifying with AI...' : 'Simplify with AI'}</span>
            </button>
          </div>
        </form>

        {/* Results Container */}
        {result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-fin-secondary">
                  AI Simplification Output
                </span>
              </div>
              {provider && (
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Engine: {provider}
                </span>
              )}
            </div>

            {/* Simplified Headline */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-fin-secondary mb-1">
                Simplified Headline
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172033] leading-snug">
                {result.simplified_headline}
              </h3>
            </div>

            {/* TL;DR */}
            <div className="p-4 rounded-2xl bg-fin-accent border border-fin-accent">
              <div className="text-xs font-bold uppercase tracking-wider text-fin-secondary mb-1">
                TL;DR
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {result.tldr}
              </p>
            </div>

            {/* What Happened & Why It Matters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  What Happened?
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.what_happened}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  Why It Matters
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {result.why_it_matters}
                </p>
              </div>
            </div>

            {/* Key Points */}
            {result.key_points && result.key_points.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Points
                </div>
                <ul className="space-y-2">
                  {result.key_points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Financial Terms */}
            {result.financial_terms && result.financial_terms.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Important Financial Terms
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.financial_terms.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-[#082D69] mb-1">
                        {t.term}
                      </div>
                      <div className="text-xs text-slate-600">
                        {t.simple_explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
