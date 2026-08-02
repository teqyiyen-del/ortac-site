import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FitTest from "@/components/FitTest";
import FinalCta from "@/components/FinalCta";

/* Başlık ve spot cümle bu turda değişti. Eskisi "Beş soru, tek öneri." idi ve
   sayfanın kendisiyle çelişiyordu: test tek bir öneri vermiyor, üç ülkeyi
   puanlayıp sıralıyor ve ikinciyle arasındaki farkı da yazıyor. Bir kısa liste
   aracının girişinde "tek öneri" demek, sonuç ekranında geri alınmak zorunda
   kalınan bir söz. */
export const metadata: Metadata = {
  title: "Uygunluk testi — hangi ülke öne çıkıyor? | Ortac Global",
  description:
    "Beş soru, üç ülke: Dubai, İngiltere ve KKTC cevaplarınıza göre puanlanıyor. Sonuç bir kısa liste — ikinci sırayı ve aradaki farkı da gösteriyor.",
};

export default function UygunlukTestiPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Araçlar · Uygunluk testi"
          title="Beş soru, kısa bir liste."
          accent="kısa bir liste."
          lead="Müşterilerinizin nerede olduğu, ne sattığınız ve süreç için seyahat edip edemeyeceğiniz üç ülkeden hangisinin işinize yaradığını değiştiriyor. Test bunu puanlıyor, yerinize karar vermiyor: ikinci sırayı ve aradaki farkı da gösteriyor."
        />
        <FitTest />
        <FinalCta />
      </main>
    </>
  );
}
