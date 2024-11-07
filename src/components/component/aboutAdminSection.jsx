import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { aboutSectionSchema } from "@/lib/validationSchema";
import { useDeleteAboutSection } from "@/features/dashboard/about/useDeleteAboutSection";
import { useAddAboutSection } from "@/features/dashboard/about/useAddAboutSection";
import { useToast } from "@/hooks/use-toast";
import { useFetchAboutSection } from "@/features/dashboard/about/useFetchAboutSection";

export const AboutSection = forwardRef(function AboutSection(
  { event, editMode, setEvent, setIsValid },
  ref
) {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [conferences, setConferences] = useState(event.conferences || []);
  const deleteAboutSection = useDeleteAboutSection();
  const addAboutSection = useAddAboutSection();
  const { data, isLoading, error } = useFetchAboutSection();

  useEffect(() => {
    if (data) {
      setEvent((prev) => ({
        ...prev,
        about: data.aboutDescription,
        conferences: data.conferences,
        where: data.where,
        who: data.who,
        id: data.id,
      }));
    }
  }, [data]);

  const splitTextIntoParagraphs = (text) => {
    return text.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
  };

  const aboutParagraphs = splitTextIntoParagraphs(event.about);

  const validateField = (field, value) => {
    try {
      aboutSectionSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: null }));
      return true;
    } catch (error) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        newErrors[field] = error.errors[0].message;
        return newErrors;
      });
      return false;
    }
  };

  const validateConferenceField = (index, field, value) => {
    try {
      aboutSectionSchema.shape[field].parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.conferences) {
          newErrors.conferences[index] = {
            ...newErrors.conferences[index],
            [field]: null,
          };
        }
        return newErrors;
      });
      return true;
    } catch (error) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (!newErrors.conferences) newErrors.conferences = [];
        newErrors.conferences[index] = {
          ...(newErrors.conferences[index] || {}),
          [field]: error.errors[0].message,
        };
        return newErrors;
      });
      return false;
    }
  };

  const handleInputChange = (e, field) => {
    setEvent((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleChange = (e, field) => {
    handleInputChange(e, field);
    validateField(field, e.target.value);
  };

  const handleConferenceChange = (index, field, value) => {
    const updatedConferences = [...event.conferences];
    updatedConferences[index][field] = value;

    // Update local state
    setConferences(updatedConferences);

    // Propagate changes to parent
    handleInputChange(
      {
        target: {
          name: "conferences",
          value: updatedConferences,
        },
      },
      "conferences"
    );

    // Validate the conference field
    validateConferenceField(index, field, value);
  };

  const addConference = () => {
    const newConference = { title: "", conference_url: "" };
    const updatedConferences = [...conferences, newConference];

    // Update local state
    setConferences(updatedConferences);

    // Propagate changes to parent
    handleInputChange(
      {
        target: {
          name: "conferences",
          value: updatedConferences,
        },
      },
      "conferences"
    );
  };

  const removeConference = (index) => {
    const updatedConferences = [...conferences];
    updatedConferences.splice(index, 1);

    // Update local state
    setConferences(updatedConferences);

    // Propagate changes to parent
    handleInputChange(
      {
        target: {
          name: "conferences",
          value: updatedConferences,
        },
      },
      "conferences"
    );
  };

  useEffect(() => {
    if (editMode) {
      const isValid = Object.keys(aboutSectionSchema.shape).every((field) =>
        validateField(field, event[field])
      );
      setIsValid(isValid);
    }
  }, [editMode, event, setIsValid]);

  const handleSubmit = async () => {
    try {
      await deleteAboutSection.mutateAsync();
      await addAboutSection.mutateAsync({
        aboutDescription: event.about,
        conferences: conferences,
        where: event.where,
        who: event.who,
      });
      toast({
        title: "Success",
        description: "About section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update about section",
        variant: "destructive",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <section className="mb-12">
      <Card>
        <CardHeader className="p-4">
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <>
              <div className="mb-4">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={event.about}
                  onChange={(e) => handleChange(e, "about")}
                  className={`w-full h-40 ${
                    errors.about ? "border-red-500" : ""
                  }`}
                  placeholder="Enter the main description of the event..."
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-500">{errors.about}</p>
                )}
              </div>
              <div className="mb-4">
                <Label>Conferences</Label>
                {event.conferences.map((conference, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      value={conference.title}
                      onChange={(e) =>
                        handleConferenceChange(index, "title", e.target.value)
                      }
                      className={`flex-1 mr-2 ${
                        errors.conferences?.[index]?.title
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Conference Title"
                    />
                    {errors.conferences?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.conferences[index].title}
                      </p>
                    )}
                    <Input
                      value={conference.conference_url}
                      onChange={(e) =>
                        handleConferenceChange(
                          index,
                          "conference_url",
                          e.target.value
                        )
                      }
                      className={`flex-1 mr-2 ${
                        errors.conferences?.[index]?.conference_url
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Conference URL"
                    />
                    {errors.conferences?.[index]?.conference_url && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.conferences[index].conference_url}
                      </p>
                    )}
                    <Button
                      type="button"
                      onClick={() => removeConference(index)}
                      className="text-white bg-red-500 hover:bg-red-600"
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addConference} className="mt-2">
                  +
                </Button>
              </div>
              <div className="mb-4">
                <Label htmlFor="where">Where</Label>
                <Input
                  id="where"
                  name="where"
                  value={event.where}
                  onChange={(e) => handleChange(e, "where")}
                  className={`w-full ${errors.where ? "border-red-500" : ""}`}
                  placeholder="Enter the location of the event..."
                />
                {errors.where && (
                  <p className="mt-1 text-sm text-red-500">{errors.where}</p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="who">Who</Label>
                <Textarea
                  id="who"
                  name="who"
                  value={event.who}
                  onChange={(e) => handleChange(e, "who")}
                  className={`w-full h-24 ${
                    errors.who ? "border-red-500" : ""
                  }`}
                  placeholder="Enter the speakers or participants..."
                />
                {errors.who && (
                  <p className="mt-1 text-sm text-red-500">{errors.who}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-2 text-xl font-semibold">About</h3>
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
              <div className="mb-4">
                <h3 className="text-xl font-semibold ">Conferences</h3>
                <ul className="list-disc list-inside">
                  {event.conferences.map((conference, index) => (
                    <li key={index}>
                      <a
                        href={conference.conference_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {conference.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mb-2 text-xl font-semibold">Where</h3>
              <p className="mb-4">{event.where}</p>

              <h3 className="mb-2 text-xl font-semibold">Who</h3>
              <p className="mb-4">{event.who}</p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
});
