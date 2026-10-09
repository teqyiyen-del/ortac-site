/* TÜRKÇE ADRES ↔ İNGİLİZCE ADRES (09.10.2026 · iskelet).
   Burak: "İngilizce tarafını yaptığımızda /en sonrasını aynı tutmayacağız,
   bu sefer İngilizce çekeceğiz." Yani /dubai/muhasebe'nin karşılığı
   /en/dubai/muhasebe DEĞİL, /en/dubai/accounting.

   Eşleme iki katmanlı: önce ilk parça (ülke ya da sayfa), sonra hizmet
   parçası. Listede olmayan adresin İngilizce karşılığı YOK sayılıyor
   (enAdres null döner): dil seçici o sayfada İngilizce ana sayfaya düşer,
   hreflang basılmaz. Yeni bir Türkçe sayfa açılınca buraya satır eklemek
   gerekiyor; scripts/ceviri-durum.mjs eksik satırı da raporluyor.

   Blog yazıları BURADA DEĞİL: her yazının İngilizce adresi kendi kaydında
   duracak (çeviri değil yeniden yazım olabiliyor, bazı yazılar yalnız
   Türkçe kalacak). */

import type { Dil } from "@/lib/i18n/diller";

/** ilk parça: ülkeler ve tek seviyeli sayfalar */
const KOK: Record<string, string> = {
  "": "",
  dubai: "dubai",
  ingiltere: "uk",
  kktc: "northern-cyprus",
  hakkimizda: "about",
  iletisim: "contact",
  kariyer: "careers",
  "is-ortakligi": "partners",
  sektorler: "industries",
  araclar: "tools",
  blog: "blog",
  kvkk: "privacy",
  basla: "get-started",
  "basinda-biz": "press",
  gelismeler: "updates",
  "e-kitaplar": "ebooks",
};

/** ikinci parça: ülke altındaki hizmet sayfaları */
const HIZMET: Record<string, string> = {
  muhasebe: "accounting",
  vergi: "tax",
  "banka-hesabi": "bank-account",
  vize: "visa",
  "kurumsal-danismanlik": "corporate-advisory",
  "aml-uyum": "aml-compliance",
};

const ters = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const KOK_TERS = ters(KOK);
const HIZMET_TERS = ters(HIZMET);

const parcala = (yol: string) => yol.split(/[?#]/)[0].split("/").filter(Boolean);

/** "/dubai/muhasebe" → "/en/dubai/accounting"; karşılığı yoksa null */
export function enAdres(trYol: string): string | null {
  const p = parcala(trYol);
  if (p.length === 0) return "/en";
  const kok = KOK[p[0]];
  if (kok === undefined) return null;
  if (p.length === 1) return `/en/${kok}`;
  if (p.length === 2 && HIZMET[p[1]] !== undefined) return `/en/${kok}/${HIZMET[p[1]]}`;
  return null;
}

/** "/en/uk/tax" → "/ingiltere/vergi"; karşılığı yoksa null */
export function trAdres(enYol: string): string | null {
  const p = parcala(enYol);
  if (p[0] !== "en") return null;
  if (p.length === 1) return "/";
  const kok = KOK_TERS[p[1]];
  if (kok === undefined) return null;
  if (p.length === 2) return `/${kok}`;
  if (p.length === 3 && HIZMET_TERS[p[2]] !== undefined) return `/${kok}/${HIZMET_TERS[p[2]]}`;
  return null;
}

/** aynı sayfanın öteki dildeki adresi; yoksa o dilin ana sayfası */
export function karsiAdres(yol: string, hedef: Dil): string {
  if (hedef === "en") return enAdres(yol) ?? "/en";
  return trAdres(yol) ?? "/";
}

/** metadata.alternates.languages için; İngilizce sayfa YAYINDA değilse çağrılmaz */
export function dilAlternatifleri(trYol: string): Record<string, string> | undefined {
  const en = enAdres(trYol);
  return en ? { tr: trYol, en, "x-default": trYol } : undefined;
}
