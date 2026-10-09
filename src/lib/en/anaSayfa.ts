/* kaynak: src/app/page.tsx · ozet: e43be7cd */
/* Ana sayfanın sayfa düzeyindeki İngilizce metni: künye, ülkeler bölümü ve
   kapanış. Bölümlerin kendi metinleri bileşen başına ayrı sözlükte
   (heroAkis, homeServices, trustLayer, profiles, chain, processScroll,
   homeFaq …).

   TÜRKÇE SAYFADAN FARKLAR (app/en/page.tsx)
     · ÜLKELER BÖLÜMÜ SADE. Türkçe sayfadaki yay + panel + kıyas tablosu
       (home/ThreeCountries, ~1100 satır, veriyle iç içe) yerine üç fotoğraflı
       ülke kartı (shared/UlkeFotoKartlar; Türkçe sayfanın telefonda bastığı
       kalıp). Kartların cümlesi burada.
     · BLOG BÖLÜMÜ YOK. Yazılar Türkçe; İngilizce yazı olunca gelir.
     · Kartlar ve bağlantılar şimdilik Türkçe sayfalara gidiyor.

   OLGULAR (Türkçe tarafla aynı, uydurma yok): 1996'dan beri (30 yıl); üç
   ülkede kendi ofis (Dubai, Londra, Lefkoşa); Dubai'de IFZA, Meydan ve DWTC
   iş ortağı, kuruluş IFZA $5.120'den, 5-6 gün; İngiltere tek fiyat (rakam
   yazılmıyor), 3-7 gün; KKTC Serbest Liman şirketi €9.920 ilk yıl dahil,
   30-40 iş günü. */
import type { CountrySlug } from "@/lib/brand";

export const EN_ANA_SAYFA = {
  kunye: {
    title: "Ortac Global | Accounting, Tax and Corporate Advisory · Dubai, UK, Northern Cyprus",
    description:
      "Accounting, tax, company formation and corporate advisory since 1996, from our own offices in Dubai, London and Nicosia.",
    /* paylaşım görselinin alt metni (lib/seo · OG_GORSEL.alt karşılığı) */
    gorselAlt: "Ortac Global: accounting, tax and corporate advisory. Dubai, UK, Northern Cyprus.",
  },
  ulkeler: {
    title: "Three countries, our own offices.",
    accent: "our own offices.",
    lead: "We work from our own offices in Dubai, London and Nicosia. Open a country to see what setting up there involves.",
    kartlar: [
      {
        slug: "dubai",
        ad: "Dubai",
        cip: "Free zone",
        line: "IFZA, Meydan and DWTC partner. Formation from $5,120 with IFZA, set up in 5-6 days.",
      },
      {
        slug: "ingiltere",
        ad: "United Kingdom",
        cip: "Remote setup",
        line: "Limited company through Companies House. One fixed price, set up in 3-7 days.",
      },
      {
        slug: "kktc",
        /* ad + çip tek satıra sığsın: tam ad çipte ("TRNC"), yapı cümlede */
        ad: "Northern Cyprus",
        cip: "TRNC",
        line: "Free Port and Zone company. €9,920 with the first year included, 30-40 working days.",
      },
    ] satisfies { slug: CountrySlug; ad: string; cip: string; line: string }[],
    kiyas: "Compare the three countries",
  },
  kapanis: {
    title: "Let's talk about your international business.",
    accent: "international business.",
    cta: "Our areas of expertise",
  },
};
