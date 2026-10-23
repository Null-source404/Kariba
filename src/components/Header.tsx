import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

interface Props {
  activeTab: 'auditor' | 'comparison' | 'patterns' | 'checklist';
  setActiveTab: (tab: 'auditor' | 'comparison' | 'patterns' | 'checklist') => void;
  onOpenLocalhostGuide: () => void;
}

export function Header({ activeTab, setActiveTab, onOpenLocalhostGuide }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Frontend Studio
            </span>
          </div>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('auditor')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'auditor'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Code Auditor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'comparison'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Design Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('patterns')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'patterns'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Component Blueprints
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'checklist'
                  ? 'text-slate-900 border-slate-900'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              15-Point Launch Checklist
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenLocalhostGuide}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <HelpCircle size={14} />
              <span>Share Localhost Guide</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('auditor')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 ${
              activeTab === 'auditor' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Code Auditor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 ${
              activeTab === 'comparison' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Before vs After
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('patterns')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 ${
              activeTab === 'patterns' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Blueprints
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 ${
              activeTab === 'checklist' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Checklist
          </button>
        </div>
      </div>
    </header>
  );
}
