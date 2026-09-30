import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Database, CheckCircle2 } from 'lucide-react';

interface LoadingBannerProps {
  isLoading: boolean;
}

export const LoadingBanner: React.FC<LoadingBannerProps> = ({ isLoading }) => {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: 'Fetching the latest financial news...', icon: Database, progress: 30 },
    { text: 'AI is simplifying the articles...', icon: Sparkles, progress: 75 },
    { text: 'Preparing your personalized news feed...', icon: CheckCircle2, progress: 95 },
  ];

  useEffect(() => {
    if (!isLoading) {
      setStage(0);
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 900);
    const timer2 = setTimeout(() => setStage(2), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const current = stages[stage] || stages[0];
  const Icon = current.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white rounded-2xl border border-blue-200/80 p-5 shadow-md shadow-blue-900/5 overflow-hidden relative animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E5AA8] shrink-0">
              <Loader2 className="w-5 h-5 animate-spin text-[#1E5AA8]" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1E5AA8]">
                Real-Time AI Pipeline Active
              </div>
              <div className="text-sm font-bold text-[#172033] flex items-center gap-2">
                <span>{current.text}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="hidden sm:inline">Processing batch summaries</span>
            <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-linear-to-r from-[#1E5AA8] to-emerald-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${current.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full h-44 bg-slate-200 rounded-xl mb-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-20 h-5 bg-slate-200 rounded-full" />
          <div className="w-28 h-4 bg-slate-100 rounded-md" />
        </div>
        <div className="w-full h-6 bg-slate-200 rounded-md mb-2" />
        <div className="w-3/4 h-6 bg-slate-200 rounded-md mb-4" />
        
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-2">
          <div className="w-1/3 h-4 bg-slate-200 rounded-sm" />
          <div className="w-full h-3 bg-slate-100 rounded-sm" />
          <div className="w-5/6 h-3 bg-slate-100 rounded-sm" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="w-28 h-8 bg-slate-200 rounded-lg" />
        <div className="w-20 h-4 bg-slate-100 rounded-sm" />
      </div>
    </div>
  );
};
