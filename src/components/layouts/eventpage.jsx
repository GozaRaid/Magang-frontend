"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeroSection } from "@/components/component/heroAdminSection";
import { AboutSection } from "@/components/component/aboutAdminSection";
import { ScheduleSection } from "@/components/component/scheduleAdminSection";
import { SpeakersSection } from "@/components/component/speakerAdminSection";
import { LocationSection } from "@/components/component/locationAdminSection";
import { useEventManagement } from "./useEventManagement";
import { Trash2, Edit2, Save } from "lucide-react";

export function EventPage() {
  const {
    events,
    selectedEvent,
    selectedEventId,
    editMode,
    handleEventChange,
    handleInputChange,
    handleDateChange,
    handleSave,
    handleDiscardChanges,
    handleDelete,
    setEditMode,
    setEvents,
  } = useEventManagement();

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Event Selection Dropdown
      <div className="mb-8">
        <Select value={selectedEventId} onValueChange={handleEventChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an event" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <HeroSection
        event={selectedEvent}
        editMode={editMode}
        handleInputChange={handleInputChange}
      />
      <AboutSection
        event={selectedEvent}
        editMode={editMode}
        handleInputChange={handleInputChange}
      />
      <ScheduleSection
        event={selectedEvent}
        editMode={editMode}
        setEvents={setEvents}
        selectedEventId={selectedEventId}
        handleDateChange={handleDateChange}
      />
      <SpeakersSection
        event={selectedEvent}
        editMode={editMode}
        setEvents={setEvents}
        selectedEventId={selectedEventId}
        handleInputChange={handleInputChange}
      />
      <LocationSection
        event={selectedEvent}
        editMode={editMode}
        handleInputChange={handleInputChange}
      />

      {/* Edit/Save/Delete Buttons */}
      <div className="flex justify-end space-x-4">
        {editMode ? (
          <>
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600"
            >
              <Save className="mr-2" size={16} />
              Save Changes
            </Button>

            <Button
              onClick={handleDiscardChanges}
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="mr-2" size={16} />
              Discard Changes
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Edit2 className="mr-2" size={16} />
            Edit Event
          </Button>
        )}
        {/* <Button onClick={handleDelete} variant="destructive">
          <Trash2 className="mr-2" size={16} />
          Delete Event
        </Button> */}
      </div>
    </div>
  );
}
