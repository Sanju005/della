import type { ReactNode } from "react";

export type MarketingService = {
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
};

export const services: MarketingService[] = [
  {
    title: "Home Services",
    description:
      "Book trusted cleaning, repairs, maintenance, and everyday home support in one place.",
    image: "/images/service-home.jpg",
    icon: (
      <path
        d="M4 10.75 12 4l8 6.75V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Beauty and Wellness",
    description:
      "Connect customers with self-care, salon, and wellness experiences that fit their schedule.",
    image: "/images/service-beauty.jpg",
    icon: (
      <>
        <path
          d="M12 5.25c1.85-2.12 5.2-2.36 7.14-.45 1.96 1.93 2 5.13.12 7.15L12 19.5l-7.26-7.55C2.86 9.93 2.9 6.73 4.86 4.8c1.95-1.91 5.29-1.67 7.14.45Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M12 8.5v4M10 10.5h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "Provider Opportunities",
    description:
      "Help service professionals reach more customers, manage jobs, and grow with better visibility.",
    image: "/images/service-provider.jpg",
    icon: (
      <>
        <path
          d="M8 9V7.5A2.5 2.5 0 0 1 10.5 5h3A2.5 2.5 0 0 1 16 7.5V9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M4.5 9.5h15v8.75A1.75 1.75 0 0 1 17.75 20H6.25A1.75 1.75 0 0 1 4.5 18.25Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M10 13h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "Babysitting",
    description:
      "Find dependable childcare support for busy parents who need trusted help at home.",
    image: "/images/service-babysitting.jpg",
    icon: (
      <>
        <circle
          cx="12"
          cy="8"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7.5 19c.55-2.75 2.27-4.5 4.5-4.5s3.95 1.75 4.5 4.5M8 6.5l-1.5-2M16 6.5l1.5-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "Tuition Classes",
    description:
      "Connect learners with academic support, coaching, and extra classes that fit their goals.",
    image: "/images/service-tuition.jpg",
    icon: (
      <>
        <path
          d="M3.5 8 12 4l8.5 4-8.5 4Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M6.5 9.75v4.5c0 1.52 2.46 2.75 5.5 2.75s5.5-1.23 5.5-2.75v-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "House Repair Works",
    description:
      "Arrange skilled technicians for plumbing, electrical fixes, carpentry, and urgent home repairs.",
    image: "/images/service-repair.jpg",
    icon: (
      <>
        <path
          d="m14.5 5.5 4 4-7.75 7.75-4.5 1 1-4.5z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M13.25 6.75 17.25 10.75M5 19h3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
];

export const benefits = [
  "Fast booking flow for customers who want reliable services without friction.",
  "A single ecosystem for customers, service providers, and internal operations.",
  "Admin oversight for customer care, managers, and platform operations teams.",
  "A scalable foundation for onboarding, bookings, services, and support workflows.",
];

export const companyPillars = [
  {
    title: "Trusted Access",
    description:
      "We make it easier for customers to discover useful services and book with confidence.",
  },
  {
    title: "Provider Growth",
    description:
      "We give service providers better visibility, better opportunities, and a cleaner digital journey.",
  },
  {
    title: "Operational Control",
    description:
      "We support internal teams with tools for bookings, services, providers, and customer care.",
  },
];

export const adminRoles = ["Admin", "Customer Care", "Manager"];
