import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export function LocationSection({ event, editMode, handleInputChange }) {
  return (
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
                value={event.location}
                onChange={(e) => handleInputChange(e, "location")}
                className="w-full"
              />
            ) : (
              <span>{event.location}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
