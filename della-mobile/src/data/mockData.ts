import type { Booking, ChatThread, Provider, Service } from "../types/models";

export const services: Service[] = [
  {
    id: "chef",
    name: "Chef",
    icon: "chef-hat",
    description: "Private dining, meal prep, event cooking, and home chefs.",
    accent: "#EAFBF0",
  },
  {
    id: "tutor",
    name: "Tutor",
    icon: "school-outline",
    description: "Home tuition, exam coaching, language, and skills classes.",
    accent: "#EFF6FF",
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "water-outline",
    description: "Leaks, fittings, installations, and urgent repair support.",
    accent: "#F2F8FF",
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "flash-outline",
    description: "Wiring, lighting, sockets, appliances, and troubleshooting.",
    accent: "#FFF7E6",
  },
  {
    id: "driver",
    name: "Driver",
    icon: "car-sport-outline",
    description: "On-demand rides, private drivers, and errand transport.",
    accent: "#F8F5FF",
  },
  {
    id: "maid",
    name: "Maid",
    icon: "sparkles-outline",
    description: "Routine cleaning, deep cleaning, laundry, and home support.",
    accent: "#EFFFF7",
  },
  {
    id: "babysitter",
    name: "Baby Sitter",
    icon: "happy-outline",
    description: "Trusted childcare, after-school support, and family care.",
    accent: "#FFF0F6",
  },
];

export const providers: Provider[] = [
  {
    id: "provider-1",
    name: "Aina Home Care",
    serviceIds: ["maid", "babysitter"],
    rating: 4.9,
    reviewCount: 218,
    distanceKm: 2.4,
    startingPrice: 45,
    radiusKm: 18,
    experienceYears: 6,
    status: "Approved",
    bio: "Premium family support team offering childcare, cleaning, and recurring home assistance across Kuala Lumpur.",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
    ],
    badges: ["Verified team", "Top rated", "Fast response"],
  },
  {
    id: "provider-2",
    name: "Chef Harith",
    serviceIds: ["chef"],
    rating: 4.8,
    reviewCount: 134,
    distanceKm: 4.1,
    startingPrice: 120,
    radiusKm: 25,
    experienceYears: 9,
    status: "Completed",
    bio: "Personal chef for family dinners, healthy weekly meal plans, and private events with customizable menus.",
    photos: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    ],
    badges: ["Event specialist", "Halal menu", "Meal prep"],
  },
  {
    id: "provider-3",
    name: "Tutor Maya",
    serviceIds: ["tutor"],
    rating: 4.7,
    reviewCount: 96,
    distanceKm: 3.5,
    startingPrice: 55,
    radiusKm: 20,
    experienceYears: 7,
    status: "Approved",
    bio: "Experienced tutor for maths, science, and English with online and in-home lessons for primary and secondary students.",
    photos: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80"
    ],
    badges: ["Online classes", "Exam prep", "Parent favourite"],
  },
  {
    id: "provider-4",
    name: "FixPro Electrical",
    serviceIds: ["electrician", "plumber"],
    rating: 4.6,
    reviewCount: 187,
    distanceKm: 5.2,
    startingPrice: 70,
    radiusKm: 30,
    experienceYears: 11,
    status: "Pending",
    bio: "Reliable technicians for emergency visits, installations, maintenance, and full home troubleshooting jobs.",
    photos: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=80"
    ],
    badges: ["24/7 visits", "Licensed", "Equipment ready"],
  },
];

export const customerBookings: Booking[] = [
  {
    id: "booking-1001",
    serviceName: "Weekly Home Cleaning",
    providerName: "Aina Home Care",
    schedule: "Today, 3:00 PM",
    status: "Approved",
    address: "Mont Kiara, Kuala Lumpur",
    priceLabel: "From RM 85",
  },
  {
    id: "booking-1002",
    serviceName: "Maths Tuition",
    providerName: "Tutor Maya",
    schedule: "Tomorrow, 6:30 PM",
    status: "Pending",
    address: "Damansara Heights",
    priceLabel: "RM 55 / hour",
  },
  {
    id: "booking-1003",
    serviceName: "Dinner for 6",
    providerName: "Chef Harith",
    schedule: "Fri, 7:00 PM",
    status: "Completed",
    address: "Bangsar South",
    priceLabel: "RM 420 total",
  },
];

export const customerChats: ChatThread[] = [
  {
    id: "chat-1",
    name: "Aina Home Care",
    lastMessage: "We’ll arrive 10 minutes early with cleaning supplies.",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: "chat-2",
    name: "Tutor Maya",
    lastMessage: "Can you share the current school syllabus?",
    timestamp: "35m ago",
    unread: 0,
  },
  {
    id: "chat-3",
    name: "Chef Harith",
    lastMessage: "Dessert menu has been added to your package.",
    timestamp: "Yesterday",
    unread: 0,
  },
];

export const providerChats: ChatThread[] = [
  {
    id: "provider-chat-1",
    name: "Sara Abdullah",
    lastMessage: "Can you confirm if parking is available in the condo?",
    timestamp: "Just now",
    unread: 1,
  },
  {
    id: "provider-chat-2",
    name: "Rehaan Family",
    lastMessage: "We’d like to keep the same weekly schedule.",
    timestamp: "18m ago",
    unread: 0,
  },
  {
    id: "provider-chat-3",
    name: "Della Support",
    lastMessage: "Your latest document review is in progress.",
    timestamp: "Yesterday",
    unread: 0,
  },
];

export const providerBookings: Booking[] = [
  {
    id: "provider-booking-1",
    serviceName: "Deep Cleaning Visit",
    providerName: "Sara Abdullah",
    schedule: "Today, 2:00 PM",
    status: "Approved",
    address: "KL Eco City",
    priceLabel: "RM 150 / job",
  },
  {
    id: "provider-booking-2",
    serviceName: "After-school Babysitting",
    providerName: "Rehaan Family",
    schedule: "Tomorrow, 4:00 PM",
    status: "Pending",
    address: "TTDI",
    priceLabel: "RM 30 / hour",
  },
  {
    id: "provider-booking-3",
    serviceName: "Weekend Condo Support",
    providerName: "The Wongs",
    schedule: "Sat, 10:00 AM",
    status: "Completed",
    address: "Bukit Bintang",
    priceLabel: "RM 90 / visit",
  },
];
