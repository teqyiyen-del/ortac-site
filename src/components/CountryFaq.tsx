"use client";

import SssAkordeon from "@/components/shared/SssAkordeon";
import type { Faq } from "@/lib/countryContent";

/* Ülke, hizmet ve sektör sayfalarının SSS'si.

   25.09.2026 · Blok ana sayfayla birlikte değişti: solda soru listesi +
   sağda siyah cevap paneli yerine tam genişlikte açılır kutular (/lab/sss S1,
   components/shared/SssAkordeon). Burak: "cevap kısmı siyah üzerinde … uymuyor
   … S1'i full genişlikte yaparsın, kendi aşağılarında açılırlar."

   Veride yalnız soru ve cevap var (Faq: { q, a }); her sorunun başındaki
   renkli konu işareti sorunun kelimelerinden çıkarılıyor (konuBul). Props
   hâlâ { items }: çağıran onlarca sayfa değişmedi. */
export default function CountryFaq({ items }: { items: Faq[] }) {
  return <SssAkordeon items={items} placement="sss_ulke" cta="Görüşme planlayın" />;
}
