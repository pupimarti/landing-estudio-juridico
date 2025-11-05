import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services, servicesMap } from "@/lib/services";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      <SiteHeader activeSection="servicios" />

      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <img src="/elegant-law-office-interior-with-wooden-bookshelve.jpg" alt="" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/60" />
          </div>

          <div className="max-w-5xl mx-auto text-center text-primary-foreground space-y-6">
            <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-primary-foreground/80 fade-in-up">Servicio legal</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-balance fade-in-up fade-in-up-delay-1">{service.title}</h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto fade-in-up fade-in-up-delay-2">{service.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/#contacto">Solicitar consulta</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary">
                <Link href="/#servicios">Volver a servicios</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.7fr_1fr]">
            <article className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg fade-in-up">
              {service.overview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>

            <aside className="space-y-6 fade-in-up fade-in-up-delay-1">
              <Card className="border-2 border-border bg-background">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground">¿Qué resolvemos?</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-dashed border-accent/50 bg-accent/10">
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">Coordinemos una consulta personalizada y empecemos a trabajar en tu caso hoy mismo.</p>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/#contacto">{service.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>

          <div className="max-w-6xl mx-auto mt-16 fade-in-up fade-in-up-delay-1">
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
          </div>

          <div className="max-w-4xl mx-auto mt-16 fade-in-up fade-in-up-delay-2">
            <Card className="border-2 border-border bg-muted/40">
              <CardContent className="p-8 text-center sm:text-left space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground">Un plan claro para avanzar</h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{service.closing}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
