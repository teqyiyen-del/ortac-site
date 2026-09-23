/* /basla — SİTENİN ANA EYLEM ÇAĞRISININ İNİŞ SAYFASI, HENÜZ TASLAK.

   Kurulum akışı yazılmadı. Sayfa duruyor çünkü menüdeki, hero'daki ve her
   sayfanın altındaki "Kurulumu Başlat" düğmesi buraya bakıyor; kapatılsaydı
   sitenin en görünür düğmesi sönük bir yazıya dönerdi (lib/routes.ts).

   BU TURDA DÜZELTİLEN DÖRT ŞEY:

   1) METADATA VE noindex. Sayfanın kendi metadata'sı yoktu, yani kök
      layout'un başlığını miras alıyordu ve arama motoruna AÇIKTI. Yarım bir
      taslağın arama sonucunda "Ortac Global" başlığıyla çıkması, sitenin
      tamamını yarım gösterir. Artık kendi başlığı var ve robots index:false.
      follow:false de bilerek: sayfada gezilecek bir şey yok.

   2) GELİŞTİRİCİ METNİ EKRANDAN KALKTI. Ekranda üç cümle vardı ve üçü de
      ziyaretçiye değil bize yazılmıştı: "Kurulum akışı Faz 1'de inşa
      edilecek.", "Seçimlerin başarıyla taşındı:", "Parametre yok:
      anasayfadaki karttan gel." Sonuncusunun işaret ettiği kart artık YOK
      (HeroWizard.tsx ölü dosya), yani cümle var olmayan bir yere
      yönlendiriyordu. "Faz" jargonu da gitti: ziyaretçi bizim iş planımızı
      bilmiyor, bilmesi de gerekmiyor.

   3) NAV VE FINALCTA EKLENDİ. Sayfa menüsüzdü: buraya düşen ziyaretçinin
      tek çıkışı "Anasayfaya dön" bağlantısıydı, yani sitenin tamamı tek bir
      geri adıma sıkışıyordu. Artık üstte tam menü, altta sitenin kapanış
      bloğu ve dizini var.

   4) DİL SİZ'Lİ. Site her yerde siz diyor; bu sayfa sen diyordu.

   DEĞİŞMEYEN: akış yeniden yazılmadı ve rota routes.ts'ten çıkarılmadı.
   Sorgu parametrelerini okuyan blok da duruyor (bugün kimse parametre
   göndermiyor ama akış yazıldığında ilk bağlanacak yer orası). */

import type { Metadata } from "next";

import Nav from "@/components/Nav";
import FinalCta from "@/components/FinalCta";
import { ArrowRight } from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";

export const metadata: Metadata = {
  title: "Kurulumu başlat | Ortac Global",
  description:
    "Kurulum akışı henüz açılmadı. Bu sayfa yayına hazır olduğunda kuruluş adımları buradan yürüyecek.",
  /* Taslak sayfa aramaya kapalı. Kanonik YAZILMIYOR: dizine girmeyecek bir
     adres için kanonik bildirmek, iki karşıt sinyal göndermek olurdu. */
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const LABELS: Record<string, string> = {
  ulke: "Ülke",
  faaliyet: "Faaliyet",
  banka: "Banka hesabı",
  paket: "Paket",
};

export default async function BaslaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const entries = Object.entries(params).filter(
    (pair): pair is [string, string] => typeof pair[1] === "string",
  );

  return (
    <>
      <Nav />
      <main>
        {/* 24.09.2026 · SAYFA 404'ÜN GECE KALIBINA GEÇTİ (hata.css · .hta).
            Önceki hâl açık zeminde (--paper) kenar boşluksuz bir karttı:
            menü saydam ve logosu beyaz olduğu için telefonda logo zeminde
            kayboluyordu, kart da ekranın iki kenarına yapışıyordu (390 px
            taraması). Sitenin her sayfası gece bir başlıkla açılıyor; bu
            sayfa da artık öyle. Metin ve iki çıkış aynı. */}
        <section className="ph phg hta">
          <div className="phg-bg" data-zemin="yildiz" aria-hidden="true" data-yaricap="serbest">
            <span className="phy-yildiz phy-yildiz-b" />
            <span className="phy-yildiz phy-yildiz-a" />
            <div className="phg-glow" />
          </div>

          <div className="container-o hta-in">
            <p className="hta-kod">Başla · yapım aşamasında</p>
            <h1 className="ph-title">Kurulum akışı henüz açılmadı.</h1>
            {/* Üç geliştirici cümlesinin yerine tek cümle, ve o cümle bir
                şey YAPTIRIYOR: ziyaretçiyi gerçekten çalışan kanallara
                gönderiyor. İletişim sayfasında üç ofisin telefonu, WhatsApp
                hattı ve e-postası açık (lib/offices.ts). */}
            <p className="ph-lead">
              Bu adım açılana kadar kuruluşu konuşmanın en hızlı yolu iletişim sayfasındaki
              telefon, WhatsApp ve e-posta hatları.
            </p>

            {/* PARAMETRE BLOĞU KALDI AMA BOŞ DURUMU EKRANA ÇIKMIYOR. Eskiden
                parametre yokken "anasayfadaki karttan gel" yazıyordu; o kart
                kaldırıldı, yani cümle olmayan bir yere yolluyordu. Bugün
                parametre gelmiyor, blok da hiç basılmıyor. */}
            {entries.length > 0 && (
              <div style={{ marginTop: 20, width: "100%", maxWidth: 420 }}>
                <p style={{ fontSize: 14, color: "var(--on-dark-2)" }}>
                  Yanınızda getirdiğiniz seçimler:
                </p>
                {entries.map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--line-dark)",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: "var(--on-dark-2)" }}>{LABELS[key] ?? key}</span>
                    <span className="data" style={{ color: "var(--on-dark)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="hta-eylem">
              <SmartLink href="/iletisim" className="btn btn-primary">
                İletişim sayfası
                <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
              </SmartLink>
              <SmartLink href="/" className="btn btn-ghost">
                Ana sayfaya dön
              </SmartLink>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
