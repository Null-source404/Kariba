import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Code2, 
  Laptop, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { analyzeFrontendCode, SAMPLE_TEMPLATES } from '../utils/analyzer';
import { generatePolishedCode } from '../utils/fixer';
import { AuditCategory, IssueSeverity } from '../types/audit';

interface Props {
  onOpenLocalhostGuide: () => void;
}

export function CodeAuditor({ onOpenLocalhostGuide }: Props) {
  const [code, setCode] = useState<string>(SAMPLE_TEMPLATES.starter.rawCode);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('starter');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeViewMode, setActiveViewMode] = useState<'issues' | 'polishedCode'>('issues');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedFullCode, setCopiedFullCode] = useState<boolean>(false);

  const auditResult = useMemo(() => analyzeFrontendCode(code), [code]);
  const polishedCode = useMemo(() => generatePolishedCode(code), [code]);

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplate(key);
    setCode(SAMPLE_TEMPLATES[key].rawCode);
  };

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleCopyFullCode = () => {
    navigator.clipboard.writeText(polishedCode);
    setCopiedFullCode(true);
    setTimeout(() => setCopiedFullCode(false), 2000);
  };

  const filteredIssues = useMemo(() => {
    if (activeCategoryFilter === 'all') return auditResult.issues;
    return auditResult.issues.filter(i => i.category === activeCategoryFilter);
  }, [auditResult.issues, activeCategoryFilter]);

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner addressing the user's localhost link directly */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-amber-900 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Laptop size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Notice about http://localhost:5173/</span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-amber-200/60 rounded text-amber-900">
                  Local Device Port
                </span>
              </div>
              <p className="text-xs text-amber-800/90 mt-1 max-w-2xl leading-relaxed">
                Because <code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded text-[11px]">localhost:5173</code> is running on your own computer’s local loopback network, external cloud applications cannot view it directly. 
                Paste your component code below to run a full diagnostic audit, or click the guide to expose it publicly via tunnel in 10 seconds.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLocalhostGuide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            How to Share Link <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Top Controls: Preset Templates */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">Load Template Example:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.entries(SAMPLE_TEMPLATES).map(([key, t]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTemplate(key)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedTemplate === key
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Paste your own code or edit below to inspect live results.
        </div>
      </div>

      {/* Score Overview & Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Score Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Health Score</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                {auditResult.score}
              </span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Status</span>
            <span className={`px-2 py-0.5 rounded font-semibold border ${getScoreBadgeColor(auditResult.score)}`}>
              {auditResult.score >= 90 ? 'Production Ready' : auditResult.score >= 70 ? 'Needs Refinement' : 'Action Required'}
            </span>
          </div>
        </div>

        {/* Severity Metrics */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs col-span-1 md:col-span-3 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-900">Critical Issues</span>
              <ShieldAlert size={16} className="text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-700 tabular-nums mt-2">
              {auditResult.criticalCount}
            </div>
            <div className="text-[11px] text-rose-600/90 mt-1">
              Accessibility &amp; broken semantic tags
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900">Warnings</span>
              <AlertTriangle size={16} className="text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-700 tabular-nums mt-2">
              {auditResult.warningCount}
            </div>
            <div className="text-[11px] text-amber-600/90 mt-1">
              Pill clutter, heavy gradients &amp; width
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-900">Polish Heuristics</span>
              <Info size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700 tabular-nums mt-2">
              {auditResult.infoCount}
            </div>
            <div className="text-[11px] text-blue-600/90 mt-1">
              Typographic orphans &amp; micro-interactions
            </div>
          </div>
        </div>
      </div>

      {/* Main Split: Code Editor vs Issues / Polished Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Code Input */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
          <div className="p-3 px-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-slate-600" />
              <span className="text-xs font-bold text-slate-800">Your Frontend Code / Markup</span>
            </div>
            <button
              type="button"
              onClick={() => setCode('')}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Clear Editor
            </button>
          </div>
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your React component, JSX, or HTML markup here..."
              rows={22}
              className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-900/5 focus:outline-none focus:ring-1 focus:ring-slate-400 resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
          <div className="p-3 px-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{code.split('\n').length} lines · {code.length} characters</span>
            <span className="text-slate-400">Live heuristic evaluation active</span>
          </div>
        </div>

        {/* Right: Findings & Polished Output */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[580px]">
          {/* Tabs for Right Panel */}
          <div className="p-3 px-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveViewMode('issues')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'issues'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Audit Findings ({auditResult.totalIssues})
              </button>
              <button
                type="button"
                onClick={() => setActiveViewMode('polishedCode')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'polishedCode'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={13} className="text-amber-500" />
                <span>Modernized Code</span>
              </button>
            </div>

            {activeViewMode === 'polishedCode' && (
              <button
                type="button"
                onClick={handleCopyFullCode}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
              >
                {copiedFullCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedFullCode ? 'Copied' : 'Copy All'}</span>
              </button>
            )}
          </div>

          {/* Mode 1: Audit Findings List */}
          {activeViewMode === 'issues' && (
            <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[640px]">
              {/* Category Filter Pills (Functional Buttons) */}
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 overflow-x-auto text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                    activeCategoryFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({auditResult.totalIssues})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('a11y')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                    activeCategoryFilter === 'a11y'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Accessibility
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('design')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                    activeCategoryFilter === 'design'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Anti-Slop &amp; Polish
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('layout')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                    activeCategoryFilter === 'layout'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Layout Math
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('typography')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap shrink-0 transition-colors ${
                    activeCategoryFilter === 'typography'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Typography
                </button>
              </div>

              {filteredIssues.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-3" />
                  <p className="font-semibold text-slate-800">No issues found in this category!</p>
                  <p className="text-xs text-slate-500 mt-1">Your code meets the highest modern frontend standards.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          {issue.severity === 'critical' && (
                            <ShieldAlert size={16} className="text-rose-600 shrink-0 mt-0.5" />
                          )}
                          {issue.severity === 'warning' && (
                            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                          )}
                          {issue.severity === 'info' && (
                            <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{issue.title}</h4>
                            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              {issue.ruleReference}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                            issue.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : issue.severity === 'warning'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{issue.description}</p>

                      <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 font-medium">
                        <span className="font-bold text-emerald-800">Fix Recommendation: </span>
                        {issue.recommendation}
                      </div>

                      {issue.fixedCodeSnippet && (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-medium">Recommended Replacement:</span>
                            <button
                              type="button"
                              onClick={() => handleCopySnippet(issue.fixedCodeSnippet!, issue.id)}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 font-medium"
                            >
                              {copiedSnippetId === issue.id ? (
                                <Check size={12} className="text-emerald-600" />
                              ) : (
                                <Copy size={12} />
                              )}
                              <span>{copiedSnippetId === issue.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                            {issue.fixedCodeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Modernized Full Code */}
          {activeViewMode === 'polishedCode' && (
            <div className="flex-1 flex flex-col p-4">
              <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-600" />
                  <span>
                    Auto-refactored to resolve clickable divs, static pill boxes, unconstrained widths, and accessible markup.
                  </span>
                </div>
              </div>
              <pre className="flex-1 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed select-all">
                {polishedCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
