import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Minus } from "lucide-react";

export function ScheduleSection({
  event,
  editMode,
  setEvents,
  selectedEventId,
  handleDateChange,
}) {
  const handleScheduleChange = (dayIndex, itemIndex, field, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId
          ? {
              ...e,
              schedule: e.schedule.map((day, dIndex) =>
                dIndex === dayIndex
                  ? {
                      ...day,
                      items: day.items.map((item, iIndex) =>
                        iIndex === itemIndex
                          ? { ...item, [field]: value }
                          : item
                      ),
                    }
                  : day
              ),
            }
          : e
      )
    );
  };

  const addDay = () => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId
          ? { ...e, schedule: [...e.schedule, { date: "", items: [] }] }
          : e
      )
    );
  };

  const removeDay = (index) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId
          ? { ...e, schedule: e.schedule.filter((_, i) => i !== index) }
          : e
      )
    );
  };

  const addScheduleItem = (dayIndex) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId
          ? {
              ...e,
              schedule: e.schedule.map((day, index) =>
                index === dayIndex
                  ? {
                      ...day,
                      items: [
                        ...day.items,
                        {
                          timestart: "",
                          timeend: "",
                          title: "",
                          speakers: "",
                        },
                      ],
                    }
                  : day
              ),
            }
          : e
      )
    );
  };

  const removeScheduleItem = (dayIndex, itemIndex) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === selectedEventId
          ? {
              ...e,
              schedule: e.schedule.map((day, index) =>
                index === dayIndex
                  ? {
                      ...day,
                      items: day.items.filter((_, i) => i !== itemIndex),
                    }
                  : day
              ),
            }
          : e
      )
    );
  };

  return (
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="">
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
                  id={`day-${dayIndex}`}
                  type="date"
                  value={day.date}
                  onChange={(e) => handleDateChange(dayIndex, e.target.value)}
                  className="mb-4"
                />
              )}
              {day.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-4">
                  {editMode ? (
                    <>
                      <div className="p-4 mb-6 border rounded">
                        <div className="flex items-center mb-2">
                          <Input
                            type="timestart"
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
                            placeholder="Time"
                          />
                          <Input
                            type="timeend"
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
                            placeholder="Time"
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
                          placeholder="Perfomers/Speakers"
                        />
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
