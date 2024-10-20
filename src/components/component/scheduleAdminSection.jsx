import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Minus } from "lucide-react";
import {
  scheduleSectionSchema,
  scheduleItemSchema,
} from "@/lib/validationSchema";

export function ScheduleSection({
  event,
  editMode,
  setEvents,
  selectedEventId,
  setIsValid,
}) {
  const [errors, setErrors] = useState({});

  const validateScheduleItem = (item) => {
    try {
      scheduleItemSchema.parse(item);
      return null; // No errors
    } catch (error) {
      return error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
    }
  };

  const validateSchedule = (schedule) => {
    try {
      scheduleSectionSchema.parse(schedule);
      return null; // No errors
    } catch (error) {
      return error.errors.reduce((acc, err) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {});
    }
  };

  const handleScheduleChange = (dayIndex, itemIndex, field, value) => {
    const updatedSchedule = event.schedule.map((day, dIndex) =>
      dIndex === dayIndex
        ? {
            ...day,
            items: day.items.map((item, iIndex) =>
              iIndex === itemIndex ? { ...item, [field]: value } : item
            ),
          }
        : day
    );

    const updatedEvent = { ...event, schedule: updatedSchedule };
    setEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === selectedEventId ? updatedEvent : e))
    );

    validateAllSchedule(updatedSchedule);
  };

  const addDay = () => {
    const newDay = {
      date: "",
      items: [
        {
          timestart: "09:00 AM",
          timeend: "10:00 AM",
          title: "New Event",
          speakers: "TBA",
        },
      ],
    };
    const updatedSchedule = [...event.schedule, newDay];
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId ? { ...e, schedule: updatedSchedule } : e
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const removeDay = (index) => {
    const updatedSchedule = event.schedule.filter((_, i) => i !== index);
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId ? { ...e, schedule: updatedSchedule } : e
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const addScheduleItem = (dayIndex) => {
    const newItem = {
      timestart: "",
      timeend: "",
      title: "",
      speakers: "",
    };
    const updatedSchedule = event.schedule.map((day, index) =>
      index === dayIndex ? { ...day, items: [...day.items, newItem] } : day
    );
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId ? { ...e, schedule: updatedSchedule } : e
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const removeScheduleItem = (dayIndex, itemIndex) => {
    const updatedSchedule = event.schedule.map((day, index) =>
      index === dayIndex
        ? { ...day, items: day.items.filter((_, i) => i !== itemIndex) }
        : day
    );
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId ? { ...e, schedule: updatedSchedule } : e
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const handleDayDateChange = (dayIndex, value) => {
    const updatedSchedule = event.schedule.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            date: value,
            items:
              day.items.length === 0
                ? [
                    {
                      timestart: "09:00 AM",
                      timeend: "10:00 AM",
                      title: "New Event",
                      speakers: "TBA",
                    },
                  ]
                : day.items,
          }
        : day
    );
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId ? { ...e, schedule: updatedSchedule } : e
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const validateAllSchedule = (schedule) => {
    const newErrors = {};
    let isValid = true;

    schedule.forEach((day, dayIndex) => {
      const dayErrors = validateSchedule(day);
      if (dayErrors) {
        newErrors[`day-${dayIndex}`] = dayErrors;
        isValid = false;
      }

      day.items.forEach((item, itemIndex) => {
        const itemErrors = validateScheduleItem(item);
        if (itemErrors) {
          newErrors[`day-${dayIndex}-item-${itemIndex}`] = itemErrors;
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    setIsValid(isValid);
  };

  useEffect(() => {
    validateAllSchedule(event.schedule);
  }, [event.schedule, setIsValid]);

  return (
    <section className="mb-12">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>Event Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {event.schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  Day {dayIndex + 1} ({day.date})
                </h3>
                {editMode && (
                  <div>
                    <Button
                      onClick={() => addScheduleItem(dayIndex)}
                      size="sm"
                      className="mr-2"
                    >
                      <Plus size={16} />
                    </Button>
                    <Button
                      onClick={() => removeDay(dayIndex)}
                      size="sm"
                      variant="destructive"
                    >
                      <Minus size={16} />
                    </Button>
                  </div>
                )}
              </div>
              {editMode && (
                <Input
                  type="date"
                  value={day.date}
                  onChange={(e) =>
                    handleDayDateChange(dayIndex, e.target.value)
                  }
                  className="mb-4"
                />
              )}
              {errors[`day-${dayIndex}`] && (
                <div className="mb-2 text-red-500">
                  {errors[`day-${dayIndex}`].date}
                </div>
              )}
              {day.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-4">
                  {editMode ? (
                    <>
                      <div className="p-4 mb-6 border rounded">
                        <div className="flex items-center mb-2">
                          <Input
                            type="text"
                            value={item.timestart}
                            onChange={(e) =>
                              handleScheduleChange(
                                dayIndex,
                                itemIndex,
                                "timestart",
                                e.target.value
                              )
                            }
                            className="w-1/4 mr-2"
                            placeholder="Start Time"
                          />
                          <Input
                            type="text"
                            value={item.timeend}
                            onChange={(e) =>
                              handleScheduleChange(
                                dayIndex,
                                itemIndex,
                                "timeend",
                                e.target.value
                              )
                            }
                            className="w-1/4 mr-2"
                            placeholder="End Time"
                          />
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              handleScheduleChange(
                                dayIndex,
                                itemIndex,
                                "title",
                                e.target.value
                              )
                            }
                            className="w-3/4"
                            placeholder="Event Title"
                          />
                          <Button
                            onClick={() =>
                              removeScheduleItem(dayIndex, itemIndex)
                            }
                            size="sm"
                            variant="destructive"
                            className="ml-2"
                          >
                            <Minus size={16} />
                          </Button>
                        </div>
                        <Input
                          value={item.speakers}
                          onChange={(e) =>
                            handleScheduleChange(
                              dayIndex,
                              itemIndex,
                              "speakers",
                              e.target.value
                            )
                          }
                          placeholder="Performers/Speakers"
                        />
                        {errors[`day-${dayIndex}-item-${itemIndex}`] && (
                          <div className="mt-2 text-red-500">
                            {Object.values(
                              errors[`day-${dayIndex}-item-${itemIndex}`]
                            ).map((error, index) => (
                              <div key={index} className="text-sm">
                                {error}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center mb-2">
                        <Clock className="mr-2" size={16} />
                        <span className="font-semibold">
                          {item.timestart} - {item.timeend}
                        </span>
                      </div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p>{item.speakers}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          {editMode && (
            <Button onClick={addDay} className="mt-4">
              <Plus size={16} className="mr-2" />
              Add Day
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
