import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AboutSection({ event, editMode, handleInputChange }) {
  const splitTextIntoParagraphs = (text) => {
    return text.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
  };

  const aboutParagraphs = splitTextIntoParagraphs(event.about);

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
                  onChange={(e) => handleInputChange(e, "about")}
                  className="w-full h-40"
                  placeholder="Enter the main description of the event..."
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="scope">Scope</Label>
                <Textarea
                  id="scope"
                  name="scope"
                  value={event.scope}
                  onChange={(e) => handleInputChange(e, "scope")}
                  className="w-full h-24"
                  placeholder="Enter the scope of the event..."
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="where">Where</Label>
                <Input
                  id="where"
                  name="where"
                  value={event.where}
                  onChange={(e) => handleInputChange(e, "where")}
                  className="w-full"
                  placeholder="Enter the location of the event..."
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="when">When</Label>
                <Input
                  id="when"
                  name="when"
                  value={event.when}
                  onChange={(e) => handleInputChange(e, "when")}
                  className="w-full"
                  placeholder="Enter the date of the event..."
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="who">Who</Label>
                <Textarea
                  id="who"
                  name="who"
                  value={event.who}
                  onChange={(e) => handleInputChange(e, "who")}
                  className="w-full h-24"
                  placeholder="Enter the speakers or participants..."
                />
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
