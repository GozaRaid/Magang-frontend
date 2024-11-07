import React from "react";
import { MapPin, Calendar, Mic2 } from "lucide-react";

export function About({ aboutData, scheduleDateCount }) {
  const formatDateRange = (dates) => {
    // Check if dates is null, undefined, or not an array
    if (!dates || !Array.isArray(dates) || dates.length === 0) return null;

    const getDayName = (date) => {
      return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    };

    // For single day
    if (dates.length === 1) {
      const date = new Date(dates[0].eventday);
      return (
        <>
          <p>{getDayName(date)}</p>
          <p>
            {date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </>
      );
    }

    // For multiple days
    const sortedDates = Array.from(dates).sort(
      (a, b) => new Date(a.eventday) - new Date(b.eventday)
    );

    const firstDate = new Date(sortedDates[0].eventday);
    const lastDate = new Date(sortedDates[sortedDates.length - 1].eventday);

    const formatMonthYear = firstDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <p>{`${getDayName(firstDate)} - ${getDayName(lastDate)}`}</p>
        <p>{`${firstDate.getDate()} - ${lastDate.getDate()} ${formatMonthYear}`}</p>
      </>
    );
  };

  const conferences = aboutData?.conferences || [];

  const splitTextIntoParagraphs = (text) => {
    return text.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
  };

  const aboutParagraphs = splitTextIntoParagraphs(aboutData?.aboutDescription);

  return (
    <div
      id="about"
      className="container px-4 pt-12 pb-20 mx-auto mt-12 md:px-6"
    >
      <h1 className="mb-8 text-4xl font-bold">About</h1>
      <div className="flex flex-col gap-8 leading-relaxed tracking-wider md:flex-row">
        <div className="md:w-2/3">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-8">
              {paragraph}
            </p>
          ))}
          <p className="mb-2 font-bold">
            Papers from the previous ICoDSA indexed in Scopus:
          </p>
          <ul className="list-disc list-inside">
            {conferences.map((conference, index) => (
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
        <div className="md:w-1/3">
          <div className="mt-4 space-y-6">
            <div className="flex items-start">
              <MapPin className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">Where</h2>
                <p>{aboutData?.where}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">When</h2>
                {formatDateRange(scheduleDateCount)}
              </div>
            </div>
            <div className="flex items-start">
              <Mic2 className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">Who</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: aboutData?.who.replace(/\n/g, "<br />"),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
