import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FitTest from "@/components/FitTest";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Uygunluk testi — Hangi ülke size uygun? | Ortac Global",
  description:
    "Beş soruda Dubai, İngiltere ve KKTC arasında hangisinin size uyduğunu görün. Sonuç, seçimlerinize göre puanlanır.",
};

export default function UygunlukTestiPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Araçlar · Uygunluk testi"
          title="Beş soru, tek öneri."
          accent="tek öneri."
          lead="Nerede yaşadığınız, ne sattığınız ve nasıl tahsilat yaptığınız üç ülkeden hangisinin işinize yaradığını değiştirir."
        />
        <FitTest />
        <FinalCta />
      </main>
    </>
  );
}
