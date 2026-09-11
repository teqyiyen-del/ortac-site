"use client";

import { useEffect, useId, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CircleDashed,
  CircleHelp,
  Clapperboard,
  CodeXml,
  Combine,
  Copy,
  Globe,
  Handshake,
  HardHat,
  ListOrdered,
  Lock,
  Merge,
  NotebookPen,
  Palette,
  Plane,
  RefreshCw,
  Scale,
  Scissors,
  Shapes,
  ShoppingCart,
  Sparkles,
  Stamp,
  TriangleAlert,
  Truck,
  Type,
  type LucideIcon,
} from "lucide-react";
import SmartLink from "@/components/shared/SmartLink";
import {
  Adim,
  AracDefter,
  AracIs,
  AracKart,
  BayrakDisk,
  DefterNot,
  Derin,
  DerinListe,
  Dokum,
  DokumSatir,
  Halka,
  IkonDisk,
  Kural,
  Sayac,
  Secenek,
  Secenekler,
  Sonuc,
} from "@/components/tools/ToolShell";
import { COUNTRY_NAME, COUNTRY_ORDER } from "@/lib/brand";
import { COUNTRY_CONTENT } from "@/lib/countryContent";
import { isLive } from "@/lib/routes";
import { TOOL_BY_ID } from "@/lib/tools/catalog";
import {
  PER_ROUND,
  SECTORS,
  SECTOR_BY_KEY,
  TONES,
  generateNames,
  normalizeKeyword,
  toDomainLabel,
  turSayisi,
  type NameTone,
  type SectorKey,
} from "@/lib/tools/names";
import {
  ALAN_UZANTILARI,
  alanAdiSorgula,
  type AlanDurum,
  type AlanSonuc,
} from "@/lib/tools/alanadi";

/* ============================================================================
   ŞİRKET İSMİ ÜRETECİ · CSS: src/app/css/araclar-uretec.css (.ta-uretec-)
   ============================================================================

   Kuralın tamamı lib/tools/names.ts'te, alan adı sorgusu lib/tools/alanadi.ts'te;
   burada yalnızca arayüz var. Bu ayrımın sebebi listelerin gözden
   geçirilebilir olması: müşteri kelime listelerine tek dosyada bakıp ekleyip
   çıkarabiliyor, bileşeni açmasına gerek yok.

   ---------------------------------------------------------------------------
   ARAÇ DİLİ TURU (11.09.2026) · SUNUM DEĞİŞTİ, AKIŞ VE MANTIK DEĞİŞMEDİ

   Müşteri: "araçlarda ok gibi ama tasarımlar fena kötü kral biraz icondur,
   bayraktır, kontrasttır bir şeyler ekle … uygunluk testimiz güzeldi … bide
   biraz daha dinamizm ekle şunlara karman çorman amk hepsi." Akış müşterinin
   onayladığı hâliyle kaldı: kelime → sektör → üslup → "oluştur" → aday
   kartları → kartta alan adı sorgusu ve Companies House çıkışı. State,
   `uret` / `yeniTur` / `sorgula` / `buildText` ve üç kilit karar (aşağıda)
   bayt bayt eski dosyadan. Değişen yalnız JSX; ortak dil ToolShell.tsx'te.

   KOMPOZİSYON (uygunluk testinin iki panelli kartı, araca uyarlanmış)
     SOLDA  beyaz çalışma paneli: künye + sayaç + saç teli, dört ikonlu adım
            (kelime · sektör kartları · üslup · oluştur), dipte birleştirme
            kuralı. Adım 4 önceden yoktu, düğme adımsız bir satırdı; "neredeyim"
            sayacının dört durağı olsun diye adım oldu (akış aynı: düğme yine
            yalnız üç adım dolunca görünüyor).
     SAĞDA  gece "aday defteri": birinci tercih büyük, tercih sırasının
            kopyası, havuz halkası, uygunluk testinin cevap defteri gibi dolan
            "seçimleriniz" satırları ve üç ülkenin bayrağıyla dipnot.
     ALTTA  kartın İÇİNDE, iki sütunu kaplayan gece "aday tahtası": altı aday
            kartı, her birinde alan adı ve şirket kaydı sorgusu. Tahtanın
            gece olması bilinçli: bu dilde form beyaz, SONUÇ gece; adaylar
            sonucun kendisi. Defterle birlikte çalışma panelini L biçiminde
            sarıyor, beyaz/gece karşıtlığı kartın tamamına yayılıyor.
            Elenen: tahtayı defterin içine koymak. 360 px'lik panelde dört
            uzantılı alan adı sonucu altı kez alt alta basılınca defter
            çalışma panelinin iki katı uzuyordu. Elenen 2: tahtayı beyaz
            yapmak. Denendi sayılmaz ama kararı veren şu: beyaz tahtada aday
            kartları çalışma panelinin seçenek kartlarıyla aynı ağırlığa
            iniyordu, yani eski "form ile sonuç aynı ağırlıkta" şikâyeti geri
            gelirdi.

   BAYRAK NEREDE, NEDEN (brif: "anlamlı olduğu yerde")
     · .co.uk satırı ve Companies House çıkışı → İngiltere bayrağı. Uzantı ve
       kütük İngiltere'nin; .com/.net/.org ülkesiz, onlarda küre ikonu.
     · Tahtanın dibi → Dubai bayrağı + ".ae sorulmuyor". Dubai müşterisinin
       ilk arayacağı uzantı o; neden yok olduğu tam orada yazıyor.
     · Defterin dipnotu → üç bayrak: kuruluş başvurusu üç ülkede de üç ad
       istiyor ve bu cümle ELLE YAZILMADI, bayrakların listesi
       countryContent'in evrak maddelerinden süzülüyor (bkz. BASVURU).
     KKTC'nin uzantısı yok (RDAP ölçümünde yoktu, alanadi.ts); bayrağı yalnız
     dipnottaki üçlüde.

   DİNAMİZM (hepsi durum değişiminde, bir kez; sürekli olan ikisi aşağıda)
     · Defter canlı: kelime yazıldıkça "Kelime" satırı, seçim yapıldıkça
       sektör ve üslup satırları ikonuyla doluyor. Aday ÖNERMİYOR (karar 1).
     · Adım açılınca kayarak giriyor; saç teli dört durakta doluyor.
     · Oluştur'a basılınca: sonuçtan ışık akıyor (ToolShell · Sonuc), birinci
       ad soldan açılıyor, altı kart sırayla giriyor, "gördüğünüz aday"
       sayarak artıyor, havuz halkası doluyor. "Başka öneriler"de hepsi
       yeniden (kartların anahtarı ad; yeni tur yeni ad demek).
     · Alan adı sonucu satır satır iniyor, durum işareti beliriyor.
     SÜREKLİ: aktarım zinciri (ortak 11,447 s) kelime diskinden defterden
     geçip altı aday diskine iniyor; tahtanın ışığı 25,127 s (bu aracın bandı,
     gerekçe CSS'te).

   KARMAN ÇORMAN'IN CEVABI
     Eski hâlde kartın altında iki not paragrafı ve kehribar bir uyarı kutusu
     vardı. Uyarının ilk yarısı kabuğun "Bu araç ne değil" satırında zaten
     yazıyor (catalog.ts · isNot) ve tekrar edilmedi; kalanlar kartın
     arkasında üç açılır satıra (DerinListe) indi, her birinin ilk cümlesi
     özette görünür. Alan adı ile şirket adının ayrı kütük olduğu cümle ve
     .ae'nin neden sorulmadığı ise tahtanın dibinde, sonuçların hemen altında
     kaldı: onlar sonucu okurken gerekiyor, açılırın arkasında değil.

   ---------------------------------------------------------------------------
   DEĞİŞMEYEN ÜÇ KİLİT KARAR (05.09.2026 turundan)

   1) SONUÇ KENDİLİĞİNDEN ÇIKMIYOR. Müşteri: "anahtar kelimeyi yazdığımız an
      altta bişiler önermesin, biz oluştur diyelim." Adaylar canlı
      girdilerden DEĞİL, `uretim` adlı dondurulmuş bir anlık görüntüden
      hesaplanıyor. Düğmeye basılınca o anki kelime/sektör/üslup üçlüsü
      `uretim`e kopyalanıyor; liste yalnızca onu okuyor. Girdilerden biri
      sonradan değişirse `uretim` sıfırlanıyor ve liste kayboluyor — çünkü
      ekranda "Atlas Labs" yazarken sektörü lojistiğe çevirmiş biri, artık
      üretilmemiş bir listeye bakıyor olurdu. Defterin canlı satırları bu
      kararı bozmuyor: kişinin KENDİ seçimlerini gösteriyorlar, aday değil.

   2) AŞAMA AŞAMA. Müşteri: "anahtar kelime, sektör, üslup, vb." Adımlar
      sırayla AÇILIYOR: sektör kelime geçerli olmadan, üslup sektör
      seçilmeden, düğme de üslup seçilmeden görünmüyor. Devre dışı bir düğme
      göstermek "neyi eksik bıraktım" sorusunu doğuruyordu, oysa eksik adım
      zaten ekranda açık duruyor.

      SEKTÖRÜN VARSAYILANI YOK ve bu bilinçli. Varsayılan koysaydık ikinci
      adım hiç "yapılmamış" olmazdı, yani aşama diye bir şey kalmazdı.
      "Henüz belli değil" ayrı bir seçenek: sektörünü bilmeyen kişi de bir
      SEÇİM yapıyor, adım atlamıyor.

   3) "MÜSAİT" KELİMESİ HİÇBİR YERDE GEÇMİYOR. Tescil müsaitliğini kontrol
      edemiyoruz; edemediğimiz bir şeyi ima eden tek kelime bile aracı yalan
      söyler hâle getirir. Alan adı sorgusu bunu DEĞİŞTİRMİYOR: o sorgu alan
      adı kütüğünü söylüyor, tescil otoritesini değil. İkisi ayrı şey ve
      ekranda ayrı ayrı yazıyor. Aynı gerekçeyle 404 "boş görünüyor", asla
      "alabilirsiniz" değil.

   Ayrıca: İLK ÜÇ ADAY AYRI (kuruluş başvurusunun istediği tam olarak bu, bkz.
   BASVURU) ve "BAŞKA ÖNERİLER" RASTGELE DEĞİL (tur sayacı listelerde
   kaydırıyor; rastgelelik sunucu ile tarayıcının ilk render'ını ayrıştırır,
   hidrasyon uyarısı verirdi).
   ========================================================================= */

/** Düğmeye basıldığı andaki girdiler. Liste yalnızca bunu okuyor. */
type Uretim = { keyword: string; sector: SectorKey; tone: NameTone; round: number };

/* ------------------------------------------- COMPANIES HOUSE ÇIKIŞI (11.09)
   Her adayın kartında ikinci çıkış: aynı adı İngiltere şirket ismi
   sorgulama aracında, kutuya yazılmış olarak açıyor. Üretecin eksik yarısı
   buydu — alan adı soruluyordu, şirket kaydı sorulmuyordu.

   · AD ADRESİN #isim= KISMINDA, ?isim= DEĞİL. # sonrası tarayıcıdan çıkmıyor,
     yani aday isim hiçbir erişim kaydına düşmüyor. Sorgu aracı ismi yalnız
     kutuya yazıyor; Companies House'a gitmesi için orada düğmeye basmak
     gerekiyor (gerekçe UkIsimSorgu.tsx · karar 3).
   · DOLAŞIM KARARI routes.ts'te. Sorgu sayfası yayına açılmadıysa çıkış HİÇ
     basılmıyor — sönük bir SmartLink de değil: altı kartın altısında
     "yakında" diyen bir satır tahtayı gürültüye boğardı. Sayfa açıldığı gün
     bu dosyaya dokunmadan görünür oluyor.
   · Adres defterden (TOOL_BY_ID), elle yazılmıyor. */
const CH_SORGU = TOOL_BY_ID["ingiltere-isim-sorgulama"].href;
const CH_SORGU_ACIK = isLive(CH_SORGU);

/* Künyenin alt satırı defterin kendi cümlesi ("Üç ülke için · üç alternatif
   üretir"); ikinci kez elle yazılmıyor. */
const KUNYE_ALT = TOOL_BY_ID["isim-ureteci"].meta;

const DURUM_METNI: Record<AlanDurum, string> = {
  kayitli: "kayıtlı",
  bos: "boş görünüyor",
  sorulamadi: "sorulamadı",
};

/* Durumun işareti. Renk tek taşıyıcı değil: yanında durumun kelimesi yazıyor.
   "Boş görünüyor"a onay işareti DEĞİL kesikli daire verildi — onay işareti
   "alabilirsiniz" okunurdu ve karar 3 tam olarak bunu yasaklıyor. */
const DURUM_IKON: Record<AlanDurum, LucideIcon> = {
  kayitli: Lock,
  bos: CircleDashed,
  sorulamadi: TriangleAlert,
};

/* ------------------------------------------------------------ İKONLAR ----
   Sektör ve üslup şıklarının diski. Uygunluk testinde anlamı olmayan şık HARF
   alıyordu (anlam uydurmamak için); burada sekiz sektörün ve üç üslubun her
   birinin ayırt edici bir glifi var. Üslupta glif birleşmenin BİÇİMİNİ
   çiziyor: kurumsal = bina (iş sözcüğü), kısa = makas (kelimenin kökü
   kesiliyor, names.ts · stem), bileşik = iki parçanın birleşmesi.
   "Henüz belli değil" soru işareti: boş bir seçim gibi değil, bilinçli bir
   "bilmiyorum" gibi durmalı (karar 2). */
const SEKTOR_IKON: Record<SectorKey, LucideIcon> = {
  genel: CircleHelp,
  yazilim: CodeXml,
  eticaret: ShoppingCart,
  danismanlik: Handshake,
  lojistik: Truck,
  insaat: HardHat,
  medya: Clapperboard,
  turizm: Plane,
};

const USLUP_IKON: Record<NameTone, LucideIcon> = {
  kurumsal: Building2,
  kisa: Scissors,
  bilesik: Combine,
};

const USLUP_BY_KEY = Object.fromEntries(TONES.map((t) => [t.key, t])) as Record<
  NameTone,
  (typeof TONES)[number]
>;

/* ------------------------------------------------ BİRLEŞTİRME KURALI ----
   Çalışma panelinin dibindeki kural. İlk yarısı üslubun names.ts'teki kendi
   ipucu (TONES.hint); ikinci yarısı sektörün o üslupta ne yaptığı ve üçü de
   names.ts'in kurallarından: kurumsalda iş sözcüğü sektörün `biz`
   listesinden, kısada ada giren tek şey kelimenin kökü (en çok beş harf,
   stem) ve sektör etkisiz, bileşikte kök sektörün `roots` listesinden ve
   adaylarda sırayla bir kelime, bir kök önde (generateNames · step % 2). */
const USLUP_KURAL: Record<NameTone, string> = {
  kurumsal: "İş sözcüğü seçtiğiniz sektörün listesinden geliyor.",
  kisa: "Kök, kelimenizin en çok ilk beş harfi; bu üslupta sektör ada girmiyor.",
  bilesik: "İkinci kök sektörün listesinden geliyor; adaylarda sırayla bir kelimeniz, bir kök önde.",
};

/* ---------------------------------------------------------- BAŞVURU ----
   "Neden üç ad" sorusunun cevabı ve dipnottaki bayraklar. Liste ELLE
   YAZILMADI: her ülkenin countryContent · docs maddelerinde hem "şirket adı"
   hem de üç adı söyleyen bir ifade ("üç" ya da "iki alternatif") aranıyor.
   11.09.2026'da ölçüldü, üçü de tutuyor:
     dubai      "Üç şirket adı alternatifi, tercih sırasıyla"
     ingiltere  "Şirket adı ve iki alternatifi"
     kktc       "Şirket adı ve iki alternatifi"
   Madde değişir de artık üç ad istemezse o ülkenin bayrağı dipnottan
   kendiliğinden düşüyor; cümle uydurulmuyor, susuyor. */
const BASVURU = COUNTRY_ORDER.filter((c) =>
  COUNTRY_CONTENT[c].docs.groups.some((g) =>
    g.items.some((m) => /şirket adı/iu.test(m) && /(üç|iki alternatif)/iu.test(m)),
  ),
);
const BASVURU_CUMLE =
  BASVURU.length === COUNTRY_ORDER.length
    ? "Kuruluş başvurusu üç ülkede de üç ad istiyor; araç ilk üçünü tercih sırasıyla veriyor."
    : BASVURU.length > 0
      ? `${BASVURU.map((c) => COUNTRY_NAME[c]).join(" ve ")} başvurusu üç ad istiyor; araç ilk üçünü tercih sırasıyla veriyor.`
      : null;

/* Kelimenin adaylara giriş biçimi: ilk harf büyük, kalanı küçük, Türkçe
   kuralıyla ("istanbul" → "İstanbul"). names.ts'teki `cap` ile aynı iş; o
   dışarı açılmadığı ve bu dosya names.ts'e dokunamadığı için yalnız GÖSTERİM
   için burada iki satır. Üretime giden kelime yine names.ts'ten geçiyor. */
const buyukHarfle = (s: string) =>
  s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1).toLocaleLowerCase("tr-TR");

const pad = (n: number) => String(n).padStart(2, "0");

export default function NameForge() {
  const uid = useId();
  const [keyword, setKeyword] = useState("");
  const [sector, setSector] = useState<SectorKey | null>(null);
  const [tone, setTone] = useState<NameTone | null>(null);
  const [uretim, setUretim] = useState<Uretim | null>(null);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [fallback, setFallback] = useState("");
  /* Alan adı sonuçları, etiket (atlaslabs) → sonuç ya da "yükleniyor". Aday
     listesi yenilenince temizleniyor: eski adın sonucu yeni adın yanında
     durmasın. */
  const [alan, setAlan] = useState<Record<string, AlanSonuc[] | "yukleniyor">>({});

  useEffect(() => {
    if (copied !== "ok") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const clean = normalizeKeyword(keyword);
  const kelimeHazir = clean.length >= 2;
  const hazir = kelimeHazir && sector !== null && tone !== null;

  const names = uretim
    ? generateNames(uretim.keyword, uretim.sector, uretim.tone, uretim.round)
    : [];
  const top3 = names.slice(0, 3);
  /* Havuz bitti mi: son turdaysak "Başka öneriler" hiç basılmıyor (gerekçe
     lib/tools/names.ts · turSayisi). */
  const sonTur = uretim ? uretim.round + 1 >= turSayisi(uretim.sector, uretim.tone) : false;

  /* Girdilerden biri değişince üretilmiş liste düşüyor (bkz. karar 1). */
  const sifirla = () => {
    setUretim(null);
    setAlan({});
  };
  const onKeyword = (v: string) => {
    setKeyword(v);
    sifirla();
  };
  const onSector = (s: SectorKey) => {
    setSector(s);
    sifirla();
  };
  const onTone = (t: NameTone) => {
    setTone(t);
    sifirla();
  };

  const uret = () => {
    if (!hazir) return;
    setAlan({});
    setUretim({ keyword: clean, sector, tone, round: 0 });
  };
  const yeniTur = () => {
    setAlan({});
    setUretim((u) => (u ? { ...u, round: u.round + 1 } : u));
  };

  const sorgula = async (isim: string) => {
    const etiket = toDomainLabel(isim);
    if (!etiket || alan[etiket]) return;
    setAlan((a) => ({ ...a, [etiket]: "yukleniyor" }));
    const sonuc = await alanAdiSorgula(etiket);
    setAlan((a) => ({ ...a, [etiket]: sonuc }));
  };

  const buildText = () => {
    if (top3.length === 0 || !uretim) return "";
    return [
      "Ortac Global · şirket adı alternatifleri (tercih sırasıyla)",
      `Sektör: ${SECTOR_BY_KEY[uretim.sector].label}`,
      "",
      ...top3.map((n, i) => `${i + 1}. ${n}`),
      "",
      "Yedek adaylar: " + names.slice(3).join(", "),
      "",
      "Not: Bu liste bir müsaitlik sorgusu değildir. Adların tescil edilebilirliği,",
      "benzerlik kontrolü ve kısıtlı kelime listesi ilgili otoritede ayrıca kontrol edilir.",
    ].join("\n");
  };

  const onCopy = async () => {
    const text = buildText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
      setFallback("");
    } catch {
      setCopied("fail");
      setFallback(text);
    }
  };

  /* ---------------------------------------------- SUNUMUN TÜRETTİKLERİ ----
     Aşağıdakilerin hiçbiri üretime girmiyor; yalnız ekranda ne görüneceğini
     söylüyorlar. Görünürlük adımların açılma kuralıyla AYNI: sektör kelime
     geçerliyken, üslup sektör seçiliyken sayılıyor. Yani kelime silinip
     adım 2 kapanınca defterdeki sektör satırı da boşalıyor; kapalı bir
     adımın seçimini göstermek "hâlâ seçili mi" sorusunu doğururdu. */
  const sektorGorunur = kelimeHazir && sector !== null;
  const uslupGorunur = sektorGorunur && tone !== null;
  /* Künyedeki sayaç: dolu adım sayısı (kelime · sektör · üslup · adaylar). */
  const dolu =
    (kelimeHazir ? 1 : 0) + (sektorGorunur ? 1 : 0) + (uslupGorunur ? 1 : 0) + (uretim ? 1 : 0);

  const turToplam = uretim ? turSayisi(uretim.sector, uretim.tone) : 0;
  /* Gördüğünüz aday: bu tura kadar gösterilen adların toplamı. Tur başına
     sabit 6 ile çarpılmadı: generateNames tekrar eden adayı düşürüyor, yani
     bir tur 6'dan az verebilir. Her turun gerçek uzunluğu toplanıyor (en çok
     dört tur × altı ad, maliyeti yok). */
  const gorulen = uretim
    ? Array.from(
        { length: uretim.round + 1 },
        (_, r) => generateNames(uretim.keyword, uretim.sector, uretim.tone, r).length,
      ).reduce((a, b) => a + b, 0)
    : 0;

  const yazilan = keyword.trim();
  const kelimeAlt =
    yazilan === ""
      ? undefined
      : !kelimeHazir
        ? "En az iki harf gerekiyor"
        : clean !== yazilan
          ? `Yazdığınız: “${yazilan}”`
          : undefined;
  /* Okunamayan girdi ayrı bir hâl: bir şey yazılmış ama iki harf çıkmıyor
     ("7", "a!"). Kutunun çerçevesi kehribar, cümlesi defterde. Eski hâlde
     bu durumda yalnızca adım 2 açılmıyordu ve sebebi hiçbir yerde yazmıyordu. */
  const okunamadi = yazilan !== "" && !kelimeHazir;

  const SektorGlif = sektorGorunur && sector ? SEKTOR_IKON[sector] : Briefcase;
  const UslupGlif = uslupGorunur && tone ? USLUP_IKON[tone] : Palette;

  /* Sonucun altındaki yönlendirme: sıradaki eksik adımı söylüyor. Canlı
     bölgede (Sonuc · role="status") ve yalnız EŞİKTE değişiyor, her tuşta
     değil; yani ekran okuyucu her harfte konuşmuyor. */
  const yonerge = !kelimeHazir
    ? "Anahtar kelimenizi yazın; sektör ve üslup adımları sırayla açılır."
    : !sektorGorunur
      ? "Sektörü seçin."
      : !uslupGorunur
        ? "Üslubu seçin."
        : "Adayları oluştur düğmesine basın; ilk üçü burada tercih sırasıyla görünür.";

  return (
    <>
      {/* Kap yalnızca bu aracın kapsamı: aktarım zincirinin tahtaya uzayan
          durakları ve iki seçenek düzeni `.ta-uretec` altında tanımlı
          (araclar-uretec.css). Aracın kendi DerinListe'si kabın DIŞINDA:
          kabuğun "ne değil" listesiyle kardeş kalsın ki CSS ikisini tek liste
          gibi birleştirsin (.ta-derin-liste + .ta-derin-liste). */}
      <div className="ta-uretec">
        <AracKart>
          <AracIs
            baslik="Şirket ismi üreteci"
            alt={KUNYE_ALT}
            sag={
              <span className="ta-sayim" aria-hidden="true">
                <b>{pad(dolu)}</b> / 04
              </span>
            }
            ilerleme={dolu / 4}
          >
            {/* -------------------------------------------------- 1 · KELİME */}
            <Adim
              no={1}
              akt
              ikon={<Type size={18} strokeWidth={1.9} />}
              etiketIcin={`${uid}-kw`}
              baslik={
                /* Boşluk kuyruğun İÇİNDE (ToolShell sözleşmesi): dışarıda
                   durunca erişilebilir ad "kelime(markanız…)" diye bitişik
                   okunuyordu. */
                <>
                  Anahtar kelime
                  <span className="ta-adim-x">{" (markanız, adınız, işiniz)"}</span>
                </>
              }
            >
              {/* Harf sayısı rozeti tutar kutusunun birim rozetinin yerinde:
                  normalizasyonun ne bıraktığını yazarken gösteriyor ("Atlas
                  2026!" → 5 harf). Süs, aria-hidden; aynı bilgi yardım
                  satırında ve defterde metin olarak var. */}
              <div className="ta-tutar" data-hata={okunamadi ? "" : undefined}>
                <input
                  id={`${uid}-kw`}
                  className="ta-girdi"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="atlas"
                  value={keyword}
                  onChange={(e) => onKeyword(e.target.value)}
                  aria-describedby={`${uid}-help`}
                  aria-invalid={okunamadi || undefined}
                />
                {yazilan !== "" && (
                  <span className="ta-birim" aria-hidden="true">
                    {clean.length} harf
                  </span>
                )}
              </div>
              <p id={`${uid}-help`} className="ta-yardim">
                Tek kelime yeter. Boşluk, rakam ve noktalama düşüyor; en az iki harf gerekiyor.
              </p>
            </Adim>

            {/* -------------------------------------------------- 2 · SEKTÖR */}
            {kelimeHazir && (
              <Adim
                no={2}
                ikon={<Briefcase size={18} strokeWidth={1.9} />}
                baslik="Sektör"
                ipucu="Sektör, adaylardaki iş sözcüklerini ve kökleri değiştirir."
              >
                <Secenekler>
                  {SECTORS.map((s) => {
                    const Ikon = SEKTOR_IKON[s.key];
                    return (
                      <Secenek
                        key={s.key}
                        ad={`${uid}-sector`}
                        secili={s.key === sector}
                        onSec={() => onSector(s.key)}
                        disk={<Ikon size={20} strokeWidth={1.9} />}
                        baslik={s.label}
                      />
                    );
                  })}
                </Secenekler>
              </Adim>
            )}

            {/* --------------------------------------------------- 3 · ÜSLUP */}
            {sektorGorunur && (
              <Adim no={3} ikon={<Palette size={18} strokeWidth={1.9} />} baslik="Üslup">
                {/* Tek sütun: uygunluk testinin şıkları gibi alt alta. Üç
                    sütunda ad ve ipucu ~100 px'e sıkışıp ikişer satıra
                    kırılıyordu; iki sütunda üçüncü şık yalnız kalıyordu. */}
                <div className="ta-uretec-tek">
                  <Secenekler>
                    {TONES.map((t) => {
                      const Ikon = USLUP_IKON[t.key];
                      return (
                        <Secenek
                          key={t.key}
                          ad={`${uid}-tone`}
                          secili={t.key === tone}
                          onSec={() => onTone(t.key)}
                          disk={<Ikon size={20} strokeWidth={1.9} />}
                          baslik={t.label}
                          ipucu={t.hint}
                        />
                      );
                    })}
                  </Secenekler>
                </div>
              </Adim>
            )}

            {/* ------------------------------------------------- 4 · ADAYLAR
                Üç adım dolmadan hiç basılmıyor (karar 2). Düğme üretimden
                sonra "Başka öneriler"e dönüyor: ikisi aynı işin iki turu,
                aynı yerde durmaları "tekrar bas" hissini veriyor. Havuz
                bitince düğme kalkıyor ve cümle canlı bölgede. */}
            {hazir && (
              <Adim
                no={4}
                ikon={<Sparkles size={18} strokeWidth={1.9} />}
                baslik="Adaylar"
                ipucu={
                  uretim
                    ? `${names.length} aday üretildi; ilk üçü defterde tercih sırasıyla.`
                    : "Adaylar düğmeye bastığınız andaki seçimlerden üretilir."
                }
              >
                <div className="ta-eylem">
                  {!uretim ? (
                    <button type="button" className="btn btn-sm ta-uretec-go" onClick={uret}>
                      <Sparkles size={16} strokeWidth={2.1} aria-hidden="true" />
                      Adayları oluştur
                    </button>
                  ) : !sonTur ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-line ta-uretec-baska"
                      onClick={yeniTur}
                    >
                      <RefreshCw size={16} strokeWidth={2.1} aria-hidden="true" />
                      Başka öneriler
                    </button>
                  ) : null}
                </div>
                <p className="ta-uretec-durum" role="status" aria-live="polite">
                  {uretim && sonTur
                    ? "Bu sektör ve üslupta havuz bitti; başka aday için sektörü ya da üslubu değiştirin."
                    : null}
                </p>
              </Adim>
            )}

            <Kural ikon={<Merge size={18} strokeWidth={1.9} />} baslik="Birleştirme kuralı">
              {uslupGorunur && tone ? (
                <>
                  <b>{USLUP_BY_KEY[tone].label}:</b> {USLUP_BY_KEY[tone].hint}.{" "}
                  {USLUP_KURAL[tone]}
                </>
              ) : (
                "Adaylar kelimenizle sabit listelerden gelen bir sözcüğün birleşimi. Üslup birleşmenin biçimini, sektör sözcüğün hangi listeden geleceğini belirliyor."
              )}
            </Kural>
          </AracIs>

          {/* ================================================ GECE DEFTER == */}
          <AracDefter ikon={<NotebookPen size={15} strokeWidth={1.9} />} baslik="Aday defteri">
            <Sonuc
              etiket="Tercih sırasıyla ilk üç aday"
              tetik={uretim ? `${uretim.round}-${top3[0] ?? ""}` : "bos"}
              alt={
                uretim && top3.length > 0 ? (
                  <>
                    {top3[1] ? (
                      <>
                        Ardından <b>{top3[1]}</b>
                        {top3[2] && (
                          <>
                            {" "}
                            ve <b>{top3[2]}</b>
                          </>
                        )}
                        .{" "}
                      </>
                    ) : null}
                    {names.length} adayın tamamı aşağıda.
                  </>
                ) : (
                  yonerge
                )
              }
            >
              {uretim && top3[0] ? (
                /* Anahtar ad: yeni tur yeni düğüm, ad soldan yeniden açılıyor. */
                <span key={top3[0]} className="ta-uretec-ad">
                  {top3[0]}
                </span>
              ) : (
                <>
                  <span className="ta-sonuc-bos" aria-hidden="true">
                    —
                  </span>
                  <span className="sr-only">Henüz aday yok.</span>
                </>
              )}
            </Sonuc>

            {uretim && top3.length > 0 && (
              <>
                <div className="ta-uretec-eylem">
                  <button type="button" className="btn btn-sm ta-uretec-kopya" onClick={onCopy}>
                    {copied === "ok" ? (
                      <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <Copy size={16} strokeWidth={2.1} aria-hidden="true" />
                    )}
                    {copied === "ok" ? "Kopyalandı" : "Üç alternatifi kopyala"}
                  </button>
                  <span className="ta-uretec-eylem-s" role="status" aria-live="polite">
                    {copied === "ok" && "Alternatifler panoya kopyalandı."}
                    {copied === "fail" &&
                      "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
                  </span>
                </div>
                {copied === "fail" && (
                  <label className="ta-uretec-yedek">
                    <span className="sr-only">Kopyalanacak metin</span>
                    <textarea readOnly rows={9} value={fallback} />
                  </label>
                )}

                {/* Havuz halkası: kaç turun görüldüğü (names.ts · turSayisi).
                    Ortası süs; aynı sayı yanındaki başlıkta metin. */}
                <div className="ta-oranlar">
                  <Halka oran={(uretim.round + 1) / turToplam}>
                    <span aria-hidden="true">
                      {uretim.round + 1}/{turToplam}
                    </span>
                  </Halka>
                  <p className="ta-oranlar-t">
                    <b>
                      Havuz · tur {uretim.round + 1} / {turToplam}
                    </b>
                    <span>
                      {sonTur
                        ? "Bu sektör ve üslupta havuz bitti."
                        : turToplam - uretim.round - 1 === 1
                          ? "Bir tur daha var."
                          : `${turToplam - uretim.round - 1} tur daha var.`}
                    </span>
                  </p>
                </div>
              </>
            )}

            {/* Seçimleriniz: uygunluk testinin cevap defterinin karşılığı.
                Adımlar doldukça satırlar doluyor, sektör ve üslup satırının
                diski seçilen şıkkın glifini alıyor. Değer anahtarlı: değişince
                yeni düğüm, CSS'te bir kez beliriyor. */}
            <p className="ta-defter-k">Seçimleriniz</p>
            <Dokum>
              <DokumSatir
                ikon={<Type size={14} strokeWidth={1.9} />}
                etiket="Kelime"
                alt={kelimeAlt}
                deger={<Deger v={kelimeHazir ? buyukHarfle(clean) : null} bos="yazılmadı" />}
              />
              <DokumSatir
                ikon={
                  <span key={sektorGorunur && sector ? sector : "yok"} className="ta-uretec-glif">
                    <SektorGlif size={14} strokeWidth={1.9} />
                  </span>
                }
                etiket="Sektör"
                deger={
                  <Deger
                    v={sektorGorunur && sector ? SECTOR_BY_KEY[sector].label : null}
                    bos="seçilmedi"
                  />
                }
              />
              <DokumSatir
                ikon={
                  <span key={uslupGorunur && tone ? tone : "yok"} className="ta-uretec-glif">
                    <UslupGlif size={14} strokeWidth={1.9} />
                  </span>
                }
                etiket="Üslup"
                deger={
                  <Deger v={uslupGorunur && tone ? USLUP_BY_KEY[tone].label : null} bos="seçilmedi" />
                }
              />
              {/* Toplam satırı aktarım zincirinin son defter durağı. "En çok"
                  bilerek: tekrar eden aday düşünce bir tur 6'dan az verebilir. */}
              {uretim && (
                <DokumSatir
                  toplam
                  ikon={<Sparkles size={14} strokeWidth={1.9} />}
                  etiket="Gördüğünüz aday"
                  alt={`Her turda en çok ${PER_ROUND} aday`}
                  deger={<Sayac deger={gorulen} />}
                />
              )}
            </Dokum>

            {BASVURU_CUMLE && (
              <DefterNot>
                <span className="ta-uretec-bayraklar" aria-hidden="true">
                  {BASVURU.map((c) => (
                    <BayrakDisk key={c} ulke={c} boy="xs" />
                  ))}
                </span>{" "}
                {BASVURU_CUMLE}
              </DefterNot>
            )}
          </AracDefter>

          {/* ============================================== ADAY TAHTASI ==
              Kartın üçüncü çocuğu, iki sütunu kaplıyor (CSS · grid-column).
              Yalnız üretimden sonra var; girdi değişince düşüyor (karar 1). */}
          {uretim && names.length > 0 && (
            <section className="ta-uretec-tahta" aria-labelledby={`${uid}-tahta`}>
              <div className="ta-uretec-tahta-bas">
                <IkonDisk boy="s" ton="gece">
                  <ListOrdered size={14} strokeWidth={1.9} />
                </IkonDisk>
                <h2 id={`${uid}-tahta`} className="ta-uretec-tahta-t">
                  Adaylar
                </h2>
                <p className="ta-uretec-tahta-m">
                  {CH_SORGU_ACIK
                    ? "Her adayın alan adını ve İngiltere şirket kaydını sorabilirsiniz."
                    : "Her adayın alan adını sorabilirsiniz."}
                </p>
              </div>

              <ol className="ta-uretec-adaylar">
                {names.map((n, i) => (
                  <AdayKart
                    key={n}
                    ad={n}
                    sira={i}
                    durum={alan[toDomainLabel(n)]}
                    onSorgula={() => sorgula(n)}
                  />
                ))}
              </ol>

              {/* Sonucu okurken gereken iki cümle: açılırın arkasında değil,
                  sonuçların hemen altında. */}
              <ul className="ta-uretec-dip">
                <li>
                  <BayrakDisk ulke="dubai" boy="xs" />
                  <span>
                    .ae ve .com.tr alan adları bu protokolde cevap vermediği için sorulmuyor;
                    sorulsaydı her ada &quot;boş&quot; derdi.
                  </span>
                </li>
                <li>
                  <Scale size={14} strokeWidth={1.9} aria-hidden="true" />
                  <span>
                    Alan adının boş görünmesi, adın şirket adı olarak onaylanacağı anlamına
                    gelmiyor: ikisi ayrı kütük, ayrı kural.
                  </span>
                </li>
              </ul>
            </section>
          )}
        </AracKart>
      </div>

      {/* Aracın kendi açılırları. Kabuğun "Bu araç ne değil" satırı hemen
          altta ve iki liste tek liste gibi birleşiyor. Müsaitlik uyarısının
          ilk yarısı o satırda yazdığı için burada tekrar edilmedi. */}
      <DerinListe>
        <Derin
          ikon={<Globe size={16} strokeWidth={1.9} />}
          baslik="Alan adı sorgusu nereye gidiyor"
          ipucu="Yalnız siz düğmeye bastığınızda; alan adı tarayıcınızdan kütüğe gidiyor, bize gelmiyor."
        >
          Bir adayın düğmesine bastığınızda o adın alan adı biçimi (örneğin “atlaslabs”) .com,
          .net, .org ve .co.uk uzantılarıyla alan adı kütüğüne RDAP üzerinden soruluyor. Sorgu
          siz yazarken kendiliğinden çalışmıyor ve sunucumuzdan geçmiyor. Kütük “kayıt yok”
          dediğinde ekranda “alabilirsiniz” değil “boş görünüyor” yazıyor: ad rezerve edilmiş ya
          da bir marka hakkına takılıyor olabilir. Kütük cevap vermezse sonuç “sorulamadı” olarak
          kalıyor, hiçbir zaman “boş” sayılmıyor.
        </Derin>
        <Derin
          ikon={<Stamp size={16} strokeWidth={1.9} />}
          baslik="Tescil sırasında bizim yaptıklarımız"
          ipucu="Ltd ya da FZ-LLC ekini ve adın ön kontrolünü kuruluşta biz yürütüyoruz."
        >
          Tüzel kişilik eki (Ltd, FZ-LLC vb.) bilerek eklenmiyor: doğru yazımı seçtiğiniz yapıya ve
          otoriteye göre değişiyor, tescil sırasında biz ekliyoruz. Benzerlik kontrolü ve kısıtlı
          kelime taraması da ayrı bir aşama ve onu sizin adınıza biz yürütüyoruz.
        </Derin>
        <Derin
          ikon={<Shapes size={16} strokeWidth={1.9} />}
          baslik="Adaylar nasıl üretiliyor"
          ipucu="Sabit kelime listeleri birleşiyor; aynı girdi her zaman aynı adayları veriyor."
        >
          “Başka öneriler” rastgele değil: listelerde bir tur ileri kayıyor ve her turda yeni adlar
          çıkıyor. Havuz bitince düğme kalkıyor; başka aday için sektörü ya da üslubu değiştirmek
          gerekiyor. Finans ve sigorta sektör olarak sunulmuyor: o işlerde ada girecek makul
          sözcükler tescil otoritelerinin kısıtlı kelime listelerine takılıyor, araç yalnız
          elenecek adaylar verirdi.
        </Derin>
      </DerinListe>
    </>
  );
}

/* Defter satırının değeri. Boşken tire SÜS (aria-hidden), okunan metin
   görünmez METİN (tuzak G-2: <dd> içinde aria-label değil gerçek metin).
   Dolu değer anahtarlı: değişince yeni düğüm, CSS'te bir kez beliriyor. */
function Deger({ v, bos }: { v: string | null; bos: string }) {
  if (v === null) {
    return (
      <>
        <span className="ta-uretec-bos" aria-hidden="true">
          —
        </span>
        <span className="sr-only">{bos}</span>
      </>
    );
  }
  return (
    <span key={v} className="ta-uretec-deger">
      {v}
    </span>
  );
}

/* ================================================================ ADAY ====
   Tahtanın bir kartı: sıra diski + ad + (ilk üçte) tercih rozeti, altında iki
   denetim satırı — alan adı ve şirket kaydı. İki satır aynı kalıpta (disk +
   ad + alt satır + sağda düğme): kart "bu adla iki şey sorabilirsiniz" diyor
   ve ikisini aynı ağırlıkta söylüyor.

   Sıra diski SÜS (aria-hidden): sıra <ol>'ün kendisinde, ekran okuyucu
   "liste, 6 öğe, 1" diye okuyor. Disk aktarım zincirinin tahtaya uzayan
   durağı (sırası CSS'te, kartın konumuna göre).

   ALAN ADI SONUCU CANLI BÖLGEDE. Eski hâlde "sorgulanıyor…" satırı
   role="status" idi ama sonuç listesi değildi ve "sorgulanıyor" satırı
   sonuç gelince DOM'dan çıkıyordu; yani ekran okuyucu sonucu hiç
   duymuyordu. Kap (aria-live) artık kartla birlikte DOM'da, içeriği değişiyor.

   BEKLERKEN dört uzantının satırı İSKELET olarak basılıyor (aria-hidden):
   sonuç gelince kart ikinci kez boy değiştirmesin. Sonuç listesi iskeletten
   AYRI anahtarla geliyor ki satırlar yeniden takılsın ve iniş hareketi
   oynasın (aynı anahtarda React düğümü korurdu, animasyon oynamazdı). */
function AdayKart({
  ad,
  sira,
  durum,
  onSorgula,
}: {
  ad: string;
  sira: number;
  durum: AlanSonuc[] | "yukleniyor" | undefined;
  onSorgula: () => void;
}) {
  const etiket = toDomainLabel(ad);
  const ust = sira < 3;
  return (
    <li className="ta-uretec-aday" data-top={ust ? "" : undefined}>
      <div className="ta-uretec-aday-bas">
        <IkonDisk boy="m" ton="gece" akt>
          <span className="ta-uretec-no">{pad(sira + 1)}</span>
        </IkonDisk>
        <span className="ta-uretec-aday-t">{ad}</span>
        {ust && <span className="ta-uretec-rozet">tercih {sira + 1}</span>}
      </div>

      <div className="ta-uretec-kontrol">
        <div className="ta-uretec-satir">
          <IkonDisk boy="s" ton="gece">
            <Globe size={14} strokeWidth={1.9} />
          </IkonDisk>
          <span className="ta-uretec-satir-b">
            <span className="ta-uretec-satir-t">Alan adı</span>{" "}
            <span className="ta-uretec-satir-a">
              {etiket} · {ALAN_UZANTILARI.length} uzantı
            </span>
          </span>
          {durum === undefined && (
            <button
              type="button"
              className="ta-uretec-kucuk"
              onClick={onSorgula}
              aria-label={`${ad} için alan adını sorgula`}
            >
              Sorgula
            </button>
          )}
          <div className="ta-uretec-alan-k" aria-live="polite">
            {durum === "yukleniyor" ? (
              <>
                <p className="ta-uretec-alan-y">{etiket} sorgulanıyor…</p>
                <ul key="bekle" className="ta-uretec-alan" data-bekliyor="" aria-hidden="true">
                  {ALAN_UZANTILARI.map((u) => (
                    <li key={u}>
                      <UzantiIsareti uzanti={u} />
                      <span className="ta-uretec-alan-u">
                        {etiket}.{u}
                      </span>
                      <span className="ta-uretec-alan-d">…</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : Array.isArray(durum) ? (
              <ul key="sonuc" className="ta-uretec-alan" aria-label={`${ad}: alan adı sonuçları`}>
                {durum.map((r) => {
                  const Ikon = DURUM_IKON[r.durum];
                  return (
                    <li key={r.uzanti} data-durum={r.durum}>
                      <UzantiIsareti uzanti={r.uzanti} />
                      {/* Boşluklar METİN: satır içi öğeler erişilebilir adda
                          boşluksuz birleşiyor ("atlaslabs.comkayıtlı"). */}
                      <span className="ta-uretec-alan-u">
                        {etiket}.{r.uzanti}
                      </span>{" "}
                      <span className="ta-uretec-alan-d">
                        <Ikon size={13} strokeWidth={2} aria-hidden="true" />
                        {DURUM_METNI[r.durum]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {CH_SORGU_ACIK && (
          <div className="ta-uretec-satir">
            <BayrakDisk ulke="ingiltere" boy="s" />
            <span className="ta-uretec-satir-b">
              <span className="ta-uretec-satir-t">Companies House</span>{" "}
              <span className="ta-uretec-satir-a">İngiltere şirket kaydı</span>
            </span>
            <SmartLink
              href={`${CH_SORGU}#isim=${encodeURIComponent(ad)}`}
              className="ta-uretec-kucuk"
              aria-label={`Companies House'ta sorgula: ${ad}, İngiltere şirket kaydı`}
            >
              Sorgula
              <ArrowRight size={13} strokeWidth={2.1} aria-hidden="true" />
            </SmartLink>
          </div>
        )}
      </div>
    </li>
  );
}

/* Uzantının işareti: .co.uk İngiltere'nin, bayrağı onun; ötekiler ülkesiz,
   küre. Bayrak BayrakDisk kabında (tuzak H). */
function UzantiIsareti({ uzanti }: { uzanti: (typeof ALAN_UZANTILARI)[number] }) {
  return (
    <span className="ta-uretec-alan-i" aria-hidden="true">
      {uzanti === "co.uk" ? (
        <BayrakDisk ulke="ingiltere" boy="xs" />
      ) : (
        <Globe size={14} strokeWidth={1.9} />
      )}
    </span>
  );
}
