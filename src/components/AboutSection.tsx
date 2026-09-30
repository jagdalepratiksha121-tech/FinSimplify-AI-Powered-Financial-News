import React from 'react';
import { ShieldCheck, Cpu, Code2, Database, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stackItems = [
    { name: 'NewsAPI', role: 'Real-time financial & business news feeds', category: 'Data Ingestion' },
    { name: 'FastAPI / Express', role: 'High-performance REST API backend architecture', category: 'Backend' },
    { name: 'Groq Cloud', role: 'Ultra-low latency inference engine', category: 'Inference' },
    { name: 'Llama 3.3 70B', role: 'Flagship open LLM optimized for financial reasoning', category: 'AI Model' },
    { name: 'Google Gemini', role: 'Server-side structured JSON generative pipeline', category: 'AI Model' },
    { name: 'Python & React', role: 'Modern full-stack language & user interface', category: 'Full-Stack' },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Mission */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fin-accent text-fin-primary text-xs font-bold uppercase tracking-wider">
            About FinNews AI
          </div>
          <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">
            Democratizing Financial Information
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            FinNews AI uses real-time financial news retrieval and Generative AI to simplify complex financial information.
          </p>
        </div>

        {/* The Problem & The Solution Cards (Section 24) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              !
            </div>
            <h3 className="text-lg font-bold text-[#172033]">
              The Problem
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Financial news frequently uses technical terminology that can be difficult for beginners to understand.
              Terms like "quantitative tightening," "duration risk," "basis points," and "PCE deflators" create artificial barriers for students, new retail investors, and busy professionals who just want to know how market events impact their savings and loans.
            </p>
          </div>

          {/* Solution */}
          <div className="p-7 rounded-2xl bg-fin-accent border border-fin-accent space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white text-fin-secondary flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#172033]">
              The Solution
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              FinNews AI converts complex financial reporting into concise, understandable explanations while preserving important facts.
              Every breakdown guarantees zero hallucinated numbers, exact preservation of dates and company names, and plain-English definitions for every technical concept.
            </p>
          </div>
        </div>

        {/* Technology Stack Grid (Section 2 & 24) */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Technology Stack & Infrastructure
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stackItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-fin-primary">{item.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Financial Notice (Section 22 & 23) */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Security & Financial Safety Notice</span>
          </div>
          <p className="leading-relaxed">
            FinNews AI provides simplified explanations of publicly available financial news for informational and educational purposes. It does not provide personalized financial, investment, tax, or legal advice. All API keys remain isolated in backend server environments and are never exposed to the frontend browser.
          </p>
        </div>

      </div>
    </section>
  );
};
