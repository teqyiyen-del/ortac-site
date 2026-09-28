import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ThreeCountries from "@/components/home/ThreeCountries";
import { HeroE1, HeroE2, HeroE3 } from "@/components/lab/KurumsalHeroAdaylari";

/* LAB · /lab/hero-kurumsal/e1 · e2 · e3 — aday GERÇEK menüyle, tam ekran
   (28.09.2026). Lab şeridi bu sayfada gizli (css/lab-hero-kurumsal.css ·
   :has(.lhe-sayfa)); altında ana sayfanın ikinci bölümü, geçiş görünsün. */
const ADAY = { e1: HeroE1, e2: HeroE2, e3: HeroE3 } as const;
type Params = Promise<{ aday: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(ADAY).map((aday) => ({ aday }));
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { aday } = await params;
  return { title: `Ana sayfa girişi · ${aday.toUpperCase()} | Ortac Global` };
}

export default async function Page({ params }: { params: Params }) {
  const { aday } = await params;
  const Hero = ADAY[aday as keyof typeof ADAY];
  if (!Hero) notFound();
  return (
    <div className="lhe-sayfa">
      <Nav />
      <main>
        <Hero />
        <ThreeCountries />
      </main>
    </div>
  );
}
