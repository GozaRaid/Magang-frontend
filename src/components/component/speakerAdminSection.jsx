import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Plus, Minus } from "lucide-react";
import { speakersSectionSchema } from "@/lib/validationSchema";
import { useToast } from "@/hooks/use-toast";
import { useDeleteSpeakersByIdSection } from "@/features/dashboard/speakers/useDeleteSpeakersByIdSection";
import { useAddSpeakersSection } from "@/features/dashboard/speakers/useAddSpeakersSection";
import { useFetchSpeakersSection } from "@/features/dashboard/speakers/useFetchSpeakersSection";
import { useEditSpeakersByIdSection } from "@/features/dashboard/speakers/useEditSpeakersByIdSection";

export const SpeakersSection = forwardRef(function SpeakersSection(
  { event, editMode, setEvents, selectedEventId, setIsValid, setEvent },
  ref
) {
  const [errors, setErrors] = useState([]);
  const { toast } = useToast();
  const deleteSpeakerSectionById = useDeleteSpeakersByIdSection();
  const addSpeakerSection = useAddSpeakersSection();
  const editSpeakerByIdSection = useEditSpeakersByIdSection();
  const { data, isLoading } = useFetchSpeakersSection();

  useEffect(() => {
    if (data) {
      setEvent((prev) => ({
        ...prev,
        speakers: data.speakers,
      }));
    }
  }, [data, setEvent]);

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
    const updatedSpeakers = event.speakers.map((speaker, i) =>
      i === index ? { ...speaker, [field]: value } : speaker
    );

    setEvent((prev) => ({
      ...prev,
      speakers: updatedSpeakers,
    }));

    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === selectedEventId
          ? {
              ...evt,
              speakers: updatedSpeakers,
            }
          : evt
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
    const newSpeaker = {
      id: `temp-${Date.now()}`, // Add temporary ID for new speakers
      name: "",
      bio: "",
      image: "",
    };

    setEvent((prev) => ({
      ...prev,
      speakers: [...prev.speakers, newSpeaker],
    }));

    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === selectedEventId
          ? {
              ...evt,
              speakers: [...evt.speakers, newSpeaker],
            }
          : evt
      )
    );
    setErrors((prev) => [...prev, {}]);
  };

  const removeSpeaker = async (index) => {
    const speakerToRemove = event.speakers[index];

    // If the speaker has an ID and it's not a temporary one, delete it from the backend
    if (speakerToRemove.id && !speakerToRemove.id.startsWith("temp-")) {
      try {
        await deleteSpeakerSectionById.mutateAsync({
          id: speakerToRemove.id,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove speaker",
          variant: "destructive",
        });
        return;
      }
    }

    const updatedSpeakers = event.speakers.filter((_, i) => i !== index);

    setEvent((prev) => ({
      ...prev,
      speakers: updatedSpeakers,
    }));

    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === selectedEventId ? { ...evt, speakers: updatedSpeakers } : evt
      )
    );

    setErrors((prev) => prev.filter((_, i) => i !== index));

    toast({
      title: "Success",
      description: "Speaker removed successfully",
      variant: "success",
    });
  };

  const handleSubmit = async () => {
    try {
      const speakersToUpdate = event.speakers.map(
        ({ name, bio, image, id }) => ({
          id,
          name,
          bio,
          image,
        })
      );

      for (const speaker of speakersToUpdate) {
        if (speaker.id.startsWith("temp-")) {
          // Handle new speakers
          const { id, ...speakerData } = speaker;
          await addSpeakerSection.mutateAsync({
            speaker: speakerData,
          });
        } else if (speaker.image instanceof File) {
          // Handle existing speakers with new images
          await deleteSpeakerSectionById.mutateAsync({
            id: speaker.id,
          });
          await addSpeakerSection.mutateAsync({
            speaker,
          });
        } else {
          // Handle existing speakers with no changes
          await editSpeakerByIdSection.mutateAsync({
            id: speaker.id,
            speaker,
          });
        }
      }

      toast({
        title: "Success",
        description: "Speakers section updated successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update speakers section",
        variant: "destructive",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  useEffect(() => {
    if (editMode) {
      const isValid = event.speakers.every((speaker, index) =>
        validateSpeaker(speaker, index)
      );
      setIsValid(isValid);
    }
  }, [editMode, event.speakers, setIsValid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mb-12">
      <Card>
        <CardHeader className="p-4">
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {event.speakers.map((speaker, index) => (
              <div
                key={speaker.id || index}
                className="flex items-start space-x-4"
              >
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
});

export default SpeakersSection;
