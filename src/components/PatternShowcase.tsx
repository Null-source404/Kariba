import React, { useState } from 'react';
import { Copy, Check, Eye, Code, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function PatternShowcase() {
  const [activePattern, setActivePattern] = useState<'topbar' | 'hero' | 'bento' | 'pricing'>('topbar');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const patterns = {
    topbar: {
      title: 'Top Bar Contract (3-Zone)',
      description: 'Single-line brand wordmark, 4–5 concise links, 1 primary action. Zero pill tags or extraneous mode toggles in the header.',
      code: `<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between gap-8 h-16">
      {/* Zone 1: Single text wordmark */}
      <a href="/" className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
        Nordic Foundry
      </a>

      {/* Zone 2: 4-5 single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
        <a href="#solutions" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Solutions</a>
        <a href="#infrastructure" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Infrastructure</a>
        <a href="#customers" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Customers</a>
        <a href="#docs" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">Documentation</a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 active:scale-[0.98]"
        >
          Book Consultation
        </button>
      </div>
    </div>
  </div>
</header>`,
      preview: (
        <header className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-8">
            <span className="text-sm font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Nordic Foundry
            </span>
            <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-600">
              <span className="hover:text-slate-900 cursor-pointer">Solutions</span>
              <span className="hover:text-slate-900 cursor-pointer">Infrastructure</span>
              <span className="hover:text-slate-900 cursor-pointer">Customers</span>
              <span className="hover:text-slate-900 cursor-pointer">Documentation</span>
            </nav>
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>
        </header>
      ),
    },

    hero: {
      title: 'High-Conversion Hero Section',
      description: 'Balanced display typography with text-wrap: balance, unboxed metadata, two clear CTAs, and adjacent proof metrics strip.',
      code: `<section className="py-16 sm:py-24 bg-slate-50/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Clean Unboxed Metadata */}
    <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-4">
      <span>Enterprise Cloud</span>
      <span aria-hidden="true">·</span>
      <span>PostgreSQL & ClickHouse</span>
      <span aria-hidden="true">·</span>
      <span>99.99% Availability</span>
    </div>

    {/* Balanced Headline */}
    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance max-w-3xl mx-auto mb-4">
      High-throughput analytics engines without query degradation
    </h1>

    <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
      Execute real-time aggregations across petabytes in milliseconds. Fully managed with zero configuration toil.
    </p>

    {/* Two Action CTAs */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs active:scale-[0.98]"
      >
        Start 14-Day Free Cluster
      </button>
      <button
        type="button"
        className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg transition-colors"
      >
        View Live Benchmarks
      </button>
    </div>

    {/* Adjacent Proof Metrics */}
    <div className="mt-12 pt-8 border-t border-slate-200/60 max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
      <div>
        <div className="text-2xl font-bold text-slate-900 tabular-nums">&lt; 12ms</div>
        <div className="text-xs text-slate-500 mt-1">p99 Query Latency</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 tabular-nums">120M/sec</div>
        <div className="text-xs text-slate-500 mt-1">Ingestion Throughput</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 tabular-nums">0 Downtime</div>
        <div className="text-xs text-slate-500 mt-1">Rolling Cluster Updates</div>
      </div>
    </div>
  </div>
</section>`,
      preview: (
        <div className="p-8 bg-slate-50/70 border border-slate-200 rounded-xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span>Enterprise Cloud</span>
            <span aria-hidden="true">·</span>
            <span>PostgreSQL &amp; ClickHouse</span>
            <span aria-hidden="true">·</span>
            <span>99.99% Availability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance max-w-2xl mx-auto">
            High-throughput analytics engines without query degradation
          </h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Execute real-time aggregations across petabytes in milliseconds. Fully managed with zero configuration toil.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              Start Free Cluster
            </button>
            <button className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Live Benchmarks
            </button>
          </div>
        </div>
      ),
    },

    bento: {
      title: 'Bento Grid Feature Grid',
      description: 'Clean whitespace-driven layout with subtle hairline borders, single-elevation depth, and anti-slop typography.',
      code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
  {/* Card 1 */}
  <div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
    <div className="text-xs font-medium text-slate-500">01. Ingestion Engine</div>
    <h3 className="text-base font-bold text-slate-900">Streaming Event Bus</h3>
    <p className="text-xs text-slate-600 leading-relaxed">
      Continuous Kafka and webhook ingestion with zero dropped packets and schema registry validation.
    </p>
  </div>

  {/* Card 2 */}
  <div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
    <div className="text-xs font-medium text-slate-500">02. Security & Compliance</div>
    <h3 className="text-base font-bold text-slate-900">Encrypted at Rest & Transit</h3>
    <p className="text-xs text-slate-600 leading-relaxed">
      Hardware security module (HSM) keys, automated audit trail logs, and HIPAA/SOC-2 type II compliance.
    </p>
  </div>

  {/* Card 3 */}
  <div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
    <div className="text-xs font-medium text-slate-500">03. Developer SDKs</div>
    <h3 className="text-base font-bold text-slate-900">Type-Safe Client Libraries</h3>
    <p className="text-xs text-slate-600 leading-relaxed">
      Idiomatic TypeScript, Go, Python, and Rust client packages generated with strict semantic schemas.
    </p>
  </div>
</div>`,
      preview: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-1.5">
            <div className="text-xs font-medium text-slate-500">01. Ingestion Engine</div>
            <h4 className="text-sm font-bold text-slate-900">Streaming Event Bus</h4>
            <p className="text-xs text-slate-600">Continuous Kafka and webhook ingestion with zero packet loss.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-1.5">
            <div className="text-xs font-medium text-slate-500">02. Security</div>
            <h4 className="text-sm font-bold text-slate-900">Encrypted at Rest</h4>
            <p className="text-xs text-slate-600">Automated audit logs and SOC-2 type II certified compliance.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-1.5">
            <div className="text-xs font-medium text-slate-500">03. Developer SDKs</div>
            <h4 className="text-sm font-bold text-slate-900">Type-Safe Libraries</h4>
            <p className="text-xs text-slate-600">Idiomatic TypeScript, Go, Python, and Rust client packages.</p>
          </div>
        </div>
      ),
    },

    pricing: {
      title: 'Tabular Pricing Matrix',
      description: 'Clutter-free pricing cards with tabular figures, explicit billing interval terms, and high WCAG contrast.',
      code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {/* Starter */}
  <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
    <div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional</div>
      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-4xl font-extrabold text-slate-900 tabular-nums">$49</span>
        <span className="text-xs text-slate-500">/ month</span>
      </div>
      <p className="text-xs text-slate-600 mt-2">For growing products scaling to hundreds of thousands of active users.</p>
      
      <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
        <li className="flex items-center gap-2">✓ Up to 5 Million Monthly API calls</li>
        <li className="flex items-center gap-2">✓ 99.95% Guaranteed SLA</li>
        <li className="flex items-center gap-2">✓ Automated daily offsite backups</li>
      </ul>
    </div>
    <button
      type="button"
      className="mt-8 w-full py-2.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
    >
      Select Professional
    </button>
  </div>

  {/* Enterprise (Accent Card) */}
  <div className="p-8 rounded-xl border border-slate-900 bg-slate-900 text-white shadow-md flex flex-col justify-between">
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise Dedicated</div>
      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-4xl font-extrabold text-white tabular-nums">$249</span>
        <span className="text-xs text-slate-400">/ month</span>
      </div>
      <p className="text-xs text-slate-300 mt-2">Dedicated single-tenant infrastructure with custom data residency.</p>
      
      <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
        <li className="flex items-center gap-2">✓ Unlimited API requests & bandwidth</li>
        <li className="flex items-center gap-2">✓ 99.99% Financial-backed SLA</li>
        <li className="flex items-center gap-2">✓ Dedicated Slack channel & 1-hour support</li>
      </ul>
    </div>
    <button
      type="button"
      className="mt-8 w-full py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors active:scale-[0.98]"
    >
      Deploy Dedicated Cluster
    </button>
  </div>
</div>`,
      preview: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase">Professional</div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
              $49 <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </div>
            <p className="text-xs text-slate-600">For scaling production applications.</p>
            <button className="w-full py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors">
              Get Started
            </button>
          </div>

          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900 text-white shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase">Enterprise</div>
            <div className="text-3xl font-extrabold text-white tabular-nums">
              $249 <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </div>
            <p className="text-xs text-slate-300">Dedicated single-tenant clusters.</p>
            <button className="w-full py-2 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-900 rounded-lg transition-colors">
              Talk to Engineering
            </button>
          </div>
        </div>
      ),
    },
  };

  const current = patterns[activePattern];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Modern 2026 Production Component Blueprints</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Production-grade patterns adhering to the Frontend Design Constitution. Zero slop, fully accessible.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setActivePattern('topbar')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activePattern === 'topbar' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
            }`}
          >
            Top Bar
          </button>
          <button
            type="button"
            onClick={() => setActivePattern('hero')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activePattern === 'hero' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
            }`}
          >
            Hero Section
          </button>
          <button
            type="button"
            onClick={() => setActivePattern('bento')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activePattern === 'bento' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
            }`}
          >
            Bento Grid
          </button>
          <button
            type="button"
            onClick={() => setActivePattern('pricing')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activePattern === 'pricing' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
            }`}
          >
            Pricing Matrix
          </button>
        </div>
      </div>

      {/* Pattern Detail */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">{current.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{current.description}</p>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(current.code, activePattern)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
          >
            {copiedKey === activePattern ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copiedKey === activePattern ? 'Copied to Clipboard' : 'Copy Clean JSX'}</span>
          </button>
        </div>

        {/* Live Visual Preview */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Eye size={14} /> Live Rendered Preview
          </div>
          <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200">
            {current.preview}
          </div>
        </div>

        {/* Code Block */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Code size={14} /> Production Ready Source Code
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
            {current.code}
          </pre>
        </div>
      </div>
    </div>
  );
}
