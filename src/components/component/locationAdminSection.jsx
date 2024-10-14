import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

export function LocationSection({ event, editMode, handleInputChange }) {
  return (
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
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
                onChange={(e) => handleInputChange(e, "map_url")}
                className="w-full"
                placeholder="Enter Google Maps embed URL..."
              />
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
}
