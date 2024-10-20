import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Plus, Minus } from "lucide-react";
import { speakersSectionSchema } from "@/lib/validationSchema";

export function SpeakersSection({
  event,
  editMode,
  setEvents,
  selectedEventId,
  setIsValid,
}) {
  const [errors, setErrors] = useState([]);

  const validateSpeaker = (speaker, index) => {
    try {
      speakersSectionSchema.parse(speaker);
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = {};
        return newErrors;
      });
      return true;
    } catch (error) {
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        return newErrors;
      });
      return false;
    }
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

    // Validate the updated speaker
    const updatedSpeaker = {
      ...event.speakers[index],
      [field]: value,
    };
    validateSpeaker(updatedSpeaker, index);
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
                  image: "",
                },
              ],
            }
          : event
      )
    );
    setErrors((prev) => [...prev, {}]);
  };

  const removeSpeaker = (index) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? { ...event, speakers: event.speakers.filter((_, i) => i !== index) }
          : event
      )
    );
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (editMode) {
      const isValid = event.speakers.every((speaker, index) =>
        validateSpeaker(speaker, index)
      );
      setIsValid(isValid);
    }
  }, [editMode, event.speakers, setIsValid]);

  return (
    <section className="mb-12">
      <Card>
        <CardHeader className="p-4">
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {event.speakers.map((speaker, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="relative w-24 h-24">
                  <img
                    src={
                      speaker.image instanceof File
                        ? URL.createObjectURL(speaker.image)
                        : speaker.image
                    }
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
                            handleSpeakerChange(index, "image", file);
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
                        className={`mb-2 ${
                          errors[index]?.name ? "border-red-500" : ""
                        }`}
                        placeholder="Speaker Name"
                      />
                      {errors[index]?.name && (
                        <p className="mb-2 text-sm text-red-500">
                          {errors[index].name}
                        </p>
                      )}
                      <Textarea
                        value={speaker.bio}
                        onChange={(e) =>
                          handleSpeakerChange(index, "bio", e.target.value)
                        }
                        className={`${
                          errors[index]?.bio ? "border-red-500" : ""
                        }`}
                        placeholder="Speaker Bio"
                      />
                      {errors[index]?.bio && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[index].bio}
                        </p>
                      )}
                      {errors[index]?.image && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[index].image}
                        </p>
                      )}
                      <Button
                        onClick={() => removeSpeaker(index)}
                        size="sm"
                        variant="destructive"
                        className="mt-2"
                        disabled={event.speakers.length === 1}
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
