import React, { useState } from 'react';
import { Globe, Terminal, Copy, Check, ExternalLink, ShieldAlert, Sparkles, X, ArrowRight, Laptop } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: () => void;
}

export function LocalhostGuideModal({ isOpen, onClose, onSelectSample }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Laptop size={20} />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-900">
                Why `localhost:5173` is Private to Your Device
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Understanding local development URLs and how to share your work with an AI reviewer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Visual Explanation */}
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 shadow-2xs font-mono font-medium text-slate-900 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Your PC (Port 5173)
            </div>
            <div className="flex-1 flex items-center justify-center text-slate-400 gap-1 font-mono text-[11px]">
              <span>———</span>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 rounded font-sans text-xs font-semibold">
                Firewall / Loopback
              </span>
              <span>———✕</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 shadow-2xs font-mono font-medium text-slate-900 shrink-0">
              <Globe size={16} className="text-blue-500" />
              Cloud AI Reviewer
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3 Quick Ways to Let Me Review &amp; Enhance Your Site:
            </h3>

            {/* Option 1 */}
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-sm text-blue-950">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Fastest: Paste your code or markup directly
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Paste your <code className="px-1.5 py-0.5 rounded bg-white text-blue-800 font-mono text-[11px] border border-blue-200">App.tsx</code> or component code into the Auditor tab right here, or paste it in the chat prompt.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectSample();
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Load a common starter template to test now <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Option 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-900">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold">2</span>
                Expose with a 1-line temporary tunnel (No install required)
              </div>
              <p className="text-xs text-slate-600">
                Run either command in your local terminal where your Vite app is running to generate a public link:
              </p>
              
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 text-slate-100">
                  <span className="truncate mr-2">$ npx localtunnel --port 5173</span>
                  <button
                    onClick={() => copyToClipboard('npx localtunnel --port 5173', 1)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedIndex === 1 ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 text-slate-100">
                  <span className="truncate mr-2">$ npx cloudflared tunnel --url http://localhost:5173</span>
                  <button
                    onClick={() => copyToClipboard('npx cloudflared tunnel --url http://localhost:5173', 2)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedIndex === 2 ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Option 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-slate-900">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold">3</span>
                Describe your goals or share a public URL
              </div>
              <p className="text-xs text-slate-600">
                Tell me what your website is for (e.g. portfolio, SaaS tool, landing page) and what sections you currently have. We can architect the full layout directly here!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Got it, take me to the Studio
          </button>
        </div>
      </div>
    </div>
  );
}
