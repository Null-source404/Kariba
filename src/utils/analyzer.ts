import { AuditIssue, AuditResult, AuditCategory } from '../types/audit';

export function analyzeFrontendCode(code: string): AuditResult {
  const issues: AuditIssue[] = [];
  const normalized = code.trim();

  if (!normalized) {
    return {
      score: 100,
      totalIssues: 0,
      criticalCount: 0,
      warningCount: 0,
      infoCount: 0,
      categoryScores: {
        a11y: 100,
        design: 100,
        layout: 100,
        typography: 100,
        interaction: 100,
      },
      issues: [],
    };
  }

  // 1. Accessibility Checks (A11y)
  // Check for <img> without alt
  const imgWithoutAltRegex = /<img\b(?![^>]*\balt=)[^>]*>/gi;
  if (imgWithoutAltRegex.test(normalized)) {
    issues.push({
      id: 'a11y-img-alt',
      category: 'a11y',
      severity: 'critical',
      title: 'Missing image alt text',
      description: 'Found <img> elements without an alt attribute. Screen readers cannot describe the image to visually impaired users.',
      recommendation: 'Always provide descriptive alt="Product showcase..." or alt="" if strictly decorative.',
      codeSnippet: '<img src="/banner.png" className="..." />',
      fixedCodeSnippet: '<img src="/banner.png" alt="Clean minimal dashboard interface preview" className="..." />',
      ruleReference: 'WCAG 2.1 AA (1.1.1 Non-text Content)',
    });
  }

  // Check for div/span with onClick
  const divOnClickRegex = /<(div|span)[^>]*\bonClick\b[^>]*>/gi;
  if (divOnClickRegex.test(normalized)) {
    issues.push({
      id: 'a11y-div-click',
      category: 'a11y',
      severity: 'critical',
      title: 'Non-semantic clickable element (<div onClick>)',
      description: 'Found <div> or <span> with onClick handlers instead of a semantic <button> or <a> tag. Keyboard users cannot tab to or activate this element.',
      recommendation: 'Replace with <button type="button" onClick={...}> or add role="button" tabIndex={0} onKeyDown={...}.',
      codeSnippet: '<div onClick={handleClick} className="cursor-pointer">Submit</div>',
      fixedCodeSnippet: '<button type="button" onClick={handleClick} className="...">Submit</button>',
      ruleReference: 'WCAG 2.1 AA (4.1.2 Name, Role, Value)',
    });
  }

  // Check for icon-only button without aria-label
  const iconButtonWithoutLabelRegex = /<button[^>]*>(?:\s*<[A-Z][a-zA-Z0-9]*\b[^>]*\/>|\s*<svg\b[\s\S]*?<\/svg>)\s*<\/button>/gi;
  if (iconButtonWithoutLabelRegex.test(normalized) && !/aria-label=/i.test(normalized)) {
    issues.push({
      id: 'a11y-icon-button-label',
      category: 'a11y',
      severity: 'warning',
      title: 'Icon-only button missing aria-label',
      description: 'Found buttons containing only an icon/SVG without visible text or an aria-label.',
      recommendation: 'Add aria-label="Close dialog" or aria-label="Search" so assistive tech knows the button purpose.',
      codeSnippet: '<button><X size={18} /></button>',
      fixedCodeSnippet: '<button aria-label="Close dialog" className="..."><X size={18} /></button>',
      ruleReference: 'WCAG 2.1 AA (1.3.1 Info & Relationships)',
    });
  }

  // 2. Anti-Slop & Modern Design Checks
  // Check for static pill tags (e.g. rounded-full badge sandwiches)
  const pillBadgeRegex = /rounded-full\s+px-[123]\s+py-(?:0\.5|1)|badge-pill|rounded-full\s+bg-(?:indigo|purple|blue|emerald|violet)-[15]00/gi;
  if (pillBadgeRegex.test(normalized)) {
    issues.push({
      id: 'design-pill-metadata',
      category: 'design',
      severity: 'warning',
      title: 'Overused static pill badges & capsule enclosures',
      description: 'Detected static metadata wrapped inside rounded-full capsules. This is a telltale generic "AI slop" pattern that clutters the visual field.',
      recommendation: 'Render metadata as clean, unboxed text separated by subtle typographic dots (·) or slashes (/). Reserve rounded buttons only for functional interactive filters.',
      codeSnippet: '<span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs">Featured 2026</span>',
      fixedCodeSnippet: '<span className="text-xs font-medium text-slate-500">Featured <span aria-hidden="true">·</span> 2026</span>',
      ruleReference: 'Anti-Slop Constitution: Zero-Pill Discipline',
    });
  }

  // Check for decorative pulsing dots (animate-pulse next to badges)
  const pulseDotRegex = /rounded-full\s+bg-emerald-500\s+animate-pulse|w-2\s+h-2\s+rounded-full\s+bg-green-500/gi;
  if (pulseDotRegex.test(normalized)) {
    issues.push({
      id: 'design-pulsing-dot',
      category: 'design',
      severity: 'info',
      title: 'Decorative green pulsing dot cliché',
      description: 'Detected decorative pulsing green dots next to static headings or tags. Pulsing dots should be strictly reserved for genuine live real-time connection telemetry (e.g. active WebSocket).',
      recommendation: 'Remove decorative blinking dots and rely on confident typography and clean status labels.',
      codeSnippet: '<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" /> Live Now',
      fixedCodeSnippet: '<span className="text-xs font-medium text-slate-600">Available</span>',
      ruleReference: 'Anti-Slop Constitution: Affordance-Only Restraint',
    });
  }

  // Check for heavy gradient backgrounds (e.g. bg-gradient-to-r from-purple-500 to-indigo-600 everywhere)
  const heavyGradientRegex = /bg-gradient-to-[a-z]+\s+from-(?:purple|violet|pink|fuchsia|indigo)-[56]00/gi;
  if (heavyGradientRegex.test(normalized)) {
    issues.push({
      id: 'design-heavy-gradient',
      category: 'design',
      severity: 'warning',
      title: 'Hyper-saturated AI purple/violet gradient',
      description: 'High-saturation purple/pink gradients have become visual noise associated with uncurated templates.',
      recommendation: 'Adopt the 60-30-10 color rule: 60% neutral canvas (slate-50/white or deep zinc), 30% structural surfaces with hairline borders, and 10% purposeful accent color for primary actions.',
      codeSnippet: 'className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl"',
      fixedCodeSnippet: 'className="bg-white border border-slate-200/80 p-8 rounded-xl shadow-xs"',
      ruleReference: 'Color Architecture: 60-30-10 Distribution',
    });
  }

  // Check for thick left accent borders (border-l-4 or border-l-2 colored bars)
  const thickLeftBorderRegex = /border-l-[248]\s+border-(?:blue|indigo|emerald|purple|amber)-[56]00/gi;
  if (thickLeftBorderRegex.test(normalized)) {
    issues.push({
      id: 'design-thick-left-border',
      category: 'design',
      severity: 'info',
      title: 'Dated thick left accent border',
      description: 'Detected thick left colored borders (border-l-4) on cards or callouts, a dated Bootstrap/early 2010s aesthetic pattern.',
      recommendation: 'Use subtle all-around hairline borders (border border-slate-200) paired with generous internal padding and quiet surface tone.',
      codeSnippet: '<div className="border-l-4 border-indigo-600 pl-4 py-2 bg-slate-50">Note</div>',
      fixedCodeSnippet: '<div className="border border-slate-200/90 rounded-lg p-5 bg-white">Note</div>',
      ruleReference: 'Anti-Slop Constitution: Structural Subtlety',
    });
  }

  // 3. Layout & Viewport Math Checks
  // Check if main container lacks max-width constraints (leads to giant stretching on 4K/ultra-wide screens)
  const hasMaxWidth = /max-w-(?:5xl|6xl|7xl|screen-xl|screen-2xl|4xl)/i.test(normalized);
  const hasContainer = /container|mx-auto/i.test(normalized);
  if (!hasMaxWidth && normalized.length > 300) {
    issues.push({
      id: 'layout-unconstrained-width',
      category: 'layout',
      severity: 'warning',
      title: 'Missing max-width viewport constraint',
      description: 'Large content sections lack max-w-6xl or max-w-7xl with mx-auto, causing content to stretch awkwardly on wide desktop monitors (1440px+).',
      recommendation: 'Wrap top-level sections in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 to maintain crisp, disciplined content framing.',
      codeSnippet: '<div className="w-full flex justify-between">...</div>',
      fixedCodeSnippet: '<div className="max-w-7xl mx-auto px-6 w-full flex justify-between">...</div>',
      ruleReference: 'Layout Integrity: Desktop 1440px Baseline',
    });
  }

  // Check for missing whitespace-nowrap on navigation items
  if (/<nav\b/i.test(normalized) && !/whitespace-nowrap/i.test(normalized)) {
    issues.push({
      id: 'layout-nav-wrapping',
      category: 'layout',
      severity: 'info',
      title: 'Nav link labels susceptible to accidental line breaking',
      description: 'Navigation items may wrap into awkward two-line buttons on mid-size viewports if not protected.',
      recommendation: 'Apply whitespace-nowrap and shrink-0 to header nav anchors and button controls.',
      codeSnippet: '<a href="#pricing" className="px-3 py-2">Pricing Plans</a>',
      fixedCodeSnippet: '<a href="#pricing" className="px-3 py-2 whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors">Pricing Plans</a>',
      ruleReference: 'Top Bar Contract: Single-Line Controls',
    });
  }

  // 4. Typography Checks
  // Check for missing balance on display headings (orphan words)
  const headlineRegex = /<h[123]\b[^>]*>(?!.*text-balance)[^<]{30,}<\/h[123]>/gi;
  if (headlineRegex.test(normalized) && !/text-balance/i.test(normalized)) {
    issues.push({
      id: 'type-orphan-words',
      category: 'typography',
      severity: 'info',
      title: 'Headlines vulnerable to typographic word orphans',
      description: 'Longer display headlines without text-balance or max-w constraints can leave a single trailing word isolated on the last line.',
      recommendation: 'Add text-balance (CSS text-wrap: balance) or constrain width to max-w-2xl.',
      codeSnippet: '<h1 className="text-4xl font-bold tracking-tight">Build faster web applications with modern design</h1>',
      fixedCodeSnippet: '<h1 className="text-4xl font-bold tracking-tight text-balance max-w-3xl">Build faster web applications with modern design</h1>',
      ruleReference: 'Typographic Hierarchy: No Orphan Words',
    });
  }

  // Check for tabular numbers on statistics or counters
  const numberStatsRegex = /(?:class(?:Name)?="[^"]*(?:text-[2345]xl|font-bold)[^"]*">\s*[\$€£]?\d+(?:[\.,]\d+)?[kKmM%]?\s*<\/)/g;
  if (numberStatsRegex.test(normalized) && !/tabular-nums|font-mono/i.test(normalized)) {
    issues.push({
      id: 'type-tabular-nums',
      category: 'typography',
      severity: 'info',
      title: 'Stat counters missing tabular-nums alignment',
      description: 'Detected prominent numeric values or metrics without tabular figures. Standard proportional fonts cause numbers to shift jittery alignment.',
      recommendation: 'Apply tabular-nums or pair with a clean monospace font for numeric clarity.',
      codeSnippet: '<span className="text-3xl font-bold">$128,450</span>',
      fixedCodeSnippet: '<span className="text-3xl font-bold tabular-nums tracking-tight">$128,450</span>',
      ruleReference: 'Tabular Discipline: font-variant-numeric',
    });
  }

  // 5. Interaction & Feedback Checks
  // Check for buttons with no transition
  const buttonsWithoutTransition = /<button\b(?![^>]*\btransition\b)[^>]*>/gi;
  if (buttonsWithoutTransition.test(normalized) && normalized.includes('hover:')) {
    issues.push({
      id: 'interaction-transition-timing',
      category: 'interaction',
      severity: 'info',
      title: 'Interactive hover states missing smooth transition curves',
      description: 'Buttons have hover color changes without transition-colors or timing duration, feeling abrupt and unrefined.',
      recommendation: 'Add transition-colors duration-150 ease-out to satisfy the <=200ms micro-interaction budget.',
      codeSnippet: '<button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2">Get Started</button>',
      fixedCodeSnippet: '<button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg transition-colors duration-150 ease-out active:scale-[0.98]">Get Started</button>',
      ruleReference: 'Motion Budget: Routine Feedback <= 200ms',
    });
  }

  // Calculate scores
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  const penalty = (criticalCount * 22) + (warningCount * 10) + (infoCount * 4);
  const score = Math.max(25, 100 - penalty);

  const getCategoryScore = (cat: AuditCategory) => {
    const catIssues = issues.filter(i => i.category === cat);
    const catPenalty = catIssues.reduce((acc, curr) => {
      if (curr.severity === 'critical') return acc + 35;
      if (curr.severity === 'warning') return acc + 20;
      return acc + 8;
    }, 0);
    return Math.max(30, 100 - catPenalty);
  };

  return {
    score,
    totalIssues: issues.length,
    criticalCount,
    warningCount,
    infoCount,
    categoryScores: {
      a11y: getCategoryScore('a11y'),
      design: getCategoryScore('design'),
      layout: getCategoryScore('layout'),
      typography: getCategoryScore('typography'),
      interaction: getCategoryScore('interaction'),
    },
    issues,
  };
}

export const SAMPLE_TEMPLATES: Record<string, { name: string; category: string; description: string; rawCode: string }> = {
  starter: {
    name: 'Common Novice Starter Page',
    category: 'Typical Pitfalls',
    description: 'Demonstrates common issues: clickable divs, missing alt tags, pill badge overload, purple gradient, and unconstrained widths.',
    rawCode: `export default function MyWebsite() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="font-bold text-xl">MyStartup.io // BETA</h1>
        <div className="flex gap-4">
          <span className="text-gray-600">Home</span>
          <span className="text-gray-600">Features</span>
          <span className="text-gray-600">Pricing</span>
        </div>
        <div onClick={() => alert('clicked')} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full cursor-pointer">
          Sign In
        </div>
      </div>

      {/* Hero */}
      <div className="p-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs">NEW VERSION 2.0</span>
          <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs">AI POWERED</span>
        </div>
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          The all-in-one platform for modern workflow engineering
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Scale your productivity with automated pipelines and real-time synchronization.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
            Start Free Trial
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700">
            Book Demo
          </button>
        </div>
      </div>

      {/* Feature with unstyled image & left border */}
      <div className="grid grid-cols-2 gap-8 p-12">
        <div className="border-l-4 border-indigo-600 pl-4 py-2 bg-white rounded shadow-sm">
          <h3 className="font-bold text-lg mb-2">Automated Data Pipelines</h3>
          <p className="text-gray-600">Run scheduled queries and aggregate analytics across databases effortlessly.</p>
        </div>
        <div>
          <img src="/dashboard-mockup.png" className="rounded-xl shadow" />
        </div>
      </div>

      {/* Metrics */}
      <div className="p-12 bg-white text-center">
        <div className="text-4xl font-bold text-gray-900">99.98%</div>
        <div className="text-sm text-gray-500">Uptime guarantee</div>
      </div>
    </div>
  );
}`,
  },
  portfolio: {
    name: 'Creative Portfolio Snippet',
    category: 'Portfolio',
    description: 'Demonstrates common portfolio issues: low contrast, missing accessible labels, and unconstrained wide layouts.',
    rawCode: `export default function PortfolioSection() {
  return (
    <section className="py-20 px-8 bg-black text-white">
      <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">// SELECTED WORKS 2026</div>
      <h2 className="text-4xl font-bold tracking-tight mb-8">Architectural Design & Brand Systems</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group cursor-pointer">
          <img src="/project-1.jpg" className="w-full h-80 object-cover rounded-lg mb-4" />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-zinc-800 text-zinc-300 px-3 py-1 text-xs">Branding</span>
            <span className="rounded-full bg-zinc-800 text-zinc-300 px-3 py-1 text-xs">2026</span>
          </div>
          <h3 className="text-xl font-semibold mt-2">Vanguard Studio Identity</h3>
        </div>
        <div className="group cursor-pointer">
          <img src="/project-2.jpg" className="w-full h-80 object-cover rounded-lg mb-4" />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-zinc-800 text-zinc-300 px-3 py-1 text-xs">Web Design</span>
          </div>
          <h3 className="text-xl font-semibold mt-2">Helsinki Modern Pavilion</h3>
        </div>
      </div>
    </section>
  );
}`,
  },
  ecommerce: {
    name: 'E-Commerce Product Card',
    category: 'E-Commerce',
    description: 'Demonstrates e-commerce pitfalls: missing alt text, non-semantic interactive cards, price alignment.',
    rawCode: `export default function ProductCard() {
  return (
    <div className="border rounded-2xl p-4 shadow-sm max-w-sm">
      <div className="relative">
        <img src="/chair.png" className="w-full h-64 object-cover rounded-xl" />
        <span className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">20% OFF</span>
      </div>
      <div className="mt-4">
        <div className="text-xs text-gray-400">FURNITURE // SEATING</div>
        <h4 className="text-lg font-bold text-gray-900 mt-1">Nordic Ash Dining Chair</h4>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900">$249</span>
          <span className="text-sm text-gray-400 line-through">$310</span>
        </div>
        <div onClick={() => {}} className="mt-4 w-full bg-black text-white text-center py-3 rounded-xl cursor-pointer">
          Add to Cart
        </div>
      </div>
    </div>
  );
}`,
  },
};
