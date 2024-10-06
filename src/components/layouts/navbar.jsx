"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Schedule", href: "#schedule" },
  { name: "Speakers", href: "#speakers" },
  { name: "Location", href: "#location" },
];

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[rgba(7,112,134,1)] via-[rgba(60,104,150,1)] to-[rgba(8,221,206,1)]">
      <div className="container flex items-center justify-between h-20 mx-auto">
        <Link href="/" passHref>
          <Image
            src="/logo-icodsa.png"
            alt="ICoDSA Logo"
            width={150}
            height={150}
          />
        </Link>
        <nav className="hidden gap-6 text-white md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium transition-colors text-md hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.href);
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] ">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium transition-colors text-md hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
