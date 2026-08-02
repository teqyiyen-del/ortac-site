/* ============================================================================
   ARAÇLAR — tarih yardımcıları
   ============================================================================

   İki araç tarih hesaplıyor (oturum sayacı, yükümlülük takvimi) ve ikisinin de
   çıktısı ekranda yazıyla görünüyor. Buradaki üç karar bunun içindir:

   1) HESAP UTC'DE YAPILIYOR. `new Date("2026-03-12")` tarayıcının saat
      dilimine göre bir gün kayabiliyor; UTC'de Date.UTC ile kurulup UTC ile
      okununca kaymıyor. Ziyaretçiye "en geç 12 Mart" derken bir gün şaşmak,
      aracı kullanılmaz yapar.

   2) BİÇİMLENDİRME ELDE, Intl İLE DEĞİL. Intl.DateTimeFormat("tr-TR") çıktısı
      çalışma ortamının ICU verisine bağlı: sunucuda "12 Mart 2027", eksik
      ICU'lu bir ortamda "March 12, 2027" çıkabiliyor. Sunucu ile tarayıcı
      farklı basarsa React hidrasyon uyarısı veriyor. Ay adları sabit dizi.

   3) "BUGÜN" RENDER SIRASINDA OKUNMUYOR. Bu dosya bugünü hiç bilmiyor;
      bileşenler onu mount sonrası (useEffect) alıyor. Sunucuda basılan HTML
      ile tarayıcının ilk render'ı böylece birebir aynı oluyor.
   ========================================================================= */

export const TR_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;

/** yıl / 1-12 ay / gün — Date nesnesi taşımıyoruz ki saat dilimi hiç girmesin */
export type Ymd = { y: number; m: number; d: number };

const DAY_MS = 86_400_000;

/**
 * `<input type="date">` değeri ("2026-03-12") → Ymd. Boş, eksik ya da takvimde
 * karşılığı olmayan bir değer (30 Şubat gibi) null dönüyor: aracın "sonuç yok"
 * hâli, yanlış sonuç göstermekten iyidir.
 */
export function parseInputDate(value: string): Ymd | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return null;

  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (y < 1900 || y > 2200 || mo < 1 || mo > 12 || d < 1 || d > 31) return null;

  /* Tur kontrolü: 2026-02-30 gibi bir değer Date.UTC'de Mart'a taşıyor.
     Geri okuyup aynı günü göremiyorsak tarih gerçek değil demektir. */
  const t = Date.UTC(y, mo - 1, d);
  const back = new Date(t);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) {
    return null;
  }
  return { y, m: mo, d };
}

export function toUtc({ y, m, d }: Ymd): number {
  return Date.UTC(y, m - 1, d);
}

export function fromUtc(t: number): Ymd {
  const dt = new Date(t);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

/** Gün ekleme. Artık yıl ve ay uzunlukları Date.UTC'nin işi, biz saymıyoruz. */
export function addDays(base: Ymd, days: number): Ymd {
  return fromUtc(toUtc(base) + days * DAY_MS);
}

/** İki tarih arasındaki tam gün farkı (b - a). İkisi de UTC gece yarısı. */
export function daysBetween(a: Ymd, b: Ymd): number {
  return Math.round((toUtc(b) - toUtc(a)) / DAY_MS);
}

/** Ay ekleme — gün bilgisi düşüyor, çünkü çağıran yerler ay hassasiyetinde
 *  konuşuyor ("en geç Eylül 2028"). Gün uydurmamak bilinçli. */
export function addMonths(y: number, m: number, add: number): { y: number; m: number } {
  const zero = y * 12 + (m - 1) + add;
  return { y: Math.floor(zero / 12), m: (zero % 12) + 1 };
}

export function formatDate({ y, m, d }: Ymd): string {
  return `${d} ${TR_MONTHS[m - 1]} ${y}`;
}

export function formatMonth(y: number, m: number): string {
  return `${TR_MONTHS[m - 1]} ${y}`;
}

/**
 * Tarayıcının yerel bugünü, "YYYY-MM-DD" biçiminde.
 *
 * Nesne değil DİZGE dönüyor, çünkü çağıran taraf bunu useSyncExternalStore'un
 * istemci anlık görüntüsü olarak kullanıyor: React o değeri Object.is ile
 * karşılaştırıyor ve her çağrıda yeni bir nesne dönmek sonsuz render döngüsü
 * demek olurdu. Aynı gün içinde aynı dizge dönüyor, karşılaştırma kararlı.
 */
export function todayKey(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}
