/* Muhasebe alt hizmetlerinin ADRESLERİ · tarayıcıya giden hafif parça
   (25.09.2026 · optimizasyon turu).

   routes.ts (her bağlantının kullandığı SmartLink üzerinden tarayıcı
   paketine giriyor) yalnız bu adresleri istiyordu ama muhasebeAltHizmet.ts'i
   altı sayfanın bütün metinleriyle birlikte çekiyordu. Liste burada; veri
   dosyası sluglarını bu listeye bağlıyor (AltHizmet.slug: AltSlug), yani
   listede olmayan bir slugla sayfa yazılamıyor. Yeni alt sayfa: önce buraya
   bir satır. */
export const MUHASEBE_KOK = "/dubai/muhasebe";

export const ALT_SLUGLAR = [
  "defter-tutma",
  "kdv-kaydi",
  "kdv-beyannamesi",
  "kurumlar-vergisi-kaydi",
  "kurumlar-vergisi-beyannamesi",
  "bagimsiz-denetim",
] as const;
export type AltSlug = (typeof ALT_SLUGLAR)[number];

export function altHizmetHref(slug: string): string {
  return `${MUHASEBE_KOK}/${slug}`;
}
