import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import PageHero from "@/components/shared/PageHero";
import FinalCta from "@/components/FinalCta";
import ToolShell from "@/components/tools/ToolShell";
import KurumlarVergisi from "@/components/tools/KurumlarVergisi";
import { COUNTRY_ORDER, type CountrySlug } from "@/lib/brand";
import { TOOL_BY_ID, kvHref } from "@/lib/tools/catalog";
import { SITE } from "@/lib/routes";
import { KV_SAYFA } from "../icerik";

/* ============================================================================
   /araclar/kurumlar-vergisi/<ülke> — ülke başına kurumlar vergisi sayfası
   ============================================================================

   11.09.2026 · araç dili turu. Müşteri: "kurumlar vergisi hesaplayıcıya tek
   tuşla girilsin evet ama içerden ülkeye göre ayrılsın ve link değişsin
   istiyorum. google a hepsini ayrı ayrı indexlemek istiyorum."

   ÜÇ SAYFA, TEK DOSYA. Slug kümesi brand.ts · COUNTRY_ORDER; adres kuralı
   catalog.ts · kvHref; metin ../icerik.ts. Hiçbiri bu dosyada elle yazılı
   değil, yani dördüncü bir ülke eklendiği gün sayfası, adresi (routes.ts
   döngüsü) ve site haritası (sitemap.ts) birlikte doğuyor.

   dynamicParams = false: kümenin dışındaki bir slug 404. Bu depoda sayfası
   olmayan adres app/[...yapim] yakalayıcısına düşüp 200 dönüyordu (tuzak M);
   burada Next yakalayıcıya düşmeden 404 veriyor. Ölçüldü (curl):
   /araclar/kurumlar-vergisi/almanya → 404.

   İSKELET — uygunluk testiyle AYNI AİLE (app/araclar/uygunluk-testi):
     Nav
     PageHero   kompakt, yıldızlı gece; kırıntı + TEK <h1> (ülkeyi söylüyor)
                + tek cümle
     ToolShell  aracın bölümü (iki panelli kart + açılırlar), SSS, kardeşler
     FinalCta
   Başlık bir slogan değil sayfanın adı: müşterinin uygunluk testinde koyduğu
   kural ("ülke uygunluk testi yaz, altına da kısa açıklama at geç").

   ARACIN ANAHTARI ÜLKE (`key={ulke}`): ülke bağlantısıyla sayfa değişince
   bileşen sıfırdan kuruluyor. İki sonucu var ve ikisi de istenen şey: tutar
   ülkeler arasında taşınmıyor (para birimi farklı) ve kartın giriş
   animasyonu yeniden oynuyor (ülke değişimi görünür oluyor).
   ========================================================================= */

export const dynamicParams = false;

type Params = Promise<{ ulke: string }>;

export function generateStaticParams() {
  return COUNTRY_ORDER.map((ulke) => ({ ulke }));
}

const ulkeMi = (s: string): s is CountrySlug => (COUNTRY_ORDER as string[]).includes(s);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { ulke } = await params;
  if (!ulkeMi(ulke)) return {};
  const m = KV_SAYFA[ulke];
  /* Kanonik mutlak: layout.tsx'te metadataBase yok, göreli bir kanonik
     geliştirme sunucusunun adresine çözülürdü. Kök adres routes.ts · SITE. */
  const url = `${SITE}${kvHref(ulke)}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url },
    openGraph: {
      /* "article" DEĞİL: sayfa bir yazı değil bir araç. [arac] rotası
         "article" basıyor; o bir önceki turun kararı ve bu turun dosyası
         olmadığı için değiştirilmedi. */
      type: "website",
      locale: "tr_TR",
      siteName: "Ortac Global",
      url,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function KurumlarVergisiUlkePage({ params }: { params: Params }) {
  const { ulke } = await params;
  if (!ulkeMi(ulke)) notFound();
  const m = KV_SAYFA[ulke];

  /* FAQPage — EKRANDAKİ SSS'NİN TA KENDİSİ. Aynı `m.sss` dizisi aşağıda
     kabuğa gidiyor; soru ve cevap metni iki yerde ayrışamıyor. Kabuk bir
     istemci bileşeni olduğu için yapılandırılmış veri burada, sunucuda
     basılıyor (app/dubai/muhasebe'deki kalıp). BreadcrumbList bilerek YOK:
     kırıntının ara halkası /araclar ve o dizin dolaşıma kapalı (durum.md ·
     B15); yapılandırılmış veride kapalı bir sayfayı göstermek yanlış sinyal. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.sss.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Nav />
      <main>
        {m.sss.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <PageHero crumb={m.crumb} title={m.h1} accent={m.accent} lead={m.lead} />
        <ToolShell tool={TOOL_BY_ID["kurumlar-vergisi"]} sss={m.sss} sssGiris={m.sssGiris}>
          <KurumlarVergisi key={ulke} ulke={ulke} />
        </ToolShell>
        <FinalCta />
      </main>
    </>
  );
}
