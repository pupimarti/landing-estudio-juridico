"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, ChevronUp, MessageCircle, Linkedin, Instagram, Youtube } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [loadingIsMobile, setLoadingIsMobile] = useState(true);
  const router = useRouter();

  const quienesSomosRef = useRef<HTMLElement>(null);
  const serviciosRef = useRef<HTMLElement>(null);
  const contactoRef = useRef<HTMLElement>(null);
  const bioSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const originalScrollBehaviorRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (typeof document === "undefined") return;
      if (originalScrollBehaviorRef.current !== null) {
        document.documentElement.style.scrollBehavior = originalScrollBehaviorRef.current;
        originalScrollBehaviorRef.current = null;
      }
    };
  }, []);

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
    // Only run on client-side
    if (typeof window === "undefined") {
      return;
    }

    const checkIfMobile = () => {
      // Using 767px as the breakpoint for mobile
      const isMobileView = window.innerWidth <= 767;
      setIsMobile(isMobileView);
      setLoadingIsMobile(false);
    };

    // Initial check
    checkIfMobile();

    // Add resize event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Lower threshold to trigger earlier
      rootMargin: "0px 0px 3% 0px", // Positive margin to expand intersection area
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

    const createRevealObserver = (options: IntersectionObserverInit) =>
      new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      }, options);

    const bioObserver = createRevealObserver({ threshold: 0.2, rootMargin: "0px 0px 3% 0px" });
    const serviceObserver = createRevealObserver({ threshold: 0.2, rootMargin: "0px 0px 3% 0px" });

    const observeElements = (elements: (HTMLElement | null)[], observer: IntersectionObserver) => {
      elements.forEach((element) => {
        if (element) {
          element.classList.remove("fade-in-visible");
          observer.observe(element);
        }
      });
    };

    observeElements(bioSectionsRef.current, bioObserver);
    observeElements(serviceCardsRef.current, serviceObserver);

    return () => {
      bioObserver.disconnect();
      serviceObserver.disconnect();
    };
  }, [isMobile]);

  const smoothScrollTo = (targetY: number, duration = 500) => {
    if (typeof window === "undefined") return;

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo({
        top: startY + distance * easedProgress,
        left: 0,
      });

      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        left: 0,
      });
    }
  };

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleServiceDetail = (slug: string) => {
    if (typeof window !== "undefined") {
      // Save current scroll position
      sessionStorage.setItem("servicesScrollPosition", window.scrollY.toString());

      const html = document.documentElement;
      if (originalScrollBehaviorRef.current === null) {
        originalScrollBehaviorRef.current = html.style.scrollBehavior;
      }
      html.style.scrollBehavior = "auto";
    }
    router.push(`/servicios/${slug}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollPosition = sessionStorage.getItem("servicesScrollPosition");
      const urlParams = new URLSearchParams(window.location.search);
      const isFromService = urlParams.get("isFromService") === "true";

      if (isFromService && scrollPosition) {
        // Remove the parameter from URL without page reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);

        // Restore scroll position
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem("servicesScrollPosition");
      }
    }
  }, []);

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
    <div>
      <SiteHeader activeSection={activeSection} onNavigate={handleNavigation} />

      {/* Hero Section */}
      <section id="inicio" className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${loadingIsMobile ? "hidden" : ""}  ${isMobile ? "min-h-[75vh]" : "min-h-[85vh]"} flex items-center `}>
        <div className="absolute inset-0 -z-10">
          <img src="/a5603f_9b9a4f6c2c65443c87b9cd21b32ad319~mv2.avif" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/75 to-primary/75" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div
          className="max-w-7xl mx-auto"
          style={{
            maxWidth: "100%",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.1s", lineHeight: "0.8" }}>
              {"Estudio Conti & Nasif"}
            </h1>
            <p className={`text-md sm:text-lg text-primary-foreground/90 mb-10 text-pretty leading-relaxed fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
              Tu tranquilidad jurídica es nuestra prioridad. Combinamos experiencia, dedicación y estrategia para ofrecer soluciones legales efectivas y personalizadas.
            </p>
            <div className={`fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
              <Button size="lg" onClick={() => scrollToSection("contacto")} className="bg-accent text-accent-foreground hover:bg-accent/90 text-base py-7 min-w-[280px]">
                Solicitar consulta
              </Button>
            </div>
          </div>

          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in ${heroVisible ? "fade-in-visible" : ""}`} style={{ transitionDelay: "0.9s" }}>
            <button onClick={() => scrollToSection("quienes-somos")} className="mt-8 cursor-pointer animate-bounce w-12 h-12 flex items-center justify-center rounded-full mx-auto focus:outline-none focus:ring-2 focus:ring-primary-foreground/50" aria-label="Ir a Quiénes Somos">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section ref={quienesSomosRef} id="quienes-somos" className={`pt-30 pb-30 px-4 sm:px-6 lg:px-8 bg-white ${isMobile ? "" : "fade-in"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center mb-20">Quiénes somos</h2>
            <div className="space-y-20 text-muted-foreground leading-relaxed">
              <div
                ref={(el) => {
                  bioSectionsRef.current[0] = el;
                }}
                className={`flex flex-col lg:flex-row items-center gap-5 sm:gap-14 ${isMobile ? "fade-in" : ""}`}
              >
                <div className="w-full max-w-xs sm:max-w-sm lg:max-w-sm flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl shadow-xl ring-1 ring-border/70 aspect-[3/4]">
                    <img src="/law2-r.jpg" alt="Dr. Guillermo Conti" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="lg:hidden absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                    <div className="lg:hidden absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">Abogado</p>
                      <p className="font-serif text-2xl sm:text-3xl font-semibold mt-1 text-white">Dr. Guillermo Conti</p>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-6">
                  <div className="space-y-2 hidden lg:block">
                    <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs">Abogado</p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">Dr. Guillermo Conti</h3>
                  </div>
                  <p className="text-base sm:text-lg">Me especializo en litigios civiles y comerciales complejos. Cuento con más de 15 años de experiencia representando tanto a empresas como a particulares, siempre con un enfoque estratégico y orientado a resultados concretos.</p>
                  <p className="text-base sm:text-lg">Busco que cada cliente entienda su caso, las opciones disponibles y los pasos a seguir, combinando un análisis jurídico riguroso con una comunicación clara y cercana.</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://wa.me/{{TELEFONO_CONTI}}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Dr. Guillermo Conti">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="mailto:{{EMAIL_CONTI}}" aria-label="Email Dr. Guillermo Conti">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.youtube.com/{{YOUTUBE_CONTI}}" target="_blank" rel="noopener noreferrer" aria-label="YouTube Dr. Guillermo Conti">
                        <Youtube className="h-4 w-4" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  bioSectionsRef.current[1] = el;
                }}
                className={`flex flex-col lg:flex-row-reverse items-center gap-5 sm:gap-14 ${isMobile ? "fade-in" : ""}`}
              >
                <div className="w-full max-w-xs sm:max-w-sm lg:max-w-sm flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl shadow-xl ring-1 ring-border/70 aspect-[3/4]">
                    <img src="/law1-r.jpg" alt="Dr. Mariano Nasif" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="lg:hidden absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                    <div className="lg:hidden absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">Abogado</p>
                      <p className="font-serif text-2xl sm:text-3xl font-semibold mt-1 text-white">Dr. Mariano Nasif</p>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-6">
                  <div className="space-y-2 hidden lg:block">
                    <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs">Abogado</p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">Dr. Mariano Nasif</h3>
                  </div>
                  <p className="text-base sm:text-lg">Lidero el área de derecho laboral y asesoramiento preventivo. Acompaño a empresas y profesionales en la toma de decisiones clave, anticipando riesgos y diseñando políticas que protegen tanto a empleadores como a colaboradores.</p>
                  <p className="text-base sm:text-lg">Trabajo con empatía, precisión técnica y visión de negocio para construir relaciones de confianza y soluciones sostenibles a largo plazo.</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://wa.me/{{TELEFONO_NASIF}}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Dr. Mariano Nasif">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="mailto:{{EMAIL_NASIF}}" aria-label="Email Dr. Mariano Nasif">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.linkedin.com/{{LINKEDIN_NASIF}}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Dr. Mariano Nasif">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href="https://www.instagram.com/{{INSTAGRAM_NASIF}}" target="_blank" rel="noopener noreferrer" aria-label="Instagram Dr. Mariano Nasif">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
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
                  <Card className={`border border-border/60 bg-white shadow-lg hover:shadow-xl hover:border-accent transition-all duration-200 group h-full`}>
                    <CardContent className="pt-6 flex flex-col h-full">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-grow text-sm">{service.shortDescription}</p>
                      <p className="text-sm font-medium text-accent mb-4">{service.footer}</p>
                      <Button variant="outline" size="sm" onClick={() => handleServiceDetail(service.slug)} className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground cursor-pointer">
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
      <div id="contacto" />
      <section ref={contactoRef} className={`pt-30 pb-20 px-4 sm:px-6 lg:px-8 bg-white ${isMobile ? "" : "fade-in"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">Contacto</h2>
            <div className="text-center text-muted-foreground mb-12 leading-relaxed space-y-6">
              <p>Podés enviarnos tu consulta por WhatsApp y una persona del equipo te responderá a la brevedad.</p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-white text-[#25D366] border border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#1BAE4B]">
                  <a href="https://wa.me/{{TELEFONO}}" target="_blank" rel="noopener noreferrer" aria-label="Enviar consulta por WhatsApp" className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 360 362" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
                          fill="#25D366"
                        />
                      </svg>
                    </span>
                    <span>Enviar consulta por WhatsApp</span>
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="block h-px w-12 bg-border" />
                <span>o podes enviar tu consulta vía este formulario</span>
                <span className="block h-px w-12 bg-border" />
              </div>
            </div>

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

                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
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
      {/* <a href="https://wa.me/{{TELEFONO}}" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors z-40" aria-label="Abrir WhatsApp">
        <div
          style={{
            width: "32px",
            height: "32px",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 360 362" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
              fill="white"
            />
          </svg>
        </div>
      </a> */}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button onClick={() => router.push("#inicio")} className="fixed bottom-6 left-6 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 transition-all z-40" aria-label="Volver arriba">
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
