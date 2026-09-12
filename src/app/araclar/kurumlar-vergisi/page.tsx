import { permanentRedirect } from "next/navigation";
import { COUNTRY_ORDER } from "@/lib/brand";
import { kvHref } from "@/lib/tools/catalog";

/* ============================================================================
   /araclar/kurumlar-vergisi — KALICI YÖNLENDİRME  →  /araclar/kurumlar-vergisi/dubai
   ============================================================================

   11.09.2026 · araç dili turu. Araç ülke başına üç adrese ayrıldı
   (gerekçe: catalog.ts · KV_KOK). Bu adres bir gün önce aracın tek adresiydi
   ve yerel commit'te STATIC_LIVE'daydı; dışarıda paylaşılmış ya da bir
   önizlemede görülmüş olabilir. SİLİNMİYOR, çünkü bu depoda sayfası olmayan
   her adres app/[...yapim] yakalayıcısına düşüp HTTP 200 ile "yapım
   aşamasında" basıyor (tuzak M) — yani silmek ölü bir bağlantıyı temiz bir
   durum koduyla gizlerdi.

   HANGİ YOL VE NEDEN: permanentRedirect(), next.config redirects DEĞİL.
     · Depodaki emsal bu (app/rehberler, app/blog/rehberler): yönlendirme
       kararı adresin kendi klasöründe, gerekçesiyle birlikte duruyor. Adresi
       arayan kişi dosya ağacında buraya iniyor; next.config.ts'teki bir
       satırı bulmak için yönlendirmenin var olduğunu önceden bilmesi gerekir.
     · next.config.ts bu turun dosya listesinde değil ve orada bugün tek bir
       yönlendirme yok; ilkini oraya açmak bir düzen kararı olurdu.
     · Bedel: next.config yönlendirmesi yönlendirme katmanında, render
       olmadan çalışır; bu sayfa bir sunucu bileşeni render ediyor. Statik
       olarak üretildiği için (dinamik veri yok) fark ölçülemeyecek kadar
       küçük.
   redirect() DEĞİL permanentRedirect(): birincisi 307 (geçici) ve arama
   motoruna "eski adres geri gelebilir" diyor. Taşınma kalıcı, yani 308.

   HEDEF NEDEN DUBAİ: ülke sırasının ilki (brand.ts · COUNTRY_ORDER) ve menü
   kartının gittiği adres (catalog.ts · ownHref) de bu. Adres elle yazılmıyor;
   sıra değişirse yönlendirme de kendiliğinden değişir.
   ========================================================================= */

export default function KurumlarVergisiKokPage() {
  permanentRedirect(kvHref(COUNTRY_ORDER[0]));
}
