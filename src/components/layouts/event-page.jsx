"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  MapPin,
  Trash2,
  Edit2,
  Save,
  Plus,
  Minus,
  Image as ImageIcon,
} from "lucide-react";

const initialEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "2024-06-15",
    heroImage: "/placeholder.svg?height=400&width=800",
    about: "Join us for the most innovative tech conference of the year.",
    schedule: [
      {
        date: "2024-06-15",
        items: [
          {
            time: "09:00 AM",
            title: "Registration",
            description: "Check-in and welcome coffee",
          },
          {
            time: "10:00 AM",
            title: "Keynote",
            description: "Opening remarks and keynote speech",
          },
        ],
      },
      {
        date: "2024-06-16",
        items: [
          {
            time: "09:30 AM",
            title: "Workshop",
            description: "Hands-on coding workshop",
          },
          {
            time: "02:00 PM",
            title: "Panel Discussion",
            description: "Future of AI in Tech",
          },
        ],
      },
    ],
    speakers: [
      {
        name: "Jane Doe",
        bio: "AI Research Scientist at TechCorp",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "John Smith",
        bio: "Founder of StartupX",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    location: "123 Tech Avenue, San Francisco, CA 94105",
  },
  {
    id: "2",
    title: "Design Summit 2024",
    date: "2024-07-20",
    heroImage: "/placeholder.svg?height=400&width=800",
    about: "Explore the latest trends in UX/UI design at our annual summit.",
    schedule: [
      {
        date: "2024-07-20",
        items: [
          {
            time: "10:00 AM",
            title: "Opening Ceremony",
            description: "Welcome address and agenda overview",
          },
          {
            time: "11:30 AM",
            title: "Design Thinking Workshop",
            description: "Interactive session on design methodologies",
          },
        ],
      },
    ],
    speakers: [
      {
        name: "Alice Johnson",
        bio: "Lead Designer at DesignCo",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    location: "456 Creative Blvd, New York, NY 10001",
  },
];

export function EventPageComponent() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [editMode, setEditMode] = useState(false);

  const selectedEvent =
    events.find((event) => event.id === selectedEventId) || events[0];

  const handleEventChange = (eventId) => {
    setSelectedEventId(eventId);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId ? { ...event, [name]: value } : event
      )
    );
  };

  const handleScheduleChange = (dayIndex, itemIndex, field, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              schedule: event.schedule.map((day, dIndex) =>
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
          : event
      )
    );
  };

  const handleSpeakerChange = (index, field, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              speakers: event.speakers.map((speaker, i) =>
                i === index ? { ...speaker, [field]: value } : speaker
              ),
            }
          : event
      )
    );
  };

  const addDay = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: [...event.schedule, { date: "", items: [] }] }
          : event
      )
    );
  };

  const removeDay = (index) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, schedule: event.schedule.filter((_, i) => i !== index) }
          : event
      )
    );
  };

  const addScheduleItem = (dayIndex) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              schedule: event.schedule.map((day, index) =>
                index === dayIndex
                  ? {
                      ...day,
                      items: [
                        ...day.items,
                        { time: "", title: "", description: "" },
                      ],
                    }
                  : day
              ),
            }
          : event
      )
    );
  };

  const removeScheduleItem = (dayIndex, itemIndex) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              schedule: event.schedule.map((day, index) =>
                index === dayIndex
                  ? {
                      ...day,
                      items: day.items.filter((_, i) => i !== itemIndex),
                    }
                  : day
              ),
            }
          : event
      )
    );
  };

  const addSpeaker = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              speakers: [
                ...event.speakers,
                {
                  name: "",
                  bio: "",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ],
            }
          : event
      )
    );
  };

  const removeSpeaker = (index) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, speakers: event.speakers.filter((_, i) => i !== index) }
          : event
      )
    );
  };

  const handleSave = () => {
    // Placeholder for save functionality
    console.log("Saving event data:", selectedEvent);
    setEditMode(false);
  };

  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log("Deleting event:", selectedEvent);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEventId)
    );
    if (events.length > 1) {
      setSelectedEventId(events[0].id);
    } else {
      // If we're deleting the last event, create a new blank event
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

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Event Selection Dropdown */}
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
      </div>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative">
          <img
            src={selectedEvent.heroImage}
            alt="Event hero"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {editMode ? (
              <Input
                name="title"
                value={selectedEvent.title}
                onChange={handleInputChange}
                className="w-3/4 text-4xl font-bold text-white bg-transparent border-b border-white"
              />
            ) : (
              <h1 className="text-4xl font-bold text-white">
                {selectedEvent.title}
              </h1>
            )}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>About the Event</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <Textarea
                name="about"
                value={selectedEvent.about}
                onChange={handleInputChange}
                className="w-full"
              />
            ) : (
              <p>{selectedEvent.about}</p>
            )}
          </CardContent>
        </Card>
      </section>
      {/* Schedule Section */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent.schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Day {dayIndex + 1}</h3>
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
                    id="date"
                    name="date"
                    type="date"
                    value={day.date}
                    onChange={(e) =>
                      handleScheduleChange(dayIndex, 0, "time", e.target.value)
                    }
                    className="mb-4"
                  />
                )}
                {day.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    {editMode ? (
                      <>
                        <div className="flex items-center mb-2">
                          <Input
                            value={item.time}
                            onChange={(e) =>
                              handleScheduleChange(
                                dayIndex,
                                itemIndex,
                                "time",
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
                            placeholder="Title"
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
                        <Textarea
                          value={item.description}
                          onChange={(e) =>
                            handleScheduleChange(
                              dayIndex,
                              itemIndex,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center mb-2">
                          <Clock className="mr-2" size={16} />
                          <span className="font-semibold">{item.time}</span>
                        </div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p>{item.description}</p>
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
      {/* Speakers Section */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Speakers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {selectedEvent.speakers.map((speaker, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="relative w-24 h-24">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="object-cover w-full h-full rounded-full"
                    />
                    {editMode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <label
                          htmlFor={`speaker-image-${index}`}
                          className="cursor-pointer"
                        >
                          <ImageIcon className="text-white" size={24} />
                        </label>
                        <Input
                          id={`speaker-image-${index}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                handleSpeakerChange(
                                  index,
                                  "image",
                                  reader.result
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {editMode ? (
                      <>
                        <Input
                          value={speaker.name}
                          onChange={(e) =>
                            handleSpeakerChange(index, "name", e.target.value)
                          }
                          className="mb-2"
                          placeholder="Speaker Name"
                        />
                        <Textarea
                          value={speaker.bio}
                          onChange={(e) =>
                            handleSpeakerChange(index, "bio", e.target.value)
                          }
                          placeholder="Speaker Bio"
                        />
                        <Button
                          onClick={() => removeSpeaker(index)}
                          size="sm"
                          variant="destructive"
                          className="mt-2"
                        >
                          <Minus size={16} className="mr-2" />
                          Remove Speaker
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3 className="font-bold">{speaker.name}</h3>
                        <p>{speaker.bio}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <Button onClick={addSpeaker} className="mt-4">
                <Plus size={16} className="mr-2" />
                Add Speaker
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
      {/* Location Section */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MapPin className="mr-2" size={16} />
              {editMode ? (
                <Input
                  name="location"
                  value={selectedEvent.location}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                <span>{selectedEvent.location}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Edit/Save/Delete Buttons */}
      <div className="flex justify-end space-x-4">
        {editMode ? (
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600"
          >
            <Save className="mr-2" size={16} />
            Save Changes
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Edit2 className="mr-2" size={16} />
            Edit Event
          </Button>
        )}
        <Button onClick={handleDelete} variant="destructive">
          <Trash2 className="mr-2" size={16} />
          Delete Event
        </Button>
      </div>
    </div>
  );
}
