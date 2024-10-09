import { Hero } from "@/components/layouts/hero";
import { About } from "@/components/layouts/about";
import { Speakers } from "@/components/layouts/speakers";
import { EventSchedule } from "@/components/layouts/eventschedule";
import { LocationNavigation } from "@/components/layouts/locationnavigation";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Hero />
      <About />
      <Speakers />
      <EventSchedule />
      <LocationNavigation />
    </div>
  );
}
