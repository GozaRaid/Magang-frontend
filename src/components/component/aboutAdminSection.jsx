import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { aboutSectionSchema } from "@/lib/validationSchema";

export function AboutSection({ event, editMode, handleInputChange }) {
  const [errors, setErrors] = useState({});

  const splitTextIntoParagraphs = (text) => {
    return text.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
  };

  const aboutParagraphs = splitTextIntoParagraphs(event.about);

  const validateField = (field, value) => {
    try {
      aboutSectionSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: null }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
    }
  };

  const handleChange = (e, field) => {
    handleInputChange(e, field);
    validateField(field, e.target.value);
  };

  useEffect(() => {
    if (editMode) {
      Object.keys(aboutSectionSchema.shape).forEach((field) => {
        validateField(field, event[field]);
      });
    }
  }, [editMode, event]);

  return (
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>About the Event</CardTitle>
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
                <Label htmlFor="scope">Scope</Label>
                <Textarea
                  id="scope"
                  name="scope"
                  value={event.scope}
                  onChange={(e) => handleChange(e, "scope")}
                  className={`w-full h-24 ${
                    errors.scope ? "border-red-500" : ""
                  }`}
                  placeholder="Enter the scope of the event..."
                />
                {errors.scope && (
                  <p className="mt-1 text-sm text-red-500">{errors.scope}</p>
                )}
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
                <Label htmlFor="when">When</Label>
                <Input
                  id="when"
                  name="when"
                  value={event.when}
                  onChange={(e) => handleChange(e, "when")}
                  className={`w-full ${errors.when ? "border-red-500" : ""}`}
                  placeholder="Enter the date of the event..."
                />
                {errors.when && (
                  <p className="mt-1 text-sm text-red-500">{errors.when}</p>
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

              <h3 className="mb-2 text-xl font-semibold">Scope</h3>
              <p className="mb-4 whitespace-pre-line">{event.scope}</p>

              <h3 className="mb-2 text-xl font-semibold">Where</h3>
              <p className="mb-4">{event.where}</p>

              <h3 className="mb-2 text-xl font-semibold">When</h3>
              <p className="mb-4">{event.when}</p>

              <h3 className="mb-2 text-xl font-semibold">Who</h3>
              <p className="whitespace-pre-line">{event.who}</p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
