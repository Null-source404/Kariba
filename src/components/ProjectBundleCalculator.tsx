import React, { useState } from 'react';
import { Sparkles, DollarSign, ArrowRight, CheckCircle2, ShieldCheck, Wrench, Layers } from 'lucide-react';
import { Listing } from '../types/kariba';

interface Props {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onBorrowListing: (listing: Listing) => void;
}

export function ProjectBundleCalculator({ listings, onSelectListing, onBorrowListing }: Props) {
  const bundles = [
    {
      id: 'patio-clean',
      title: 'Spring Patio & Driveway Deep Clean',
      tagline: 'Blast away moss, algae, and grime from stone, pavers, and decks in one afternoon.',
      icon: '🧼',
      retailCost: 340,
      borrowCost: 28,
      duration: '4-8 Hours',
      toolIds: [102, 109], // Pressure washer + Werner ladder
    },
    {
      id: 'wood-diy',
      title: 'Build Custom Floating Shelves & Cabinetry',
      tagline: 'Cut zero-tearout straight lumber sheets and mount securely into concrete or drywall.',
      icon: '🛠️',
      retailCost: 880,
      borrowCost: 45,
      duration: '1 Full Day',
      toolIds: [108, 101, 111], // Track saw + Hammer drill + Angle grinder
    },
    {
      id: 'lawn-revamp',
      title: 'Complete Lawn Mulch & Hedge Overhaul',
      tagline: 'Mow clean turf, prune overgrown shrubs, and haul 1,000 lbs of mulch without breaking a sweat.',
      icon: '🪴',
      retailCost: 780,
      borrowCost: 42,
      duration: '1 Day Weekend',
      toolIds: [103, 106, 110], // Mower + Hedge trimmer + Dump cart
    },
    {
      id: 'backyard-cinema',
      title: 'Backyard Cinema Movie Night',
      tagline: 'Host 10 friends for outdoor movie night with bright 1080p projection, screen, and picnic tables.',
      icon: '📽️',
      retailCost: 590,
      borrowCost: 35,
      duration: '1 Evening (5-11 PM)',
      toolIds: [107, 112], // Projector + Folding table/chairs
    },
    {
      id: 'camping-escape',
      title: 'Weekend Mountain Camping Trip',
      tagline: 'Escape into nature with an ultralight 4-person tent without filling your closet forever.',
      icon: '🏕️',
      retailCost: 420,
      borrowCost: 39,
      duration: '2-Day Weekend',
      toolIds: [104], // Big Agnes tent
    },
  ];

  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);
  const activeBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];
  const savings = activeBundle.retailCost - activeBundle.borrowCost;
  const bundleTools = activeBundle.toolIds
    .map(id => listings.find(l => l.id === id))
    .filter(Boolean) as Listing[];

  return (
    <div className="bg-white rounded-3xl border border-[#ded9cf] shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded9cf]/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d96f4b]">
            <Sparkles size={15} />
            <span>Weekend Project Kits</span>
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#25332c] mt-1">
            "What Are You Building This Weekend?"
          </h2>
          <p className="text-xs text-[#71866f]">
            Pre-curated equipment bundles for real home and outdoor tasks. See how much you save vs buying new!
          </p>
        </div>

        <div className="flex items-baseline gap-2 bg-[#71866f]/10 p-3 px-4 rounded-2xl border border-[#71866f]/20">
          <span className="text-xs text-[#71866f] font-medium">Average Savings:</span>
          <span className="text-xl font-bold font-serif-display text-[#25332c] tabular-nums">
            92% Off Retail
          </span>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {bundles.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedBundleId(b.id)}
            className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
              selectedBundleId === b.id
                ? 'bg-[#25332c] text-white shadow-md font-bold'
                : 'bg-[#f7f3eb] text-[#25332c] hover:bg-white border border-[#ded9cf]'
            }`}
          >
            <span>{b.icon}</span>
            <span>{b.title}</span>
          </button>
        ))}
      </div>

      {/* Active Bundle Showcase Card */}
      <div 
        key={activeBundle.id}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#f7f3eb]/70 border border-[#ded9cf] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Left: Financial Comparison & Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-2xl">{activeBundle.icon}</div>
          <h3 className="font-serif-display text-2xl font-bold text-[#25332c] leading-tight">
            {activeBundle.title}
          </h3>
          <p className="text-xs text-[#25332c]/80 leading-relaxed font-sans">
            {activeBundle.tagline}
          </p>

          {/* Pricing Math Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#ded9cf] space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Buying these tools new at Home Depot:</span>
              <span className="line-through font-mono text-slate-400">${activeBundle.retailCost}</span>
            </div>
            <div className="flex justify-between text-[#25332c] font-bold">
              <span>Borrowing from your neighbors:</span>
              <span className="font-mono text-[#d96f4b] text-base">${activeBundle.borrowCost}</span>
            </div>
            <div className="pt-2 border-t border-[#ded9cf] flex items-center justify-between font-bold text-[#71866f]">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={15} /> Money kept in your pocket:
              </span>
              <span className="text-lg font-serif-display text-[#25332c] tabular-nums">
                +${savings} saved
              </span>
            </div>
          </div>
        </div>

        {/* Right: Included Tools Grid */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-[#25332c] uppercase tracking-wider">
            Included Gear in this Project Bundle:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bundleTools.map((tool) => (
              <div
                key={tool.id}
                className="p-3 bg-white rounded-2xl border border-[#ded9cf] shadow-2xs flex items-center gap-3"
              >
                <img
                  src={tool.image_url}
                  alt={tool.title}
                  className="w-14 h-14 rounded-xl object-cover border border-[#ded9cf] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-[#25332c] truncate">{tool.title}</h4>
                  <div className="text-[11px] text-[#71866f] mt-0.5">
                    ${tool.price_per_hour}/hr · {tool.distance ?? 0.5} mi away
                  </div>
                  <div className="pt-1.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectListing(tool)}
                      className="text-[10px] font-semibold text-[#25332c] hover:underline"
                    >
                      Inspect
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={() => onBorrowListing(tool)}
                      className="text-[10px] font-bold text-[#d96f4b] hover:underline"
                    >
                      Borrow Individual Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
