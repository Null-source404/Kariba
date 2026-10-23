import React, { useState } from 'react';
import { MapPin, Shield, Star, Clock, Check, Wrench } from 'lucide-react';
import { Listing } from '../types/kariba';

interface Props {
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onBorrow: (listing: Listing) => void;
  isOwner: boolean;
}

export function ListingCard({ listing, onSelect, onBorrow, isOwner }: Props) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#ded9cf] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Image Container with Fallback */}
        <div 
          onClick={() => onSelect(listing)} 
          className="relative aspect-16/10 bg-[#f7f3eb] overflow-hidden cursor-pointer"
        >
          {!imageFailed ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#71866f] p-4 text-center">
              <Wrench size={32} className="mb-2 text-[#25332c]/40" />
              <span className="text-xs font-semibold text-[#25332c]">{listing.title}</span>
            </div>
          )}

          {/* Distance Badge */}
          <div className="absolute top-3 left-3 bg-[#25332c]/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-xs">
            <MapPin size={12} className="text-[#f0c96b]" />
            <span>{listing.distance ?? 0.5} mi away</span>
          </div>

          {/* Condition Tag */}
          <div className="absolute top-3 right-3 bg-white/95 text-[#25332c] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs border border-[#ded9cf]">
            {listing.condition}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Owner & Neighborhood */}
          <div className="flex items-center justify-between text-xs text-[#71866f]">
            <div className="flex items-center gap-1.5">
              <img
                src={listing.owner_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={listing.owner_name}
                className="w-4.5 h-4.5 rounded-full object-cover"
              />
              <span className="font-medium text-[#25332c]">{listing.owner_name}</span>
            </div>
            <div className="flex items-center gap-1 text-[#25332c]">
              <Star size={12} className="fill-[#f0c96b] text-[#f0c96b]" />
              <span className="font-bold text-[11px]">{listing.owner_rating?.toFixed(1) || '5.0'}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(listing)}
            className="font-serif-display text-base font-bold text-[#25332c] line-clamp-2 leading-snug hover:text-[#d96f4b] transition-colors cursor-pointer"
          >
            {listing.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#25332c]/75 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Included accessories sneak peek */}
          {listing.includedItems && listing.includedItems.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-[#71866f] truncate">
              <span className="font-semibold text-[#25332c]">Includes:</span>
              <span className="truncate">{listing.includedItems.slice(0, 2).join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer with Price and CTA */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#ded9cf]/50 mt-2">
        <div className="flex items-end justify-between pt-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#71866f] tracking-wider">Borrow Rate</div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-serif-display text-[#25332c] tabular-nums">
                ${listing.price_per_hour.toFixed(2)}
              </span>
              <span className="text-xs text-[#71866f]">/ hour</span>
            </div>
            <div className="text-[10px] text-[#71866f] mt-0.5">
              ${listing.deposit_amount} refundable deposit
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(listing)}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#25332c] hover:bg-[#f7f3eb] rounded-xl transition-colors border border-[#ded9cf]"
            >
              Details
            </button>
            <button
              type="button"
              disabled={isOwner}
              onClick={() => onBorrow(listing)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs active:scale-[0.98] ${
                isOwner
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-[#d96f4b] hover:bg-[#c25e3c] text-white'
              }`}
            >
              {isOwner ? 'Your Gear' : 'Borrow'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
