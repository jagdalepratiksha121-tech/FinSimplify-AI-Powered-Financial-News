import React from 'react';
import { X, HelpCircle, BookOpen } from 'lucide-react';

interface TermTooltipModalProps {
  term: string | null;
  explanation: string | null;
  onClose: () => void;
}

export const TermTooltipModal: React.FC<TermTooltipModalProps> = ({
  term,
  explanation,
  onClose,
}) => {
  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-fin-primary text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Financial Jargon Buster
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Financial Term
            </div>
            <h3 className="text-xl font-extrabold text-fin-primary">
              {term}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Simple Plain-English Explanation</span>
            </div>
            <p className="text-sm text-emerald-950 leading-relaxed font-medium">
              {explanation}
            </p>
          </div>

          <div className="text-[11px] text-slate-400">
            FinNews AI automatically identifies and demystifies complex financial terminology so you can make informed decisions.
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-fin-primary text-white text-xs font-semibold hover:bg-fin-primary transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
