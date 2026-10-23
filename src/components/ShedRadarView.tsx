import React, { useState } from 'react';
import { Compass, MapPin, Wrench, Shield, Star, Clock, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing } from '../types/kariba';

interface Props {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onBorrowListing: (listing: Listing) => void;
  radiusMiles: number;
}

export function ShedRadarView({
  listings,
  onSelectListing,
  onBorrowListing,
  radiusMiles,
}: Props) {
  const [activePin, setActivePin] = useState<Listing | null>(listings[0] || null);

  // Group listings by owner/location
  const sheds = [
    {
      id: 'marcus-shed',
      name: "Marcus's Workshop Garage",
      owner: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5.0,
      distance: '0.3 mi away',
      street: '42 Elmwood Green Ave',
      x: 62, // % coordinate on radar
      y: 38,
      items: listings.filter(l => l.owner_id === 2),
    },
    {
      id: 'elena-shed',
      name: "Elena's Garden & Outdoor Shed",
      owner: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 4.9,
      distance: '0.6 mi away',
      street: '18 Oak Hill West',
      x: 32,
      y: 68,
      items: listings.filter(l => l.owner_id === 3),
    },
    {
      id: 'community-hub',
      name: 'Maplewood Community Tool Hub',
      owner: 'District Collective',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5.0,
      distance: '0.8 mi away',
      street: '88 Maplewood Center',
      x: 74,
      y: 72,
      items: listings.filter(l => l.owner_id === 1),
    },
  ];

  const [selectedShed, setSelectedShed] = useState(sheds[0]);

  return (
    <div className="bg-white rounded-3xl border border-[#ded9cf] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded9cf]/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d96f4b]">
            <Compass size={15} />
            <span>Interactive Neighborhood Radar</span>
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#25332c] mt-1">
            Explore Nearby Garages &amp; Tool Sheds
          </h2>
          <p className="text-xs text-[#71866f]">
            Click any beacon on the radar to see what gear is stored in that neighbor's shed within {radiusMiles} miles.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#f7f3eb] p-1.5 px-3 rounded-xl border border-[#ded9cf] text-xs font-mono text-[#25332c] self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active GPS Radar: Elmwood District</span>
        </div>
      </div>

      {/* Main Split: Radar Map on Left, Shed Inventory on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Graphic Canvas */}
        <div className="lg:col-span-7 aspect-square max-h-[500px] w-full bg-[#25332c] rounded-3xl relative overflow-hidden flex items-center justify-center p-6 border-4 border-[#25332c] shadow-inner select-none">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #71866f 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Concentric Distance Rings */}
          <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-[#71866f]/30 flex items-center justify-center">
            <span className="absolute top-2 right-1/4 text-[10px] font-mono text-[#71866f]/70">1.0 mi radius</span>
          </div>
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#71866f]/40 flex items-center justify-center">
            <span className="absolute top-2 right-1/3 text-[10px] font-mono text-[#71866f]/70">0.5 mi radius</span>
          </div>
          <div className="absolute w-[35%] h-[35%] rounded-full border border-dashed border-[#71866f]/50 flex items-center justify-center">
            <span className="absolute top-2 right-1/3 text-[10px] font-mono text-[#71866f]">0.25 mi</span>
          </div>

          {/* Rotating Radar Sweep Scanner Beam */}
          <div 
            className="absolute w-[85%] h-[85%] rounded-full pointer-events-none animate-radar-sweep z-5"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(217, 111, 75, 0.04) 300deg, rgba(240, 201, 107, 0.35) 360deg)',
            }}
          />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 h-px bg-[#71866f]/20 pointer-events-none" />
          <div className="absolute inset-y-0 w-px bg-[#71866f]/20 pointer-events-none" />

          {/* Center User Beacon */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#f0c96b] text-[#25332c] flex items-center justify-center font-bold text-[10px] shadow-lg ring-4 ring-[#f0c96b]/30">
              You
            </div>
            <span className="text-[10px] font-mono text-white/70 mt-1 bg-[#25332c]/80 px-1.5 py-0.5 rounded">
              Your Home
            </span>
          </div>

          {/* Shed Radar Beacons */}
          {sheds.map((shed) => {
            const isSelected = selectedShed.id === shed.id;
            return (
              <div
                key={shed.id}
                onClick={() => setSelectedShed(shed)}
                style={{ top: `${shed.y}%`, left: `${shed.x}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  {/* Concentric Expanding Pulse Rings */}
                  {isSelected && (
                    <div className="absolute w-8 h-8 rounded-full bg-[#d96f4b] animate-pulse-ring pointer-events-none" />
                  )}
                  
                  {/* Pin Circle */}
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs shadow-md transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#d96f4b] text-white scale-110 shadow-lg shadow-[#d96f4b]/50 ring-2 ring-white/60'
                      : 'bg-white text-[#25332c] hover:scale-110 hover:shadow-lg'
                  }`}>
                    <Wrench size={16} className={isSelected ? 'text-white' : 'text-[#25332c]'} />
                  </div>
                </div>

                {/* Popover Label */}
                <div className={`mt-1.5 whitespace-nowrap text-center transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                }`}>
                  <div className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                    isSelected ? 'bg-[#d96f4b] text-white' : 'bg-black/80 text-white/90'
                  }`}>
                    {shed.owner} ({shed.items.length} tools)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Shed Inventory Details */}
        <div className="lg:col-span-5 bg-[#f7f3eb]/70 border border-[#ded9cf] rounded-3xl p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedShed.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Shed Profile Card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#ded9cf]">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedShed.avatar}
                    alt={selectedShed.owner}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#ded9cf]"
                  />
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-[#25332c]">
                      {selectedShed.name}
                    </h3>
                    <div className="text-xs text-[#71866f]">
                      {selectedShed.street} · <span className="font-semibold text-[#25332c]">{selectedShed.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#25332c] bg-white px-2 py-1 rounded-lg border border-[#ded9cf]">
                  <Star size={13} className="fill-[#f0c96b] text-[#f0c96b]" />
                  <span>{selectedShed.rating}</span>
                </div>
              </div>

              {/* Tools Stored in This Shed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#25332c] uppercase tracking-wider text-[11px]">
                    Available in this Shed ({selectedShed.items.length})
                  </span>
                  <span className="text-[#71866f]">Instant booking</span>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {selectedShed.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-2xl border border-[#ded9cf] hover:border-[#25332c]/40 transition-all flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-[#ded9cf] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-[#25332c] truncate">{item.title}</h4>
                        <div className="text-[11px] text-[#71866f]">
                          ${item.price_per_hour}/hr · ${item.deposit_amount} deposit
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onSelectListing(item)}
                          className="p-1.5 rounded-lg text-[#25332c] hover:bg-[#f7f3eb] border border-[#ded9cf]"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onBorrowListing(item)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#d96f4b] hover:bg-[#c25e3c] transition-colors shadow-2xs"
                        >
                          Borrow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
