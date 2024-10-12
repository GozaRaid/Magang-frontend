import { EventPage } from "@/components/layouts/eventpage";
import { withAuth } from "@/components/layouts/withAuth";

export default function AdminHomepage() {
  return <EventPage />;
}

// export default withAuth(AdminHomepage);
