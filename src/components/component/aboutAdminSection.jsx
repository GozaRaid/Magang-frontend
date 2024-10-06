import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AboutSection({ event, editMode, handleInputChange }) {
  return (
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>About the Event</CardTitle>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <Textarea
              name="about"
              value={event.about}
              onChange={(e) => handleInputChange(e, "about")}
              className="w-full"
            />
          ) : (
            <p>{event.about}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
