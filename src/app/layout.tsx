import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import MobilDeneme from "@/components/shared/MobilDeneme";
import BaslaKatmani from "@/components/basla/BaslaKatmani";
import Izleyici from "@/components/shared/Izleyici";
import EkranDisiDurdur from "@/components/shared/EkranDisiDurdur";

import { SITE } from "@/lib/routes";
import { OG_GORSEL } from "@/lib/seo";
/* Single font across the whole site (client call). Poppins carries every role —
   DISPLAY/SUBHEAD/BODY/UI by weight, DATA/TAG by weight + tracking. */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  /* 03.10.2026 · yeni konum (Murat Bey): muhasebe, vergi ve kurumsal
     danışmanlık firması; şirket kuruluşu hizmetlerden biri. Eskisi "Ortac
     Global — … Şirket Kuruluşu, Muhasebe, Banka" ve "Ülkeni seç, maliyetini
     gör, süreci anla." idi (uzun tire de vardı). */
  title: "Ortac Global | Muhasebe, Vergi ve Kurumsal Danışmanlık · Dubai, İngiltere, KKTC",
  description:
    "1996'dan beri muhasebe, vergi, şirket kuruluşu ve kurumsal danışmanlık. Dubai, İngiltere ve KKTC'de kendi ofislerimizle.",
  /* 09.10.2026 · teslim öncesi SEO turu. metadataBase yoktu: paylaşım görseli
     gibi göreli adresler dağıtımın geçici adresine çözülüyordu. Kalıcı adres
     ortacglobal.com (lib/routes · SITE). Varsayılan paylaşım etiketleri
     künyesini kendi yazmayan sayfalar için; görsel lib/seo · OG_GORSEL. */
  metadataBase: new URL(SITE),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ortac Global",
    title: "Ortac Global | Muhasebe, Vergi ve Kurumsal Danışmanlık",
    description:
      "1996'dan beri muhasebe, vergi, şirket kuruluşu ve kurumsal danışmanlık. Dubai, İngiltere ve KKTC'de kendi ofislerimizle.",
    images: [OG_GORSEL],
  },
  twitter: { card: "summary_large_image" },
};

/* JSON-LD: Organization + Service (3 areaServed). No AggregateRating — no verified reviews. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Ortac Global",
      url: "https://ortacglobal.com",
      foundingDate: "1996",
    },
    {
      "@type": "Service",
      name: "Muhasebe, vergi, şirket kuruluşu ve kurumsal danışmanlık",
      provider: { "@type": "Organization", name: "Ortac Global" },
      areaServed: [
        { "@type": "Place", name: "Dubai" },
        { "@type": "Place", name: "Birleşik Krallık" },
        { "@type": "Place", name: "KKTC" },
      ],
    },
  ],
};

/* SWAP:GTM_ID — GTM script omitted until the container ID arrives. */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={poppins.variable}
      /* telefon düzeni (css/mobil-deneme.css) bu işarete bağlı; 09.10.2026'da
         canlıya alındı. Silinirse telefon eski düzene döner (shared/MobilDeneme). */
      data-mobil="yeni"
    >
      {/* DESIGN SYSTEM KATMANLARI · 24.09.2026. İngiltere'de denenen dört
          katman (css/ds-deneme.css tipografi, ds-renk.css renk, ds-bosluk.css
          boşluk, ds-bilesen.css şekil/bileşen/etkileşim) sitenin geneline
          açıldı. Kurallar bu özniteliklere bağlı: bir katman beğenilmezse
          özniteliği silmek o katmanı bütün sitede eski hâline döndürür
          (Burak: "eski hâlini de aklında tut, belki bazı yerler garip gelir,
          direkt eskisini geri isterim"). Karar kaydı: docs/design-system. */}
      <body data-ds="v2" data-ds-renk="" data-ds-bosluk="" data-ds-bilesen="">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
          {/* /basla'ya giden her bağlantıyı sayfanın üstünde açılan pencereye
              çeviren dinleyici (07.10.2026 · gerekçe bileşenin başında) */}
          <BaslaKatmani />
          {/* telefon önerilerinin önce / sonra denemesi (08.10.2026 · /lab/mobil) */}
          <MobilDeneme />
          {/* ekranda olmayan bölümün CSS animasyonları durur (08.10.2026) */}
          <EkranDisiDurdur />
          {/* kendi izleyicimiz (08.10.2026 · lib/izleme.ts). Yalnız IZLEME_ACIK=1
              iken basılıyor: Vercel'de kapalı, kendi sunucumuzda açık. */}
          {process.env.IZLEME_ACIK === "1" && <Izleyici />}
        </Providers>
      </body>
    </html>
  );
}
