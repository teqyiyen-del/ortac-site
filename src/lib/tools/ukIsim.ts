/* ============================================================================
   İNGİLTERE ŞİRKET İSMİ · "AYNI SAYILIR" KURALI VE SORGU SÖZLEŞMESİ
   ============================================================================

   Bu dosya SAF: ağ yok, ortam değişkeni yok, yan etki yok. İki taraf da içeri
   alıyor — sunucu rotası (app/api/araclar/isim-sorgu/route.ts) karşılaştırmayı
   yapmak için, arayüz (components/tools/UkIsimSorgu.tsx) ziyaretçinin yazdığı
   ismin hangi biçime indiğini CANLI göstermek için. Anahtar burada değil;
   yalnız rota dosyası okuyor, yani bu modül istemci paketine girse de
   taşıyacağı bir sır yok.

   ---------------------------------------------------------------- KAYNAKLAR
   Üçü de 11.09.2026'da açılıp okundu; sayılar ve listeler oradan birebir.

   1) Yönetmelik — Ek 3 (Schedule 3) ve Ek 2:
        The Company, Limited Liability Partnership and Business (Names and
        Trading Disclosures) Regulations 2015 (SI 2015/17)
        https://www.legislation.gov.uk/uksi/2015/17/schedule/3
        https://www.legislation.gov.uk/uksi/2015/17/schedule/2
        https://www.legislation.gov.uk/uksi/2015/17/regulation/2
      Ek 3'ün 1. paragrafı: kurallar YAZILDIKLARI SIRAYLA uygulanır. Aşağıdaki
      `ayniBicim` o sırayı paragraf numarasıyla izliyor (2 → 10).

   2) Companies House rehberi — "Incorporation and names", bölüm 6.3-6.6:
        https://www.gov.uk/government/publications/incorporation-and-names/incorporation-and-names
      Ek 1'in tabloları legislation.gov.uk'te RESİM olarak basılıyor; yok
      sayılan noktalama listesi (6.4) ve aksanlı harf tablosu (6.5) bu yüzden
      rehberden alındı.

   3) Companies House'un KENDİ denetleyicisi — isim uygunluk sayfası:
        https://find-and-update.company-information.service.gov.uk/company-name-availability
      Metnin iki yerde iki okuması vardı; ikisi de kurumun kendi aracına
      sorularak çözüldü (aşağıda "OKUMA 1" ve "OKUMA 2"). Aracın işi kurumun
      kararını ÖNCEDEN görmek; metinle kurum ayrıştığında kurumu izliyoruz.

   ------------------------------------------------------------ NE DEMİYORUZ
   "Aynı biçime inmiyor" = "alınabilir" DEĞİL. Hassas kelimeler (Sensitive
   Words Regulations 2014), "too like" itirazı (rehber 9.1: "yalnızca birkaç
   karakterle ayrılan" isim, kayıttan sonraki 12 ay içinde değiştirtilebiliyor)
   ve marka hakları bu dosyanın kapsamında değil. Arayüz bu yüzden "kayıtta
   aynı isim görünmüyor" diyor, "alabilirsiniz" demiyor — alanadi.ts'teki
   "boş görünüyor ≠ alabilirsiniz" ilkesinin aynısı.
   ========================================================================= */

/** Yönetmelik 2(4): isim en fazla 160 izinli karakter (araya düşen boşluklar
 *  da sayılıyor, 2(5)). Girdi sınırı buradan; uydurma bir tavan değil. */
export const EN_FAZLA_KARAKTER = 160;

/** Ek 3 · 8(1): karşılaştırmada yalnız ilk 60 izinli karakter sayılıyor. */
const KARSILASTIRMA_SINIRI = 60;

/** Rotanın Companies House'u bekleme süresi, saniye. Burada çünkü iki yerde
 *  okunuyor: rota süreyi kuruyor, arayüz "8 saniye içinde cevap gelmedi"
 *  diyor. İki ayrı sabit bir gün ayrışır ve ekran yanlış sayı söyler. */
export const CH_SURE_SN = 8;

/* ----------------------------------------------------- EK 3 · PARAGRAF 2
   Aksanlı harf → düz harf (rehber 6.5'in birinci tablosu). Tablonun büyük
   kısmı Unicode ayrıştırmasıyla (NFD + birleşen işaretleri at) birebir
   örtüşüyor: À Á Â Ã Ä Å Ā Ă Ą Ǻ → A, Ş → S, Ğ → G, İ → I ...
   Ayrışmayan on harf elle yazıldı. Tablodaki Œ satırı "OE CE" diye basılı;
   ikinci değer bir dizgi hatasına benziyor, OE alındı.

   Türkçe harfler tablonun İÇİNDE (Ç, Ğ, İ, Ö, Ş, Ü) — yani "Ortaç" ile
   "Ortac" kurum için zaten aynı. Küçük ı büyütülünce I oluyor, o da doğru. */
const AYRISMAYAN: Record<string, string> = {
  Æ: "AE",
  Œ: "OE",
  Þ: "D",
  Đ: "D",
  Ħ: "H",
  Ŀ: "L",
  Ł: "L",
  Ŋ: "N",
  Ø: "O",
  Ŧ: "T",
};

function harfleriSadelestir(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[ÆŒÞĐĦĿŁŊØŦ]/g, (c) => AYRISMAYAN[c] ?? c);
}

/* ----------------------------------------------------- EK 3 · PARAGRAF 3
   İsmin SONUNDAKİ şirket türü eki yok sayılıyor. Liste Ek 2'nin tamamı
   (1. ve 3. paragraflar), 2. paragraf uygulandıktan SONRAKİ biçimiyle —
   o yüzden "CWMNI BUDDSODDI Â CHYFALAF NEWIDIOL" burada düz A ile yazılı.

   "noktalı ya da noktasız" (with or without full stops) denen kısaltmalar
   ayrı listede: L.T.D. / LTD. / LTD üçü de eşleşiyor.

   ÖNÜNDE BOŞLUK ŞARTI KOYDUK. Metin 3. paragrafta bunu söylemiyor (yalnız
   "sonunda" diyor), ama şartsız okuma "APPLC" gibi bir kelimenin içinden
   PLC koparırdı. İki yöndeki hatanın ikisi de yumuşak (araç hiçbir zaman
   "alınabilir" demiyor); daha az şaşırtan okuma seçildi. */
const EK2_SOZCUK = [
  "LIMITED",
  "CYFYNGEDIG",
  "UNLIMITED",
  "ANGHYFYNGEDIG",
  "PUBLIC LIMITED COMPANY",
  "CWMNI CYFYNGEDIG CYHOEDDUS",
  "COMMUNITY INTEREST COMPANY",
  "CWMNI BUDDIANT CYMUNEDOL",
  "COMMUNITY INTEREST PUBLIC LIMITED COMPANY",
  "CWMNI BUDDIANT CYMUNEDOL CYHOEDDUS CYFYNGEDIG",
  "RIGHT TO ENFRANCHISEMENT",
  "HAWL I RYDDFREINIAD",
  "RIGHT TO MANAGE",
  "CWMNI RTM CYFYNGEDIG",
  "UK ECONOMIC INTEREST GROUPING",
  "INVESTMENT COMPANY WITH VARIABLE CAPITAL",
  "CWMNI BUDDSODDI A CHYFALAF NEWIDIOL",
  "LIMITED PARTNERSHIP",
  "PARTNERIAETH CYFYNGEDIG",
  "LIMITED LIABILITY PARTNERSHIP",
  "PARTNERIAETH ATEBOLRWYDD CYFYNGEDIG",
  "OPEN-ENDED INVESTMENT COMPANY",
  "CWMNI BUDDSODDIAD PENAGORED",
  "CHARITABLE INCORPORATED ORGANISATION",
  "SEFYDLIAD ELUSENNOL CORFFOREDIG",
  "INDUSTRIAL AND PROVIDENT SOCIETY",
  "CO-OPERATIVE SOCIETY",
  "PROTECTED CELL COMPANY",
  "CWMNI UNEDAU GWARCHODEDIG",
  "COMMUNITY BENEFIT SOCIETY",
];
const EK2_KISALTMA = [
  "LTD",
  "CYF",
  "PLC",
  "CCC",
  "CIC",
  "CBC",
  "COMMUNITY INTEREST PLC",
  "CWMNI BUDDIANT CYMUNEDOL CCC",
  "RTE",
  "RTM",
  "UKEIG",
  "PCC LIMITED",
  "PCC LTD",
  "CUG CYFYNGEDIG",
  "CUG CYF",
  "LP",
  "PC",
  "LLP",
  "PAC",
  "CIO",
  "SEC",
];

const kacir = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** "LTD" → "L\.?T\.?D\.?" — harflerin arasına isteğe bağlı nokta. */
const noktali = (s: string) =>
  s
    .split("")
    .map((c) => (/[A-Z]/.test(c) ? `${c}\\.?` : kacir(c)))
    .join("");

const EK2_SONDA = new RegExp(
  `(?:^|\\s)(?:${[...EK2_SOZCUK.map(kacir), ...EK2_KISALTMA.map(noktali)].join("|")})\\.?$`,
);

function turEkiniAt(s: string): string {
  return s.replace(EK2_SONDA, "").trim();
}

/* ----------------------------------------------------- EK 3 · PARAGRAF 4
   Eşdeğer sayılan sözcük ve işaretler: AND = &, PLUS = +, 1 = ONE ...
   Her grup TEK bir temsilciye çevriliyor; iki taraf aynı temsilciye indiği
   için karşılaştırma eşdeğerliği koruyor.

   OKUMA 1 · SONDAKİ SÖZCÜK DE EŞLENİYOR. Metin 4(1)'de eşdeğerin "önünde ve
   arkasında boşluk olmasını" (ya da isim başındaysa arkasında) şart koşuyor;
   harfiyen okununca ismin SON sözcüğü hiç eşlenmezdi. Kurumun kendi
   denetleyicisi öyle çalışmıyor: "studio one" da "studio 1" de "STUDIO 1 LTD"
   ve "STUDIO ONE LTD" ile aynı sayılıyor (11.09.2026 sorgusu). Kural bu
   yüzden SÖZCÜK bazlı yazıldı: eşdeğer, boşlukla ya da ismin başı/sonuyla
   çevrili tam bir sözcükse eşleniyor.

   OKUMA 2 · TEMSİLCİ SÖZCÜK, İŞARET DEĞİL. "@" grubunun temsilcisi "AT"
   seçildi, "@" değil. Fark 9. paragrafta çıkıyor: o paragraf ismin başındaki
   "@"yi atıyor. Temsilci "@" olsaydı "AT HOME" → "@ HOME" → "HOME" olurdu.
   Kurum öyle saymıyor: "home" sorgusunda "@HOME LIMITED" aynı çıkıyor ama
   "AT HOME LIMITED" çıkmıyor (11.09.2026). Öteki gruplarda da sözcük
   seçildi ki tek kural olsun. */
const ESDEGER: Record<string, string> = {};
for (const [temsilci, digerleri] of [
  ["AND", ["&"]],
  ["PLUS", ["+"]],
  ["ZERO", ["0", "O"]],
  ["ONE", ["1"]],
  ["TWO", ["2", "TO", "TOO"]],
  ["THREE", ["3"]],
  ["FOUR", ["4", "FOR"]],
  ["FIVE", ["5"]],
  ["SIX", ["6"]],
  ["SEVEN", ["7"]],
  ["EIGHT", ["8"]],
  ["NINE", ["9"]],
  ["POUND", ["£"]],
  ["EURO", ["€"]],
  ["DOLLAR", ["$"]],
  ["YEN", ["¥"]],
  ["PERCENTUM", ["%", "PERCENT"]],
  ["AT", ["@"]],
] as const) {
  ESDEGER[temsilci] = temsilci;
  for (const d of digerleri) ESDEGER[d] = temsilci;
}

function esdegerleriBirlestir(s: string): string {
  const soz = s.split(" ");
  const cikti: string[] = [];
  for (let i = 0; i < soz.length; i++) {
    /* İki sözcüklü tek eşdeğer: "PER CENT" ve "PER CENTUM" (4(2)(q)). */
    if (soz[i] === "PER" && (soz[i + 1] === "CENT" || soz[i + 1] === "CENTUM")) {
      cikti.push("PERCENTUM");
      i++;
      continue;
    }
    cikti.push(ESDEGER[soz[i]] ?? soz[i]);
  }
  return cikti.join(" ");
}

/* ----------------------------------------------------- EK 3 · PARAGRAF 5
   Sonda yok sayılan ifadeler: "& CO", "UK", ".CO.UK", "WALES" ... Önünde
   boşluk, nokta ya da "@" olmalı; birden fazlası art arda gelebilir ("or any
   combination") — o yüzden döngü.

   Liste 4. paragraftan SONRA uygulanıyor, yani "&" çoktan "AND"e dönmüş
   oluyor; "& CO" satırları yine de duruyor çünkü "&CO" gibi bitişik yazımda
   "&" tek başına bir sözcük değil ve 4. paragraf ona dokunmuyor.

   PARANTEZLİ BİÇİM HER YERDE. 5(3) aynı ifadelerin parantez içindekini de
   sayıyor; rehber (6.4) bunu konum belirtmeden ayrı madde olarak yazıyor ve
   kurumun denetleyicisi de ismin ORTASINDAKİNİ atıyor: "1 stop shop" sorgusu
   "ONE STOP (UK) SHOP LIMITED" ile aynı çıkıyor (11.09.2026). Parantezsiz
   "UK" ise ortada kalıyor: "one stop uk shop" aynı çıkmıyor. İkisi de bu
   dosyada böyle. */
const EK3_SONDA = [
  "& CO",
  "& COMPANY",
  "AND CO",
  "AND COMPANY",
  "BIZ",
  "CO",
  "CO UK",
  "CO.UK",
  "COM",
  "COMPANY",
  "EU",
  "GB",
  "GREAT BRITAIN",
  "NET",
  "NI",
  "NORTHERN IRELAND",
  "ORG",
  "ORG UK",
  "ORG.UK",
  "UK",
  "UNITED KINGDOM",
  "WALES",
  "& CWMNI",
  "A'R CWMNI",
  "CWMNI",
  "CYM",
  "CYMRU",
  "DU",
  "PF",
  "PRYDAIN FAWR",
  "Y DEYRNAS UNEDIG",
];
/* Kesme işaretinin üç yazımı da aynı ("A'R", "A’R", "A‘R"). */
const EK3_DESEN = EK3_SONDA.map((m) => kacir(m).replace("'", "['‘’]")).join("|");
const EK3_PARANTEZ = new RegExp(`[([{<]\\s*(?:${EK3_DESEN})\\s*[)\\]}>]`, "g");
const EK3_SON = new RegExp(`([\\s.@])(?:${EK3_DESEN})\\.?$`);

function sondakileriAt(s: string): string {
  let t = s.replace(EK3_PARANTEZ, " ").replace(/\s+/g, " ").trim();
  let onceki: string;
  do {
    onceki = t;
    t = t.replace(EK3_SON, "$1").trim();
  } while (t !== onceki);
  return t;
}

/* ----------------------------------------------------- EK 3 · PARAGRAF 6
   Her yerde yok sayılan noktalama. İki kaynaktan birleşiyor:
     · Yönetmelik 2(2)(c): nokta, virgül, iki nokta, noktalı virgül, kısa çizgi
     · Ek 1 tablo 2, 2. sütun (rehber 6.4'teki liste): kesme ve tırnaklar,
       ( ) [ ] { } < >, ! « » ? / \
     · Ek 3 · 6(b): * = #
   "&", "@", "+", "%", "£" burada YOK: onlar ya 4. paragrafta sözcüğe döndü
   ya da isimde anlam taşıyan izinli işaret olarak kalıyor. */
const NOKTALAMA = /[.,:;\-'‘’"“”()[\]{}<>!«»?/\\*=#]/g;

/**
 * Bir ismi Companies House'un "aynı sayılır" karşılaştırmasındaki biçimine
 * indirir. İki isim aynı dizgeye iniyorsa kurumun gözünde aynı isimdir.
 *
 *   "Atlas Labs Ltd."             → "ATLASLAB"
 *   "The Atlas-Labs (UK) Limited" → "ATLASLAB"
 *   "www.atlaslabs.co.uk"         → "ATLASLAB"
 */
export function ayniBicim(ham: string): string {
  /* Büyük harf + tek boşluk: yönetmelik büyük harfle yazılı, dizin de öyle. */
  let s = ham.normalize("NFC").toUpperCase().replace(/\s+/g, " ").trim();

  s = harfleriSadelestir(s); //                                    · 2
  s = turEkiniAt(s); //                                             · 3
  s = esdegerleriBirlestir(s); //                                   · 4
  s = sondakileriAt(s); //                                          · 5
  s = s.replace(NOKTALAMA, "").replace(/\s+/g, " ").trim(); //      · 6
  s = s.replace(/S$/, ""); //                                       · 7
  s = s.slice(0, KARSILASTIRMA_SINIRI); //                          · 8

  /* · 9 — baştaki "@", "THE " (yalnız arkasında boşluk varsa) ve "WWW",
     tek tek ya da art arda. */
  let onceki: string;
  do {
    onceki = s;
    s = s.replace(/^@/, "").replace(/^THE /, "").replace(/^WWW/, "").trimStart();
  } while (s !== onceki);

  return s.replace(/ /g, ""); //                                    · 10
}

/* ============================================================== GİRDİ SINIRI
   Yönetmelik 2: izinli karakterler Latin harfleri (aksanlılar dahil), 0-9 ve
   belli noktalama/işaretler. Latin dışı yazı (Kiril, Arap, Çin) ve emoji
   isimde zaten kullanılamıyor; sunucuya da gitmesin.

   Uzun tire ve yarım uzun tire (– —) kısa çizgiye çevriliyor, reddedilmiyor:
   metin düzenleyicileri kısa çizgiyi kendiliğinden uzatıyor ve ziyaretçinin
   yazmadığı bir karakter yüzünden hata görmesi haksız olurdu. */
const IZINLI = /^[\p{Script=Latin}\p{M}0-9 .,:;'‘’"“”()[\]{}<>!«»?/\\&@£$€¥#%*=+-]$/u;

export type Denetim = { ok: true; isim: string } | { ok: false; neden: string };

/** İki tarafın ortak girdi denetimi: arayüz göndermeden, rota Companies
 *  House'a sormadan önce aynı fonksiyonu çağırıyor. */
export function isimDenetle(ham: unknown): Denetim {
  if (typeof ham !== "string") return { ok: false, neden: "İsim metin olarak gönderilmeli." };

  const isim = ham.normalize("NFC").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

  if (isim.length < 2) return { ok: false, neden: "En az iki karakter yazın." };
  if (isim.length > EN_FAZLA_KARAKTER) {
    return {
      ok: false,
      neden: `Şirket ismi en fazla ${EN_FAZLA_KARAKTER} karakter olabilir; bu isim ${isim.length} karakter.`,
    };
  }
  const yabanci = Array.from(isim).find((c) => !IZINLI.test(c));
  if (yabanci) {
    return {
      ok: false,
      neden: `“${yabanci}” şirket isminde kullanılamıyor. Latin harfleri, rakamlar ve temel noktalama kullanın.`,
    };
  }
  if (!/[\p{L}0-9]/u.test(isim)) return { ok: false, neden: "İsimde en az bir harf ya da rakam olmalı." };
  if (ayniBicim(isim) === "") {
    return {
      ok: false,
      neden: "Bu isim yalnızca şirket türü eki ya da karşılaştırmada yok sayılan kelimelerden oluşuyor.",
    };
  }
  return { ok: true, isim };
}

/** Companies House aramasına giden metin: sondaki şirket türü eki atılmış
 *  hâli. "Atlas Labs Ltd" yerine "ATLAS LABS" aramak, ekin arama sırasını
 *  bozmasını önlüyor; ek zaten karşılaştırmada yok sayılıyor (3. paragraf).
 *  Ek atılınca geriye bir şey kalmıyorsa ismin kendisi gidiyor. */
export function aramaMetni(isim: string): string {
  const buyuk = harfleriSadelestir(isim.normalize("NFC").toUpperCase().replace(/\s+/g, " ").trim());
  return turEkiniAt(buyuk) || buyuk;
}

/* ================================================================ SÖZLEŞME
   Rota ile arayüz arasında giden tek biçim. Companies House'un cevabından
   YALNIZCA bu beş alan geçiyor; adres, yetkili, faaliyet gibi alanlar
   sunucuda düşüyor (arayüzün ihtiyacı yok, taşımak için de sebep yok). */
export type SirketKaydi = {
  ad: string;
  numara: string;
  /** Companies House `company_status` değeri, ham hâliyle (active, dissolved ...) */
  durum: string;
  /** YYYY-AA-GG */
  kurulus: string | null;
  kapanis: string | null;
};

export type SorguHatasi =
  /** COMPANIES_HOUSE_API_KEY tanımlı değil — sorgu henüz etkin değil */
  | "anahtar-yok"
  /** Companies House 401 döndü: anahtar geçersiz ya da iptal edilmiş */
  | "yetki"
  /** Companies House 429 döndü: beş dakikalık sınır doldu */
  | "yogun"
  /** Companies House 5xx ya da beklenmeyen bir durum kodu / gövde */
  | "ch-hata"
  /** Companies House süre sınırı içinde cevap vermedi */
  | "zaman-asimi"
  /** Companies House'a hiç ulaşılamadı (DNS, bağlantı) */
  | "ulasilamadi"
  /** İstek biçimi bozuk (JSON değil, gövde çok büyük) */
  | "istek-hatali";

export type SorguCevap =
  | {
      durum: "tamam";
      /** aranan ismin karşılaştırma biçimi — arayüz bunu gösteriyor */
      bicim: string;
      /** Companies House'tan dönen ve bakılan kayıt sayısı */
      bakilan: number;
      ayni: SirketKaydi[];
      benzer: SirketKaydi[];
    }
  | { durum: "gecersiz"; neden: string }
  | { durum: SorguHatasi };

/** Ekranda gösterilen benzer kayıt sayısının tavanı. Arama 20 kayıt
 *  getiriyor; "aynı sayılır" kontrolü yirmisinin hepsine bakıyor, ama
 *  benzerlerin hepsini dökmek listeyi okunmaz hâle getiriyordu. */
const BENZER_TAVANI = 10;

const TARIH = /^\d{4}-\d{2}-\d{2}$/;

function kayitAyikla(x: unknown): SirketKaydi | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  const ad = typeof o.title === "string" ? o.title.trim().slice(0, 200) : "";
  const numara =
    typeof o.company_number === "string" && /^[A-Za-z0-9]{1,10}$/.test(o.company_number)
      ? o.company_number.toUpperCase()
      : "";
  if (!ad || !numara) return null;
  const durum =
    typeof o.company_status === "string" && /^[a-z-]{1,40}$/.test(o.company_status)
      ? o.company_status
      : "";
  const tarih = (v: unknown) => (typeof v === "string" && TARIH.test(v) ? v : null);
  return { ad, numara, durum, kurulus: tarih(o.date_of_creation), kapanis: tarih(o.date_of_cessation) };
}

/**
 * Companies House `GET /search/companies` cevabını ikiye ayırıyor:
 * aranan isimle aynı biçime inenler ("aynı sayılabilir") ve kalanlar
 * ("benzer" — kurumun kendi arama sırasıyla, biz yeniden sıralamıyoruz).
 * Gövde beklenen biçimde değilse boş listeyle dönüyor, patlamıyor.
 */
export function chCevabiniIsle(veri: unknown, aranan: string): SorguCevap {
  const bicim = ayniBicim(aranan);
  const ham =
    veri && typeof veri === "object" && Array.isArray((veri as { items?: unknown }).items)
      ? ((veri as { items: unknown[] }).items)
      : [];
  const kayitlar = ham.map(kayitAyikla).filter((k): k is SirketKaydi => k !== null);
  const ayni = kayitlar.filter((k) => ayniBicim(k.ad) === bicim);
  const benzer = kayitlar.filter((k) => ayniBicim(k.ad) !== bicim).slice(0, BENZER_TAVANI);
  return { durum: "tamam", bicim, bakilan: kayitlar.length, ayni, benzer };
}

/* ============================================================ EKRAN METNİ */

/** Companies House `company_status` değerlerinin Türkçesi. Liste API
 *  belgesinin CompanySearch kaynağındaki sayımdan birebir:
 *  developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/companysearch
 *  Arayüz Türkçenin yanına ham değeri de basıyor; çeviri hukuki terimi
 *  tam karşılamazsa kurumun kendi kelimesi ekranda duruyor. */
export const DURUM_ADI: Record<string, string> = {
  active: "Aktif",
  dissolved: "Kapanmış",
  liquidation: "Tasfiyede",
  receivership: "Kayyum atanmış",
  administration: "İflas idaresinde",
  "voluntary-arrangement": "Alacaklılarla anlaşmada",
  "converted-closed": "Dönüştürülmüş ya da kapanmış",
  "insolvency-proceedings": "Aciz işlemlerinde",
  registered: "Kayıtlı",
  removed: "Kayıttan çıkarılmış",
};

const CH_SITE = "https://find-and-update.company-information.service.gov.uk";

/** Companies House'un kendi isim uygunluk denetleyicisi. Sayfanın formu
 *  GET ve alan adı `q` (11.09.2026'da sayfanın kaynağından okundu), yani
 *  ismi hazır doldurmak için adrese eklemek yetiyor. */
export function chUygunlukAdresi(isim?: string): string {
  const q = isim?.trim();
  return q ? `${CH_SITE}/company-name-availability?q=${encodeURIComponent(q)}` : `${CH_SITE}/company-name-availability`;
}

/** Tek bir şirketin Companies House kayıt sayfası. */
export function chKayitAdresi(numara: string): string {
  return `${CH_SITE}/company/${encodeURIComponent(numara)}`;
}
