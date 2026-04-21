import Breadcrumbs from "@/components/shared/Breadcrumbs";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="px-4 pt-3 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      {children}
    </div>
  );
}
