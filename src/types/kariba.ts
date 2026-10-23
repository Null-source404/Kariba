export type BorrowStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'returned';

export type GearCategory = 'all' | 'diy' | 'garden' | 'outdoor' | 'cleaning' | 'media';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  neighborhood: string;
  rating: number;
  completedBorrows: number;
  joinedDate: string;
}

export interface Listing {
  id: number;
  owner_id: number;
  owner_name: string;
  owner_email: string;
  owner_avatar?: string;
  owner_rating?: number;
  title: string;
  description: string;
  category: GearCategory;
  lat: number;
  lng: number;
  price_per_hour: number;
  deposit_amount: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  location_name: string;
  distance?: number; // Calculated dynamically via Haversine formula
  condition: 'Like New' | 'Excellent' | 'Good' | 'Heavy Duty';
  includedItems?: string[];
}

export interface BorrowRequest {
  id: number;
  listing_id: number;
  listing_title: string;
  listing_image: string;
  listing_price_per_hour: number;
  deposit_amount: number;
  borrower_id: number;
  borrower_name: string;
  borrower_email: string;
  owner_id: number;
  owner_name: string;
  owner_email: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  total_cost: number;
  status: BorrowStatus;
  created_at: string;
}

export interface Review {
  id: number;
  author_id: number;
  author_name: string;
  subject_id: number;
  borrow_request_id: number;
  rating: number;
  comment: string;
  created_at: string;
}
