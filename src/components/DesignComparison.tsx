import React, { useState } from 'react';
import { Eye, ArrowRight, Check, X, Sparkles, Layers, Sliders, Info, ShieldCheck } from 'lucide-react';

export function DesignComparison() {
  const [viewMode, setViewMode] = useState<'after' | 'before' | 'split'>('after');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Interactive Design Evolution</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare standard rookie / AI-generated design traps against senior human-crafted standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode('before')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'before'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Before (Common Pitfalls)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('after')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'after'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              After (Modern Standard)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'split'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side Split
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              showAnnotations
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Info size={14} />
            <span>{showAnnotations ? 'Hide Notes' : 'Show Notes'}</span>
          </button>
        </div>
      </div>

      {/* Before vs After View Area */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* BEFORE CONTAINER */}
        {(viewMode === 'before' || viewMode === 'split') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <X size={14} className="text-rose-600" />
                Before: Common Website Pitfalls
              </span>
              <span className="text-[11px] text-slate-500">Uncurated amateur &amp; AI-slop patterns</span>
            </div>

            <div className="border border-rose-200 rounded-2xl bg-white shadow-xs overflow-hidden relative">
              {/* Fake Navigation with errors */}
              <div className="p-4 bg-purple-700 text-white flex items-center justify-between border-b border-purple-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">// ACME_V1.2_BETA</span>
                  <span className="text-[10px] bg-purple-800 px-2 py-0.5 rounded-full">PROD</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-purple-800 px-3 py-1 rounded-full">Home</span>
                  <span className="text-purple-200">About</span>
                  <span className="text-purple-200">Services</span>
                  <span className="text-purple-200">Docs</span>
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full">
                  Login &gt;&gt;
                </button>
              </div>

              {/* Annotation 1 */}
              {showAnnotations && (
                <div className="p-2.5 bg-rose-50 border-b border-rose-100 text-[11px] text-rose-900 flex items-center gap-2">
                  <span className="font-bold">Pitfall:</span> Header violates 3-Zone contract; filled capsule nav links; code comment prefix (<code className="font-mono text-[10px]">// ACME</code>).
                </div>
              )}

              {/* Fake Hero with errors */}
              <div className="p-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 text-center">
                <div className="inline-flex items-center gap-2 mb-4 bg-white p-1 pr-3 rounded-full border border-purple-200 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-purple-700">98/100 INNOVATION SCORE</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">HOT</span>
                </div>

                <h3 className="text-3xl font-black text-purple-950 uppercase tracking-wide mb-3">
                  UNLEASH NEXT-GEN HYPER AUTOMATION PLATFORM
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                  Empower enterprise paradigms with synergy and frictionless intelligent cloud orchestration.
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs px-6 py-3 rounded-full cursor-pointer shadow-lg shadow-purple-500/30">
                    Initiate Cyber Sequence
                  </div>
                  <div className="border-2 border-purple-400 text-purple-900 font-bold text-xs px-6 py-3 rounded-full cursor-pointer">
                    Read Whitepaper
                  </div>
                </div>
              </div>

              {/* Annotation 2 */}
              {showAnnotations && (
                <div className="p-2.5 bg-rose-50 border-y border-rose-100 text-[11px] text-rose-900 flex items-center gap-2">
                  <span className="font-bold">Pitfall:</span> Fabricated 98/100 score; clickable <code className="font-mono text-[10px]">&lt;div&gt;</code> without button semantics; roleplay jargon button.
                </div>
              )}

              {/* Fake Cards with Thick Left Borders */}
              <div className="p-6 grid grid-cols-2 gap-4 bg-slate-50">
                <div className="p-4 bg-white rounded-lg border-l-4 border-purple-600 shadow-2xs">
                  <div className="flex gap-1 mb-2">
                    <span className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-[10px] font-bold">FEAT 01</span>
                    <span className="bg-pink-100 text-pink-700 rounded-full px-2 py-0.5 text-[10px] font-bold">FAST</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">// REALTIME_STREAM</h4>
                  <p className="text-xs text-slate-500 mt-1">Telemetry engine streams at sub-millisecond rates.</p>
                </div>

                <div className="p-4 bg-white rounded-lg border-l-4 border-pink-600 shadow-2xs">
                  <div className="flex gap-1 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5 text-[10px] font-bold">FEAT 02</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">// AI_ENHANCED</h4>
                  <p className="text-xs text-slate-500 mt-1">Multi-modal intelligent dispatchers across services.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AFTER CONTAINER */}
        {(viewMode === 'after' || viewMode === 'split') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" />
                After: Polished Production Standard
              </span>
              <span className="text-[11px] text-slate-500">Human-designer taste, WCAG AA &amp; zero-slop</span>
            </div>

            <div className="border border-emerald-200 rounded-2xl bg-white shadow-xs overflow-hidden relative">
              {/* Modern 3-Zone Top Bar */}
              <header className="p-4 px-6 bg-white flex items-center justify-between gap-8 border-b border-slate-200/90">
                <span className="font-bold text-sm text-slate-900 tracking-tight whitespace-nowrap shrink-0">
                  Acme Systems
                </span>

                <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-600">
                  <a href="#features" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Platform</a>
                  <a href="#solutions" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Solutions</a>
                  <a href="#case-studies" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Case Studies</a>
                  <a href="#pricing" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Pricing</a>
                </nav>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 active:scale-[0.98]"
                  >
                    Start Free Trial
                  </button>
                </div>
              </header>

              {/* Modern Hero with clean metadata & balance */}
              <div className="p-8 sm:p-10 bg-slate-50/50 text-center">
                {/* Zero-Pill Clean Metadata */}
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-3">
                  <span>Enterprise Infrastructure</span>
                  <span aria-hidden="true">·</span>
                  <span>v2.4 Released</span>
                  <span aria-hidden="true">·</span>
                  <span>SOC-2 Certified</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance max-w-2xl mx-auto mb-3">
                  Automate complex data workflows with absolute deterministic speed
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                  Connect PostgreSQL, Snowflake, and internal microservices into reliable pipelines with zero server maintenance.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                  >
                    Deploy First Pipeline
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/90 rounded-lg transition-colors"
                  >
                    Schedule 15-Min Demo
                  </button>
                </div>

                {/* Claim-to-Proof Metric Strip */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">4.2ms</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Median Latency</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">99.99%</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">SLA Uptime</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">1.4B+</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Events Processed Daily</div>
                  </div>
                </div>
              </div>

              {/* Annotation 3 */}
              {showAnnotations && (
                <div className="p-2.5 bg-emerald-50 border-t border-emerald-100 text-[11px] text-emerald-900 flex items-center gap-2">
                  <span className="font-bold">Refined Choice:</span> 60-30-10 palette discipline; unboxed metadata dots; text-balance; quantitative proof metrics adjacent to the hero claim.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Senior Guidelines Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-600" />
          The 4 Pillars of Senior Frontend Craftsmanship
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900">1. Zero-Pill Discipline</div>
            <p className="text-slate-600 leading-relaxed">
              Never wrap static metadata in colored pills. Render clean text with subtle <code className="font-mono text-slate-800">·</code> or <code className="font-mono text-slate-800">/</code> separators. Reserve pills strictly for filter buttons.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900">2. 60-30-10 Color Budget</div>
            <p className="text-slate-600 leading-relaxed">
              60% dominant neutral field (crisp white/off-white), 30% structural surfaces (cards, borders), and 10% accent color strictly at primary actions.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900">3. Spatial Math &amp; Presence</div>
            <p className="text-slate-600 leading-relaxed">
              Outer container padding <code className="font-mono text-slate-800">&gt;=</code> inner child gaps. Button horizontal padding is <code className="font-mono text-slate-800">~2x</code> vertical padding (<code className="font-mono text-[11px]">px-4 py-2</code>).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="font-bold text-slate-900">4. Functional Affordances</div>
            <p className="text-slate-600 leading-relaxed">
              No dead clicks, no roleplay button copy like "Invoke Matrix". Use clear everyday human verbs: "Save", "Filter", "Download CSV", "Deploy".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
