"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scale, Menu, XIcon } from "lucide-react";

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

export function SiteHeader({ activeSection, onNavigate, isMobile }: SiteHeaderProps) {
  const router = useRouter();
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

  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${isMobile ? "bg-primary/10" : "bg-primary/60"}  backdrop-blur-sm ${isScrolled ? "bg-primary/70 backdrop-blur-sm shadow-md" : ""} ${navbarVisible ? "translate-y-0" : "-translate-y-full"} motion-reduce:transform-none motion-reduce:transition-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center justify-between md:hidden w-full">
            <button onClick={() => handleNavigation("inicio")} className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Ir a inicio">
              <Scale className="h-8 w-8" />

              <span className="font-serif text-md font-bold">Estudio Conti & Nasif</span>
            </button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button type="button" className="md:hidden text-primary-foreground hover:text-accent transition-colors" aria-label="Abrir menú">
                  <Menu className="h-8 w-8" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary/60 backdrop-blur-xl text-primary-foreground border-l border-primary-foreground/20 p-0">
                <div className="flex items-center justify-between p-6 border-b border-primary-foreground/20">
                  <div className="flex items-center gap-2"></div>
                  <SheetClose asChild>
                    <button type="button" className="text-primary-foreground hover:text-accent transition-colors" aria-label="Cerrar menú">
                      <XIcon className="h-8 w-8" />
                    </button>
                  </SheetClose>
                </div>
                <div className="p-6">
                  <nav className="flex flex-col gap-6" aria-label="Navegación móvil">
                    {navigationItems.map((item) => (
                      <button key={item.id} type="button" onClick={() => handleNavigation(item.id)} className={`text-left py-3 px-2 -mx-2 rounded-lg transition-colors text-lg font-medium ${activeSection === item.id ? "bg-accent/10 text-accent" : "text-primary-foreground/90 hover:bg-primary-foreground/5"}`}>
                        {item.label}
                      </button>
                    ))}
                    <Button size="lg" onClick={() => handleNavigation("contacto")} className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold">
                      Solicitar consulta
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => handleNavigation("inicio")} className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity" aria-label="Ir a inicio">
              <Scale className="h-8 w-8" />
              <span className="font-serif text-xl font-bold ">{"Estudio Conti & Nasif"}</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navigationItems.map((item) => (
              <button key={item.id} onClick={() => handleNavigation(item.id)} className={`text-sm font-medium transition-colors relative ${activeSection === item.id ? "text-accent" : "text-primary-foreground hover:text-accent"}`} aria-current={activeSection === item.id ? "page" : undefined}>
                {item.label}
                {activeSection === item.id && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
