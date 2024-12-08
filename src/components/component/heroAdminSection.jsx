import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { heroSectionSchema } from "@/lib/validationSchema";
import { useDeleteHeroSection } from "@/features/dashboard/hero/useDeleteHeroSection";
import { useAddHeroSection } from "@/features/dashboard/hero/useAddHeroSection";
import { useToast } from "@/hooks/use-toast";
import { useFetchHeroSection } from "@/features/dashboard/hero/useFetchHeroSection";

export const HeroSection = forwardRef(function HeroSection(
  { event, editMode, setIsValid, setEvent },
  ref
) {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const deleteHeroSection = useDeleteHeroSection();
  const addHeroSection = useAddHeroSection();
  const { data, isLoading, error } = useFetchHeroSection();

  useEffect(() => {
    if (data) {
      setEvent((prev) => ({
        ...prev,
        title: data[0].title,
        city: data[0].city,
        image_url: data[0].image_url,
        id: data[0].id,
      }));
    }
  }, [data]);

  const triggerHeroImageUpload = () => {
    fileInputRef.current?.click();
  };

  const validateField = (field, value) => {
    try {
      if (field === "image") {
        // Skip validation for image if it's a string (URL)
        if (typeof value === "string") return true;
        heroSectionSchema.shape[field].parse(value);
      } else {
        heroSectionSchema.shape[field].parse(value);
      }
      setErrors((prev) => ({ ...prev, [field]: null }));
      return true;
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      return false;
    }
  };

  const handleInputChange = (e, field) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        // Store the original file instead of converting to base64
        setEvent((prevEvents) => ({
          ...prevEvents,
          image_url: file, // Store the file directly
        }));
      }
    } else {
      setEvent((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleChange = async (e, field) => {
    if (field === "image_url") {
      const file = e.target.files[0];
      if (file) {
        handleInputChange({ target: { name: field, value: file } }, field);
        validateField(field, file);
      }
    } else {
      handleInputChange(e, field);
      validateField(field, e.target.value);
    }
  };

  useEffect(() => {
    if (editMode) {
      const isValid = Object.keys(heroSectionSchema.shape).every((field) => {
        if (field === "image" && typeof event[field] === "string") {
          return true;
        }
        return validateField(field, event[field]);
      });
      setIsValid(isValid);
    }
  }, [editMode, event, setIsValid]);

  // Submit handler for the edit mutation
  const handleSubmit = async () => {
    try {
      // Delete existing hero section first if the image field is a file
      if (event.image_url instanceof File) {
        await deleteHeroSection.mutateAsync();
      }

      await addHeroSection.mutateAsync({
        title: event.title,
        city: event.city,

        image: event.image_url instanceof File ? event.image_url : undefined,
        id: event.id,
      });

      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero section",
        variant: "destructive",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <Card className="mb-12">
      <CardHeader className="p-4">
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {editMode ? (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={event.title}
                onChange={(e) => handleChange(e, "title")}
                className={`w-full ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={event.city}
                onChange={(e) => handleChange(e, "city")}
                className={`w-full ${errors.city ? "border-red-500" : ""}`}
                placeholder="e.g., Bandung"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="image">Event Image</Label>
              <div className="flex items-center justify-center mt-2">
                <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={
                      event.image_url instanceof File
                        ? URL.createObjectURL(event.image_url)
                        : event.image_url
                    }
                    alt="Event hero"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button
                      onClick={triggerHeroImageUpload}
                      variant="secondary"
                      disabled={
                        addHeroSection.isLoading || deleteHeroSection.isLoading
                      }
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </div>
                <Input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e, "image")}
                  className="hidden"
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="mt-2 text-xl">City: {event.city}</p>
            <img
              src={
                event.image_url instanceof File
                  ? URL.createObjectURL(event.image_url)
                  : event.image_url
              }
              alt="Event hero"
              className="object-cover w-full h-full mt-4 rounded-lg"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
});
