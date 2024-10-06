import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Plus, Minus } from "lucide-react";

export function SpeakersSection({
  event,
  editMode,
  setEvents,
  selectedEventId,
}) {
  // Include the handleSpeakerChange, addSpeaker, and removeSpeaker functions here
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

  return (
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Speakers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {event.speakers.map((speaker, index) => (
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
  );
}
