import React from 'react';
import { X, CheckCircle2, AlertTriangle, Activity, Server, Cpu, Globe, RefreshCw } from 'lucide-react';
import { HealthResponse } from '../types';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  health: HealthResponse | null;
  onRefreshHealth: () => void;
}

export const HealthModal: React.FC<HealthModalProps> = ({
  isOpen,
  onClose,
  health,
  onRefreshHealth,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-fin-primary text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">FinNews AI System Health</h3>
              <p className="text-[11px] text-slate-300">Backend & API Providers Status</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Status */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Service Status
                </div>
                <div className="text-sm font-extrabold text-emerald-800">
                  {health?.status === 'healthy' ? 'All Systems Operational' : 'Degraded Mode'}
                </div>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-200/80 font-semibold text-emerald-900">
              v{health?.version || '1.0'}
            </span>
          </div>

          {/* Active AI Engine */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active LLM Engine
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#1E5AA8]" />
              <div>
                <div className="text-sm font-bold text-[#172033]">
                  {health?.active_ai || 'Detecting...'}
                </div>
                <div className="text-xs text-slate-500">
                  Automated high-fidelity structured summary generation
                </div>
              </div>
            </div>
          </div>

          {/* Provider Matrix */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Integration Matrix
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Groq API (Llama 3.3 70B)</span>
                {health?.providers.groq ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="text-slate-500">Gemini/Fallback active</span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Google Gemini API</span>
                {health?.providers.gemini ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="text-slate-500">Standby</span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">NewsAPI Live Wire</span>
                {health?.providers.newsapi ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Live API Connected
                  </span>
                ) : (
                  <span className="text-blue-700 font-medium">Curated Verified Feed</span>
                )}
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="text-[11px] text-slate-400 leading-normal">
            No API credentials are ever visible to browser clients. Server routes proxy and secure all external requests.
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onRefreshHealth}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1E5AA8] hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-check /api/health</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
