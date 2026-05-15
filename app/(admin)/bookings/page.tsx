import { PlaceholderTable } from "@/components/placeholder-table";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Bookings
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Booking operations
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          A placeholder command view for scheduling, reassignment, and exception
          handling.
        </p>
      </div>

      <PlaceholderTable
        title="Recent bookings"
        description="Static sample data for the initial admin shell."
        columns={["Booking ID", "Service", "Customer", "Provider", "Status"]}
        rows={[
          ["BK-24018", "Home Cleaning", "Aina Rahman", "CleanCare", "Scheduled"],
          ["BK-24017", "Aircond Repair", "Nur Amal", "FixPro", "Pending"],
          ["BK-24016", "Pet Grooming", "M. Karim", "PetEase", "Completed"],
          ["BK-24015", "Massage", "Sara Lee", "Glow Spa", "Cancelled"],
        ]}
      />
    </div>
  );
}
