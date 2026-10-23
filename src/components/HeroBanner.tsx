import React from 'react';
import { Search, Sliders, MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { GearCategory } from '../types/kariba';

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: GearCategory;
  setSelectedCategory: (cat: GearCategory) => void;
  radiusMiles: number;
  setRadiusMiles: (r: number) => void;
  totalListingsCount: number;
}

export function HeroBanner({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  radiusMiles,
  setRadiusMiles,
  totalListingsCount,
}: Props) {
  const categories: { id: GearCategory; label: string }[] = [
    { id: 'all', label: 'All Equipment' },
    { id: 'diy', label: '🛠️ Workshop & DIY' },
    { id: 'garden', label: '🪴 Garden & Yard' },
    { id: 'outdoor', label: '🏕️ Outdoor & Camping' },
    { id: 'cleaning', label: '🧼 Pressure & Steam' },
    { id: 'media', label: '📽️ Media & Events' },
  ];

  return (
    <section className="pt-8 pb-10 border-b border-[#ded9cf]">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        {/* Unboxed Quiet Metadata */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#71866f]">
          <span>Verified Neighborhood Shed</span>
          <span aria-hidden="true">·</span>
          <span>Maplewood &amp; Elmwood (37.77° N, -122.41° W)</span>
          <span aria-hidden="true">·</span>
          <span>100% Insured &amp; Deposit Protected</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#25332c] text-balance leading-[1.15]">
          Don't buy it for one afternoon. <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#d96f4b]">Borrow it</span> from down the street.
        </h1>

        <p className="text-sm sm:text-base text-[#25332c]/80 max-w-2xl mx-auto font-sans leading-relaxed">
          Access heavy-duty power tools, pressure washers, camping equipment, and lawn gear from neighbors within walking or cycling distance.
        </p>

        {/* Search & Location Radius Console */}
        <div className="pt-4 max-w-2xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white border border-[#ded9cf] shadow-md">
            {/* Search Input */}
            <div className="flex items-center gap-2.5 px-3 flex-1 w-full text-xs text-[#25332c]">
              <Search size={18} className="text-[#71866f] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drills, pressure washers, tents, mowers..."
                className="w-full bg-transparent placeholder-[#25332c]/40 focus:outline-none text-xs sm:text-sm py-1 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#71866f] hover:text-[#25332c]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Radius Slider Control */}
            <div className="flex items-center gap-3 px-3 py-1.5 bg-[#f7f3eb] rounded-xl border border-[#ded9cf]/70 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
              <div className="flex items-center gap-1.5 text-xs text-[#25332c] font-medium whitespace-nowrap">
                <MapPin size={14} className="text-[#d96f4b]" />
                <span>Radius:</span>
                <span className="font-bold text-[#25332c] tabular-nums font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#ded9cf]">
                  &le; {radiusMiles} mi
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={radiusMiles}
                onChange={(e) => setRadiusMiles(Number(e.target.value))}
                className="w-24 accent-[#25332c] cursor-pointer"
                title={`Radius: ${radiusMiles} miles`}
              />
            </div>
          </div>

          {/* Quick Category Segmented Buttons */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#25332c] text-white shadow-xs font-semibold'
                    : 'bg-white/80 hover:bg-white text-[#25332c] border border-[#ded9cf]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#71866f] flex items-center justify-center gap-3 pt-1">
            <span>Showing {totalListingsCount} items available in your neighborhood</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#25332c] font-semibold">Haversine GPS distance applied</span>
          </div>
        </div>
      </div>
    </section>
  );
}
