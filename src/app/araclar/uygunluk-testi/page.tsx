import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FitTest from "@/components/FitTest";
import FinalCta from "@/components/FinalCta";
import { FIT_PARTS, FIT_TOTAL } from "@/lib/fitTest";
import { sayiYaziyla } from "@/lib/tools/num";

/* Başlık ve spot cümle iki turdur değişiyor. Önce "Beş soru, tek öneri." idi
   ve sayfanın kendisiyle çelişiyordu: test tek bir öneri vermiyor, üç ülkeyi
   puanlayıp sıralıyor ve ikinciyle arasındaki farkı da yazıyor. Bir kısa liste
   aracının girişinde "tek öneri" demek, sonuç ekranında geri alınmak zorunda
   kalınan bir söz.

   SAYILAR ARTIK ELLE YAZILMIYOR VE SEBEBİ BU DOSYADA GÖRÜLDÜ. Bir tur önce
   buraya "yeni soru eklenirse burası da güncellenecek" diye not düşülmüştü;
   soru eklendi, burası güncellenmedi. Sonuç: sayfa "Dokuz soru, üç bölüm"
   diyordu, metadata "dokuz soruluk anket" diyordu, araç kayıt defteri "beş
   soru" diyordu ve lib/fitTest.ts on bir soru + dört bölüm taşıyordu. Aynı
   şeyin üç farklı sayısı ekrandaydı.

   Rakam artık kaynağından geliyor: FIT_TOTAL = FIT_QUESTIONS.length,
   FIT_PARTS.length de bölüm sayısı. Bileşen (FitTest.tsx) zaten bu kalıbı
   kullanıyordu; eskiyen tek yer düzyazıydı. Yazıya çevirmeyi tools/num.ts
   yapıyor, çünkü sitenin metin dili sayıyı rakamla değil yazıyla söylüyor.

   BAŞLIK SAYIYA DOKUNMUYOR ("Ülke uygunluk testi.") ve bu bilinçli: başlıkta
   sayı olmadığı için orada eskime riski yok. */
/* İkisi de cümle başında geçiyor, o yüzden SORU büyük harfle üretiliyor. */
const SORU = sayiYaziyla(FIT_TOTAL, true);
const BOLUM = sayiYaziyla(FIT_PARTS.length);

export const metadata: Metadata = {
  title: "Uygunluk testi · hangi ülke öne çıkıyor? | Ortac Global",
  description: `${SORU} soruluk anket, üç ülke: Dubai, İngiltere ve KKTC cevaplarınıza göre puanlanıyor. Sonuç bir kısa liste; ikinci sırayı ve aradaki farkı da gösteriyor.`,
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
          lead={`${SORU} soru, ${BOLUM} bölüm. Cevaplarınıza göre üç ülkeyi puanlıyor, yerinize karar vermiyor.`}
        />
        <FitTest />
        <FinalCta />
      </main>
    </>
  );
}
