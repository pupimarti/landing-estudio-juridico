"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scale, Menu } from "lucide-react";

export const navigationItems = [
  { id: "inicio", label: "Inicio" },
  { id: "quienes-somos", label: "Quiénes somos" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

interface SiteHeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

let navbarAnimationPlayed = false;

export function SiteHeader({ activeSection, onNavigate }: SiteHeaderProps) {
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
    } else {
      router.push(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 bg-primary/60 backdrop-blur-sm ${isScrolled ? "bg-primary/50 backdrop-blur-xl shadow-md" : ""} ${navbarVisible ? "translate-y-0" : "-translate-y-full"} motion-reduce:transform-none motion-reduce:transition-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button type="button" className="md:hidden text-primary-foreground hover:text-accent transition-colors" aria-label="Abrir menú">
                  <Menu className="h-7 w-7" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-primary text-primary-foreground border-r border-primary-foreground/20 px-6 py-10">
                <nav className="flex flex-col gap-6 text-lg font-medium" aria-label="Navegación móvil">
                  {navigationItems.map((item) => (
                    <button key={item.id} type="button" onClick={() => handleNavigation(item.id)} className={`text-left transition-colors ${activeSection === item.id ? "text-accent" : "text-primary-foreground/90 hover:text-accent"}`}>
                      {item.label}
                    </button>
                  ))}
                  <Button size="lg" onClick={() => handleNavigation("contacto")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Solicitar consulta
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

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
