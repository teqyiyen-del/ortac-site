import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

/* Single font across the whole site (client call). Poppins carries every role —
   DISPLAY/SUBHEAD/BODY/UI by weight, DATA/TAG by weight + tracking. */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Ortac Global — Dubai, İngiltere ve KKTC'de Şirket Kuruluşu, Muhasebe, Banka",
  description:
    "Ülkeni seç, maliyetini gör, süreci anla. Kuruluş, muhasebe ve banka hesabı tek elden: Dubai, İngiltere ve KKTC.",
};

/* JSON-LD: Organization + Service (3 areaServed). No AggregateRating — no verified reviews. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Ortac Global",
      url: "https://ortacglobal.com",
    },
    {
      "@type": "Service",
      name: "Yurt dışında şirket kuruluşu, muhasebe ve banka hesabı",
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
    <html lang="tr" className={poppins.variable}>
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
