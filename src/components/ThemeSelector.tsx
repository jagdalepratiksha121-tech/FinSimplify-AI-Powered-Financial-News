import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeOption = 'emerald' | 'navy' | 'obsidian' | 'violet' | 'burgundy';

interface ThemeSelectorProps {
  currentTheme: ThemeOption;
  onSelectTheme: (theme: ThemeOption) => void;
}

export const themes: { id: ThemeOption; name: string; primary: string; secondary: string; tag: string }[] = [
  { id: 'emerald', name: 'Emerald Fintech', primary: '#064E3B', secondary: '#059669', tag: 'Wealth & Growth' },
  { id: 'navy', name: 'Deep Navy', primary: '#082D69', secondary: '#1E5AA8', tag: 'Institutional Trust' },
  { id: 'obsidian', name: 'Obsidian Teal', primary: '#0F172A', secondary: '#0D9488', tag: 'Cyber Terminal' },
  { id: 'violet', name: 'Royal Violet', primary: '#2E1065', secondary: '#4F46E5', tag: 'Premium Tech' },
  { id: 'burgundy', name: 'Wall St. Crimson', primary: '#450A0A', secondary: '#991B1B', tag: 'Executive Wire' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Change App Color Palette"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
          style={{ backgroundColor: activeThemeObj.secondary }}
        />
        <span className="hidden sm:inline">{activeThemeObj.name}</span>
        <Palette className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Color Palette
            </span>
          </div>

          <div className="space-y-1">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    isSelected ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50 font-medium text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-slate-800">{theme.name}</div>
                      <div className="text-[10px] text-slate-400">{theme.tag}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
