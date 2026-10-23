import React, { useState, useMemo } from 'react';
import { KaribaHeader } from './components/KaribaHeader';
import { HeroBanner } from './components/HeroBanner';
import { ListingCard } from './components/ListingCard';
import { BorrowModal } from './components/BorrowModal';
import { ListingDetailModal } from './components/ListingDetailModal';
import { DashboardModal } from './components/DashboardModal';
import { CreateListingModal } from './components/CreateListingModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { 
  karibaService, 
  CURRENT_NEIGHBORHOOD_LOCATION, 
  PRESET_USERS 
} from './services/karibaStore';
import { User, Listing, GearCategory, BorrowRequest } from './types/kariba';
import { 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Leaf, 
  DollarSign, 
  ArrowRight,
  Plus
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => karibaService.getCurrentUser());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<GearCategory>('all');
  const [radiusMiles, setRadiusMiles] = useState<number>(3.0);
  const [dataVersion, setDataVersion] = useState<number>(0);

  // Modals state
  const [selectedListingDetail, setSelectedListingDetail] = useState<Listing | null>(null);
  const [borrowListing, setBorrowListing] = useState<Listing | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [dashboardTab, setDashboardTab] = useState<'incoming' | 'borrowing' | 'myGear' | 'impact'>('incoming');
  const [isCreateListingOpen, setIsCreateListingOpen] = useState<boolean>(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);

  // Trigger re-render when data updates
  const refreshData = () => setDataVersion(v => v + 1);

  // Filtered listings using exact Haversine formula from services
  const nearbyListings = useMemo(() => {
    // depend on dataVersion
    void dataVersion;
    return karibaService.getNearbyListings(
      CURRENT_NEIGHBORHOOD_LOCATION.lat,
      CURRENT_NEIGHBORHOOD_LOCATION.lng,
      radiusMiles,
      selectedCategory,
      searchQuery
    );
  }, [radiusMiles, selectedCategory, searchQuery, dataVersion]);

  // Counts for notifications
  const incomingPendingCount = useMemo(() => {
    void dataVersion;
    return karibaService
      .getBorrowRequestsIncoming(currentUser.id)
      .filter((r) => r.status === 'pending').length;
  }, [currentUser.id, dataVersion]);

  const activeBorrowsCount = useMemo(() => {
    void dataVersion;
    return karibaService
      .getBorrowRequestsMine(currentUser.id)
      .filter((r) => r.status === 'approved' || r.status === 'active').length;
  }, [currentUser.id, dataVersion]);

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    karibaService.setCurrentUser(user);
    refreshData();
  };

  const handleOpenDashboard = (tab: 'incoming' | 'borrowing' | 'myGear' | 'impact' = 'incoming') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  const handleBorrowRequestSuccess = (request: BorrowRequest) => {
    refreshData();
  };

  const handleListingCreated = (listing: Listing) => {
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#25332c] flex flex-col font-sans selection:bg-[#25332c] selection:text-[#f7f3eb]">
      {/* 3-Zone Header */}
      <KaribaHeader
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        onOpenDashboard={handleOpenDashboard}
        onOpenCreateListing={() => setIsCreateListingOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        incomingPendingCount={incomingPendingCount}
        activeBorrowsCount={activeBorrowsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        {/* Hero Banner with Search & Radius Slider */}
        <HeroBanner
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          radiusMiles={radiusMiles}
          setRadiusMiles={setRadiusMiles}
          totalListingsCount={nearbyListings.length}
        />

        {/* Listings Section */}
        <section id="browse" className="pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-[#25332c]">
                Available Near You
              </h2>
              <p className="text-xs text-[#71866f] mt-0.5">
                Showing gear within {radiusMiles} miles of {CURRENT_NEIGHBORHOOD_LOCATION.name}
              </p>
            </div>

            {/* Quick Filter Pill Tag */}
            <div className="flex items-center gap-2 text-xs text-[#71866f]">
              <span>Viewing as:</span>
              <span className="font-bold text-[#25332c] bg-white px-2.5 py-1 rounded-lg border border-[#ded9cf]">
                {currentUser.name}
              </span>
            </div>
          </div>

          {/* Grid of Listings */}
          {nearbyListings.length === 0 ? (
            <div className="p-16 text-center rounded-3xl border border-dashed border-[#ded9cf] bg-white/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#71866f]/15 text-[#71866f] flex items-center justify-center mx-auto">
                <Sliders size={24} />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#25332c]">
                No gear found in this radius
              </h3>
              <p className="text-xs text-[#71866f] max-w-md mx-auto">
                Try widening your search radius slider above (e.g. up to 10 miles), clearing your search text, or list your own equipment for your neighbors!
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setRadiusMiles(10);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#25332c] bg-white border border-[#ded9cf] hover:bg-[#f7f3eb] rounded-xl transition-colors"
                >
                  Expand Radius to 10 Miles
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateListingOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-colors"
                >
                  + List an Item Now
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyListings.map((item) => (
                <ListingCard
                  key={item.id}
                  listing={item}
                  onSelect={(l) => setSelectedListingDetail(l)}
                  onBorrow={(l) => setBorrowListing(l)}
                  isOwner={item.owner_id === currentUser.id}
                />
              ))}
            </div>
          )}
        </section>

        {/* Community Proof & Why It Matters Strip */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#25332c] text-[#f7f3eb] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#f0c96b] flex items-center gap-2">
                <Leaf size={16} />
                <span>Zero-Waste Neighborhood Collective</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-bold leading-tight">
                The average power tool is used for just 13 minutes in its lifespan.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl font-sans">
                Kariba turns neighborhood garages into shared community sheds. Save hundreds on equipment you rarely use, meet your neighbors, and stop buying cheap throwaway tools that end up in landfills.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#25332c] bg-[#f0c96b] hover:bg-[#e0b754] rounded-xl transition-all shadow-xs"
                >
                  <span>See How It Works</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateListingOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all"
                >
                  <Plus size={14} />
                  <span>List Your Tools</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-[#f0c96b] tabular-nums">
                  $14,200+
                </div>
                <div className="text-xs font-medium text-white/70">Saved by Neighbors</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-[#71866f] tabular-nums">
                  1,840 kg
                </div>
                <div className="text-xs font-medium text-white/70">CO₂ Avoided</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-[#d96f4b] tabular-nums">
                  128
                </div>
                <div className="text-xs font-medium text-white/70">Verified Neighbors</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-serif-display text-white tabular-nums">
                  100%
                </div>
                <div className="text-xs font-medium text-white/70">Deposit Protected</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-[#ded9cf] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71866f]">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold text-sm text-[#25332c]">Kariba</span>
            <span>·</span>
            <span>Neighborhood Tool &amp; Gear Library</span>
            <span>·</span>
            <span>Maplewood &amp; Elm District</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsHowItWorksOpen(true)}
              className="hover:text-[#25332c] transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleOpenDashboard('impact')}
              className="hover:text-[#25332c] transition-colors"
            >
              Community Impact
            </button>
            <button
              type="button"
              onClick={() => {
                karibaService.resetDemoData();
                refreshData();
              }}
              className="hover:text-[#d96f4b] transition-colors"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Item Detail Modal */}
      <ListingDetailModal
        listing={selectedListingDetail}
        currentUser={currentUser}
        onClose={() => setSelectedListingDetail(null)}
        onOpenBorrow={(l) => setBorrowListing(l)}
      />

      {/* 2. Borrow Reservation Modal */}
      <BorrowModal
        listing={borrowListing}
        currentUser={currentUser}
        onClose={() => setBorrowListing(null)}
        onSuccess={handleBorrowRequestSuccess}
      />

      {/* 3. Dashboard Modal (Lender & Borrower) */}
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={currentUser}
        initialTab={dashboardTab}
        onRefreshData={refreshData}
      />

      {/* 4. Create Listing Modal */}
      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        currentUser={currentUser}
        onListingCreated={handleListingCreated}
      />

      {/* 5. How It Works Guide Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onOpenExplore={() => {
          setIsHowItWorksOpen(false);
          const el = document.getElementById('browse');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
