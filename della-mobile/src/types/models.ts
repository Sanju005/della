export type Service = {
  id: string;
  name: string;
  icon: string;
  description: string;
  accent: string;
};

export type Provider = {
  id: string;
  name: string;
  serviceIds: string[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  startingPrice: number;
  radiusKm: number;
  experienceYears: number;
  status: "Pending" | "Approved" | "Completed";
  bio: string;
  photos: string[];
  badges: string[];
};

export type Booking = {
  id: string;
  serviceName: string;
  providerName: string;
  schedule: string;
  status: "Pending" | "Approved" | "Completed";
  address: string;
  priceLabel: string;
};

export type ChatThread = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
};
