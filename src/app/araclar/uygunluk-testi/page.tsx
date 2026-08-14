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
        {/* BAŞLIK SAYFANIN ADI, SLOGAN DEĞİL. Önce "Dokuz soru, kısa bir liste."
            yazıyordu ve altında beş satırlık bir paragraf vardı; müşteri ikisini
            birden kesti: "sayfalara neden bu kadar jenerik başlık yazmaya
            çalışıyon? ülke uygunluk testi yaz, altına da kısa açıklama at geç,
            bu kadar şova girmene gerek yok."
            Aksan "uygunluk testi"nde: vurgulanacak şey sayfanın ne olduğu.
            Açıklama 337 karakterden 88'e indi; testin nasıl puanladığı zaten
            testin kendi ekranlarında yazıyor. */}
        <PageHero
          crumb="Araçlar · Uygunluk testi"
          title="Ülke uygunluk testi."
          accent="uygunluk testi."
          lead="Dokuz soru, üç bölüm. Cevaplarınıza göre üç ülkeyi puanlıyor, yerinize karar vermiyor."
        />
        <FitTest />
        <FinalCta />
      </main>
    </>
  );
}
