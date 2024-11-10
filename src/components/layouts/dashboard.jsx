"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Mic,
  Calendar,
  CalendarDays,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  Edit2,
  LogOut,
  ExternalLink,
  UserPen,
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
import { ParalelSection } from "@/components/component/paralelAdminSection";
import { useEventManagement } from "@/components/layouts/useEventManagement";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Register } from "@/components/layouts/register";

export function Dashboard() {
  const {
    selectedEvent,
    setSelectedEvent,
    editMode,
    handleInputChange,
    handleDateChange,
    handleDiscardChanges,
    setEditMode,
    setEvents,
  } = useEventManagement();

  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const scheduleSectionRef = useRef(null);
  const pararelSectionRef = useRef(null);
  const speakersSectionRef = useRef(null);
  const locationSectionRef = useRef(null);

  const router = useRouter();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [nextSection, setNextSection] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);

  const sectionRefs = {
    home: heroSectionRef,
    about: aboutSectionRef,
    schedule: scheduleSectionRef,
    pararel: pararelSectionRef,
    speakers: speakersSectionRef,
    location: locationSectionRef,
  };

  const handleSave = async () => {
    try {
      const currentRef = sectionRefs[activeSection];
      if (currentRef.current && currentRef.current.handleSubmit) {
        await currentRef.current.handleSubmit();
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDiscardAlert = () => {
    handleDiscardChanges();
    setEditMode(false);
    setActiveSection(nextSection);
    setIsAlertOpen(false);
  };

  const handleKeepChanges = async () => {
    await handleSave();
    setActiveSection(nextSection);
    setIsAlertOpen(false);
  };

  const handleSectionChange = (section) => {
    if (editMode) {
      setNextSection(section);
      setIsAlertOpen(true);
    } else {
      setActiveSection(section);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToHomepage = () => {
    router.push("/");
  };

  const ActiveSectionComponent = {
    home: HeroSection,
    about: AboutSection,
    schedule: ScheduleSection,
    pararel: ParalelSection,
    speakers: SpeakersSection,
    location: LocationSection,
    register: Register,
  }[activeSection];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const sections = [
    { name: "Home", icon: Home, key: "home" },
    { name: "About", icon: Users, key: "about" },
    { name: "Schedule", icon: Calendar, key: "schedule" },
    { name: "Parallel Session", icon: CalendarDays, key: "pararel" },
    { name: "Speakers", icon: Mic, key: "speakers" },
    { name: "Location", icon: MapPin, key: "location" },
    { name: "Register Account", icon: UserPen, key: "register" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 flex flex-col ${
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
        <nav className="flex-grow mt-8">
          {sections.map((section) => (
            <Button
              key={section.key}
              variant={activeSection === section.key ? "secondary" : "ghost"}
              onClick={() => handleSectionChange(section.key)}
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
        <div className="p-4 mt-auto">
          <Button
            variant="outline"
            onClick={handleGoToHomepage}
            className={`w-full justify-start mb-2 ${
              isSidebarCollapsed ? "px-0 justify-center" : "px-4"
            }`}
          >
            <ExternalLink
              className={`h-5 w-5 ${isSidebarCollapsed ? "mr-0" : "mr-2"}`}
            />
            {!isSidebarCollapsed && <span>Go to Homepage</span>}
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className={`w-full justify-start ${
              isSidebarCollapsed ? "px-0 justify-center" : "px-4"
            }`}
          >
            <LogOut
              className={`h-5 w-5 ${isSidebarCollapsed ? "mr-0" : "mr-2"}`}
            />
            {!isSidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold capitalize">
            {activeSection} Section
          </h2>
          {activeSection !== "register" && (
            <div className="flex items-center space-x-2">
              {editMode ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600"
                    disabled={!isFormValid}
                  >
                    <Save className="mr-2" size={16} /> Save Changes
                  </Button>
                  <Button
                    onClick={() => handleDiscardChanges(activeSection)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="mr-2" size={16} /> Discard Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Edit2 className="mr-2" size={16} /> Edit Event
                </Button>
              )}
            </div>
          )}
        </header>
        {activeSection !== "register" ? (
          <main className="p-6">
            {ActiveSectionComponent && (
              <ActiveSectionComponent
                ref={sectionRefs[activeSection]}
                event={selectedEvent}
                editMode={editMode}
                handleInputChange={handleInputChange}
                setIsValid={setIsFormValid}
                setEvent={setSelectedEvent}
                {...(activeSection === "schedule" ||
                activeSection === "speakers" ||
                activeSection === "pararel"
                  ? {
                      setEvents,
                      ...(activeSection === "schedule"
                        ? { handleDateChange }
                        : {}),
                    }
                  : {})}
              />
            )}
          </main>
        ) : (
          <main className="flex flex-col items-center justify-center p-12">
            <ActiveSectionComponent />
          </main>
        )}
      </div>

      {/* Alert Dialog */}
      {activeSection !== "register" && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to save changes before switching sections?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDiscardAlert}>
                Discard
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleKeepChanges}
                disabled={!isFormValid}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
