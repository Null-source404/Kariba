import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'A11y & Semantics' | 'Visual & Layout' | 'Performance & Polish';
  title: string;
  description: string;
  impact: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'c1',
    category: 'A11y & Semantics',
    title: 'Replace clickable <div> with <button type="button">',
    description: 'Ensure all click targets are accessible to keyboard users (Tab and Enter/Space keys).',
    impact: 'Critical for WCAG 2.1 compliance and screen readers.',
  },
  {
    id: 'c2',
    category: 'A11y & Semantics',
    title: 'Provide meaningful alt attributes on all <img> tags',
    description: 'Never leave alt missing; use descriptive text or alt="" if the image is purely decorative.',
    impact: 'Crucial for accessibility and SEO image search ranking.',
  },
  {
    id: 'c3',
    category: 'A11y & Semantics',
    title: 'Minimum 44px touch targets on mobile viewports',
    description: 'Buttons and tappable controls must have at least 44x44px padding or hit areas for mobile fingers.',
    impact: 'Eliminates frustrating tap errors on mobile devices.',
  },
  {
    id: 'c4',
    category: 'Visual & Layout',
    title: 'Enforce Desktop 1440px max-width boundary (max-w-7xl mx-auto)',
    description: 'Prevent ultra-wide desktop monitors from stretching text and layout across the entire horizon.',
    impact: 'Keeps reading lines comfortable (65-75 characters).',
  },
  {
    id: 'c5',
    category: 'Visual & Layout',
    title: 'Eliminate static pill badge sandwiches on cards',
    description: 'Unbox informational tags (dates, categories, status) and separate with typographic dots (·).',
    impact: 'Immediately elevates the design from generic AI template to editorial human polish.',
  },
  {
    id: 'c6',
    category: 'Visual & Layout',
    title: 'Strict 3-Zone Top Bar Navigation Contract',
    description: 'Brand wordmark (zone 1), 4–5 single-line links with whitespace-nowrap (zone 2), 1 primary CTA (zone 3).',
    impact: 'Prevents header clutter, wrapping links, and broken navigation.',
  },
  {
    id: 'c7',
    category: 'Visual & Layout',
    title: 'Apply 60-30-10 Color Distribution',
    description: '60% neutral canvas, 30% structural surfaces (cards/borders), and 10% accent color at action points.',
    impact: 'Eliminates eye fatigue caused by harsh full-page saturated gradients.',
  },
  {
    id: 'c8',
    category: 'Visual & Layout',
    title: 'Prevent orphan headline words with text-wrap: balance',
    description: 'Avoid single words dropping to a solitary second or third line in display titles.',
    impact: 'Refined typographic rhythm.',
  },
  {
    id: 'c9',
    category: 'Visual & Layout',
    title: 'Replace thick left accent borders (border-l-4) with hairline frames',
    description: 'Use subtle all-around borders (border-slate-200) and generous breathing margins.',
    impact: 'Removes dated 2010s Bootstrap / wiki look.',
  },
  {
    id: 'c10',
    category: 'Performance & Polish',
    title: 'Micro-interaction feedback <= 200ms with transition-colors',
    description: 'Add smooth transitions on hover/active states; avoid sluggish multi-second animations.',
    impact: 'Interface feels instant, snappy, and responsive.',
  },
  {
    id: 'c11',
    category: 'Performance & Polish',
    title: 'Animate compositor properties only (transform, opacity)',
    description: 'Never animate width, height, top, or margin as they trigger costly browser layout reflows.',
    impact: 'Buttery 60fps animations without stutter or battery drain.',
  },
  {
    id: 'c12',
    category: 'Performance & Polish',
    title: 'Tabular numerals (tabular-nums) for stats, counters & currency',
    description: 'Align numbers vertically and prevent jittering when counters update.',
    impact: 'Data looks professional and easily scannable.',
  },
];

export function ChecklistGuide() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c4: true,
    c6: true,
  });

  const toggleItem = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const total = CHECKLIST_ITEMS.length;
  const doneCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / total) * 100);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">15-Point Launch &amp; Quality Audit Checklist</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Work through these key standards to bring your frontend up to elite production standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 tabular-nums">
                {doneCount} / {total} Completed
              </div>
              <div className="text-[11px] text-slate-400">{progressPercent}% launch readiness</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-xs text-slate-800 relative">
              <svg className="w-12 h-12 -rotate-90 absolute inset-0">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-slate-100"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
                  className="text-slate-900 transition-all duration-300"
                  fill="none"
                />
              </svg>
              <span className="tabular-nums">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-slate-900 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = !!completed[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 shadow-2xs ${
                isDone
                  ? 'bg-white border-slate-200/90 hover:border-slate-300'
                  : 'bg-white border-slate-200/60 opacity-80 hover:opacity-100'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 shrink-0 rounded transition-colors ${
                  isDone ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {isDone ? <CheckSquare size={18} /> : <Square size={18} />}
              </button>

              <div className="space-y-1 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className={`text-xs font-bold ${isDone ? 'text-slate-900' : 'text-slate-700'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 self-start sm:self-auto">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-0.5">
                  <span className="text-slate-500 font-semibold">Impact: </span>
                  {item.impact}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
