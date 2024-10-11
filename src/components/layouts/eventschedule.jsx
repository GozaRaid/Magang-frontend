"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const schedule = [
  {
    date: "2024-06-15",
    items: [
      {
        timestart: "09:00 AM",
        timeend: "10:00 AM",
        title: "Registration",
        speakers: "Event Staff",
      },
      {
        timestart: "10:00 AM",
        timeend: "11:00 AM",
        title: "Keynote",
        speakers: "John Smith",
      },
      {
        timestart: "11:00 AM",
        timeend: "12:00 PM",
        title: "Panel Discussion",
        speakers: "Alice Johnson, Michael Lee, Sarah Wilson",
      },
      {
        timestart: "12:00 PM",
        timeend: "01:00 PM",
        title: "Lunch Break",
        speakers: "N/A",
      },
      {
        timestart: "01:00 PM",
        timeend: "02:30 PM",
        title: "Breakout Sessions",
        speakers: "David Miller, Rachel Adams",
      },
      {
        timestart: "02:30 PM",
        timeend: "03:30 PM",
        title: "Product Showcase",
        speakers: "Emily Turner, James Green",
      },
      {
        timestart: "03:30 PM",
        timeend: "04:30 PM",
        title: "Networking",
        speakers: "N/A",
      },
    ],
  },
  {
    date: "2024-06-16",
    items: [
      {
        timestart: "09:30 AM",
        timeend: "02:00 PM",
        title: "Workshop",
        speakers: "Lisa Thompson",
      },
      {
        timestart: "02:00 PM",
        timeend: "03:00 PM",
        title: "Panel Discussion",
        speakers: "Robert Davis, Karen Foster",
      },
      {
        timestart: "03:00 PM",
        timeend: "04:00 PM",
        title: "Tech Expo",
        speakers: "Tom Harris",
      },
      {
        timestart: "04:00 PM",
        timeend: "05:00 PM",
        title: "Roundtable Discussion",
        speakers: "Anna Clark, Peter Hall",
      },
    ],
  },
  {
    date: "2024-06-17",
    items: [
      {
        timestart: "09:30 AM",
        timeend: "02:00 PM",
        title: "Hackathon",
        speakers: "Steve Rogers",
      },
      {
        timestart: "02:00 PM",
        timeend: "03:00 PM",
        title: "Closing Ceremony",
        speakers: "Monica Reyes",
      },
      {
        timestart: "03:00 PM",
        timeend: "04:00 PM",
        title: "Networking Event",
        speakers: "N/A",
      },
    ],
  },
  {
    date: "2024-06-18",
    items: [
      {
        timestart: "09:00 AM",
        timeend: "10:30 AM",
        title: "Networking Breakfast",
        speakers: "N/A",
      },
      {
        timestart: "10:30 AM",
        timeend: "12:00 PM",
        title: "Fireside Chat",
        speakers: "Jessica Brown, Mark Johnson",
      },
      {
        timestart: "12:00 PM",
        timeend: "01:00 PM",
        title: "Lunch Break",
        speakers: "N/A",
      },
      {
        timestart: "01:00 PM",
        timeend: "03:00 PM",
        title: "Final Workshop",
        speakers: "Catherine White",
      },
      {
        timestart: "03:00 PM",
        timeend: "04:00 PM",
        title: "Closing Remarks",
        speakers: "Daniel Martinez",
      },
    ],
  },
];

export function EventSchedule() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(schedule[0].date);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(schedule.length / itemsPerPage);

  const handlePrevious = () => {
    const newPage = Math.max(0, currentPage - 1);
    setCurrentPage(newPage);
    setSelectedDate(schedule[newPage * itemsPerPage].date);
  };

  const handleNext = () => {
    const newPage = Math.min(totalPages - 1, currentPage + 1);
    setCurrentPage(newPage);
    setSelectedDate(schedule[newPage * itemsPerPage].date);
  };

  const visibleDays = schedule.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="container px-4 py-16 mx-auto">
      <h1 className="mb-12 text-4xl font-bold ">Event Schedule</h1>
      <Tabs
        value={selectedDate}
        onValueChange={setSelectedDate}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          {totalPages > 1 && (
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              variant="outline"
              size="icon"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
          <TabsList
            className="grid flex-grow mx-2"
            style={{
              gridTemplateColumns: `repeat(${visibleDays.length}, 1fr)`,
            }}
          >
            {visibleDays.map((day) => (
              <TabsTrigger
                key={day.date}
                value={day.date}
                className="data-[state=active]:bg-[linear-gradient(90deg,rgba(67,73,131,1)_10%,rgba(62,97,146,1)_30%,rgba(53,135,168,1)_52%,rgba(51,166,177,1)_75%,rgba(51,166,177,1)_89%)] data-[state=active]:text-primary-foreground "
              >
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </TabsTrigger>
            ))}
          </TabsList>
          {totalPages > 1 && (
            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="icon"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        {schedule.map((day) => (
          <TabsContent key={day.date} value={day.date}>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-950">
                  <TableHead className="w-1/6 text-white">Time</TableHead>
                  <TableHead className="w-1/4 text-white">Event</TableHead>
                  <TableHead className="w-1/2 text-white">Speakers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {day.items.map((item, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-muted" : "bg-background"}
                  >
                    <TableCell className="font-medium">
                      {item.timestart} - {item.timeend}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.speakers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
