import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import MobilDeneme from "@/components/shared/MobilDeneme";
import BaslaKatmani from "@/components/basla/BaslaKatmani";
import Izleyici from "@/components/shared/Izleyici";
import EkranDisiDurdur from "@/components/shared/EkranDisiDurdur";

import { SITE } from "@/lib/routes";
import { KURUM_ID, OG_GORSEL } from "@/lib/seo";
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
    /* 09.10.2026 · SEO rehberi denetimi: kurum düğümünün kimliği (@id),
       logosu ve sosyal hesapları yoktu; site düğümü (WebSite) hiç yoktu.
       Öteki sayfalar kurumu bu @id ile gösteriyor (lib/seo · KURUM_ID).
       Sosyal hesaplar Footer.tsx · SOSYAL ile aynı liste. */
    {
      "@type": "Organization",
      "@id": KURUM_ID,
      name: "Ortac Global",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/ortac-logo.png` },
      foundingDate: "1996",
      founder: { "@type": "Person", name: "Murat Ortaç" },
      sameAs: [
        "https://www.instagram.com/ortacglobal/",
        "https://www.linkedin.com/company/ortacglobal",
        "https://www.youtube.com/@OrtacGlobal",
        "https://www.facebook.com/ortacglobal/",
        "https://www.tiktok.com/@ortacglobal",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: "Ortac Global",
      inLanguage: "tr-TR",
      publisher: { "@id": KURUM_ID },
    },
    {
      "@type": "Service",
      name: "Muhasebe, vergi, şirket kuruluşu ve kurumsal danışmanlık",
      provider: { "@id": KURUM_ID },
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
      {/* 09.10.2026 · denetim: 36 sayfa Unsplash'ten önden görsel yüklüyor
          ama sunucuya ön bağlantı yoktu (React 19 <link>'i <head>'e taşıyor) */}
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <body data-ds="v2" data-ds-renk="" data-ds-bosluk="" data-ds-bilesen="">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* klavyeyle gelen menüyü atlayıp içeriğe insin (globals · .icerige-gec) */}
        <a href="#icerik" className="icerige-gec">
          İçeriğe geç
        </a>
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
