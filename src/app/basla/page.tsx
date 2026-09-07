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
        {/* Yükseklik 100dvh DEĞİL. Öyleydi ve altına kapanış bloğu koyunca
            ziyaretçi bir ekran boyu boşluğu geçmeden dizini göremezdi.
            Bölüm dolgusu sitenin kendi değişkeninden geliyor. */}
        <section
          className="sec-pad"
          style={{
            background: "var(--paper)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 460,
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-card)",
              padding: 28,
            }}
          >
            <p className="tag" style={{ fontSize: 11, color: "var(--blue-700)" }}>
              Başla · yapım aşamasında
            </p>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                fontSize: 22,
                lineHeight: 1.2,
                marginTop: 12,
                color: "var(--text-900)",
              }}
            >
              Kurulum akışı henüz açılmadı.
            </h1>
            {/* Üç geliştirici cümlesinin yerine tek cümle, ve o cümle bir
                şey YAPTIRIYOR: ziyaretçiyi gerçekten çalışan kanallara
                gönderiyor. İletişim sayfasında üç ofisin telefonu, WhatsApp
                hattı ve e-postası açık (lib/offices.ts). */}
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-600)",
                marginTop: 8,
              }}
            >
              Bu adım açılana kadar kuruluşu konuşmanın en hızlı yolu iletişim sayfasındaki
              telefon, WhatsApp ve e-posta hatları.
            </p>

            {/* PARAMETRE BLOĞU KALDI AMA BOŞ DURUMU EKRANA ÇIKMIYOR. Eskiden
                parametre yokken "anasayfadaki karttan gel" yazıyordu; o kart
                kaldırıldı, yani cümle olmayan bir yere yolluyordu. Bugün
                parametre gelmiyor, blok da hiç basılmıyor. */}
            {entries.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, color: "var(--text-600)" }}>
                  Yanınızda getirdiğiniz seçimler:
                </p>
                {entries.map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: "var(--text-600)" }}>{LABELS[key] ?? key}</span>
                    <span className="data" style={{ color: "var(--text-900)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
              <SmartLink
                href="/iletisim"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--blue-700)",
                  textDecoration: "none",
                }}
              >
                İletişim sayfası
              </SmartLink>
              <SmartLink
                href="/"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-600)",
                  textDecoration: "none",
                }}
              >
                Anasayfaya dön
              </SmartLink>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
