import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PararelSchedule({ parallelSessions }) {
  const [activeSession, setActiveSession] = useState(null);

  const groupedSessions = useMemo(() => {
    const grouped = parallelSessions.parallelSessions.reduce((acc, session) => {
      const date = format(parseISO(session.date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [parallelSessions]);

  const activePapers = useMemo(() => {
    const activeSessionData = parallelSessions.parallelSessions.find(
      (session) => session.id === activeSession
    );
    return activeSessionData ? activeSessionData.papers : [];
  }, [activeSession, parallelSessions]);

  const TableComponent = ({ papers }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Paper ID</TableHead>
          <TableHead className="max-w-[400px]">Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Mode</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {papers.map((paper) => (
          <TableRow key={paper.id}>
            <TableCell>{paper.paperId}</TableCell>
            <TableCell className="max-w-[400px]">{paper.title}</TableCell>
            <TableCell>{paper.authors}</TableCell>
            <TableCell>{paper.mode}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-12 text-left">
        <h1 className="mb-4 text-4xl font-bold">
          Paralel Sesion <span className="text-primary">Schedule</span>
        </h1>
        <div className="flex items-center justify-center gap-4"></div>
      </div>
      <div className="grid gap-8 mb-12">
        {groupedSessions.map(([date, sessions], index) => (
          <div key={date}>
            <h2
              className={`text-xl font-semibold mb-4 px-4 py-2 ${
                index % 2 === 0
                  ? "bg-muted"
                  : "bg-blue-950 text-primary-foreground"
              }`}
            >
              {format(parseISO(date), "MMMM d, yyyy")}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-colors ${
                    activeSession === session.id
                      ? "bg-[linear-gradient(90deg,rgba(67,73,131,1)_10%,rgba(62,97,146,1)_30%,rgba(53,135,168,1)_52%,rgba(51,166,177,1)_75%,rgba(51,166,177,1)_89%)] text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveSession(session.id)}
                >
                  <CardHeader className="py-4 text-center">
                    {session.name}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      {activePapers.length > 0 && (
        <div className="border rounded-md">
          {activePapers.length > 5 ? (
            <ScrollArea className="h-[400px]">
              <TableComponent papers={activePapers} />
            </ScrollArea>
          ) : (
            <TableComponent papers={activePapers} />
          )}
        </div>
      )}
      {activePapers.length === 0 && activeSession && (
        <div className="py-8 text-center text-muted-foreground">
          No papers available for this session.
        </div>
      )}
      {!activeSession && (
        <div className="py-8 text-center text-muted-foreground">
          Select a session to view papers.
        </div>
      )}
    </div>
  );
}
