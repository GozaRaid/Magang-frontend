"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Mic,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  Edit2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HeroSection } from "@/components/component/heroAdminSection";
import { AboutSection } from "@/components/component/aboutAdminSection";
import { ScheduleSection } from "@/components/component/scheduleAdminSection";
import { SpeakersSection } from "@/components/component/speakerAdminSection";
import { LocationSection } from "@/components/component/locationAdminSection";
import { useEventManagement } from "@/components/layouts/useEventManagement";

export function Dashboard() {
  const {
    selectedEvent,
    selectedEventId,
    editMode,
    handleInputChange,
    handleDateChange,
    handleDiscardChanges,
    handleSave,
    setEditMode,
    setEvents,
  } = useEventManagement();

  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [nextSection, setNextSection] = useState(null); // Renamed for clarity

  const sections = [
    { name: "Home", icon: Home, component: HeroSection },
    { name: "About", icon: Users, component: AboutSection },
    { name: "Schedule", icon: Calendar, component: ScheduleSection },
    { name: "Speakers", icon: Mic, component: SpeakersSection },
    { name: "Location", icon: MapPin, component: LocationSection },
  ];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleKeepChanges = () => {
    // Save changes based on editMode
    editMode ? handleSave() : handleDiscardChanges();
    setActiveSection(nextSection);
    setIsAlertOpen(false);
  };

  const handleDiscardAlert = () => {
    handleDiscardChanges();
    setEditMode(false);
    setActiveSection(nextSection);
    setIsAlertOpen(false);
  };

  const handleSectionChange = (section) => {
    if (editMode) {
      setNextSection(section); // Use new variable name for clarity
      setIsAlertOpen(true);
    } else {
      setActiveSection(section);
    }
  };

  const ActiveSectionComponent = sections.find(
    (section) => section.name.toLowerCase() === activeSection
  )?.component;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`font-bold text-lg ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Homepage Editor
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={isSidebarCollapsed ? "mx-auto" : ""}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
        <nav className="mt-8">
          {sections.map((section) => (
            <Button
              key={section.name.toLowerCase()}
              variant={
                activeSection === section.name.toLowerCase()
                  ? "secondary"
                  : "ghost"
              }
              onClick={() => handleSectionChange(section.name.toLowerCase())}
              className={`w-full justify-start mb-2 ${
                isSidebarCollapsed ? "px-0 justify-center" : "px-4"
              }`}
            >
              <section.icon
                className={`h-5 w-5 ${isSidebarCollapsed ? "mr-0" : "mr-2"}`}
              />
              {!isSidebarCollapsed && <span>{section.name}</span>}
            </Button>
          ))}
        </nav>
      </div>
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold capitalize">
            {activeSection} Section
          </h2>
          <div className="flex items-center space-x-2">
            {editMode ? (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
                <Button
                  onClick={handleDiscardChanges}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="mr-2" size={16} />
                  Discard Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Edit2 className="mr-2" size={16} />
                Edit Event
              </Button>
            )}
          </div>
        </header>
        <main className="p-6">
          {ActiveSectionComponent && (
            <ActiveSectionComponent
              event={selectedEvent}
              editMode={editMode}
              handleInputChange={handleInputChange}
              {...(activeSection === "schedule" || activeSection === "speakers"
                ? { setEvents, selectedEventId, handleDateChange }
                : {})}
            />
          )}
        </main>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save them before
              switching sections?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardAlert}>
              Discard
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleKeepChanges}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}