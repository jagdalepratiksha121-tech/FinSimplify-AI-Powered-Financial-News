import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const FinancialDisclaimer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/90 py-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#082D69] text-sm">FinNews AI</span>
            <span className="text-[11px] text-slate-400">| Complex Financial News. Made Simple.</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by Groq Llama 3.3 70B, Google Gemini & NewsAPI
          </div>
        </div>

        {/* Financial Safety Notice (Section 23) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-slate-700">Financial Safety Notice:</strong> FinNews AI provides simplified explanations of publicly available financial news for informational and educational purposes. It does not provide personalized financial, investment, tax, or legal advice.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 text-center sm:text-left">
          © {new Date().getFullYear()} FinNews AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
