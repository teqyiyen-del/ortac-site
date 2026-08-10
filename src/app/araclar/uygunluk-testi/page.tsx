import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FitTest from "@/components/FitTest";
import FinalCta from "@/components/FinalCta";

/* Başlık ve spot cümle iki turdur değişiyor. Önce "Beş soru, tek öneri." idi
   ve sayfanın kendisiyle çelişiyordu: test tek bir öneri vermiyor, üç ülkeyi
   puanlayıp sıralıyor ve ikinciyle arasındaki farkı da yazıyor. Bir kısa liste
   aracının girişinde "tek öneri" demek, sonuç ekranında geri alınmak zorunda
   kalınan bir söz.

   BU TURDA sayı değişti: anket beş sorudan dokuza çıktı (üç bölüm). Rakamın
   sayfanın üç yerinde (başlık, spot, açıklama) elle yazılı olması bir risk,
   ama FIT_TOTAL'i metne gömmek de başlığı bir hesaplamaya çeviriyordu; yeni
   soru eklenirse burası da güncellenecek. */
export const metadata: Metadata = {
  title: "Uygunluk testi · hangi ülke öne çıkıyor? | Ortac Global",
  description:
    "Dokuz soruluk anket, üç ülke: Dubai, İngiltere ve KKTC cevaplarınıza göre puanlanıyor. Sonuç bir kısa liste; ikinci sırayı ve aradaki farkı da gösteriyor.",
};

export default function UygunlukTestiPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          crumb="Araçlar · Uygunluk testi"
          title="Dokuz soru, kısa bir liste."
          accent="kısa bir liste."
          lead="Müşterilerinizin nerede olduğu, parayı nasıl tahsil ettiğiniz, banka tarafında ne istediğiniz ve süreç için seyahat edip edemeyeceğiniz üç ülkeden hangisinin işinize yaradığını değiştiriyor. Anket bunu üç bölümde puanlıyor, yerinize karar vermiyor: ikinci sırayı, aradaki farkı ve her cevabın kaç puan getirdiğini de gösteriyor."
        />
        <FitTest />
        <FinalCta />
      </main>
    </>
  );
}
