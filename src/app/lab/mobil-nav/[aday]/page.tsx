import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ThreeCountries from "@/components/home/ThreeCountries";
import HomeServices from "@/components/home/HomeServices";
import ProcessScroll from "@/components/ProcessScroll";
import Footer from "@/components/Footer";
import MobilNavAdayi, { type MobilNavAday } from "@/components/lab/MobilNavAdaylari";

/* LAB · /lab/mobil-nav/n1 · n2 · n3 — aday menü GERÇEK sayfanın üstünde
   (25.09.2026). Telefonda denenmesi için tam ekran: canlı <Nav /> yerine
   aday basılıyor, altında ana sayfanın ilk dört bölümü (koyu hero'da saydam
   çubuk, kaydırınca beyaz çubuk ve saklanma aynen görülsün). Lab şeridi bu
   sayfada gizli (css/lab-mobil-nav.css · :has(.lmn-sayfa)). */

const ADAYLAR: readonly MobilNavAday[] = ["n1", "n2", "n3"];
type Params = Promise<{ aday: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return ADAYLAR.map((aday) => ({ aday }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { aday } = await params;
  return { title: `Mobil menü · ${aday.toUpperCase()} | Ortac Global` };
}

export default async function Page({ params }: { params: Params }) {
  const { aday } = await params;
  const secili = ADAYLAR.find((a) => a === aday);
  if (!secili) notFound();
  return (
    <div className="lmn-sayfa" data-aday={secili}>
      <MobilNavAdayi aday={secili} />
      <main>
        <Hero />
        <ThreeCountries />
        <HomeServices />
        <ProcessScroll />
      </main>
      <Footer />
    </div>
  );
}
