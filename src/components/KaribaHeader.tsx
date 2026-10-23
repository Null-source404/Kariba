import React from 'react';
import { Wrench, Plus, UserCheck, Inbox, Sparkles, ChevronDown } from 'lucide-react';
import { User } from '../types/kariba';
import { PRESET_USERS } from '../services/karibaStore';

interface Props {
  currentUser: User;
  onSelectUser: (user: User) => void;
  onOpenDashboard: (initialTab?: 'incoming' | 'borrowing') => void;
  onOpenCreateListing: () => void;
  onOpenHowItWorks: () => void;
  incomingPendingCount: number;
  activeBorrowsCount: number;
}

export function KaribaHeader({
  currentUser,
  onSelectUser,
  onOpenDashboard,
  onOpenCreateListing,
  onOpenHowItWorks,
  incomingPendingCount,
  activeBorrowsCount,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f3eb]/95 backdrop-blur-md border-b border-[#ded9cf]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#25332c] text-[#f7f3eb] flex items-center justify-center shadow-xs">
              <Wrench size={20} className="text-[#f0c96b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-[#25332c]">
                  Kariba
                </span>
                <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#71866f]/15 text-[#25332c]">
                  Gear Library
                </span>
              </div>
              <div className="text-[11px] text-[#71866f] font-medium hidden sm:block">
                Maplewood &amp; Elm District Shed
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#25332c]/80">
            <a
              href="#browse"
              className="hover:text-[#d96f4b] transition-colors whitespace-nowrap shrink-0"
            >
              Browse Gear
            </a>
            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="hover:text-[#d96f4b] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => onOpenDashboard('borrowing')}
              className="hover:text-[#d96f4b] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>My Borrows</span>
              {activeBorrowsCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-[#d96f4b] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeBorrowsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onOpenDashboard('incoming')}
              className="hover:text-[#d96f4b] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Inbox size={14} className="text-[#71866f]" />
              <span>Lender Inbox</span>
              {incomingPendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#d96f4b] text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {incomingPendingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: User Switcher & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* User Switcher Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#ded9cf] bg-white/70 hover:bg-white transition-all text-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#ded9cf]"
                />
                <div className="text-left hidden lg:block leading-tight">
                  <div className="font-semibold text-[#25332c] text-xs">{currentUser.name}</div>
                  <div className="text-[10px] text-[#71866f]">
                    {currentUser.id === 2 ? 'Lender (Marcus)' : 'Borrower (Sarah)'}
                  </div>
                </div>
                <ChevronDown size={14} className="text-[#25332c]/50" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-[#ded9cf] shadow-xl p-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold text-[#71866f] px-2.5 py-1 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                {PRESET_USERS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => onSelectUser(u)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      currentUser.id === u.id
                        ? 'bg-[#25332c] text-white font-semibold'
                        : 'text-[#25332c] hover:bg-[#f7f3eb]'
                    }`}
                  >
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                    <div className="text-left flex-1">
                      <div className="truncate">{u.name}</div>
                      <div className={`text-[10px] ${currentUser.id === u.id ? 'text-[#f0c96b]' : 'text-slate-400'}`}>
                        {u.id === 2 ? 'Lender / Tool Owner' : 'Neighbor / Maker'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* List an item button */}
            <button
              type="button"
              onClick={onOpenCreateListing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-all shadow-xs active:scale-[0.98] whitespace-nowrap"
            >
              <Plus size={15} className="text-[#f0c96b]" />
              <span>List Gear</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
