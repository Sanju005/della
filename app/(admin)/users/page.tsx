import { PlaceholderTable } from "@/components/placeholder-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Users</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">User management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Placeholder workspace for staff, customer, and account lifecycle
          management.
        </p>
      </div>

      <PlaceholderTable
        title="All users"
        description="Connect this table to your Supabase profiles or auth mirror later."
        columns={["Name", "Role", "Email", "Status", "Last active"]}
        rows={[
          ["Alya Zain", "Admin", "alya@della.app", "Active", "2 mins ago"],
          ["Irfan Hakim", "Manager", "irfan@della.app", "Active", "24 mins ago"],
          ["Dana Lim", "Customer Care", "dana@della.app", "Invited", "Pending"],
          ["Zul Amir", "IT / Super Admin", "zul@della.app", "Active", "5 mins ago"],
        ]}
      />
    </div>
  );
}
