export function generatePolishedCode(originalCode: string): string {
  if (!originalCode || originalCode.trim().length === 0) {
    return `// Paste or load a snippet on the left to see the modernized, production-ready version.`;
  }

  let code = originalCode;

  // 1. Replace <div onClick=...> with semantic <button type="button" onClick=...>
  code = code.replace(
    /<div(\s+[^>]*\bonClick=[^>]*)(?:cursor-pointer)?([^>]*)>([\s\S]*?)<\/div>/gi,
    (match, p1, p2, inner) => {
      // Clean up cursor-pointer and replace with button
      const cleanProps = (p1 + p2).replace(/cursor-pointer/g, '').trim();
      return `<button type="button" ${cleanProps}>\n  ${inner.trim()}\n</button>`;
    }
  );

  // 2. Fix <img> tags lacking alt
  code = code.replace(/<img\b(?![^>]*\balt=)([^>]*?)(\/?>)/gi, '<img$1 alt="Application interface preview" loading="lazy" decoding="async"$2');

  // 3. Transform static pill capsules into clean unboxed text with typographic dots
  code = code.replace(/<div className="inline-flex items-center gap-2 mb-4">[\s\S]*?<\/div>/gi, () => {
    return `<div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-4">\n          <span>Version 2.0</span>\n          <span aria-hidden="true">·</span>\n          <span>Workflow Automation</span>\n          <span aria-hidden="true">·</span>\n          <span>Production Ready</span>\n        </div>`;
  });

  // 4. Remove fake mechanical comment headers like // BETA or // 01
  code = code.replace(/\/\/\s*[A-Z0-9_\-]+/g, '');

  // 5. Replace dated border-l-4 with clean hairline borders
  code = code.replace(/border-l-4\s+border-[a-z]+-[0-9]+/g, 'border border-slate-200/90 rounded-xl');

  // 6. Ensure desktop max-width constraints on main containers
  if (!code.includes('max-w-7xl') && !code.includes('max-w-6xl')) {
    code = code.replace(/<div className="min-h-screen bg-slate-50">/g, '<div className="min-h-screen bg-slate-50/50">\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">');
    if (code.endsWith('</div>\n  );\n}')) {
      code = code.replace(/<\/div>\n  \);\n}$/, '</div>\n    </div>\n  );\n}');
    }
  }

  // 7. Add text-balance to main headlines
  code = code.replace(/(<h[12]\s+className="[^"]*text-[45]xl[^"]*)(")/g, '$1 text-balance$2');

  // 8. Add tabular-nums to stat numbers
  code = code.replace(/(<div\s+className="[^"]*text-[34]xl\s+font-bold[^"]*)(")/g, '$1 tabular-nums tracking-tight$2');

  return code;
}
