"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const navigationItems = [
  { id: "inicio", label: "Inicio" },
  { id: "quienes-somos", label: "Quiénes somos" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

interface SiteHeaderProps {
  activeSection?: string;
  isMobile?: boolean;
  onNavigate?: (sectionId: string) => void;
}

let navbarAnimationPlayed = false;

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
  return (
    <button type="button" onClick={onClick} className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5 text-primary-foreground hover:text-accent transition-colors" aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen}>
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`} />
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
    </button>
  );
}

export function SiteHeader({ activeSection, onNavigate, isMobile }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(() => navbarAnimationPlayed);

  useEffect(() => {
    if (navbarAnimationPlayed) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      navbarAnimationPlayed = true;
      setNavbarVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSectionHref = (sectionId: string) => (sectionId === "inicio" ? "/" : `/#${sectionId}`);

  const handleNavigation = (sectionId: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event?.preventDefault();
      onNavigate(sectionId);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${isMobile ? "bg-primary/10" : "bg-primary/60"}  backdrop-blur-sm ${isScrolled ? "bg-primary/70 backdrop-blur-sm shadow-md" : ""} ${navbarVisible ? "translate-y-0" : "-translate-y-full"} motion-reduce:transform-none motion-reduce:transition-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center justify-between md:hidden w-full">
            <Link
              href="/"
              onClick={(event) => handleNavigation("inicio", event)}
              className="flex items-center text-primary-foreground hover:opacity-80 transition-opacity"
              aria-label="Ir a inicio"
            >
              <Image src="/logo-letras.png" alt="Estudio Conti & Nasif" width={150} height={40} className="h-8 w-auto" priority />
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <AnimatedHamburger isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary/60 backdrop-blur-xl text-primary-foreground border-l border-primary-foreground/20 p-0">
                <div className="flex items-center justify-between p-6 border-b border-primary-foreground/20">
                  <div className="flex items-center gap-2"></div>
                  <AnimatedHamburger isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
                </div>
                <div className="p-6">
                  <nav className="flex flex-col gap-6" aria-label="Navegación móvil">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.id}
                        href={getSectionHref(item.id)}
                        onClick={(event) => handleNavigation(item.id, event)}
                        className={`text-left py-3 px-2 -mx-2 rounded-lg transition-colors text-lg font-medium ${activeSection === item.id ? "bg-accent/10 text-accent" : "text-primary-foreground/90 hover:bg-primary-foreground/5"}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Button asChild size="lg" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold">
                      <Link href="/#contacto" onClick={(event) => handleNavigation("contacto", event)}>
                        Solicitar consulta
                      </Link>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/" onClick={(event) => handleNavigation("inicio", event)} className="flex items-center text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Ir a inicio">
              <Image src="/logo-letras.png" alt="Estudio Conti & Nasif" width={180} height={48} className="h-10 w-auto" priority />
              <span className="font-serif text-lg font-bold ">{"Estudio Conti & Nasif"}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={getSectionHref(item.id)}
                onClick={(event) => handleNavigation(item.id, event)}
                className={`text-sm font-medium transition-colors relative ${activeSection === item.id ? "text-accent" : "text-primary-foreground hover:text-accent"}`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                {activeSection === item.id && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
