/* SÖZLÜKLE ÇEVİRİ (10.10.2026 · ana sayfanın İngilizce denemesi, /en).
   Burak: "ana sayfada denemeye başlamak için şu İngilizce şeyini koysana,
   bakalım nasıl duracak."

   NEDEN SÖZLÜK, NEDEN ANAHTAR TÜRKÇE CÜMLENİN KENDİSİ. Ana sayfanın
   bileşenleri metni kendi içinde taşıyor (başlıklar, kart cümleleri, çizimlerin
   içindeki yazılar). Metni dışarı çekip iki dilli yapıya taşımak her bileşeni
   baştan yazmak demekti ve Türkçe çıktıyı riske atardı. Bunun yerine bileşen
   metni olduğu gibi tutuyor ve basarken `c("Türkçe cümle")` diyor:
     · Türkçe sayfada `c` hiçbir şey yapmıyor, cümle aynen çıkıyor (Türkçe
       çıktı tanım gereği değişemez),
     · İngilizce sayfada sözlükte (src/lib/en/*.ts) karşılığı aranıyor.
   Türkçe cümle değişirse anahtar tutmaz ve İngilizce sayfada o cümle TÜRKÇE
   görünür: sessizce eski çeviri kalmıyor, eksik göze batıyor. Aynı anda
   scripts/ceviri-durum.mjs o sözlüğü "eskidi" diye listeliyor.

   ELENEN: bileşene `dil === "en" ? "…" : "…"` yazmak. İngilizce metni
   bileşenin içine gömüyordu; Burak'ın istediği bağ (Türkçe değişince öteki
   taraf uyarılsın) dosya özetiyle kurulduğu için metin ayrı dosyada durmalı.

   Bu dosyada kanca yok: sunucu bileşeni de çağırabilir. Dili yoldan okuyan
   kanca lib/i18n/useDil.ts. */
import type { Dil } from "@/lib/i18n/diller";

export type Sozluk = Record<string, string>;
export type Cevir = (tr: string) => string;

/** `dil` Türkçe ise kimlik işlevi; İngilizce ise sözlükten okur, yoksa Türkçesini verir */
export const cevirici = (dil: Dil, ...sozlukler: Sozluk[]): Cevir =>
  dil === "en"
    ? (tr) => {
        for (const s of sozlukler) if (s[tr] !== undefined) return s[tr];
        return tr;
      }
    : (tr) => tr;

/* İNGİLİZCE SAYFADAKİ BAĞLANTILAR · ŞİMDİLİK TÜRKÇE SAYFALARA GİDİYOR.
   İngilizce iç sayfalar (ülke, hizmet, iletişim …) henüz yok. /en'deki bir
   bağlantı Türkçe karşılığına gidiyor; yalnız ana sayfanın kendi çapaları
   ("/#hizmetler") ve logo İngilizce ana sayfada kalıyor. İngilizce sayfalar
   açıldıkça burası lib/i18n/adresler.ts · enAdres'e bağlanacak: tek değişiklik
   bu işlevde, çağıran yerler aynı kalır. */
export const yerelAdres = (dil: Dil, href: string): string => {
  if (dil !== "en") return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#")) return `/en${href.slice(1)}`;
  return href;
};
