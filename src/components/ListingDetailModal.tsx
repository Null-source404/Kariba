import React from 'react';
import { X, MapPin, Star, ShieldCheck, Check, Calendar, Wrench, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { Listing, User } from '../types/kariba';

interface Props {
  listing: Listing | null;
  currentUser: User;
  onClose: () => void;
  onOpenBorrow: (listing: Listing) => void;
}

export function ListingDetailModal({ listing, currentUser, onClose, onOpenBorrow }: Props) {
  if (!listing) return null;

  const isOwner = listing.owner_id === currentUser.id;

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
        aria-labelledby="detail-modal-title"
      >
        {/* Header Bar */}
        <div className="p-4 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#f7f3eb]/70 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#71866f]">
            <span className="font-semibold text-[#25332c]">{listing.location_name}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.distance ?? 0.5} mi away</span>
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#f7f3eb] border border-[#ded9cf]">
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#25332c]/90 text-white backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs">
              <MapPin size={13} className="text-[#f0c96b]" />
              <span>{listing.distance ?? 0.5} miles away</span>
            </div>
            <div className="absolute top-3 right-3 bg-white text-[#25332c] px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#ded9cf] shadow-xs">
              {listing.condition} Condition
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h2 id="detail-modal-title" className="font-serif-display text-2xl font-bold text-[#25332c] leading-tight">
              {listing.title}
            </h2>
            <p className="text-sm text-[#25332c]/80 leading-relaxed font-sans">
              {listing.description}
            </p>
          </div>

          {/* Included Accessories */}
          {listing.includedItems && listing.includedItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#f7f3eb] border border-[#ded9cf] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#25332c]">
                <Package size={16} className="text-[#d96f4b]" />
                <span>Included with this equipment:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#25332c]/80 pt-1">
                {listing.includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check size={14} className="text-[#71866f] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Owner Profile Strip */}
          <div className="p-4 rounded-2xl border border-[#ded9cf] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={listing.owner_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={listing.owner_name}
                className="w-10 h-10 rounded-full object-cover border border-[#ded9cf]"
              />
              <div>
                <div className="font-bold text-xs text-[#25332c]">{listing.owner_name}</div>
                <div className="text-[11px] text-[#71866f]">Verified Neighbor · {listing.location_name}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f7f3eb] rounded-lg border border-[#ded9cf] text-xs font-bold text-[#25332c]">
              <Star size={13} className="fill-[#f0c96b] text-[#f0c96b]" />
              <span>{listing.owner_rating?.toFixed(1) || '5.0'}</span>
            </div>
          </div>
        </div>

        {/* Footer with Rate and Actions */}
        <div className="p-4 px-6 border-t border-[#ded9cf] bg-[#f7f3eb]/70 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-serif-display text-[#25332c] tabular-nums">
                ${listing.price_per_hour.toFixed(2)}
              </span>
              <span className="text-xs text-[#71866f]">/ hour</span>
            </div>
            <div className="text-[11px] text-[#71866f]">
              ${listing.deposit_amount} refundable security deposit
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#25332c]/70 hover:text-[#25332c] rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isOwner}
              onClick={() => {
                onClose();
                onOpenBorrow(listing);
              }}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs active:scale-[0.98] ${
                isOwner
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-[#d96f4b] hover:bg-[#c25e3c] text-white'
              }`}
            >
              {isOwner ? 'You Own This Equipment' : 'Check Availability & Borrow'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
