/* ============================================================================
   ŞİRKET İSMİ ÜRETECİ — kelime listeleri ve birleştirme kuralı
   ============================================================================

   NE OLDUĞU VE NE OLMADIĞI — bu ayrım aracın varlık şartı

   Müşteri isim üreteci istedi; rakiplerden Osome'da da var (belge s.2). Ama
   Osome'un aracı ürettiği ismi kendi sorgu aracına sokup MÜSAİTLİK söylüyor.
   Biz onu yapamayız: tescil müsaitliği otoritenin kendi kaydında ve elimizde
   öyle bir bağlantı yok. Yarım yapılırsa araç doğrudan yalan söyler — "bu isim
   müsait" cümlesi, karşılığı olmayan bir vaat.

   O yüzden bu araç yalnızca ADAY ÜRETİYOR ve bunu ekranda da söylüyor.
   Değeri şurada: kuruluş sırasında Dubai için ziyaretçiden istenen şey zaten
   "üç şirket adı alternatifi, tercih sırasıyla" (countryContent.dubai.docs).
   Araç tam olarak o üçlüyü kopyalanacak biçimde veriyor.

   YAPAY ZEKÂ YOK
   Dış istek yok, anahtar yok, sunucu yok. Aşağıdaki listeler ve tek bir
   birleştirme kuralı — hepsi tarayıcıda. Aynı girdi her zaman aynı çıktıyı
   veriyor; "başka öneriler" düğmesi rastgelelik değil, listelerde kaydırma.
   Rastgelelik olsaydı sunucu ile tarayıcı farklı isimler basar ve React
   hidrasyon uyarısı verirdi (aynı gerekçe: lib/tools/date.ts).

   LİSTELERDE OLMAYANLAR
   Ülke adları, "Royal / Emirates / National" gibi otorite çağrıştıran sözcükler
   ve banka-sigorta gibi lisanslı faaliyet adları bilerek yok: tescil
   otoritelerinin kısıtlı kelime listeleri genelde tam olarak bu sınıfı
   kapsıyor ve üretilen adayın baştan elenmesi aracı işe yaramaz yapar. Bu bir
   uyum kontrolü değil, listelerin yazılış ölçütü — aracın kendisi de "kısıtlı
   kelime kontrolü yapmıyorum" diyor.
   ========================================================================= */

export type NameTone = "kurumsal" | "kisa" | "bilesik";

export const TONES: { key: NameTone; label: string; hint: string }[] = [
  { key: "kurumsal", label: "Kurumsal", hint: "Kelimeniz + iş sözcüğü" },
  { key: "kisa", label: "Kısa ve modern", hint: "Kelimenizin kökü + kısa ek" },
  { key: "bilesik", label: "Bileşik", hint: "Kelimeniz + ikinci bir kök" },
];

/* Tekrarsız ve nötr; hiçbiri lisanslı faaliyet ya da otorite çağrıştırmıyor. */
const BUSINESS = [
  "Group",
  "Partners",
  "Ventures",
  "Holdings",
  "Advisory",
  "Consulting",
  "Solutions",
  "Associates",
  "Enterprises",
  "Trading",
  "Studio",
  "Works",
] as const;

const ENDINGS = ["ly", "io", "ora", "eva", "ion", "ex", "um", "is", "ora", "ana"] as const;

const ROOTS = [
  "Nova",
  "Vera",
  "Lumen",
  "Aster",
  "Meridia",
  "Orbis",
  "Selva",
  "Kanto",
  "Arca",
  "Nordis",
  "Vento",
  "Prima",
] as const;

/** her turda kaç aday — üçü öne çıkıyor, kalanı yedek */
export const PER_ROUND = 9;

const VOWELS = "aeıioöuüAEIİOÖUÜ";

/** Türkçe büyük harf kuralıyla: "istanbul" → "İstanbul", "ırmak" → "Irmak". */
function cap(s: string): string {
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1).toLocaleLowerCase("tr-TR");
}

/**
 * Girdiyi tek bir kelimeye indiriyor: boşluk, rakam ve noktalama düşüyor.
 * Boş dönerse araç hiç sonuç göstermiyor — anahtar kelimesiz bir isim üreteci,
 * ziyaretçinin işine yaramayan rastgele bir sözcük listesi olurdu.
 */
export function normalizeKeyword(input: string): string {
  const letters = input.replace(/[^\p{L}]/gu, "");
  return letters.slice(0, 24);
}

/** Kısa ek için kök: ilk beş harf, sondaki sesli ek de sesliyle başlıyorsa
 *  düşüyor ("Ortaca" + "ora" yerine "Ortac" + "ora"). */
function stem(word: string, ending: string): string {
  const base = word.slice(0, Math.min(5, word.length));
  const last = base.at(-1) ?? "";
  const first = ending.charAt(0);
  if (base.length > 2 && VOWELS.includes(last) && VOWELS.includes(first)) {
    return base.slice(0, -1);
  }
  return base;
}

/**
 * Aday listesi. Aynı (kelime, üslup, tur) her zaman aynı sonucu veriyor.
 * `round` sıfırdan başlıyor ve listelerde kaydırıyor — rastgelelik yok.
 */
export function generateNames(rawKeyword: string, tone: NameTone, round: number): string[] {
  const key = normalizeKeyword(rawKeyword);
  if (key.length < 2) return [];

  const word = cap(key);
  const out: string[] = [];

  for (let i = 0; i < PER_ROUND; i++) {
    const step = round * PER_ROUND + i;
    let candidate = "";

    if (tone === "kurumsal") {
      candidate = `${word} ${BUSINESS[step % BUSINESS.length]}`;
    } else if (tone === "kisa") {
      const ending = ENDINGS[step % ENDINGS.length];
      candidate = cap(`${stem(key, ending)}${ending}`);
    } else {
      const root = ROOTS[step % ROOTS.length];
      /* Tek turda iki yön birden: kelime önde ve kökle önde. Aynı iki parçadan
         iki farklı isim çıkıyor, liste de tekdüze olmuyor. */
      candidate =
        step % 2 === 0 ? `${word}${root.toLocaleLowerCase("tr-TR")}` : `${root}${key.toLocaleLowerCase("tr-TR")}`;
      candidate = cap(candidate);
    }

    /* Aynı isim iki kez çıkmasın; kelimenin kendisi de aday sayılmaz. */
    if (candidate && candidate !== word && !out.includes(candidate)) out.push(candidate);
  }

  return out;
}
