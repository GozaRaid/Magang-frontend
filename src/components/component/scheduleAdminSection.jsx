import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Minus, ConstructionIcon } from "lucide-react";
import {
  scheduleSectionSchema,
  scheduleItemSchema,
} from "@/lib/validationSchema";
import { useAddScheduleSection } from "@/features/dashboard/schedule/useAddScheduleSection";
import { useDeleteScheduleSection } from "@/features/dashboard/schedule/useDeteleScheduleSection";
import { useToast } from "@/hooks/use-toast";
import { useFetchScheduleSection } from "@/features/dashboard/schedule/useFetchScheduleSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ScheduleSection = forwardRef(function ScheduleSection(
  { event, editMode, setEvent, setEvents, selectedEventId, setIsValid },
  ref
) {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const addScheduleSection = useAddScheduleSection();
  const deleteScheduleSection = useDeleteScheduleSection();
  const { data, isLoading, error } = useFetchScheduleSection();
  const [dataExist, setDataExist] = useState(false);

  useEffect(() => {
    if (data && !dataExist) {
      setEvent((prev) => ({
        ...prev,
        schedule: data.schedule,
      }));
      setDataExist(true);
    }
  }, [data]);

  const validateScheduleItem = (item) => {
    try {
      scheduleItemSchema.parse(item);
      return null;
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
      return null;
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

    setEvent({
      ...event,
      schedule: updatedSchedule,
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  const addDay = () => {
    const newDay = {
      date: "",
      items: [
        {
          timestart: "",
          timeend: "",
          title: "",
          speakers: "",
          parallelsession: "",
        },
      ],
    };
    const updatedSchedule = [...event.schedule, newDay];
    setEvent({
      ...event,
      schedule: updatedSchedule,
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
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
      parallelsession: "",
    };

    const updatedSchedule = event.schedule.map((day, index) =>
      index === dayIndex ? { ...day, items: [...day.items, newItem] } : day
    );

    setEvent({
      ...event,
      schedule: updatedSchedule,
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
      )
    );

    validateAllSchedule(updatedSchedule);
  };

  // Rest of the existing helper functions remain the same
  const removeDay = (index) => {
    const updatedSchedule = event.schedule.filter((_, i) => i !== index);
    setEvent({
      ...event,
      schedule: updatedSchedule,
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
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

    setEvent({
      ...event,
      schedule: updatedSchedule,
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
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
          }
        : day
    );

    setEvent((prev) => {
      return { ...prev, schedule: updatedSchedule };
    });

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: updatedSchedule }
          : event
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

  const handleSubmit = async () => {
    try {
      await deleteScheduleSection.mutateAsync();

      await addScheduleSection.mutateAsync({
        schedule: event.schedule,
      });

      toast({
        title: "Success",
        description: "Schedule section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update schedule section",
        variant: "destructive",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <section className="mb-12">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {event.schedule.map((day, dayIndex) => (
              <AccordionItem key={dayIndex} value={`day-${dayIndex}`}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span>Day {dayIndex + 1}</span>
                    <span>{day.date}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
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
                      <div key={itemIndex} className="p-4 border rounded">
                        {editMode ? (
                          <>
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
                                className="w-1/2 mr-2"
                                placeholder="Event Title"
                              />
                              <Input
                                value={item.parallelsession}
                                onChange={(e) =>
                                  handleScheduleChange(
                                    dayIndex,
                                    itemIndex,
                                    "parallelsession",
                                    e.target.value
                                  )
                                }
                                className="w-1/4 mr-2"
                                placeholder="Parallel Session"
                              />
                              <Button
                                onClick={() =>
                                  removeScheduleItem(dayIndex, itemIndex)
                                }
                                size="sm"
                                variant="destructive"
                                disabled={
                                  event.schedule[dayIndex].items.length === 1
                                }
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
                              placeholder="Speakers"
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
                          </>
                        ) : (
                          <>
                            <div className="flex items-center mb-2">
                              <Clock className="mr-2" size={16} />
                              <span className="font-semibold">
                                {item.timestart} - {item.timeend}
                              </span>
                              {item.parallelsession && (
                                <span className="px-2 py-1 ml-4 text-sm bg-gray-100 rounded-md">
                                  Parallel Session: {item.parallelsession}
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold">{item.title}</h4>
                            <p>{item.speakers}</p>
                          </>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <div className="flex justify-between mt-4">
                        <Button
                          onClick={() => addScheduleItem(dayIndex)}
                          size="sm"
                        >
                          <Plus size={16} className="mr-2" />
                          Add Item
                        </Button>
                        <Button
                          onClick={() => removeDay(dayIndex)}
                          size="sm"
                          variant="destructive"
                          disabled={event.schedule.length === 1}
                        >
                          <Minus size={16} className="mr-2" />
                          Remove Day
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
});
