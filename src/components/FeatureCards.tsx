import React from 'react';
import { Newspaper, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  onSelectFeature?: (feature: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'news',
      title: 'Real-Time News',
      desc: 'Get the latest financial and business news from trusted sources.',
      icon: Newspaper,
      badge: 'Aggregated & Verified',
      accent: 'border-blue-100 bg-blue-50/40 text-[#1E5AA8]',
    },
    {
      id: 'simplification',
      title: 'AI Simplification',
      desc: 'Convert complicated financial language into easy-to-understand explanations.',
      icon: Sparkles,
      badge: 'Llama 3.3 & Gemini',
      accent: 'border-indigo-100 bg-indigo-50/40 text-[#082D69]',
    },
    {
      id: 'time',
      title: 'Save Time',
      desc: 'Understand important market developments without reading lengthy articles.',
      icon: Clock,
      badge: 'Under 30s per story',
      accent: 'border-emerald-100 bg-emerald-50/40 text-[#16803C]',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E5AA8] mb-2">
            Why FinNews AI
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
            Designed for Clarity, Accuracy, and Speed
          </h3>
          <p className="mt-2 text-slate-500 text-sm">
            Everything you need to navigate today's markets without a finance degree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-[#F7F9FC] hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#082D69] group-hover:bg-[#082D69] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                      {feature.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-[#172033] mb-2 group-hover:text-[#082D69] transition-colors">
                    {feature.title}
                  </h4>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-[#1E5AA8] group-hover:translate-x-1 transition-transform">
                  <span>Learn how it works</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
