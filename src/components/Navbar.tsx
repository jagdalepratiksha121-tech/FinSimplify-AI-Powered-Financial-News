import React, { useState } from 'react';
import { Newspaper, Sparkles, Activity, Menu, X, BookOpen, Info } from 'lucide-react';
import { HealthResponse } from '../types';
import { ThemeSelector, ThemeOption } from './ThemeSelector';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard' | 'custom' | 'about';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'custom' | 'about') => void;
  health: HealthResponse | null;
  onOpenHealthModal: () => void;
  onTriggerFetch: () => void;
  isLoading: boolean;
  currentTheme: ThemeOption;
  onSelectTheme: (theme: ThemeOption) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  health,
  onOpenHealthModal,
  onTriggerFetch,
  isLoading,
  currentTheme,
  onSelectTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard & News', icon: Newspaper },
    { id: 'custom', label: 'Custom Simplifier', icon: Sparkles },
    { id: 'about', label: 'About & Tech', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-fin-primary flex items-center justify-center text-white shadow-md shadow-black/10 group-hover:scale-105 transition-all duration-200">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-fin-primary">FinNews</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-fin-accent text-fin-accent border border-fin-accent">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Complex Financial News. Made Simple.
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-fin-primary text-white shadow-xs'
                      : 'text-slate-600 hover:text-fin-primary hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Theme Selector, Health Status & Fetch CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Color Palette Switcher */}
            <ThemeSelector currentTheme={currentTheme} onSelectTheme={onSelectTheme} />

            {/* System Health Status Indicator */}
            <button
              onClick={onOpenHealthModal}
              title="Click to view API provider status"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate max-w-[130px]">
                {health?.active_ai || 'AI Engine Ready'}
              </span>
              <Activity className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Quick Fetch & Simplify Action */}
            <button
              onClick={() => {
                setActiveTab('dashboard');
                onTriggerFetch();
              }}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fin-secondary hover:bg-fin-secondary text-white text-sm font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? 'Simplifying...' : 'Fetch & Simplify'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSelector currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-fin-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenHealthModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 text-sm text-slate-700"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                System & AI Engine Status
              </span>
              <Activity className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => {
                setActiveTab('dashboard');
                onTriggerFetch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-fin-secondary text-white font-medium shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Fetch & Simplify News</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
