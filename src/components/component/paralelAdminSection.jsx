import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { format, set } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { paperSchema, parallelSessionSchema } from "@/lib/validationSchema";
import { useAddPararelSession } from "@/features/dashboard/pararelSession/useAddPararelSession";
import { useDeletePararelSession } from "@/features/dashboard/pararelSession/useDeletePararelSession";
import { useFetchPararelSession } from "@/features/dashboard/pararelSession/useFetchPararelSession";

export const ParalelSection = forwardRef(function ParalelSection(
  { event, editMode, setEvent, setIsValid },
  ref
) {
  const [selectedDate, setSelectedDate] = useState();
  const [editingSession, setEditingSession] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { data, isLoading } = useFetchPararelSession();
  const addPararelSession = useAddPararelSession();
  const deletePararelSession = useDeletePararelSession();
  const [dataExist, setDataExist] = useState(false);

  useEffect(() => {
    if (data && !dataExist) {
      setEvent((prev) => ({
        ...prev,
        parallelSessions: data.parallelSessions,
      }));
      setDataExist(true);
    }
  }, [data]);

  const handleSessionChange = (e) => {
    const error = validate(e.target);
    if (error) {
      const newErros = { ...errors };
      newErros[e.target.name] = error;
      setErrors(newErros);
      setIsValid(false);
    } else {
      const newErros = { ...errors };
      delete newErros[e.target.name];
      setErrors(newErros);
      setIsValid(true);
    }
  };

  const validate = ({ name, value }) => {
    try {
      parallelSessionSchema.shape[name].parse(value);
      return null;
    } catch (error) {
      return error.errors[0].message;
    }
  };

  const handlePaperChange = (e) => {
    const error = validatePaper(e.target);
    if (error) {
      const newErros = { ...errors };
      newErros[e.target.name] = error;
      setErrors(newErros);
    } else {
      const newErros = { ...errors };
      delete newErros[e.target.name];
      setErrors(newErros);
    }
  };

  const validatePaper = ({ name, value }) => {
    try {
      paperSchema.shape[name].parse(value);
      return null;
    } catch (error) {
      return error.errors[0].message;
    }
  };

  const formatDateToLocalString = (date) => {
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return adjustedDate.toISOString().split("T")[0];
  };

  const addSession = (formEvent) => {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);
    const newSession = {
      id: Math.random().toString(),
      date: selectedDate
        ? formatDateToLocalString(new Date(selectedDate))
        : new Date(),
      name: formData.get("name"),
      papers: [], // Initialize with empty array
    };

    const updatedSessions = [...event.parallelSessions, newSession];
    setEvent((prev) => ({
      ...prev,

      parallelSessions: updatedSessions,
    }));

    setIsAddSessionOpen(false);
  };

  const addPaper = (formPaper) => {
    formPaper.preventDefault();
    const formData = new FormData(formPaper.currentTarget);
    const newPaper = {
      id: Math.random().toString(),
      paperId: formData.get("paperId"),
      title: formData.get("title"),
      authors: formData.get("authors"),
      mode: formData.get("mode"),
    };

    const updatedPapers = [
      ...event.parallelSessions.find(
        (session) => session.id === selectedSessionId
      ).papers,
      newPaper,
    ];

    setEvent((prev) => ({
      ...prev,
      parallelSessions: prev.parallelSessions.map((session) =>
        session.id === selectedSessionId
          ? {
              ...session,
              papers: updatedPapers,
            }
          : session
      ),
    }));

    // setSessions((prev) =>
    //   prev.map((session) =>
    //     session.id === selectedSessionId
    //       ? {
    //           ...session,
    //           papers: [...session.papers, newPaper],
    //         }
    //       : session
    //   )
    // );
    setIsAddPaperOpen(false);
    // setErrors({});
  };

  const updateSession = (formUpdate) => {
    formUpdate.preventDefault();
    if (!editingSession) return;

    const formData = new FormData(formUpdate.currentTarget);
    const updatedSession = {
      ...editingSession,
      name: formData.get("name"),
      date: selectedDate
        ? formatDateToLocalString(new Date(selectedDate))
        : editingSession.date,
    };

    const updateSessions = event.parallelSessions.map((session) =>
      session.id === editingSession.id ? updatedSession : session
    );

    setEvent((prev) => ({
      ...prev,
      parallelSessions: updateSessions,
    }));

    setEditingSession(null);
    setIsEditSessionOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await deletePararelSession.mutateAsync();

      await addPararelSession.mutateAsync({
        parallelSessions: event.parallelSessions,
      });

      return true;
    } catch (error) {
      console.error("Error saving parallel sessions:", error);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        {editMode && (
          <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={(formEvent) => addSession(formEvent)}>
                <DialogHeader>
                  <DialogTitle>Add New Session</DialogTitle>
                  <DialogDescription>
                    Create a new parallel session for the conference.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Session Name</Label>
                    <Input
                      id="name"
                      name="name"
                      onChange={(e) => handleSessionChange(e)}
                      onFocus={(e) => handleSessionChange(e)}
                    />
                    {errors && (
                      <div className="mb-2 text-red-500">{errors.name}</div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md"
                      onChange={(e) => handleSessionChange(e)}
                      onFocus={(e) => handleSessionChange(e)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={errors.name || errors.date}>
                    Add Session
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {event.parallelSessions.map((session) => (
          <AccordionItem key={session.id} value={session.id}>
            <AccordionTrigger>
              <div className="flex justify-between w-full pr-4">
                <span>{session.name}</span>
                <span>{format(session.date, "MMMM d, yyyy")}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>{session.name}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {editMode && (
                      <Dialog
                        open={isAddPaperOpen}
                        onOpenChange={setIsAddPaperOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedSessionId(session.id)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Paper
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form onSubmit={addPaper}>
                            <DialogHeader>
                              <DialogTitle>Add New Paper</DialogTitle>
                              <DialogDescription>
                                Add a paper to this session.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="paperId">Paper ID</Label>
                                <Input
                                  id="paperId"
                                  name="paperId"
                                  required
                                  onChange={(e) => handlePaperChange(e)}
                                  onFocus={(e) => handlePaperChange(e)}
                                />
                                {errors && (
                                  <div className="mb-2 text-red-500">
                                    {errors.paperId}
                                  </div>
                                )}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                  id="title"
                                  name="title"
                                  required
                                  onChange={(e) => handlePaperChange(e)}
                                  onFocus={(e) => handlePaperChange(e)}
                                />
                                {errors && (
                                  <div className="mb-2 text-red-500">
                                    {errors.title}
                                  </div>
                                )}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="authors">Authors</Label>
                                <Input
                                  id="authors"
                                  name="authors"
                                  required
                                  onChange={(e) => handlePaperChange(e)}
                                  onFocus={(e) => handlePaperChange(e)}
                                />
                                {errors && (
                                  <div className="mb-2 text-red-500">
                                    {errors.authors}
                                  </div>
                                )}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="mode">Presentation Mode</Label>
                                <Select
                                  name="mode"
                                  required
                                  onChange={(e) => handlePaperChange(e)}
                                  onFocus={(e) => handlePaperChange(e)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select mode" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Online">
                                      Online
                                    </SelectItem>
                                    <SelectItem value="Offline">
                                      Offline
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors && (
                                  <div className="mb-2 text-red-500">
                                    {errors.mode}
                                  </div>
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                disabled={
                                  errors.paperId ||
                                  errors.title ||
                                  errors.authors ||
                                  errors.mode
                                }
                              >
                                Add Paper
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paper ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Authors</TableHead>
                          <TableHead>Mode</TableHead>
                          {editMode && <TableHead>Actions</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {session.papers.map((paper) => (
                          <TableRow key={paper.id}>
                            <TableCell>{paper.paperId}</TableCell>
                            <TableCell>{paper.title}</TableCell>
                            <TableCell>{paper.authors}</TableCell>
                            <TableCell>{paper.mode}</TableCell>
                            {editMode && (
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    setEvent((prev) => ({
                                      ...prev,
                                      parallelSessions:
                                        prev.parallelSessions.map((s) =>
                                          s.id === session.id
                                            ? {
                                                ...s,
                                                papers: s.papers.filter(
                                                  (p) => p.id !== paper.id
                                                ),
                                              }
                                            : s
                                        ),
                                    }))
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                {editMode && (
                  <CardFooter className="justify-between">
                    <Dialog
                      open={isEditSessionOpen}
                      onOpenChange={setIsEditSessionOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingSession(session);
                            setIsEditSessionOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form onSubmit={updateSession}>
                          <DialogHeader>
                            <DialogTitle>Edit Session</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Session Name</Label>
                              <Input
                                name="name"
                                defaultValue={editingSession?.name}
                                onChange={(e) => handleSessionChange(e)}
                                onFocus={(e) => handleSessionChange(e)}
                              />
                              {errors && (
                                <div className="mb-2 text-red-500">
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label>Date</Label>
                              <Calendar
                                mode="single"
                                selected={selectedDate || editingSession?.date}
                                onSelect={setSelectedDate}
                                onChange={(e) => handleSessionChange(e)}
                                onFocus={(e) => handleSessionChange(e)}
                                className="border rounded-md"
                              />
                              {errors && (
                                <div className="mb-2 text-red-500">
                                  {errors.date}
                                </div>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              disabled={errors.name || errors.date}
                            >
                              Update Session
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setEvent((prev) => ({
                          ...prev,
                          parallelSessions: prev.parallelSessions.filter(
                            (s) => s.id !== session.id
                          ),
                        }))
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Session
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
});
