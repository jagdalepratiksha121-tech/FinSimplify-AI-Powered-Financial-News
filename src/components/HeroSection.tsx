import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreLatest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreLatest,
}) => {
  const [activeToggle, setActiveToggle] = useState<'simplified' | 'original'>('simplified');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 bg-linear-to-b from-white via-[#F7F9FC] to-[#F7F9FC]">
      {/* Background subtle glowing radial lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E5AA8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#082D69]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fin-accent border border-fin-accent text-fin-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-fin-secondary" />
              <span>Next-Gen Financial Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight leading-[1.12]">
              Understand Financial News in <span className="text-fin-secondary">Seconds</span>.
            </h1>

            <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              FinNews AI transforms complex financial news into clear, simple and actionable explanations powered by AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-fin-primary hover:bg-fin-primary text-white font-semibold shadow-lg shadow-black/15 hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Fetch & Simplify News</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreLatest}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#172033] font-semibold border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <span>Explore Latest News</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                <span>Zero Financial Jargon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                <span>Preserves All Numbers & Dates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                <span>Accurate & Neutral</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Interactive Financial/AI Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
                
                {/* Header with Comparison Toggle */}
                <div className="bg-fin-primary p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Live AI Simplification Preview
                    </span>
                  </div>
                  {/* Mode switch */}
                  <div className="flex items-center bg-fin-primary-dark p-1 rounded-lg text-xs">
                    <button
                      onClick={() => setActiveToggle('simplified')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        activeToggle === 'simplified'
                          ? 'bg-fin-secondary text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      AI Simplified
                    </button>
                    <button
                      onClick={() => setActiveToggle('original')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        activeToggle === 'original'
                          ? 'bg-fin-secondary text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Original Wire
                    </button>
                  </div>
                </div>

                {/* Content body based on toggle */}
                <div className="p-6 space-y-4">
                  {/* Source and Category tag */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-fin-accent text-fin-accent font-semibold border border-fin-accent">
                      MARKETS & POLICY
                    </span>
                    <span className="text-slate-400">Federal Reserve / Reuters • Just now</span>
                  </div>

                  {activeToggle === 'simplified' ? (
                    /* AI Simplified View */
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-fin-secondary mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>SIMPLIFIED HEADLINE</span>
                        </div>
                        <h2 className="text-lg font-bold text-[#172033] leading-snug">
                          US interest rates stay unchanged as inflation remains a concern.
                        </h2>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          TL;DR
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed font-normal">
                          The Federal Reserve decided to keep interest rates steady. Officials are still waiting for inflation to permanently slow down before lowering borrowing costs.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-fin-accent border border-fin-accent">
                        <span className="text-xs font-bold text-fin-secondary uppercase tracking-wider block mb-1">
                          💡 Why It Matters to You
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          Interest rates dictate how much everyday consumers and companies pay for mortgages, credit cards, car loans, and business financing.
                        </p>
                      </div>

                      {/* Financial Term Tag */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Jargon Explained
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs">
                          <span className="font-semibold text-emerald-800">Benchmark Rate:</span>
                          <span className="text-emerald-700">The baseline cost of borrowing money across the country.</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Original Financial Wire View */
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">
                          ORIGINAL FINANCIAL WIRE HEADLINE
                        </div>
                        <h2 className="text-base font-semibold text-slate-800 leading-snug">
                          "Federal Open Market Committee Votes to Maintain Target Range for Federal Funds at 5.25%-5.50% Citing Sticky Core PCE Deflator"
                        </h2>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                          Complexity Warning
                        </span>
                        <p className="text-xs text-amber-900 leading-relaxed">
                          Full of high-density monetary terminology (PCE Deflator, target range, basis points, qualitative easing) that can confuse retail investors and non-specialists.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
                        <p>
                          "The Committee seeks to achieve maximum employment and inflation at the rate of 2 percent over the longer run. In support of these goals, the Committee decided to maintain the target range..."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom Footer bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-[#16803C]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Fact-verified
                    </span>
                    <button
                      onClick={onGetStarted}
                      className="text-[#1E5AA8] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Try on full newsfeed</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Decorative Floating Floating Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3 rounded-xl border border-slate-200 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#16803C]/10 flex items-center justify-center text-[#16803C]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Save 85% Reading Time</div>
                  <div className="text-[11px] text-slate-500">Instant actionable clarity</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
