import { useState, useEffect } from "react";
import { initialEvents } from "./initialEvent";

export function useEventManagement() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [editMode, setEditMode] = useState(false);
  const [originalEvent, setOriginalEvent] = useState(null);

  const selectedEvent =
    events.find((event) => event.id === selectedEventId) || events[0];

  useEffect(() => {
    setOriginalEvent(JSON.parse(JSON.stringify(selectedEvent)));
  }, [selectedEventId]);

  const handleEventChange = (eventId) => {
    setSelectedEventId(eventId);
    setEditMode(false);
  };

  const handleInputChange = (e, field) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === selectedEventId
                ? { ...event, [field]: reader.result }
                : event
            )
          );
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = e.target;
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEventId ? { ...event, [field]: value } : event
        )
      );
    }
  };

  const handleDateChange = (dayIndex, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              schedule: event.schedule.map((day, index) =>
                index === dayIndex ? { ...day, date: value } : day
              ),
            }
          : event
      )
    );
  };

  const handleSave = () => {
    console.log("Saving event data:", selectedEvent);
    setEditMode(false);
    setOriginalEvent(JSON.parse(JSON.stringify(selectedEvent)));
  };

  const handleDelete = () => {
    console.log("Deleting event:", selectedEvent);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEventId)
    );
    if (events.length > 1) {
      setSelectedEventId(events[0].id);
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: "New Event",
        date: "",
        heroImage: "/placeholder.svg?height=400&width=800",
        about: "",
        schedule: [],
        speakers: [],
        location: "",
      };
      setEvents([newEvent]);
      setSelectedEventId(newEvent.id);
    }
    setEditMode(false);
  };

  const handleDiscardChanges = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId ? { ...originalEvent } : event
      )
    );
    setEditMode(false);
  };

  return {
    events,
    selectedEvent,
    selectedEventId,
    editMode,
    handleEventChange,
    handleInputChange,
    handleDateChange,
    handleSave,
    handleDelete,
    handleDiscardChanges,
    setEditMode,
    setEvents,
  };
}
