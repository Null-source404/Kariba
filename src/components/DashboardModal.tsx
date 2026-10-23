import React, { useState } from 'react';
import { 
  X, 
  Inbox, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Package, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { User, BorrowRequest, Listing, BorrowStatus } from '../types/kariba';
import { karibaService } from '../services/karibaStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  initialTab?: 'incoming' | 'borrowing' | 'myGear' | 'impact';
  onRefreshData: () => void;
}

export function DashboardModal({
  isOpen,
  onClose,
  currentUser,
  initialTab = 'incoming',
  onRefreshData,
}: Props) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'incoming' | 'borrowing' | 'myGear' | 'impact'>(initialTab);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const incomingRequests = karibaService.getBorrowRequestsIncoming(currentUser.id);
  const myBorrows = karibaService.getBorrowRequestsMine(currentUser.id);
  const myListings = karibaService.getMyListings(currentUser.id);
  const impactStats = karibaService.getCommunityImpact();

  const handleUpdateStatus = (requestId: number, nextStatus: BorrowStatus) => {
    const res = karibaService.updateBorrowRequestStatus(requestId, currentUser.id, nextStatus);
    if (res.success) {
      setActionFeedback(`Request marked as ${nextStatus}.`);
      onRefreshData();
      setTimeout(() => setActionFeedback(null), 3000);
    } else {
      setActionFeedback(res.error || 'Failed to update request.');
    }
  };

  const getStatusBadge = (status: BorrowStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            Pending Approval
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            Approved · Ready for Pickup
          </span>
        );
      case 'active':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            Active · In Use
          </span>
        );
      case 'returned':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            Returned &amp; Closed
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            Declined
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25332c]/65 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full border border-[#ded9cf] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="dashboard-title"
      >
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#f7f3eb]/80 shrink-0">
          <div>
            <h2 id="dashboard-title" className="font-serif-display text-xl font-bold text-[#25332c]">
              Neighborhood Shed Dashboard
            </h2>
            <div className="text-xs text-[#71866f]">
              Logged in as <span className="font-bold text-[#25332c]">{currentUser.name}</span> ({currentUser.email})
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-2 px-6 border-b border-[#ded9cf] bg-white shrink-0 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('incoming')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'incoming'
                ? 'bg-[#25332c] text-white'
                : 'text-[#25332c]/70 hover:bg-[#f7f3eb]'
            }`}
          >
            <Inbox size={14} />
            <span>Lender Inbox</span>
            {incomingRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-[#d96f4b] text-white text-[10px] flex items-center justify-center font-bold">
                {incomingRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('borrowing')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'borrowing'
                ? 'bg-[#25332c] text-white'
                : 'text-[#25332c]/70 hover:bg-[#f7f3eb]'
            }`}
          >
            <Calendar size={14} />
            <span>My Borrowing ({myBorrows.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('myGear')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'myGear'
                ? 'bg-[#25332c] text-white'
                : 'text-[#25332c]/70 hover:bg-[#f7f3eb]'
            }`}
          >
            <Package size={14} />
            <span>My Listed Gear ({myListings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('impact')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'impact'
                ? 'bg-[#25332c] text-white'
                : 'text-[#25332c]/70 hover:bg-[#f7f3eb]'
            }`}
          >
            <Sparkles size={14} className="text-[#f0c96b]" />
            <span>Community Impact</span>
          </button>
        </div>

        {/* Feedback message banner */}
        {actionFeedback && (
          <div className="p-3 px-6 bg-emerald-50 border-b border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-4">
          {/* TAB 1: LENDER INBOX */}
          {activeTab === 'incoming' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#71866f]">
                <span>Requests from neighbors seeking to borrow your equipment:</span>
                <span className="font-mono">{incomingRequests.length} total</span>
              </div>

              {incomingRequests.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Inbox size={36} className="mx-auto text-slate-300" />
                  <p className="text-xs font-medium">No incoming borrow requests yet.</p>
                  <p className="text-[11px]">When neighbors book your listed gear, their requests will appear here for 1-click approval.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {incomingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl border border-[#ded9cf] bg-white shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={req.listing_image}
                            alt={req.listing_title}
                            className="w-12 h-12 rounded-xl object-cover border border-[#ded9cf]"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-[#25332c]">{req.listing_title}</h4>
                            <div className="text-[11px] text-[#71866f]">
                              Borrower: <span className="font-semibold text-[#25332c]">{req.borrower_name}</span> ({req.borrower_email})
                            </div>
                          </div>
                        </div>

                        <div>{getStatusBadge(req.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[#f7f3eb]/60 text-xs font-mono text-[#25332c]">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Start Time:</span>
                          <span>{new Date(req.start_date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Return Time:</span>
                          <span>{new Date(req.end_date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Payout &amp; Deposit:</span>
                          <span className="font-bold text-[#d96f4b]">${req.total_cost}</span>
                          <span className="text-slate-400 text-[10px]"> (+${req.deposit_amount} dep)</span>
                        </div>
                      </div>

                      {/* State Machine Transition Actions */}
                      <div className="pt-1 flex items-center justify-end gap-2 text-xs">
                        {req.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(req.id, 'rejected')}
                              className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
                            >
                              Decline
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(req.id, 'approved')}
                              className="px-4 py-1.5 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-all shadow-xs"
                            >
                              Approve Request
                            </button>
                          </>
                        )}

                        {req.status === 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, 'active')}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-[#71866f] hover:bg-[#5b6e5a] rounded-xl transition-all shadow-xs"
                          >
                            Neighbor Picked Up (Mark Active)
                          </button>
                        )}

                        {req.status === 'active' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, 'returned')}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-[#d96f4b] hover:bg-[#c25e3c] rounded-xl transition-all shadow-xs"
                          >
                            Equipment Returned (Release Deposit)
                          </button>
                        )}

                        {req.status === 'returned' && (
                          <div className="text-[11px] text-[#71866f] flex items-center gap-1 font-medium">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            <span>Borrow cycle completed safely</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY BORROWS */}
          {activeTab === 'borrowing' && (
            <div className="space-y-4">
              <div className="text-xs text-[#71866f]">
                Gear you have reserved or currently have checked out:
              </div>

              {myBorrows.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Package size={36} className="mx-auto text-slate-300" />
                  <p className="text-xs font-medium">You haven't requested any tools yet.</p>
                  <p className="text-[11px]">Browse the community feed and borrow high-end gear from neighbors nearby.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {myBorrows.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl border border-[#ded9cf] bg-white shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.listing_image}
                            alt={b.listing_title}
                            className="w-12 h-12 rounded-xl object-cover border border-[#ded9cf]"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-[#25332c]">{b.listing_title}</h4>
                            <div className="text-[11px] text-[#71866f]">
                              Owner: {b.owner_name} ({b.owner_email})
                            </div>
                          </div>
                        </div>

                        <div>{getStatusBadge(b.status)}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#f7f3eb]/70 text-xs font-mono flex flex-col sm:flex-row justify-between gap-2 text-[#25332c]">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Reservation:</span>
                          <span>{new Date(b.start_date).toLocaleDateString()} · {b.total_hours} hrs</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Total Fee:</span>
                          <span className="font-bold text-[#d96f4b]">${b.total_cost}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Deposit Status:</span>
                          <span>${b.deposit_amount} {b.status === 'returned' ? '(Refunded)' : '(Held)'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MY LISTED GEAR */}
          {activeTab === 'myGear' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#71866f]">
                <span>Gear you share with the neighborhood:</span>
                <span className="font-mono">{myListings.length} items listed</span>
              </div>

              {myListings.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Package size={36} className="mx-auto text-slate-300" />
                  <p className="text-xs font-medium">You haven't listed any equipment yet.</p>
                  <p className="text-[11px]">Help your neighbors and earn extra income by listing items sitting in your garage or closet!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {myListings.map((l) => (
                    <div
                      key={l.id}
                      className="p-4 rounded-2xl border border-[#ded9cf] bg-white flex items-center gap-3 shadow-2xs"
                    >
                      <img
                        src={l.image_url}
                        alt={l.title}
                        className="w-14 h-14 rounded-xl object-cover border border-[#ded9cf] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-[#25332c] truncate">{l.title}</h4>
                        <div className="text-[11px] text-[#71866f] mt-0.5">
                          ${l.price_per_hour}/hr · ${l.deposit_amount} deposit
                        </div>
                        <div className="text-[10px] text-[#d96f4b] font-semibold mt-1">
                          {l.pendingCount > 0 ? `${l.pendingCount} pending requests` : 'Ready to lend'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMMUNITY IMPACT */}
          {activeTab === 'impact' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#25332c] text-white space-y-3">
                <div className="text-xs font-bold text-[#f0c96b] uppercase tracking-wider">
                  The Sharing Economy in Action
                </div>
                <h3 className="font-serif-display text-2xl font-bold">
                  Maplewood &amp; Elmwood District Collective
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans max-w-xl">
                  By pooling our tools instead of everyone buying redundant single-use machines, our neighborhood saves money and slashes manufacturing emissions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]">
                  <div className="text-2xl font-bold font-serif-display text-[#25332c] tabular-nums">
                    ${impactStats.dollarsSaved.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#71866f] mt-1">Dollars Saved vs Buying New</div>
                </div>

                <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]">
                  <div className="text-2xl font-bold font-serif-display text-[#71866f] tabular-nums">
                    {impactStats.co2SavedKg} kg
                  </div>
                  <div className="text-xs text-[#71866f] mt-1">CO₂ Manufacturing Averted</div>
                </div>

                <div className="p-5 rounded-2xl border border-[#ded9cf] bg-[#f7f3eb]">
                  <div className="text-2xl font-bold font-serif-display text-[#d96f4b] tabular-nums">
                    {impactStats.neighborsCount}
                  </div>
                  <div className="text-xs text-[#71866f] mt-1">Active Verified Neighbors</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#ded9cf] bg-[#f7f3eb]/70 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#25332c] hover:bg-[#ded9cf]/40 rounded-xl transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
