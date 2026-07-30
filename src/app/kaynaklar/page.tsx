import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import ContentHub from "@/components/ContentHub";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Kaynaklar — Rehberler ve mevzuat | Ortac Global",
  description:
    "Ülke rehberleri, mevzuat güncellemeleri ve pratik cevaplar; her yazıda kaynak ve güncelleme tarihi belirtilir.",
};

export default function KaynaklarPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Kaynaklar"
          title="Rehberler, mevzuat ve pratik cevaplar."
          accent="pratik cevaplar."
          lead="Her yazıda kaynak ve güncelleme tarihi belirtilir. Mevzuat değiştiğinde yazı da güncellenir."
        />
        <ContentHub />
        <FinalCta />
      </main>
    </>
  );
}
