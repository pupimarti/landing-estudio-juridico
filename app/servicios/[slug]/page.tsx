import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services, servicesMap } from "@/lib/services";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type ServicePageParams = {
  slug: string;
};

interface ServicePageProps {
  params: Promise<ServicePageParams>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesMap.get(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado | Estudio Conti & Nasif",
    };
  }

  return {
    title: `${service.title} | Estudio Conti & Nasif`,
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesMap.get(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className=" flex flex-col">
      <SiteHeader activeSection="servicios" />

      <main className="flex-1">
        <section className="relative overflow-hidden pt-30 pb-15 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <img src="/elegant-law-office-interior-with-wooden-bookshelve.jpg" alt="" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/60" />
          </div>

          <div className="max-w-5xl mx-auto text-center text-primary-foreground space-y-6">
            <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-primary-foreground/80 fade-in-down">Servicio legal</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-balance fade-in-down fade-in-down-delay-1">{service.title}</h1>
          </div>
        </section>

        <section className="pb-16 pt-8 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="pb-6 max-w-6xl mx-auto ">
            <Link href="/?isFromService=true" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </div>
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.7fr_1fr]">
            <article
              className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg fade-in-left"
              style={{
                maxWidth: "90vw",
              }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">Visión general del servicio</h2>
              {service.overview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>

            <aside className="space-y-6 fade-in-right fade-in-right-delay-1" style={{ maxWidth: "90vw" }}>
              <Card className="border-2 border-border bg-background">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground">¿Qué resolvemos?</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div>
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-dashed border-accent/50 bg-accent/10 fade-in-right fade-in-right-delay-2">
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">Coordinemos una consulta personalizada y empecemos a trabajar en tu caso hoy mismo.</p>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/?goToContact=true">{service.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* <div className="max-w-6xl mx-auto mt-16 fade-in-up fade-in-up-delay-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-8 text-center sm:text-left">Nuestra forma de trabajar</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.approach.map((step) => (
                <Card key={step.title} className="border-2 border-border h-full fade-in-up">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}

          {/* <div className="max-w-4xl mx-auto mt-16 fade-in-up fade-in-up-delay-2">
            <Card className="border-2 border-border bg-muted/40">
              <CardContent className="p-8 text-center sm:text-left space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground">Un plan claro para avanzar</h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{service.closing}</p>
              </CardContent>
            </Card>
          </div> */}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
