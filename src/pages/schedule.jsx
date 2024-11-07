import { EventSchedule } from "@/components/layouts/eventschedule";
import { PararelSchedule } from "@/components/layouts/pararel-schedule";
import { useFetchScheduleSection } from "@/features/dashboard/schedule/useFetchScheduleSection";
import { useFetchPararelSession } from "@/features/dashboard/pararelSession/useFetchPararelSession";
import LoadingScreen from "@/components/layouts/loadingScreen";

export default function Schedule() {
  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError,
  } = useFetchScheduleSection();
  const {
    data: pararelSession,
    isLoading: pararelSessionLoading,
    error: pararelSessionError,
  } = useFetchPararelSession();

  if (scheduleLoading || pararelSessionLoading) {
    return <LoadingScreen />;
  }

  if (scheduleError || pararelSessionError) {
    return <div>Error: {scheduleError.message}</div>;
  }

  return (
    <>
      <EventSchedule scheduleData={schedule} />
      <PararelSchedule parallelSessions={pararelSession} />
    </>
  );
}
