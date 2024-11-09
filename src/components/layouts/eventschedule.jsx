"use client";
import { useEffect, useState } from "react";
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

export function EventSchedule({ scheduleData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  // Initialize schedule data
  const schedule = scheduleData?.schedule || [];
  const itemsPerPage = 3;
  const totalPages = Math.ceil(schedule.length / itemsPerPage);

  // Set initial selected date when data loads
  useEffect(() => {
    if (schedule.length > 0 && !selectedDate) {
      setSelectedDate(schedule[0].date);
    }
  }, [schedule, selectedDate]);

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
                  year: "numeric",
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
                  <TableHead className="w-1/2 text-center text-white">
                    Events
                  </TableHead>
                  <TableHead className="w-1/4 text-white">Speakers</TableHead>
                  <TableHead className="w-1/6 text-white">
                    Parallel Session
                  </TableHead>
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
                    <TableCell className="text-center">{item.title}</TableCell>
                    <TableCell>{item.speakers}</TableCell>
                    <TableCell>{item.parallelsession}</TableCell>
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
