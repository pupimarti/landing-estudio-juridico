"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, ChevronUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/lib/services";

export default function LawFirmLanding() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false));
  const router = useRouter();

  const quienesSomosRef = useRef<HTMLElement>(null);
  const serviciosRef = useRef<HTMLElement>(null);
  const contactoRef = useRef<HTMLElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);

      // Update active section based on scroll position
      const sections = ["inicio", "quienes-somos", "servicios", "contacto"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHeroVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (quienesSomosRef.current) observer.observe(quienesSomosRef.current);
    if (serviciosRef.current) observer.observe(serviciosRef.current);
    if (contactoRef.current) observer.observe(contactoRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }
    );

    serviceCardsRef.current.forEach((card) => {
      if (card) {
        card.classList.remove("fade-in-visible");
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleServiceDetail = (slug: string) => {
    router.push(`/servicios/${slug}`);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!formData.mensaje.trim()) {
      errors.mensaje = "El mensaje es requerido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader activeSection={activeSection} onNavigate={handleNavigation} />

      {/* Hero Section */}
      <section id="inicio" className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh] flex items-center `}>
        <div className="absolute inset-0 -z-10">
          <img src="/a5603f_9b9a4f6c2c65443c87b9cd21b32ad319~mv2.avif" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/70 to-primary/70" />
        </div>

        <div
          className="max-w-7xl mx-auto"
          style={{
            maxWidth: "100%",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              {"{{NOMBRE_ESTUDIO}}"}
            </h1>
            <p className={`text-lg sm:text-xl text-primary-foreground/90 mb-10 text-pretty leading-relaxed fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
              Protegemos tus intereses con soluciones concretas y trato humano.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
              <Button size="lg" onClick={() => scrollToSection("contacto")} className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                Solicitar consulta
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("servicios")} className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base">
                Ver servicios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section ref={quienesSomosRef} id="quienes-somos" className="pt-30 px-4 sm:px-6 lg:px-8 bg-background fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">Quiénes somos</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">Somos un estudio de abogados dinámico, enfocado en ofrecer soluciones prácticas e innovadoras a los problemas legales de hoy. Entendemos que el mundo legal está en constante cambio, y nuestro enfoque combina la experiencia tradicional con una perspectiva moderna.</p>
              <p className="text-lg">En Estudio Conti, no solo somos sus abogados; somos sus aliados estratégicos. Nos tomamos el tiempo de entender sus objetivos, ya sean personales o empresariales, para diseñar la estrategia legal que mejor se adapte a sus necesidades.</p>
              <p className="text-lg">Creemos en la comunicación clara, la transparencia y la eficiencia. Estamos aquí para guiarlo a través de la complejidad del sistema legal, protegiendo sus derechos y ayudándole a alcanzar sus metas.</p>

              {/* <div className="mt-10 grid sm:grid-cols-3 gap-6">
                <Card className="border-2 border-border">
                  <CardContent className="pt-6">
                    <div className="text-accent text-2xl mb-2">⚡</div>
                    <h3 className="font-serif font-semibold text-foreground mb-2">Respuesta rápida</h3>
                    <p className="text-sm text-muted-foreground">Contestamos consultas en menos de 24 horas</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="pt-6">
                    <div className="text-accent text-2xl mb-2">💰</div>
                    <h3 className="font-serif font-semibold text-foreground mb-2">Honorarios transparentes</h3>
                    <p className="text-sm text-muted-foreground">Sin sorpresas ni costos ocultos</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="pt-6">
                    <div className="text-accent text-2xl mb-2">🤝</div>
                    <h3 className="font-serif font-semibold text-foreground mb-2">Acompañamiento integral</h3>
                    <p className="text-sm text-muted-foreground">Te guiamos en cada paso del proceso</p>
                  </CardContent>
                </Card>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section ref={serviciosRef} id="servicios" className={`pb-20 pt-30 px-4 sm:px-6 lg:px-8 bg-muted/30 ${isMobile ? "" : "fade-in"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Servicios</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  ref={(el) => {
                    serviceCardsRef.current[index] = el;
                  }}
                  className={`group h-full ${isMobile ? "fade-in" : ""}`}
                >
                  <Card className={`border-2 border-border hover:border-accent transition-colors duration-150 group h-full`}>
                    <CardContent className="pt-6 flex flex-col h-full">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-grow text-sm">{service.shortDescription}</p>
                      <p className="text-sm font-medium text-accent mb-4">{service.footer}</p>
                      <Button variant="outline" size="sm" onClick={() => handleServiceDetail(service.slug)} className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Más información
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section ref={contactoRef} id="contacto" className="pt-30 pb-20 px-4 sm:px-6 lg:px-8 bg-background fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">Contacto</h2>
            <p className="text-center text-muted-foreground mb-12 leading-relaxed">Respondemos todas las consultas en menos de 24 horas. Tu información es completamente confidencial y está protegida por el secreto profesional.</p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nombre" className="text-foreground pb-1">
                      Nombre <span className="text-destructive">*</span>
                    </Label>
                    <Input id="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className={formErrors.nombre ? "border-destructive" : ""} aria-required="true" aria-invalid={!!formErrors.nombre} aria-describedby={formErrors.nombre ? "nombre-error" : undefined} />
                    {formErrors.nombre && (
                      <p id="nombre-error" className="text-sm text-destructive mt-1">
                        {formErrors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground pb-1">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={formErrors.email ? "border-destructive" : ""} aria-required="true" aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? "email-error" : undefined} />
                    {formErrors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefono" className="text-foreground pb-1">
                      Teléfono
                    </Label>
                    <Input id="telefono" type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                  </div>

                  <div>
                    <Label htmlFor="mensaje" className="text-foreground pb-1">
                      Mensaje <span className="text-destructive">*</span>
                    </Label>
                    <Textarea id="mensaje" rows={5} value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className={formErrors.mensaje ? "border-destructive" : ""} aria-required="true" aria-invalid={!!formErrors.mensaje} aria-describedby={formErrors.mensaje ? "mensaje-error" : undefined} />
                    {formErrors.mensaje && (
                      <p id="mensaje-error" className="text-sm text-destructive mt-1">
                        {formErrors.mensaje}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-accent text-white hover:bg-accent/90" size="lg">
                    Enviar consulta
                  </Button>

                  {formStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm" role="alert" aria-live="polite">
                      ¡Gracias por tu consulta! Te responderemos a la brevedad.
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm" role="alert" aria-live="polite">
                      Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Información de contacto</h3>

                  <div className="space-y-4">
                    <a href={`mailto:{{EMAIL_ESTUDIO}}`} className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors group">
                      <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:text-accent" />
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <div className="text-sm">{"{{EMAIL_ESTUDIO}}"}</div>
                      </div>
                    </a>

                    <a href={`tel:{{TELEFONO}}`} className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors group">
                      <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:text-accent" />
                      <div>
                        <div className="font-medium text-foreground">Teléfono</div>
                        <div className="text-sm">{"{{TELEFONO}}"}</div>
                      </div>
                    </a>
                  </div>
                </div>

                <Card className="bg-muted/50 border-2 border-border">
                  <CardContent className="">
                    <h4 className="font-serif font-semibold text-foreground mb-3">Horario de atención</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Consultas urgentes: Disponibles 24/7
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={handleNavigation} />

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/{{TELEFONO}}" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors z-40" aria-label="Abrir WhatsApp">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.173-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .\16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button onClick={() => scrollToSection("inicio")} className="fixed bottom-6 left-6 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 transition-all z-40" aria-label="Volver arriba">
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
