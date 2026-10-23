import { User, Listing, BorrowRequest, GearCategory, BorrowStatus } from '../types/kariba';

// Default center coordinates (e.g. Maplewood neighborhood)
export const CURRENT_NEIGHBORHOOD_LOCATION = {
  name: 'Maplewood & Elm District',
  lat: 37.7749,
  lng: -122.4194,
};

export const PRESET_USERS: User[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.j@neighborhood.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    neighborhood: 'Maplewood North',
    rating: 4.95,
    completedBorrows: 14,
    joinedDate: 'Joined March 2024',
  },
  {
    id: 2,
    name: 'Marcus Vance',
    email: 'marcus.v@neighborhood.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    neighborhood: 'Elmwood Green',
    rating: 5.0,
    completedBorrows: 32,
    joinedDate: 'Joined January 2023',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    email: 'elena.r@neighborhood.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    neighborhood: 'Oak Hill West',
    rating: 4.9,
    completedBorrows: 19,
    joinedDate: 'Joined July 2023',
  },
];

const INITIAL_LISTINGS: Listing[] = [
  {
    id: 101,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'DeWalt 20V Max XR Brushless Hammer Drill & Driver Set',
    description: 'Heavy duty hammer drill with 2x 5Ah batteries, fast charger, and 40-piece masonry/wood drill bit index. Perfect for mounting TVs, hanging shelves, or concrete anchors.',
    category: 'diy',
    lat: 37.7780,
    lng: -122.4170,
    price_per_hour: 4.5,
    deposit_amount: 40.0,
    image_url: '/src/assets/images/cordless_power_drill_1792753518315.jpg',
    is_active: true,
    created_at: '2026-03-10T10:00:00Z',
    location_name: 'Elmwood Green (0.3 mi)',
    condition: 'Excellent',
    includedItems: ['2x 5Ah 20V Batteries', 'Rapid Charger', 'Masonry Bit Set', 'ToughSystem Case'],
  },
  {
    id: 102,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'Kärcher K4 Premium Electric Pressure Washer (1900 PSI)',
    description: 'Quiet electric pressure washer with dirt-blaster nozzle, vario-power wand, and surface cleaner disc. Great for cleaning driveways, wooden decks, siding, or washing muddy cars.',
    category: 'cleaning',
    lat: 37.7795,
    lng: -122.4150,
    price_per_hour: 6.0,
    deposit_amount: 60.0,
    image_url: '/src/assets/images/pressure_washer_1792753518683.jpg',
    is_active: true,
    created_at: '2026-03-12T14:30:00Z',
    location_name: 'Elmwood Green (0.5 mi)',
    condition: 'Like New',
    includedItems: ['25ft High-Pressure Hose', 'Surface Deck Cleaner', 'Soap Dispenser Nozzle'],
  },
  {
    id: 103,
    owner_id: 3,
    owner_name: 'Elena Rostova',
    owner_email: 'elena.r@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_rating: 4.9,
    title: 'Honda 21" Self-Propelled Gas Lawn Mower with Mulch Bag',
    description: 'Easy-start commercial grade 4-stroke engine. Twin blades for ultra-clean mulching or bagging. Full tank of fresh ethanol-free gas provided.',
    category: 'garden',
    lat: 37.7710,
    lng: -122.4230,
    price_per_hour: 7.5,
    deposit_amount: 75.0,
    image_url: '/src/assets/images/lawn_mower_1792753520146.jpg',
    is_active: true,
    created_at: '2026-03-15T09:15:00Z',
    location_name: 'Oak Hill West (0.6 mi)',
    condition: 'Good',
    includedItems: ['Grass Catcher Bag', 'Ear Protection Muffs', 'Safety Glasses'],
  },
  {
    id: 104,
    owner_id: 3,
    owner_name: 'Elena Rostova',
    owner_email: 'elena.r@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_rating: 4.9,
    title: 'Big Agnes Copper Spur HV UL4 Ultralight 4-Person Tent',
    description: 'Premium lightweight backpacking tent with dual vestibules, waterproof rainfly, and custom ground footprint. Super fast 5-minute aluminum pole pitch.',
    category: 'outdoor',
    lat: 37.7725,
    lng: -122.4245,
    price_per_hour: 6.5,
    deposit_amount: 80.0,
    image_url: '/src/assets/images/camping_dome_tent_1792753520333.jpg',
    is_active: true,
    created_at: '2026-03-18T16:00:00Z',
    location_name: 'Oak Hill West (0.7 mi)',
    condition: 'Like New',
    includedItems: ['Custom Ground Footprint', 'DAC Aluminum Stakes', 'Gear Loft Net', 'Compression Sack'],
  },
  {
    id: 105,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'Bissell SpotClean Pro Commercial Carpet & Couch Extractor',
    description: 'High-suction heated stain remover for carpets, car upholstery, stairs, and pet accidents. Comes with deep-clean stair tool and bottle of pet stain formula.',
    category: 'cleaning',
    lat: 37.7765,
    lng: -122.4180,
    price_per_hour: 5.0,
    deposit_amount: 45.0,
    image_url: '/src/assets/images/carpet_cleaner_1792753544805.jpg',
    is_active: true,
    created_at: '2026-03-20T11:20:00Z',
    location_name: 'Elmwood Green (0.2 mi)',
    condition: 'Excellent',
    includedItems: ['6-inch Tough Stain Tool', 'Crevice Spray Wand', 'Cleaning Solution'],
  },
  {
    id: 106,
    owner_id: 3,
    owner_name: 'Elena Rostova',
    owner_email: 'elena.r@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_rating: 4.9,
    title: 'Stihl HSA 56 Cordless 24" Hedge Trimmer with 2x AK Batteries',
    description: 'Double-sided laser-cut diamond ground blades. Super lightweight and quiet without gas fumes. Prunes branches up to 3/4" thick cleanly.',
    category: 'garden',
    lat: 37.7705,
    lng: -122.4210,
    price_per_hour: 5.5,
    deposit_amount: 50.0,
    image_url: '/src/assets/images/hedge_trimmer_1792753545749.jpg',
    is_active: true,
    created_at: '2026-03-22T08:45:00Z',
    location_name: 'Oak Hill West (0.6 mi)',
    condition: 'Heavy Duty',
    includedItems: ['2x Stihl AK 20 Lithium Batteries', 'AL 101 Charger', 'Blade Scabbard Guard'],
  },
  {
    id: 107,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'ViewSonic 1080p Cinema Projector & 120" Foldable Stand Screen',
    description: 'Bright 3,800 lumen cinema projector with HDMI and Apple TV/Chromecast adapter, plus an outdoor 120" wrinkle-free screen on aluminum tripod. Awesome for backyard movie nights!',
    category: 'media',
    lat: 37.7770,
    lng: -122.4165,
    price_per_hour: 7.0,
    deposit_amount: 70.0,
    image_url: '/src/assets/images/cinema_projector_1792753546301.jpg',
    is_active: true,
    created_at: '2026-03-24T17:10:00Z',
    location_name: 'Elmwood Green (0.4 mi)',
    condition: 'Excellent',
    includedItems: ['120" Foldable Screen & Stand', '50ft Outdoor Extension Cord', 'HDMI & Aux Cables'],
  },
  {
    id: 108,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'Festool TS 55 FEQ Plunge Cut Track Saw with 55" Guide Rail',
    description: 'Woodworker grade splinter-free precision plunge cut saw. Cuts plywood sheets, butcher block countertops, and doors dead straight with zero tear-out.',
    category: 'diy',
    lat: 37.7788,
    lng: -122.4158,
    price_per_hour: 9.0,
    deposit_amount: 110.0,
    image_url: '/src/assets/images/track_saw_1792753546854.jpg',
    is_active: true,
    created_at: '2026-03-26T12:00:00Z',
    location_name: 'Elmwood Green (0.5 mi)',
    condition: 'Like New',
    includedItems: ['55" FS 1400/2 Guide Rail', 'Fine Tooth 48T Blade', 'Rail Clamps', 'Systainer Box'],
  },
  {
    id: 109,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'Werner 22-Foot Multi-Position Telescoping Aluminum Ladder (375 lb capacity)',
    description: 'Converts easily into 5 different configurations: extension ladder, step ladder, stairway ladder, 90-degree wall ladder, and scaffolding base. Ideal for cleaning 2nd-story gutters or tree pruning.',
    category: 'diy',
    lat: 37.7775,
    lng: -122.4185,
    price_per_hour: 5.0,
    deposit_amount: 50.0,
    image_url: '/src/assets/images/aluminum_ladder_1792753520846.jpg',
    is_active: true,
    created_at: '2026-03-28T09:00:00Z',
    location_name: 'Elmwood Green (0.3 mi)',
    condition: 'Heavy Duty',
    includedItems: ['Leg Leveler Extensions', 'Rung Tool Tray Caddy', 'Rubber Foot Pads'],
  },
  {
    id: 110,
    owner_id: 3,
    owner_name: 'Elena Rostova',
    owner_email: 'elena.r@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_rating: 4.9,
    title: 'Gorilla 1,200 lb Heavy-Duty Poly Garden Dump Cart & Wheelbarrow',
    description: 'Quick-release dumping mechanism with 13-inch pneumatic all-terrain turf tires. Hauls up to 1,200 lbs of topsoil, mulch, river rock, or firewood without tipping.',
    category: 'garden',
    lat: 37.7735,
    lng: -122.4225,
    price_per_hour: 4.0,
    deposit_amount: 35.0,
    image_url: '/src/assets/images/garden_dump_cart_1792753547458.jpg',
    is_active: true,
    created_at: '2026-03-29T11:30:00Z',
    location_name: 'Oak Hill West (0.5 mi)',
    condition: 'Excellent',
    includedItems: ['Towing Hitch for Lawn Tractor', 'Removable Liner Mat'],
  },
  {
    id: 111,
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_rating: 5.0,
    title: 'DeWalt 20V Max Brushless 4-1/2" Cordless Angle Grinder Kit',
    description: 'Paddle switch angle grinder with kickback brake. Includes diamond masonry blade for brick/paver cutting, metal cutoff discs, and wire cup brush for rust removal.',
    category: 'diy',
    lat: 37.7760,
    lng: -122.4175,
    price_per_hour: 4.5,
    deposit_amount: 40.0,
    image_url: '/src/assets/images/angle_grinder_1792753547471.jpg',
    is_active: true,
    created_at: '2026-03-30T15:20:00Z',
    location_name: 'Elmwood Green (0.4 mi)',
    condition: 'Good',
    includedItems: ['Diamond Masonry Cutting Wheel', 'Flap Sanding Discs', 'Full Face Shield'],
  },
  {
    id: 112,
    owner_id: 3,
    owner_name: 'Elena Rostova',
    owner_email: 'elena.r@neighborhood.org',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_rating: 4.9,
    title: 'Lifetime 6-Foot Commercial Fold-in-Half Banquet Table & 8 Chair Set',
    description: 'High-density UV-protected polyethylene table with rust-resistant steel folding legs. Lightweight and weather-resistant, perfect for birthday parties, yard sales, or neighborhood BBQ gatherings.',
    category: 'media',
    lat: 37.7718,
    lng: -122.4238,
    price_per_hour: 5.0,
    deposit_amount: 45.0,
    image_url: '/src/assets/images/folding_table_1792753547129.jpg',
    is_active: true,
    created_at: '2026-03-31T10:15:00Z',
    location_name: 'Oak Hill West (0.6 mi)',
    condition: 'Like New',
    includedItems: ['2x 6ft Folding Tables', '8x White Padded Folding Chairs', 'Carry Straps'],
  },
];

const INITIAL_REQUESTS: BorrowRequest[] = [
  {
    id: 1,
    listing_id: 102,
    listing_title: 'Kärcher K4 Premium Electric Pressure Washer (1900 PSI)',
    listing_image: '/src/assets/images/pressure_washer_1792753518683.jpg',
    listing_price_per_hour: 6.0,
    deposit_amount: 60.0,
    borrower_id: 1,
    borrower_name: 'Sarah Jenkins',
    borrower_email: 'sarah.j@neighborhood.org',
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    start_date: '2026-10-24T09:00',
    end_date: '2026-10-24T17:00',
    total_hours: 8,
    total_cost: 48.0,
    status: 'approved',
    created_at: '2026-10-22T14:00:00Z',
  },
  {
    id: 2,
    listing_id: 101,
    listing_title: 'DeWalt 20V Max XR Brushless Hammer Drill & Driver Set',
    listing_image: '/src/assets/images/cordless_power_drill_1792753518315.jpg',
    listing_price_per_hour: 4.5,
    deposit_amount: 40.0,
    borrower_id: 1,
    borrower_name: 'Sarah Jenkins',
    borrower_email: 'sarah.j@neighborhood.org',
    owner_id: 2,
    owner_name: 'Marcus Vance',
    owner_email: 'marcus.v@neighborhood.org',
    start_date: '2026-10-26T10:00',
    end_date: '2026-10-26T14:00',
    total_hours: 4,
    total_cost: 18.0,
    status: 'pending',
    created_at: '2026-10-23T01:30:00Z',
  },
];

// Exact Haversine formula calculation (matching the user's listings.js SQL formula)
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth radius in statute miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

class KaribaDataService {
  private listingsKey = 'kariba_listings_v3';
  private requestsKey = 'kariba_requests_v3';
  private currentUserKey = 'kariba_current_user_v3';

  constructor() {
    this.init();
  }

  private init() {
    const existing = localStorage.getItem(this.listingsKey);
    if (!existing || JSON.parse(existing).length < INITIAL_LISTINGS.length) {
      localStorage.setItem(this.listingsKey, JSON.stringify(INITIAL_LISTINGS));
    }
    if (!localStorage.getItem(this.requestsKey)) {
      localStorage.setItem(this.requestsKey, JSON.stringify(INITIAL_REQUESTS));
    }
    if (!localStorage.getItem(this.currentUserKey)) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(PRESET_USERS[0]));
    }
  }

  getCurrentUser(): User {
    const raw = localStorage.getItem(this.currentUserKey);
    return raw ? JSON.parse(raw) : PRESET_USERS[0];
  }

  setCurrentUser(user: User) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getListings(): Listing[] {
    const raw = localStorage.getItem(this.listingsKey);
    return raw ? JSON.parse(raw) : INITIAL_LISTINGS;
  }

  getNearbyListings(
    userLat: number,
    userLng: number,
    maxRadiusMiles: number = 10,
    category: GearCategory = 'all',
    searchQuery: string = ''
  ): Listing[] {
    const all = this.getListings();
    const query = searchQuery.trim().toLowerCase();

    return all
      .filter((item) => item.is_active)
      .map((item) => {
        const dist = calculateHaversineDistance(userLat, userLng, item.lat, item.lng);
        return { ...item, distance: dist };
      })
      .filter((item) => {
        // Distance radius filter
        if (item.distance! > maxRadiusMiles) return false;
        // Category filter
        if (category !== 'all' && item.category !== category) return false;
        // Text query search
        if (query) {
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchLoc = item.location_name.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc && !matchLoc) return false;
        }
        return true;
      })
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }

  getMyListings(userId: number): (Listing & { pendingCount: number })[] {
    const all = this.getListings();
    const requests = this.getRequests();

    return all
      .filter((l) => l.owner_id === userId)
      .map((l) => {
        const pendingCount = requests.filter(
          (r) => r.listing_id === l.id && r.status === 'pending'
        ).length;
        return { ...l, pendingCount };
      });
  }

  getListingById(id: number): Listing | undefined {
    const all = this.getListings();
    return all.find((l) => l.id === id);
  }

  createListing(userId: number, data: Partial<Listing>): Listing {
    const all = this.getListings();
    const user = PRESET_USERS.find((u) => u.id === userId) || this.getCurrentUser();

    const newListing: Listing = {
      id: Date.now(),
      owner_id: user.id,
      owner_name: user.name,
      owner_email: user.email,
      owner_avatar: user.avatar,
      owner_rating: user.rating,
      title: data.title || 'Untitled Tool',
      description: data.description || 'Available for neighborhood borrowing.',
      category: data.category || 'diy',
      lat: data.lat || CURRENT_NEIGHBORHOOD_LOCATION.lat,
      lng: data.lng || CURRENT_NEIGHBORHOOD_LOCATION.lng,
      price_per_hour: Number(data.price_per_hour) || 5.0,
      deposit_amount: Number(data.deposit_amount) || 40.0,
      image_url: data.image_url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      location_name: data.location_name || user.neighborhood,
      condition: data.condition || 'Excellent',
      includedItems: data.includedItems || ['Operational manual', 'Safety protection'],
    };

    all.unshift(newListing);
    localStorage.setItem(this.listingsKey, JSON.stringify(all));
    return newListing;
  }

  getRequests(): BorrowRequest[] {
    const raw = localStorage.getItem(this.requestsKey);
    return raw ? JSON.parse(raw) : INITIAL_REQUESTS;
  }

  getBorrowRequestsMine(userId: number): BorrowRequest[] {
    const all = this.getRequests();
    return all
      .filter((r) => r.borrower_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getBorrowRequestsIncoming(ownerId: number): BorrowRequest[] {
    const all = this.getRequests();
    return all
      .filter((r) => r.owner_id === ownerId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Double-booking validation matching borrow_requests.js SQL:
  // WHERE listing_id = ? AND status IN ('approved', 'active') AND start_date < ? AND end_date > ?
  createBorrowRequest(
    borrower: User,
    listingId: number,
    startDateStr: string,
    endDateStr: string
  ): { success: boolean; error?: string; request?: BorrowRequest } {
    const listing = this.getListingById(listingId);
    if (!listing) return { success: false, error: 'Listing not found.' };

    if (listing.owner_id === borrower.id) {
      return { success: false, error: 'You cannot borrow your own listing.' };
    }

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return { success: false, error: 'End time must be after start time.' };
    }

    // Check collision with existing approved or active requests
    const all = this.getRequests();
    const hasOverlap = all.some((r) => {
      if (r.listing_id !== listingId) return false;
      if (r.status !== 'approved' && r.status !== 'active') return false;
      const rStart = new Date(r.start_date);
      const rEnd = new Date(r.end_date);
      return start < rEnd && end > rStart;
    });

    if (hasOverlap) {
      return {
        success: false,
        error: 'This item is already reserved or active for those hours.',
      };
    }

    const hours = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
    const totalCost = Number((hours * listing.price_per_hour).toFixed(2));

    const newRequest: BorrowRequest = {
      id: Date.now(),
      listing_id: listing.id,
      listing_title: listing.title,
      listing_image: listing.image_url,
      listing_price_per_hour: listing.price_per_hour,
      deposit_amount: listing.deposit_amount,
      borrower_id: borrower.id,
      borrower_name: borrower.name,
      borrower_email: borrower.email,
      owner_id: listing.owner_id,
      owner_name: listing.owner_name,
      owner_email: listing.owner_email,
      start_date: startDateStr,
      end_date: endDateStr,
      total_hours: hours,
      total_cost: totalCost,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    all.unshift(newRequest);
    localStorage.setItem(this.requestsKey, JSON.stringify(all));
    return { success: true, request: newRequest };
  }

  // State transitions matching user's backend allowedNext:
  // pending -> approved | rejected
  // approved -> active
  // active -> returned
  updateBorrowRequestStatus(
    requestId: number,
    ownerId: number,
    nextStatus: BorrowStatus
  ): { success: boolean; error?: string; request?: BorrowRequest } {
    const all = this.getRequests();
    const reqIndex = all.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) return { success: false, error: 'Borrow request not found.' };

    const req = all[reqIndex];
    if (req.owner_id !== ownerId) {
      return { success: false, error: 'Only the listing owner can update this request.' };
    }

    const allowedNext: Record<BorrowStatus, BorrowStatus[]> = {
      pending: ['approved', 'rejected'],
      approved: ['active'],
      active: ['returned'],
      rejected: [],
      returned: [],
    };

    if (!allowedNext[req.status]?.includes(nextStatus)) {
      return {
        success: false,
        error: `Cannot change a ${req.status} request to ${nextStatus}.`,
      };
    }

    all[reqIndex].status = nextStatus;
    localStorage.setItem(this.requestsKey, JSON.stringify(all));
    return { success: true, request: all[reqIndex] };
  }

  // Calculate neighborhood savings & ecological metrics
  getCommunityImpact() {
    const requests = this.getRequests();
    const approvedOrReturned = requests.filter(
      (r) => r.status === 'approved' || r.status === 'active' || r.status === 'returned'
    );

    // Approximate: Average new power tool / equipment purchase price = $220
    const dollarsSaved = approvedOrReturned.length * 175;
    // Approximate: Average manufacturing footprint avoided = 28kg CO2
    const co2SavedKg = approvedOrReturned.length * 28;
    const totalTransactions = approvedOrReturned.length;

    return {
      dollarsSaved,
      co2SavedKg,
      totalTransactions,
      neighborsCount: 128,
    };
  }

  resetDemoData() {
    localStorage.setItem(this.listingsKey, JSON.stringify(INITIAL_LISTINGS));
    localStorage.setItem(this.requestsKey, JSON.stringify(INITIAL_REQUESTS));
  }
}

export const karibaService = new KaribaDataService();
