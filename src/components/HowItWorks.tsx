import React from 'react';
import { DownloadCloud, Cpu, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Fetch',
      subtitle: 'Get the latest financial news.',
      desc: 'Retrieves verified headlines and reports from global news APIs across markets, economy, and business.',
      icon: DownloadCloud,
    },
    {
      step: '02',
      title: 'Analyze',
      subtitle: 'AI analyzes the article content.',
      desc: 'Extracts critical macroeconomic numbers, interest rate benchmarks, corporate balance sheets, and key dates.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Simplify',
      subtitle: 'Complex financial language is converted into simple explanations.',
      desc: 'Translates technical jargon like basis points, yield curves, and EBITDA into intuitive, plain-English definitions.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Understand',
      subtitle: 'Users quickly understand the key information.',
      desc: 'Delivers a structured card: TL;DR, What Happened, Why It Matters, and real-world implications in seconds.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-16 bg-[#F7F9FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E5AA8] mb-2 block">
            The Simplification Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
            How It Works in 4 Steps
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            From raw financial wire feeds to actionable intelligence in under 2 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#1E5AA8]/20 group-hover:text-[#1E5AA8]/40 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#082D69]/5 text-[#082D69] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#172033] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#1E5AA8] mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
