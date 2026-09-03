export interface ClinicInfo {
  name: string;
  type: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  phoneDisplay: string;
  website: string;
  status: string;
  address: {
    line1: string;
    sector: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

export interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface FeaturedContentItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  highlight: string;
  stats: string;
  image: string;
}

export interface DecisionItem {
  id: string;
  category: string;
  primary: string;
  secondary?: string;
  details: string;
}
