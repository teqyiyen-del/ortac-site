import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import CountryFaq from "@/components/CountryFaq";
import { HizmetS1, HizmetS2, HizmetS3, HizmetS4, HizmetS5 } from "@/components/lab/HizmetHeroAdaylari";
import { COUNTRY_CONTENT } from "@/lib/countryContent";

/* LAB · /lab/hizmet-hero/s1 · s2 · s3 — aday GERÇEK menüyle, tam ekran
   (05.10.2026). Lab şeridi gizli, menü açık zeminde koyu yazıyla
   (css/lab-hizmet-hero.css · :has(.lhz-sayfa)). Altında Dubai sayfasının
   SSS'si, girişten sonraki geçiş görünsün. */
const ADAY = { s1: HizmetS1, s2: HizmetS2, s3: HizmetS3, s4: HizmetS4, s5: HizmetS5 } as const;
type Params = Promise<{ aday: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(ADAY).map((aday) => ({ aday }));
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { aday } = await params;
  return { title: `Hizmet girişi · ${aday.toUpperCase()} | Ortac Global` };
}

export default async function Page({ params }: { params: Params }) {
  const { aday } = await params;
  const Hero = ADAY[aday as keyof typeof ADAY];
  if (!Hero) notFound();
  return (
    <div className="lhz-sayfa">
      <Nav />
      <main>
        <Hero />
        <section className="sec-pad" style={{ background: "var(--paper)" }}>
          <div className="container-o">
            <CountryFaq items={COUNTRY_CONTENT.dubai.faq} />
          </div>
        </section>
      </main>
    </div>
  );
}
