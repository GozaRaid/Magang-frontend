import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { locationSectionSchema } from "@/lib/validationSchema";
import { useToast } from "@/hooks/use-toast";
import { useAddLocationSection } from "@/features/dashboard/location/useAddLocationSection";
import { useDeleteLocationSection } from "@/features/dashboard/location/useDeleteLocationSection";
import { useFetchLocationSection } from "@/features/dashboard/location/useFetchLocationSection";

export const LocationSection = forwardRef(function LocationSection(
  { event, editMode, setIsValid, setEvent },
  ref
) {
  const [error, setError] = useState("");
  const toast = useToast();
  const addLocationSection = useAddLocationSection();
  const deleteLocationSection = useDeleteLocationSection();
  const { data, isLoading, error: fetchError } = useFetchLocationSection();

  useEffect(() => {
    if (data) {
      setEvent((prev) => ({
        ...prev,
        map_url: data[0].map_url,
        id: data[0].id,
      }));
    }
  }, [data]);

  const validateLocation = (url) => {
    try {
      locationSectionSchema.parse({ map_url: url });
      setError("");
      return true;
    } catch (error) {
      setError(error.errors[0].message);
      return false;
    }
  };

  const handleInputChange = (e, field) => {
    setEvent((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleMapUrlChange = (e) => {
    const url = e.target.value;
    handleInputChange(e, "map_url");
    validateLocation(url);
  };

  useEffect(() => {
    if (editMode) {
      const isValid = validateLocation(event.map_url);
      setIsValid(isValid);
    }
  }, [editMode, event.map_url, setIsValid]);

  const handleSubmit = async () => {
    try {
      await deleteLocationSection.mutateAsync();
      await addLocationSection.mutateAsync({ map_url: event.map_url });
      toast.toast({
        title: "Success",
        description: "Location section updated successfully",
      });
    } catch (error) {
      toast.toast({
        title: "Error",
        description: error.message || "Failed to update location section",
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
            <div className="flex flex-col">
              <Label htmlFor="map_url" className="mb-2">
                Google Maps Embed URL
              </Label>
              <Input
                id="map_url"
                name="map_url"
                value={event.map_url}
                onChange={handleMapUrlChange}
                className={`w-full ${error ? "border-red-500" : ""}`}
                placeholder="Enter Google Maps embed URL..."
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
          ) : event.map_url ? (
            <div className="w-full aspect-video">
              <iframe
                src={event.map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <MapPin className="mr-2" size={16} />
              <span>No location map available</span>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
});
