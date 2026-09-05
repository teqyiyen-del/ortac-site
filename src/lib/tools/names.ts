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

   ---------------------------------------------------------------------------
   BU TURDA EKLENEN: SEKTÖR

   Müşteri: "yine biraz aşama aşama ilerleyelim ya. anahtar kelime, sektör,
   üslup, vb." Sektör yalnızca bir adım değil, ÜRETİMİ DEĞİŞTİREN bir girdi:
   "Atlas Group" her işe uyan ama hiçbir şey söylemeyen bir ad; "Atlas Labs"
   yazılım, "Atlas Logistics" nakliye işini adın kendisinde söylüyor.

   Sektör iki listeyi birden değiştiriyor: iş sözcükleri (kurumsal üslup) ve
   kökler (bileşik üslup). Kısa üslup sektörden etkilenmiyor, çünkü orada ada
   giren tek şey ziyaretçinin kendi kelimesi.

   LİSTELERDE OLMAYANLAR VE NEDENİ
   Ülke adları, "Royal / Emirates / National" gibi otorite çağrıştıran
   sözcükler, ve LİSANSLI FAALİYET adları (bank, insurance, finance, capital,
   investment) bilerek yok. Tescil otoritelerinin kısıtlı kelime listeleri
   genelde tam olarak bu sınıfı kapsıyor ve üretilen adayın baştan elenmesi
   aracı işe yaramaz yapar.

   Sektör listeleri de aynı süzgeçten geçti: "finans" ve "sigorta" sektör
   olarak HİÇ SUNULMUYOR — o sektörde üretilecek her makul sözcük kısıtlı
   listeye giriyor, yani araç o kişiye yalnızca elenecek adaylar verirdi.
   Bu bir eksiklik değil, bilinçli bir sınır.

   Bunlar listelerin YAZILIŞ ÖLÇÜTÜ; bir uyum kontrolü değil. Aracın kendisi
   de "kısıtlı kelime kontrolü yapmıyorum" diyor.
   ========================================================================= */

export type NameTone = "kurumsal" | "kisa" | "bilesik";

export const TONES: { key: NameTone; label: string; hint: string }[] = [
  { key: "kurumsal", label: "Kurumsal", hint: "Kelimeniz + iş sözcüğü" },
  { key: "kisa", label: "Kısa ve modern", hint: "Kelimenizin kökü + kısa ek" },
  { key: "bilesik", label: "Bileşik", hint: "Kelimeniz + ikinci bir kök" },
];

export type SectorKey =
  | "genel"
  | "yazilim"
  | "eticaret"
  | "danismanlik"
  | "lojistik"
  | "insaat"
  | "medya"
  | "turizm";

/* Sektör kaydı. `biz` kurumsal üslubun ikinci kelimesi, `roots` bileşik
   üslubun ikinci kökü. İkisi de o sektörde ADA GİRMESİ NORMAL karşılanan
   sözcükler; hiçbiri lisanslı faaliyet ya da otorite çağrıştırmıyor.

   "genel" listede İLK sırada duruyor ve varsayılan: sektörünü henüz
   seçmemiş biri aracı kullanamamış olmasın. Adı da bunu söylüyor
   ("Henüz belli değil"), yani boş bir seçim gibi durmuyor. */
export const SECTORS: {
  key: SectorKey;
  label: string;
  biz: readonly string[];
  roots: readonly string[];
}[] = [
  {
    key: "genel",
    label: "Henüz belli değil",
    biz: ["Group", "Partners", "Ventures", "Holdings", "Enterprises", "Works", "Associates", "Company", "Collective", "Alliance", "Bureau", "House"],
    roots: ["Nova", "Vera", "Lumen", "Aster", "Meridia", "Orbis", "Selva", "Arca", "Kanto", "Nordis", "Vento", "Prima"],
  },
  {
    key: "yazilim",
    label: "Yazılım ve teknoloji",
    biz: ["Labs", "Systems", "Technologies", "Digital", "Software", "Studio", "Solutions", "Works", "Interactive", "Applications", "Platforms", "Engineering"],
    roots: ["Byte", "Logic", "Cortex", "Pixel", "Vector", "Quanta", "Circuit", "Kernel", "Nexus", "Cipher", "Vertex", "Signal"],
  },
  {
    key: "eticaret",
    label: "E-ticaret ve perakende",
    biz: ["Commerce", "Retail", "Trading", "Brands", "Market", "Goods", "Store", "Supply", "Merchants", "Outlet", "Distribution", "Collection"],
    roots: ["Cart", "Shelf", "Bazaar", "Vendo", "Basket", "Merca", "Depot", "Stock", "Aisle", "Crate", "Parcel", "Trolley"],
  },
  {
    key: "danismanlik",
    label: "Danışmanlık ve hizmet",
    biz: ["Advisory", "Consulting", "Partners", "Associates", "Management", "Consultancy", "Group", "Practice", "Counsel", "Bureau", "Services", "Office"],
    roots: ["Vista", "Compass", "Anchor", "Summit", "Bridge", "Pillar", "Forum", "Atlas", "Beacon", "Keystone", "Meridian", "Axis"],
  },
  {
    key: "lojistik",
    label: "Lojistik ve ticaret",
    biz: ["Logistics", "Shipping", "Freight", "Trading", "Supply", "Transport", "Cargo", "Express", "Forwarding", "Terminals", "Haulage", "Movers"],
    roots: ["Route", "Harbor", "Voyage", "Transit", "Convoy", "Pallet", "Anchor", "Cargo", "Lane", "Dock", "Fleet", "Berth"],
  },
  {
    key: "insaat",
    label: "İnşaat ve gayrimenkul",
    biz: ["Contracting", "Projects", "Developments", "Construction", "Builders", "Works", "Group", "Engineering", "Structures", "Interiors", "Foundations", "Sites"],
    roots: ["Stone", "Granite", "Terra", "Cedar", "Foundry", "Arch", "Beam", "Quarry", "Mortar", "Slate", "Pylon", "Girder"],
  },
  {
    key: "medya",
    label: "Medya ve tasarım",
    biz: ["Media", "Studio", "Creative", "Design", "Productions", "Works", "Content", "House", "Films", "Agency", "Pictures", "Collective"],
    roots: ["Lumen", "Canvas", "Echo", "Prism", "Frame", "Muse", "Chroma", "Verse", "Reel", "Motif", "Aura", "Tone"],
  },
  {
    key: "turizm",
    label: "Turizm ve organizasyon",
    biz: ["Travel", "Journeys", "Hospitality", "Events", "Escapes", "Retreats", "Group", "Experiences", "Tours", "Voyages", "Resorts", "Concierge"],
    roots: ["Sunda", "Oasis", "Horizon", "Marina", "Dune", "Palma", "Terra", "Serene", "Lagoon", "Cove", "Vista", "Zephyr"],
  },
];

export const SECTOR_BY_KEY = SECTORS.reduce(
  (acc, s) => {
    acc[s.key] = s;
    return acc;
  },
  {} as Record<SectorKey, (typeof SECTORS)[number]>,
);

const ENDINGS = ["ly", "io", "ora", "eva", "ion", "ex", "um", "is", "ana", "va", "iq", "en"] as const;

/**
 * Her turda kaç aday — üçü öne çıkıyor, kalanı yedek.
 *
 * 9 DEĞİL 6 VE SEBEBİ TEKRAR. Havuzlar 12 kelime uzunluğunda; turda 9 aday
 * üretilirse ikinci tur 9-17 aralığını okuyor, yani 12'ye bölünürken başa
 * sarıyor ve "Başka öneriler" düğmesi ziyaretçiye AYNI adları farklı sırada
 * gösteriyordu. Ölçüldü: lojistik + kurumsalda ikinci turun dokuz adayının
 * altısı birinci turda zaten görünmüştü.
 *
 * 6, 12'yi tam bölüyor: iki tur, on iki ayrı ad, tek tekrar yok. Ekranda da
 * daha iyi duruyor — aday ızgarası geniş ekranda üç sütun, yani 6 aday tam
 * iki satır.
 */
export const PER_ROUND = 6;

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
 * Aday listesi. Aynı (kelime, sektör, üslup, tur) her zaman aynı sonucu
 * veriyor. `round` sıfırdan başlıyor ve listelerde kaydırıyor — rastgelelik yok.
 */
export function generateNames(
  rawKeyword: string,
  sector: SectorKey,
  tone: NameTone,
  round: number,
): string[] {
  const key = normalizeKeyword(rawKeyword);
  if (key.length < 2) return [];

  const word = cap(key);
  const { biz, roots } = SECTOR_BY_KEY[sector] ?? SECTOR_BY_KEY.genel;
  const out: string[] = [];

  for (let i = 0; i < PER_ROUND; i++) {
    const step = round * PER_ROUND + i;
    let candidate = "";

    if (tone === "kurumsal") {
      candidate = `${word} ${biz[step % biz.length]}`;
    } else if (tone === "kisa") {
      const ending = ENDINGS[step % ENDINGS.length];
      candidate = cap(`${stem(key, ending)}${ending}`);
    } else {
      const root = roots[step % roots.length];
      /* Tek turda iki yön birden: kelime önde ve kökle önde. Aynı iki parçadan
         iki farklı isim çıkıyor, liste de tekdüze olmuyor. */
      candidate =
        step % 2 === 0
          ? `${word}${root.toLocaleLowerCase("tr-TR")}`
          : `${root}${key.toLocaleLowerCase("tr-TR")}`;
      candidate = cap(candidate);
    }

    /* Aynı isim iki kez çıkmasın; kelimenin kendisi de aday sayılmaz. */
    if (candidate && candidate !== word && !out.includes(candidate)) out.push(candidate);
  }

  return out;
}

/**
 * Bir (sektör, üslup) çifti kaç TUR üretebiliyor.
 *
 * NEDEN GEREKLİ: havuzlar sonlu. "Başka öneriler" sonsuza kadar basılabilseydi
 * belli bir noktadan sonra ziyaretçiye zaten gördüğü adları gösterirdi — araç
 * bozuk sanılır. Arayüz bu sayıyı okuyup son turda düğmeyi hiç basmıyor ve
 * yerine ne yapılacağını yazıyor (sektörü ya da üslubu değiştir).
 *
 * Havuz boyu üsluba göre:
 *   kurumsal → sektörün iş sözcükleri (12)
 *   kisa     → ek listesi (12), sektörden bağımsız
 *   bilesik  → kökler × 2 (24), çünkü her kök iki yönde birleşiyor
 */
export function turSayisi(sector: SectorKey, tone: NameTone): number {
  const s = SECTOR_BY_KEY[sector] ?? SECTOR_BY_KEY.genel;
  const havuz = tone === "kurumsal" ? s.biz.length : tone === "kisa" ? ENDINGS.length : s.roots.length * 2;
  return Math.max(1, Math.ceil(havuz / PER_ROUND));
}

/**
 * Adayın alan adı biçimi: boşluk ve Türkçe harfler düşüyor.
 *
 * NEDEN BURADA: alan adı sorgusu ağ tarafında (lib/tools/alanadi.ts) ama
 * SORGULANACAK DİZGE bir isimlendirme kararı, ağ kararı değil. "Atlas Group"
 * için sorgulanacak şey "atlasgroup" — arada tire mi olsun sorusunun cevabı
 * "hayır", çünkü tireli alan adı ikinci tercihtir ve araç birinci tercihi
 * soruyor.
 *
 * Türkçe harfler ASCII karşılığına iniyor: alan adlarında ç/ğ/ı/ö/ş/ü ancak
 * punycode ile yaşıyor ve pratikte kimse öyle kullanmıyor.
 */
const TR_ASCII: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  â: "a",
  î: "i",
  û: "u",
};

export function toDomainLabel(name: string): string {
  return name
    .toLocaleLowerCase("tr-TR")
    .split("")
    .map((ch) => TR_ASCII[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]/g, "");
}
