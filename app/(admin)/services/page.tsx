import { PlaceholderTable } from "@/components/placeholder-table";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Services
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Service catalog
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Placeholder management surface for service categories, pricing models,
          and availability rules.
        </p>
      </div>

      <PlaceholderTable
        title="Service categories"
        description="Static catalog rows to shape the admin experience before data integration."
        columns={["Category", "Sub-services", "Regions", "Lead owner", "Status"]}
        rows={[
          ["Beauty", "12", "National", "Customer Care", "Live"],
          ["Cleaning", "9", "National", "Operations", "Live"],
          ["Home Repair", "15", "Selected", "Manager", "Draft"],
          ["Pet Care", "6", "Urban only", "Admin", "Live"],
        ]}
      />
    </div>
  );
}
