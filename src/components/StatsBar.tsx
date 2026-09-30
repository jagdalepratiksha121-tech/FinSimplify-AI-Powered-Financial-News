import React from 'react';
import { Newspaper, Sparkles, FolderTree, Clock, CheckCircle } from 'lucide-react';

interface StatsBarProps {
  articlesRetrieved: number;
  articlesSimplified: number;
  categoriesCount: number;
  lastUpdated: string | null;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  articlesRetrieved,
  articlesSimplified,
  categoriesCount,
  lastUpdated,
}) => {
  return (
    <div className="bg-white border-y border-slate-200/80 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="flex items-center gap-3.5 px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E5AA8] flex items-center justify-center shrink-0">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#172033]">
                {articlesRetrieved}
              </div>
              <div className="text-xs text-slate-500 font-medium">Articles Retrieved</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#082D69] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#172033]">
                {articlesSimplified}
              </div>
              <div className="text-xs text-slate-500 font-medium">Articles Simplified</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#172033]">
                {categoriesCount}
              </div>
              <div className="text-xs text-slate-500 font-medium">Categories Available</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16803C] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#172033] truncate max-w-[140px]">
                {lastUpdated || 'Initial Load'}
              </div>
              <div className="text-xs text-slate-500 font-medium">Last Feed Sync</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
