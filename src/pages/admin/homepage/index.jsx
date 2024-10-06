import { EventPage } from "@/components/layouts/eventpage";
import { withAuth } from "@/components/layouts/withAuth";

function AdminHomepage() {
  return <EventPage />;
}

export default withAuth(AdminHomepage);
