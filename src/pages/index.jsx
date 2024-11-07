import { Hero } from "@/components/layouts/hero";
import { About } from "@/components/layouts/about";
import { Speakers } from "@/components/layouts/speakers";
import { EventSchedule } from "@/components/layouts/eventschedule";
import { LocationNavigation } from "@/components/layouts/locationnavigation";
import { useFetchScheduleSection } from "@/features/dashboard/schedule/useFetchScheduleSection";
import { useFetchHeroSection } from "@/features/dashboard/hero/useFetchHeroSection";
import { useFetchScheduleDate } from "@/features/dashboard/schedule/useFetchScheduleDate";
import { useFetchAboutSection } from "@/features/dashboard/about/useFetchAboutSection";
import { useFetchLocationSection } from "@/features/dashboard/location/useFetchLocationSection";
import { useFetchSpeakersSection } from "@/features/dashboard/speakers/useFetchSpeakersSection";
import LoadingScreen from "@/components/layouts/loadingScreen";

export default function Home() {
  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError,
  } = useFetchScheduleSection();
  const {
    data: hero,
    isLoading: heroLoading,
    error: heroError,
  } = useFetchHeroSection();
  const {
    data: scheduleDateCount,
    isLoading: scheduleDateLoading,
    error: scheduleDateError,
  } = useFetchScheduleDate();
  const {
    data: aboutData,
    isLoading: aboutLoading,
    error: aboutError,
  } = useFetchAboutSection();
  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
  } = useFetchLocationSection();
  const {
    data: speakersData,
    isLoading: speakersLoading,
    error: speakersError,
  } = useFetchSpeakersSection();

  if (
    scheduleLoading ||
    heroLoading ||
    scheduleDateLoading ||
    aboutLoading ||
    locationLoading ||
    speakersLoading
  ) {
    return <LoadingScreen />;
  }

  if (
    scheduleError ||
    heroError ||
    scheduleDateError ||
    aboutError ||
    locationError ||
    speakersError
  ) {
    return <div>Error: {scheduleError.message}</div>;
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Hero heroData={hero} scheduleDateCount={scheduleDateCount} />
      <About aboutData={aboutData} scheduleDateCount={scheduleDateCount} />
      <Speakers speakersData={speakersData} />
      <EventSchedule scheduleData={schedule} />
      <LocationNavigation locationData={locationData} />
    </div>
  );
}
