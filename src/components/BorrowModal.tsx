import React, { useState } from 'react';
import { X, Calendar, Clock, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Listing, User, BorrowRequest } from '../types/kariba';
import { karibaService } from '../services/karibaStore';

interface Props {
  listing: Listing | null;
  currentUser: User;
  onClose: () => void;
  onSuccess: (request: BorrowRequest) => void;
}

export function BorrowModal({ listing, currentUser, onClose, onSuccess }: Props) {
  if (!listing) return null;

  // Defaults: tomorrow starting at 10:00 AM, ending at 3:00 PM (5 hours)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(`${defaultDateStr}T09:00`);
  const [endDate, setEndDate] = useState<string>(`${defaultDateStr}T14:00`);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRequest, setSubmittedRequest] = useState<BorrowRequest | null>(null);

  // Calculate hours & cost
  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  const diffHours = Math.max(1, Math.round((endObj.getTime() - startObj.getTime()) / (1000 * 60 * 60)));
  const rentalFee = Number((diffHours * listing.price_per_hour).toFixed(2));
  const totalDueAtPickup = rentalFee + listing.deposit_amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = karibaService.createBorrowRequest(
      currentUser,
      listing.id,
      startDate,
      endDate
    );

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to submit borrow request.');
      return;
    }

    if (result.request) {
      setSubmittedRequest(result.request);
      onSuccess(result.request);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25332c]/60 backdrop-blur-xs"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        className="bg-white rounded-3xl max-w-lg w-full border border-[#ded9cf] shadow-2xl overflow-hidden"
        role="dialog"
        aria-labelledby="borrow-modal-title"
      >
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#f7f3eb]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25332c] text-white flex items-center justify-center">
              <Calendar size={16} className="text-[#f0c96b]" />
            </div>
            <div>
              <h2 id="borrow-modal-title" className="font-serif-display text-base font-bold text-[#25332c]">
                Request to Borrow Gear
              </h2>
              <div className="text-[11px] text-[#71866f]">
                Lender: {listing.owner_name} · {listing.location_name}
              </div>
            </div>
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

        {/* Success View */}
        {submittedRequest ? (
          <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50 scale-100 transition-transform">
              <CheckCircle2 size={36} className="animate-in zoom-in-50 duration-300" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#25332c]">
              Borrow Request Sent to {listing.owner_name}!
            </h3>
            <p className="text-xs text-[#25332c]/75 max-w-sm mx-auto leading-relaxed">
              We notified {listing.owner_name}. Once they approve, you'll receive the exact pickup address and contact details in your Borrowing dashboard.
            </p>
            <div className="p-4 rounded-xl bg-[#f7f3eb] border border-[#ded9cf] text-xs text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Item:</span>
                <span className="font-bold font-sans text-[#25332c]">{listing.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Duration:</span>
                <span>{submittedRequest.total_hours} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Estimated Cost:</span>
                <span className="text-[#d96f4b] font-bold">${submittedRequest.total_cost}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-all shadow-xs"
            >
              Done &amp; View in My Borrows
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Listing Summary Card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f3eb]/60 border border-[#ded9cf]">
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-14 h-14 rounded-lg object-cover border border-[#ded9cf]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-[#25332c] truncate">{listing.title}</h4>
                <div className="text-[11px] text-[#71866f] mt-0.5">
                  ${listing.price_per_hour}/hr · ${listing.deposit_amount} refundable deposit
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#25332c]">
                  Start Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#25332c]">
                  Return Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
                />
              </div>
            </div>

            {/* Price Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-[#f7f3eb] border border-[#ded9cf] space-y-2 text-xs">
              <div className="flex justify-between text-[#25332c]/80">
                <span>Duration ({diffHours} hours @ ${listing.price_per_hour}/hr):</span>
                <span className="font-mono font-medium">${rentalFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#25332c]/80">
                <span>Refundable Security Deposit:</span>
                <span className="font-mono font-medium">${listing.deposit_amount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#ded9cf] flex justify-between font-bold text-[#25332c]">
                <span>Total Hold at Pickup:</span>
                <span className="font-mono text-sm text-[#d96f4b]">${totalDueAtPickup.toFixed(2)}</span>
              </div>
            </div>

            {/* Deposit Guarantee Note */}
            <div className="flex items-start gap-2 text-[11px] text-[#71866f]">
              <ShieldCheck size={16} className="text-[#71866f] shrink-0 mt-0.5" />
              <span>
                Your deposit is fully returned as soon as {listing.owner_name} confirms the equipment is returned safely.
              </span>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#25332c]/70 hover:text-[#25332c] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || diffHours <= 0}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#d96f4b] hover:bg-[#c25e3c] rounded-xl transition-all shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Borrow Request'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
