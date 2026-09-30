import React from 'react';
import { Search, RefreshCw, Filter, Globe, ArrowUpDown, X } from 'lucide-react';

interface DashboardControlsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCountry: string;
  onSelectCountry: (c: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  sortBy: 'latest' | 'relevant';
  onSortChange: (sort: 'latest' | 'relevant') => void;
  onFetchAndSimplify: () => void;
  isLoading: boolean;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onFetchAndSimplify,
  isLoading,
}) => {
  const countries = [
    { code: 'us', label: 'United States' },
    { code: 'global', label: 'Global / All' },
    { code: 'gb', label: 'United Kingdom' },
    { code: 'de', label: 'Germany / EU' },
    { code: 'in', label: 'India' },
    { code: 'jp', label: 'Japan' },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 pt-8 pb-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Dashboard Heading & Subheading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
              Today's Financial News
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Stay informed. Understand more. Spend less time reading.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onFetchAndSimplify}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fin-primary hover:bg-fin-primary text-white text-sm font-semibold shadow-md shadow-black/15 hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-amber-300 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Simplifying Articles...' : 'Fetch & Simplify'}</span>
            </button>
          </div>
        </div>

        {/* Filter bar: Search, Country, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-5">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search financial news (e.g., Apple, Fed, Inflation, S&P 500, Capex)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-fin-secondary/20 focus:border-fin-secondary transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Country Filter */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <select
              value={selectedCountry}
              onChange={(e) => onSelectCountry(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] focus:outline-hidden focus:ring-2 focus:ring-fin-secondary/20 focus:border-fin-secondary transition-all appearance-none cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="sm:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#172033] focus:outline-hidden focus:ring-2 focus:ring-fin-secondary/20 focus:border-fin-secondary transition-all appearance-none cursor-pointer"
            >
              <option value="latest">Sort: Latest First</option>
              <option value="relevant">Sort: Most Relevant</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-fin-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
