import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useRef } from "react";

export function HeroSection({ event, editMode, handleInputChange }) {
  const fileInputRef = useRef(null);

  const triggerHeroImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
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
                onChange={(e) => handleInputChange(e, "title")}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="place">Place</Label>
              <Input
                id="place"
                name="place"
                value={event.place}
                onChange={(e) => handleInputChange(e, "place")}
                className="w-full"
                placeholder="e.g., Bandung"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={event.date}
                onChange={(e) => handleInputChange(e, "date")}
                className="w-full"
                placeholder="e.g., December 31, 2024"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="heroImage">Event Image</Label>
              <div className="flex items-center justify-center mt-2">
                <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={event.heroImage}
                    alt="Event hero"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button
                      onClick={triggerHeroImageUpload}
                      variant="secondary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </div>
                <Input
                  ref={fileInputRef}
                  id="heroImage"
                  name="heroImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "heroImage")}
                  className="hidden"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="mt-2 text-xl">
              {event.place}, {event.date}
            </p>
            <img
              src={event.heroImage}
              alt="Event hero"
              className="w-full h-[400px] object-cover rounded-lg mt-4"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
