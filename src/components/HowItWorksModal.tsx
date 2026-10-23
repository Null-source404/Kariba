import React from 'react';
import { X, Search, ShieldCheck, HeartHandshake, Sparkles, Wrench, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenExplore: () => void;
}

export function HowItWorksModal({ isOpen, onClose, onOpenExplore }: Props) {
  if (!isOpen) return null;

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
        className="bg-white rounded-3xl max-w-xl w-full border border-[#ded9cf] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="how-it-works-title"
      >
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#f7f3eb]/75 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#25332c] text-[#f0c96b] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <h2 id="how-it-works-title" className="font-serif-display text-base font-bold text-[#25332c]">
              How Kariba Works
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#25332c]/50 hover:text-[#25332c] hover:bg-black/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f7f3eb]/60 border border-[#ded9cf]">
              <div className="w-10 h-10 rounded-xl bg-[#25332c] text-white flex items-center justify-center font-bold font-serif-display shrink-0 text-base">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-[#25332c]">Find Equipment Within Walking Distance</h3>
                <p className="text-xs text-[#25332c]/75 leading-relaxed font-sans">
                  Use the GPS radius filter to see what heavy-duty gear your neighbors have in their shed or garage—drills, pressure washers, mowers, and camping gear.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f7f3eb]/60 border border-[#ded9cf]">
              <div className="w-10 h-10 rounded-xl bg-[#d96f4b] text-white flex items-center justify-center font-bold font-serif-display shrink-0 text-base">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-[#25332c]">Reserve with Refundable Deposit Protection</h3>
                <p className="text-xs text-[#25332c]/75 leading-relaxed font-sans">
                  Pick your exact hours. Pay only for the time you use (e.g. $6/hour). A refundable deposit protects the owner while the gear is in your hands.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f7f3eb]/60 border border-[#ded9cf]">
              <div className="w-10 h-10 rounded-xl bg-[#71866f] text-white flex items-center justify-center font-bold font-serif-display shrink-0 text-base">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-[#25332c]">Pick Up, Complete Your Project, Return</h3>
                <p className="text-xs text-[#25332c]/75 leading-relaxed font-sans">
                  Meet your neighbor down the street, get a 2-minute safety demo, and complete your task. Return it clean, and your deposit is instantly refunded!
                </p>
              </div>
            </div>
          </div>

          {/* Trust & Environmental Impact Note */}
          <div className="p-4 rounded-2xl bg-[#25332c] text-white text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#f0c96b]">
              <ShieldCheck size={16} />
              <span>Neighbor Trust &amp; Safety Standard</span>
            </div>
            <p className="text-white/80 leading-relaxed font-sans text-[11px]">
              Every member verifies their address and profile. Tools are inspected before and after each borrow. Over 98% of neighborhood tool needs can be solved without buying new consumer plastic.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#ded9cf] bg-[#f7f3eb]/75 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenExplore();
            }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-all shadow-xs"
          >
            Explore Neighborhood Gear
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
