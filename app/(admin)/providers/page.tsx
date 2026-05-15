import { PlaceholderTable } from "@/components/placeholder-table";

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Providers
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Provider directory
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Track onboarding, verification, and performance once backend data is
          added.
        </p>
      </div>

      <PlaceholderTable
        title="Provider queue"
        description="This view is ready for provider records, operational status, and verification tags."
        columns={["Provider", "Category", "Region", "Verification", "Status"]}
        rows={[
          ["Glow Spa", "Beauty", "Klang Valley", "Verified", "Active"],
          ["FixPro", "Home Repair", "Johor", "Pending", "Review"],
          ["PetEase", "Pet Care", "Penang", "Verified", "Paused"],
          ["CleanCare", "Cleaning", "Kedah", "Submitted", "Review"],
        ]}
      />
    </div>
  );
}
