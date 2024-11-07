"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  {
    name: "Speakers",
    href: "#speakers",
    // dropdown: [
    //   { name: "Keynote Speakers", href: "/#keynote" },
    //   { name: "Tutorial Sessions", href: "/#tutorial" },
    // ],
  },
  { name: "Schedule", href: "/schedule" },
  { name: "Location", href: "/#location" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToElement = (targetSection) => {
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        const navbarHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    }, 100); // Small delay to ensure DOM is ready
  };

  const handleClick = async (href) => {
    if (isNavigating) return; // Prevent multiple clicks while navigating

    if (href.startsWith("/#")) {
      const targetSection = href.substring(2);

      if (pathname === "/") {
        scrollToElement(targetSection);
      } else {
        setIsNavigating(true);
        try {
          await router.push("/");
          scrollToElement(targetSection);
        } catch (error) {
          console.error("Navigation error:", error);
        } finally {
          setIsNavigating(false);
        }
      }
    } else {
      setIsNavigating(true);
      try {
        await router.push(href);
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
      }
    }

    setIsOpen(false);
  };

  const NavLink = ({ item }) => (
    <div className="relative group" ref={item.dropdown ? dropdownRef : null}>
      {item.dropdown ? (
        <>
          <button
            className="flex items-center font-medium transition-colors text-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disabled={isNavigating}
          >
            {item.name}
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out transform -translate-x-1/2 group-hover:w-full"></span>

          {dropdownOpen && (
            <div className="absolute left-0 z-50 py-2 mt-2 text-black bg-white rounded-md shadow-lg top-full">
              <div className="flex flex-col">
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(subItem.href);
                      setDropdownOpen(false);
                    }}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className="relative inline-block font-medium transition-colors text-md"
          onClick={(e) => {
            e.preventDefault();
            handleClick(item.href);
          }}
        >
          {item.name}
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out transform -translate-x-1/2 group-hover:w-full"></span>
        </Link>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 border-1 z-40 w-full bg-[linear-gradient(90deg,rgba(67,73,131,1)_10%,rgba(62,97,146,1)_30%,rgba(53,135,168,1)_52%,rgba(51,166,177,1)_75%,rgba(51,166,177,1)_89%)]">
      <div className="container flex items-center justify-between h-20 mx-auto">
        <Link
          href="/#hero"
          onClick={(e) => {
            e.preventDefault();
            handleClick("/#hero");
          }}
        >
          <Image
            src="/logo-icodsa.png"
            alt="ICoDSA Logo"
            width={150}
            height={150}
          />
        </Link>
        <nav className="hidden gap-6 text-white md:flex">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
