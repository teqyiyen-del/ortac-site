import type { MetadataRoute } from "next";
import { SITE } from "@/lib/routes";

/* ============================================================================
   /robots.txt — YALNIZ SİTE HARİTASINI GÖSTERİYOR
   ============================================================================

   11.09.2026 · araç dili turu. Depoda robots.txt da yoktu (durum.md · B1).
   Tek işi arama motoruna site haritasının yerini söylemek (app/sitemap.ts).

   HİÇBİR YOL YASAKLANMIYOR ve bu bilinçli:
     · Dizine girmemesi gereken sayfalar (/lab, /basla, /hero-lab,
       /hero-beyaz, demo yazılar) bunu kendi <meta name="robots"
       content="noindex"> etiketiyle söylüyor. robots.txt'te Disallow
       yazılsaydı tarayıcı o sayfaları hiç açamaz, noindex etiketini de
       göremezdi; dışarıdan bağlantı alan bir sayfa o zaman içeriği bilinmeden
       dizine girebilir. Yani Disallow, noindex'i ZAYIFLATIRDI.
     · noindex kararları sayfaların kendi dosyalarında ve bu tur onlara
       dokunmadı.
   ========================================================================= */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
