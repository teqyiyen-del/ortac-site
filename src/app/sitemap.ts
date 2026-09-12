import type { MetadataRoute } from "next";
import { LEGACY_GUIDES_HREF, postFor } from "@/lib/blog";
import { LIVE_ROUTES, SITE } from "@/lib/routes";
import { KV_KOK } from "@/lib/tools/catalog";

/* ============================================================================
   /sitemap.xml — SİTE HARİTASI
   ============================================================================

   11.09.2026 · araç dili turu. Müşteri: "google a hepsini ayrı ayrı
   indexlemek istiyorum dubai kurumlar vergisi, ingiltere kurumlar
   vergisi..." Depoda site haritası HİÇ YOKTU (durum.md · B1); arama motoru
   sayfaları yalnız bağlantı izleyerek buluyordu.

   KAYNAK DOLAŞIM DEFTERİ (lib/routes.ts · LIVE_ROUTES), ELLE LİSTE DEĞİL.
   O defter "hangi sayfayı gezdirmeye hazırız" sorusunun cevabı; haritanın
   sorusu da tam olarak bu. Elle yazılmış bir liste, bir sayfa açıldığı gün
   eskirdi. Defter kendi içinde türetilmiş adresleri de taşıyor (blog
   kategorileri, demo yazılar, kurumlar vergisinin üç ülke adresi), yani
   onlar da kendiliğinden giriyor.

   KAPALI SAYFALAR GİRMİYOR: /ingiltere, /kktc, /araclar gibi rotası olan ama
   dolaşıma kapalı adresler defterde yok. Haritada da yok — ziyaretçinin
   menüden gidemediği sayfayı arama motoruna önermek, sitenin kendi
   kararıyla çelişirdi. Açıldıkları gün (routes.ts'e bir satır) haritaya da
   girerler.

   DEFTERDE OLUP HARİTAYA GİRMEYENLER — her birinin gerekçesi aşağıda, satır
   satır. Ölçüt: harita KANONİK ve İNDEKSLENEBİLİR adresleri listeler;
   noindex bir sayfayı ya da yönlendirmeyi haritaya yazmak arama motoruna
   çelişen iki sinyal gönderir. noindex KARARLARINA DOKUNULMADI, yalnız
   okundu.

   lastModified / changeFrequency / priority YOK. Tarih yazmak için sayfanın
   gerçek değişim tarihi gerekir ve depoda yok (uydurma tarih yasak); ikisi
   de Google tarafından yok sayılıyor.

   /lab, /hero-lab, /hero-beyaz defterde zaten yok (lab isLive'da ayrı bir
   dalla açık, LIVE kümesinde değil) ve üçü de noindex.
   ========================================================================= */

/** Defterde olup haritaya bilerek girmeyen adresler ve nedeni. */
const HARITA_DISI = new Map<string, string>([
  /* app/basla/page.tsx · robots index:false ("yarım bir taslak"). */
  ["/basla", "noindex"],
  /* app/blog/rehberler/page.tsx · kategori adresine 308. Defterde yalnızca
     ona bağlanan menü girdileri sönük çıkmasın diye duruyor (routes.ts). */
  [LEGACY_GUIDES_HREF, "yönlendirme"],
  /* app/araclar/kurumlar-vergisi/page.tsx · /dubai'ye 308. Defterde de yok;
     burada, biri geri eklerse haritaya sızmasın diye. */
  [KV_KOK, "yönlendirme"],
  /* app/uygunluk-testi, bu adresin yeniden dışa aktarımı: AYNI SAYFA iki
     adreste ve ikisinde de kanonik yok. Haritaya site içinde bağlanılan
     adres giriyor (catalog.ts · ownHref = /uygunluk-testi). Kanonik eksiği
     ayrı bir iş (ana oturuma rapor edildi); bu tur o sayfaya dokunmadı. */
  ["/araclar/uygunluk-testi", "kopya adres"],
]);

/* Blog demo yazıları: `placeholder` taşıyan kayıt noindex basılıyor
   (app/blog/[slug]/page.tsx · robots). Aynı alanı buradan okumak, kayıt
   yayına alındığı gün (placeholder satırı silinince) haritaya kendiliğinden
   girmesini sağlıyor. */
function noindexYazi(path: string): boolean {
  const m = path.match(/^\/blog\/([^/]+)$/);
  if (!m) return false;
  return Boolean(postFor(m[1])?.placeholder);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...LIVE_ROUTES]
    .filter((p) => !HARITA_DISI.has(p) && !noindexYazi(p))
    .sort((a, b) => a.localeCompare(b, "tr"))
    .map((p) => ({ url: p === "/" ? `${SITE}/` : `${SITE}${p}` }));
}
