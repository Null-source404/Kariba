import React, { useState } from 'react';
import { X, ShieldCheck, Lock, AlertTriangle, Terminal, Key, Database, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { sanitizeInputString, validateBorrowPayload } from '../services/securitySuite';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityInspectorModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const [testPayload, setTestPayload] = useState('<img src=x onerror=alert("XSS")> Heavy Duty Saw');
  const [rateLimitCounter, setRateLimitCounter] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const sanitized = sanitizeInputString(testPayload);

  const handleTestRateLimit = () => {
    if (rateLimitCounter >= 4) {
      setIsRateLimited(true);
      setTimeout(() => {
        setIsRateLimited(false);
        setRateLimitCounter(0);
      }, 5000);
    } else {
      setRateLimitCounter(c => c + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25332c]/65 backdrop-blur-xs"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#ded9cf] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="security-inspector-title"
      >
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#25332c] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f0c96b] text-[#25332c] flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 id="security-inspector-title" className="font-serif-display text-base font-bold text-white">
                Backend Security &amp; Defense Inspector
              </h2>
              <div className="text-[11px] text-[#f7f3eb]/70">
                Live interactive demonstration of Kariba's backend defense architecture
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Defense 1: Rate Limiter */}
          <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-[#25332c]">
                <Lock size={15} className="text-[#d96f4b]" />
                <span>1. Auth Rate Limiting (Brute-Force &amp; Bot Defense)</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#25332c]/80 leading-relaxed font-sans">
              Locks out automated bots attempting password guessing after 5 failed tries in 15 minutes.
            </p>

            <div className="p-3 bg-white rounded-xl border border-[#ded9cf] flex items-center justify-between gap-3 text-xs">
              <div className="text-slate-600">
                Test Rapid Requests: <span className="font-bold font-mono text-[#25332c]">{rateLimitCounter} / 5</span>
              </div>
              <button
                type="button"
                onClick={handleTestRateLimit}
                disabled={isRateLimited}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isRateLimited
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-[#25332c] text-white hover:bg-[#1a241f]'
                }`}
              >
                {isRateLimited ? 'HTTP 429: IP Locked for 5s' : 'Simulate Rapid Login Attempt'}
              </button>
            </div>
          </div>

          {/* Defense 2: SQL Injection Defense */}
          <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-[#25332c]">
                <Database size={15} className="text-[#71866f]" />
                <span>2. Parameterized SQL Execution (SQLi Immunity)</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ENFORCED
              </span>
            </div>
            <p className="text-xs text-[#25332c]/80 leading-relaxed font-sans">
              Queries use <code className="font-mono bg-white px-1 rounded text-[#25332c]">pool.execute(sql, [params])</code> with question mark placeholders. Input data is never concatenated into raw SQL strings.
            </p>
            <pre className="p-3 rounded-xl bg-[#25332c] text-[#f0c96b] font-mono text-[11px] overflow-x-auto">
{`// Vulnerable: "SELECT * FROM users WHERE email = '" + email + "'"
// Kariba Secure: pool.execute('SELECT * FROM users WHERE email = ?', [email])`}
            </pre>
          </div>

          {/* Defense 3: XSS Sanitization */}
          <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-[#25332c]">
                <ShieldCheck size={15} className="text-[#d96f4b]" />
                <span>3. Stored XSS Script Stripping Playground</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ESCAPE ENGINE
              </span>
            </div>
            <p className="text-xs text-[#25332c]/80 leading-relaxed font-sans">
              Test injecting malicious HTML or script tags into equipment descriptions:
            </p>
            <input
              type="text"
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs font-mono bg-white focus:outline-none"
            />
            <div className="p-3 bg-white rounded-xl border border-[#ded9cf] text-xs space-y-1">
              <span className="text-[10px] text-slate-400 block">Sanitized Output (Safe to render):</span>
              <code className="font-mono text-emerald-700 text-xs block break-all">{sanitized}</code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#ded9cf] bg-[#f7f3eb]/80 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-colors"
          >
            Close Security Inspector
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
