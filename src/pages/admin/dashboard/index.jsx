import { Dashboard } from "@/components/layouts/dashboard";
import { withAuth } from "@/components/layouts/withAuth";

function DashboardPage() {
  return <Dashboard />;
}

export default withAuth(DashboardPage);
