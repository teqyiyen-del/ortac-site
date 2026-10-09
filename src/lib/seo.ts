/* SAYFA KÜNYESİ · kanonik + paylaşım etiketleri tek yerden (09.10.2026)

   Teslim öncesi SEO turunda ölçüldü: 14 sayfada kanonik yoktu (ana sayfa, üç
   ülke sayfası, /ulkeler, dokuz hizmet sayfası) ve 26 sayfada paylaşım
   etiketi (og:title, og:description, og:url) hiç basılmıyordu. Sebep aynı:
   her sayfa künyesini elle yazıyor, unutulan alan sessizce boş kalıyor.

   Bu yardımcı bir sayfanın başlığından, açıklamasından ve yolundan tam
   künyeyi üretir. Kanonik MUTLAK yazılıyor (lib/routes · SITE): site geçici
   adresteyken de kalıcı adresi gösterir.

   PAYLAŞIM GÖRSELİ (OG_GORSEL · public/og.png, 1200x630). Kökteki künyede
   varsayılan olarak duruyor ama Next'te `openGraph` yazan her sayfa üstteki
   `openGraph`'ı TÜMÜYLE eziyor (sığ birleştirme): kendi paylaşım etiketini
   yazan sayfa görseli de kendi yazmak zorunda. O yüzden sabit buradan
   dışa açılıyor ve `openGraph` yazan her sayfa `images: [OG_GORSEL]` taşıyor. */
import type { Metadata } from "next";
import { SITE } from "@/lib/routes";

/** kurum düğümünün kimliği; kökteki JSON-LD'de tanımlı (app/layout.tsx).
 *  Sayfalar yayıncıyı ve sağlayıcıyı `{ "@id": KURUM_ID }` ile gösterir. */
export const KURUM_ID = `${SITE}/#kurum`;

/** SSS düğümü: ekranda soru-cevap basan her sayfa aynısını veri olarak da basar */
export const sssDugumu = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** kırıntı düğümü: [ad, yol] çiftleri, ilki ana sayfa */
export const kirintiDugumu = (adimlar: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: adimlar.map(([name, yol], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${yol === "/" ? "/" : yol}` })),
});

export const OG_GORSEL = {
  url: `${SITE}/og.png`,
  width: 1200,
  height: 630,
  alt: "Ortac Global: muhasebe, vergi ve kurumsal danışmanlık. Dubai, İngiltere, KKTC.",
};

export function sayfaKunye({
  title,
  description,
  yol,
  dizinDisi,
}: {
  title: string;
  description: string;
  /** "/" ile başlayan sayfa yolu; ana sayfa için "/" */
  yol: string;
  /** yayında olmayan ya da yalnız örnek içerik taşıyan sayfa */
  dizinDisi?: boolean;
}): Metadata {
  const url = yol === "/" ? `${SITE}/` : `${SITE}${yol}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", siteName: "Ortac Global", url, title, description, images: [OG_GORSEL] },
    twitter: { card: "summary_large_image", title, description },
    ...(dizinDisi ? { robots: { index: false, follow: true } } : {}),
  };
}
