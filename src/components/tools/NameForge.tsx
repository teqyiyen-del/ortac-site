"use client";

import { useEffect, useId, useState } from "react";
import {
  ArrowRight,
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
import AskCta from "@/components/shared/AskCta";
import SmartLink from "@/components/shared/SmartLink";
import {
  AracKunye,
  Bant,
  BayrakDisk,
  Cip,
  Cipler,
  Derin,
  DerinListe,
  Dip,
  GirdiSatiri,
  Halka,
  IkonDisk,
  Kural,
  Tezgah,
  Yardim,
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
   12.09.2026 · TEZGÂH DİLİNE GEÇİŞ (A2) · SUNUM DEĞİŞTİ, AKIŞ VE MANTIK DEĞİL

   Bir tur önce bu araç uygunluk testinin İKİ PANELLİ kurgusundaydı: solda
   beyaz çalışma paneli, sağda gece "aday defteri", altta gece "aday tahtası".
   Müşteri o kurguyu geri çevirdi ("tüm araçlarda sağ tarafa siyah alan koy
   onun içinde dönsün her şey gibi bir şey demedimki sana amk ben") ve
   /lab/arac-dili'nin A2 adayını seçti ("a2 ile devam et, kalan araçlara da
   uygula"). Dilin ortak hâli ToolShell.tsx · C bölümünde; ilk kullanıcısı
   KurumlarVergisi.tsx, bu dosya onun grameriyle yeniden yazıldı.

   AKIŞ AYNEN KALDI (müşterinin onayladığı hâli): kelime → sektör → üslup →
   "oluştur" → aday kartları → her kartta alan adı sorgusu ve Companies House
   çıkışı. `uret` / `yeniTur` / `sorgula` / `buildText` ve aşağıdaki üç kilit
   karar bayt bayt eski dosyadan; değişen yalnız sunum.

   YENİ SIRA
     künye     aracın adı + "3 seçimden kaçı yapıldı" rozeti (bayrak YOK, aşağıda)
     tezgâh    TEK panel · kicker "Sabit listelerden üretiliyor"
       01      anahtar kelime · geniş tek kutu, sağında harf sayısı rozeti
       02      sektör  · tek satırlık çipler (sekiz)
       03      üslup   · tek satırlık çipler (üç)
       eylem   "Adayları oluştur" / "Başka öneriler" + canlı durum satırı
       BANT    CEVAP · sayfanın TEK gece yüzeyi: birinci tercihin ADI,
               göstergesi havuz halkası, eylemi kopyalama düğmesi
     liste     altı aday · AÇIK zeminde kağıt panel (eski gece tahtanın yeri)
     kural     birleştirme kuralı (dipnot)
     dip       üç bayrak + başvuru cümlesi, sağda soru çıkışı
     açılırlar derinlik

   A2'NİN ALINMAYAN PARÇALARI — hiçbiri boş bırakılmadı, hiçbiri uydurma
   veriyle doldurulmadı (sözleşmenin 1. kuralı):
     · Surgu       bir SAYININ ölçeği. Bu araçta sayı yok; anahtar kelime bir
                   metin, sektör ve üslup birer seçim. Sürgü basılmadı.
     · Hazirlar    "hazır tutarlar" örnek SAYI çipleri. Örnek anahtar kelime
                   basmak uydurma veri olurdu (marka adı öneriyormuş gibi
                   okunurdu); kutunun yer tutucusu "atlas" zaten örnek.
                   Sektör ve üslup seçimleri Cipler/Cip ile, yani gerçek
                   radyo grubuyla basılıyor.
     · Bolusum     bölünecek bir bütün yok (vergi/kalan gibi bir pay yok).
     · Satirlar    "nasıl çıktı" dökümü mini çubukla oran gösteriyor; adayların
                   birbirine oranı diye bir sayı yok, uydurulmadı. Aday listesi
                   kendi kalıbında (aşağıda).
     · Sayac       sayılacak bir değer kalmadı ("gördüğünüz aday" toplamı
                   düştü; havuzun yeri artık banttaki halka).
     · Kaynak      kural dipnotunun kaynak çipi. Kelime listeleri bu deponun
                   kendi verisi (names.ts), gösterilecek bir otorite adresi yok.
     · Tezgah sag  başlık köşesindeki "ikinci değişken" çipleri. Buradaki iki
                   seçim (sektör, üslup) AŞAMALI: üçüncü adımı başlık satırına
                   almak onu birinci adımın ÜSTÜNE koyardı. İkisi de gövdede,
                   numaralı satırlarında.

   BAYRAK NEREDE, NEDEN (künyede tek bayrak YOK ve bu bir karar)
     Araç ülkeye bağlı değil: generateNames ülke almıyor, adaylar üç ülkede de
     aynı. Künyeye tek bayrak koymak aracı o ülkeninmiş gibi gösterirdi; üç
     bayrağı künyeye koymak ise onları CÜMLESİZ bırakırdı (süs olurdu).
     Bayrak anlamını cümlesinden alıyor, o yüzden üçü de kaldığı yerde:
     · .co.uk satırı ve Companies House çıkışı → İngiltere bayrağı (uzantı ve
       kütük İngiltere'nin; .com/.net/.org ülkesiz, onlarda küre).
     · Liste dibi → Dubai bayrağı + ".ae sorulmuyor" (Dubai müşterisinin ilk
       arayacağı uzantı o; neden yok olduğu tam orada yazıyor).
     · Kapanış dipnotu → üç bayrak + başvuru cümlesi (bkz. BASVURU): kuruluş
       başvurusu üç ülkede de üç ad istiyor, listenin ilk üçü tam olarak o.
     Künyenin sağ köşesi ülkesiz araçta rozet/sayaç alıyor (dilin sözleşmesi);
     buraya "3 seçimden kaçı yapıldı" girdi — akışın kaç adım olduğunu ilk
     ekranda söyleyen tek yer o.

   TEK KOYU YÜZEY. Eski hâlde iki gece yüzey vardı (defter + tahta). Yeni dilde
   yalnız BANT koyu; altı aday kartı AÇIK zemine geçti. Renkleri yeniden
   ölçüldü (araclar-uretec.css · KONTRAST).

   ---------------------------------------------------------------------------
   DEĞİŞMEYEN ÜÇ KİLİT KARAR (05.09.2026 turundan)

   1) SONUÇ KENDİLİĞİNDEN ÇIKMIYOR. Müşteri: "anahtar kelimeyi yazdığımız an
      altta bişiler önermesin, biz oluştur diyelim." Adaylar canlı
      girdilerden DEĞİL, `uretim` adlı dondurulmuş bir anlık görüntüden
      hesaplanıyor. Düğmeye basılınca o anki kelime/sektör/üslup üçlüsü
      `uretim`e kopyalanıyor; liste yalnızca onu okuyor. Girdilerden biri
      sonradan değişirse `uretim` sıfırlanıyor ve liste kayboluyor — çünkü
      ekranda "Atlas Labs" yazarken sektörü lojistiğe çevirmiş biri, artık
      üretilmemiş bir listeye bakıyor olurdu.

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
     "yakında" diyen bir satır listeyi gürültüye boğardı. Sayfa açıldığı gün
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
   Çiplerin glifi. Sekiz sektörün ve üç üslubun her birinin ayırt edici bir
   glifi var. Üslupta glif birleşmenin BİÇİMİNİ çiziyor: kurumsal = bina (iş
   sözcüğü), kısa = makas (kelimenin kökü kesiliyor, names.ts · stem), bileşik
   = iki parçanın birleşmesi. "Henüz belli değil" soru işareti: boş bir seçim
   gibi değil, bilinçli bir "bilmiyorum" gibi durmalı (karar 2).

   17 px: çip tek satırlık bir pil (42 px) ve 20 px glif pili şişiriyor
   (KurumlarVergisi.tsx'te ölçülmüştü). */
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
   Kural dipnotu. İlk yarısı üslubun names.ts'teki kendi ipucu (TONES.hint);
   ikinci yarısı sektörün o üslupta ne yaptığı ve üçü de names.ts'in
   kurallarından: kurumsalda iş sözcüğü sektörün `biz` listesinden, kısada ada
   giren tek şey kelimenin kökü (en çok beş harf, stem) ve sektör etkisiz,
   bileşikte kök sektörün `roots` listesinden ve adaylarda sırayla bir kelime,
   bir kök önde (generateNames · step % 2).

   Çiplerin `ipucu`su ekranda GÖRÜNMÜYOR (tek satırlık pil, erişilebilir ada
   giriyor); seçilen üslubun ipucu bu dipnotta gerçek metin olarak basılıyor.
   Yani bilgi kaybolmadı, yer değiştirdi. */
const USLUP_KURAL: Record<NameTone, string> = {
  kurumsal: "İş sözcüğü seçtiğiniz sektörün listesinden geliyor.",
  kisa: "Kök, kelimenizin en çok ilk beş harfi; bu üslupta sektör ada girmiyor.",
  bilesik: "İkinci kök sektörün listesinden geliyor; adaylarda sırayla bir kelimeniz, bir kök önde.",
};

/* ---------------------------------------------------------- BAŞVURU ----
   "Neden üç ad" sorusunun cevabı ve kapanış dipnotundaki bayraklar. Liste
   ELLE YAZILMADI: her ülkenin countryContent · docs maddelerinde hem "şirket
   adı" hem de üç adı söyleyen bir ifade ("üç" ya da "iki alternatif")
   aranıyor. 11.09.2026'da ölçüldü, üçü de tutuyor:
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
     adım 2 kapanınca künyedeki sayaç da geriliyor; kapalı bir adımın seçimini
     saymak "hâlâ seçili mi" sorusunu doğururdu. */
  const sektorGorunur = kelimeHazir && sector !== null;
  const uslupGorunur = sektorGorunur && tone !== null;
  /* Künyedeki rozet: üç seçimden kaçı yapıldı. Akışın kaç adım olduğunu ilk
     ekranda (yalnız 01 açıkken) söyleyen tek yer bu. */
  const dolu = (kelimeHazir ? 1 : 0) + (sektorGorunur ? 1 : 0) + (uslupGorunur ? 1 : 0);

  const turToplam = uretim ? turSayisi(uretim.sector, uretim.tone) : 0;
  const kalanTur = uretim ? turToplam - uretim.round - 1 : 0;

  const yazilan = keyword.trim();
  /* Okunamayan girdi ayrı bir hâl: bir şey yazılmış ama iki harf çıkmıyor
     ("7", "a!"). Kutunun çerçevesi kırmızı, cümlesi yardım satırında —
     KurumlarVergisi'nde cümle bölüşümün notuna düşüyordu, burada bölüşüm yok,
     o yüzden aynı satır iki hâl taşıyor (aria-describedby tek id'ye bağlı). */
  const okunamadi = yazilan !== "" && !kelimeHazir;
  /* Normalizasyon kelimeyi değiştirdiyse adaylara NE girdiği yazılıyor:
     "Atlas 2026!" yazan kişi listede neden "Atlas" gördüğünü burada görüyor. */
  const kirpildi = kelimeHazir && clean !== yazilan;

  /* Bandın altındaki yönerge: sıradaki eksik adımı söylüyor. Yalnız EŞİKTE
     değişiyor, her tuşta değil. */
  const yonerge = !kelimeHazir
    ? "Anahtar kelimenizi yazın; sektör ve üslup adımları sırayla açılır."
    : !sektorGorunur
      ? "Sektörü seçin."
      : !uslupGorunur
        ? "Üslubu seçin."
        : "Adayları oluştur düğmesine basın; birinci tercih burada görünür.";

  /* Düğmenin altındaki canlı satır. Havuzun bitmesi burada GERÇEK METİN,
     çünkü o an düğme ekrandan kalkıyor ve sebebi duyurulmak zorunda; banttaki
     halka aynı bilgiyi çiziyor ama o süs (Bant · `gosterge` aria-hidden). */
  const durumMetni = !uretim
    ? ""
    : sonTur
      ? `${names.length} aday üretildi. Bu sektör ve üslupta havuz bitti; başka aday için sektörü ya da üslubu değiştirin.`
      : `${names.length} aday üretildi. Havuz turu ${uretim.round + 1} / ${turToplam}.`;

  return (
    <>
      {/* Künyede bayrak YOK (gerekçe dosya başında); sağ köşede üç seçimin
          sayacı. */}
      <AracKunye
        ad="Şirket ismi üreteci"
        alt={KUNYE_ALT}
        sag={
          <p className="ta-uretec-sayim">
            Seçim <b>{dolu}</b> / 3
          </p>
        }
      />

      <Tezgah
        kicker={
          <>
            <Shapes size={15} strokeWidth={2.1} aria-hidden="true" />
            Sabit listelerden üretiliyor
          </>
        }
      >
        {/* ------------------------------------------------------ 01 · KELİME
            Dilin `Girdi` bileşeni DEĞİL, onun metin ikizi: paylaşılan bileşen
            `inputMode="decimal"` basıyor (tutar kutusu için doğru) ve burada
            telefonda anahtar kelimeye sayı klavyesi açardı. Sınıflar ortak
            dilin kendi sınıfları, yani görünüş bayt bayt aynı; ayrılan tek şey
            klavye ipucu ve `spellCheck`. RAPORA: sözleşmeye `Girdi` için bir
            `mod` propu eklenmeli, o zaman bu ikiz düşer. */}
        <GirdiSatiri>
          <label className="ta-etiket" htmlFor={`${uid}-kw`}>
            <span className="ta-no" aria-hidden="true">
              01
            </span>
            {/* Etiketin kuyruğu YOK ve bu ölçülerek karar verildi: " (markanız,
                adınız, işiniz)" `white-space: nowrap` ve 260 px'lik etiket
                sütununa sığmıyor — 1440 px'te etiketi iki satıra kırıyordu ve
                kuyruk alt satıra tek başına düşüyordu. Aynı bilgi yardım
                satırına indi (orada 78ch yer var); kuyruksuz etiket kutusu
                28 px, tek satır (ölçüldü). 02 ve 03'ün kuyrukları kısa,
                onlar tek satırda kalıyor. */}
            <span>Anahtar kelime</span>
          </label>
          <div className="ta-kutu" data-hata={okunamadi ? "" : undefined}>
            <span className="ta-kutu-i" aria-hidden="true">
              <Type size={18} strokeWidth={1.9} />
            </span>
            <input
              id={`${uid}-kw`}
              className="ta-girdi-b ta-uretec-girdi"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="atlas"
              value={keyword}
              onChange={(e) => onKeyword(e.target.value)}
              aria-describedby={`${uid}-yardim`}
              aria-invalid={okunamadi || undefined}
            />
            {/* Harf sayısı rozeti, tutar kutusunun para birimi rozetinin
                yerinde: normalizasyonun ne bıraktığını yazarken gösteriyor
                ("Atlas 2026!" → 5 harf). Süs; aynı bilgi yardım satırında
                metin olarak var. */}
            {yazilan !== "" && (
              <span className="ta-birim-b" aria-hidden="true">
                {clean.length} harf
              </span>
            )}
          </div>
        </GirdiSatiri>

        <Yardim id={`${uid}-yardim`}>
          {okunamadi ? (
            <span className="ta-uretec-hata">
              “{yazilan}” içinden iki harf çıkmadı. Boşluk, rakam ve noktalama düşüyor; en az iki
              harf gerekiyor.
            </span>
          ) : (
            <>
              Markanız, adınız ya da işinizden tek bir kelime yeter. Boşluk, rakam ve noktalama
              düşüyor; en az iki harf gerekiyor.
              {kirpildi && (
                <>
                  {" "}
                  Adaylara <b>{buyukHarfle(clean)}</b> olarak giriyor.
                </>
              )}
            </>
          )}
        </Yardim>

        {/* ------------------------------------------------------ 02 · SEKTÖR
            Kelime geçerli olmadan basılmıyor (karar 2). Görünür etiket ile
            grubun erişilebilir adı aynı kelimeyle başlıyor ("Sektör"). */}
        {kelimeHazir && (
          <div className="ta-uretec-sec">
            <p className="ta-uretec-et">
              <span className="ta-no" aria-hidden="true">
                02
              </span>
              <span>
                Sektör
                <span className="ta-etiket-x">{" (iş sözcüğünü seçer)"}</span>
              </span>
            </p>
            <Cipler ad="Sektör">
              {SECTORS.map((s) => {
                const Ikon = SEKTOR_IKON[s.key];
                return (
                  <Cip
                    key={s.key}
                    ad={`${uid}-sector`}
                    secili={s.key === sector}
                    onSec={() => onSector(s.key)}
                    ikon={<Ikon size={17} strokeWidth={1.9} />}
                    baslik={s.label}
                  />
                );
              })}
            </Cipler>
          </div>
        )}

        {/* ------------------------------------------------------- 03 · ÜSLUP
            İpucu çipin erişilebilir adına giriyor ve seçilince kural
            dipnotunda gerçek metin oluyor. */}
        {sektorGorunur && (
          <div className="ta-uretec-sec">
            <p className="ta-uretec-et">
              <span className="ta-no" aria-hidden="true">
                03
              </span>
              <span>
                Üslup
                <span className="ta-etiket-x">{" (birleşme biçimi)"}</span>
              </span>
            </p>
            <Cipler ad="Üslup">
              {TONES.map((t) => {
                const Ikon = USLUP_IKON[t.key];
                return (
                  <Cip
                    key={t.key}
                    ad={`${uid}-tone`}
                    secili={t.key === tone}
                    onSec={() => onTone(t.key)}
                    ikon={<Ikon size={17} strokeWidth={1.9} />}
                    baslik={t.label}
                    ipucu={t.hint}
                  />
                );
              })}
            </Cipler>
          </div>
        )}

        {/* --------------------------------------------------------- EYLEM
            Üç adım dolmadan hiç basılmıyor (karar 2). Düğme üretimden sonra
            "Başka öneriler"e dönüyor: ikisi aynı işin iki turu, aynı yerde
            durmaları "tekrar bas" hissini veriyor. Havuz bitince düğme
            kalkıyor ve sebebi alttaki canlı satırda. */}
        {hazir && (
          <div className="ta-eylem ta-uretec-calis">
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
        )}
        {/* Canlı bölge KOŞULSUZ DOM'da: sonradan eklenen canlı bölgenin ilk
            duyurusu yutuluyor (deponun kendi kaydı, .ta-sonuc ile aynı ders).
            Boşken yüksekliği ve üst boşluğu yok. */}
        <p className="ta-uretec-durum" role="status" aria-live="polite">
          {durumMetni}
        </p>

        {/* ----------------------------------------------------------- BANT
            CEVAP ve sayfanın TEK gece yüzeyi. Büyük değer bir SAYI değil bir
            AD, o yüzden `duyuru` VERİLMEDİ (dilin sözleşmesi): blok görünür
            kalıyor ve adın kendisi okunuyor. Sayan rakam yok, yani ara kare
            sorunu da yok.

            `gosterge` havuz halkası (süs, aria-hidden) — aynı bilgi düğmenin
            altındaki canlı satırda metin. `eylem` kopyalama düğmesi: bandın
            içinde, çünkü kopyalanan şey tam olarak bandın söylediği üç ad. */}
        <Bant
          ikon={<Sparkles size={14} strokeWidth={1.9} aria-hidden="true" />}
          kicker="Tercih sırasıyla birinci aday"
          alt={
            uretim && top3.length > 0 ? (
              <>
                {top3[1] ? (
                  <>
                    Ardından <b className="ta-uretec-vurgu">{top3[1]}</b>
                    {top3[2] && (
                      <>
                        {" "}
                        ve <b className="ta-uretec-vurgu">{top3[2]}</b>
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
          gosterge={
            uretim ? (
              <>
                <Halka oran={(uretim.round + 1) / turToplam}>
                  {uretim.round + 1}/{turToplam}
                </Halka>
                <p className="ta-oranlar-t">
                  <b>
                    Havuz · tur {uretim.round + 1} / {turToplam}
                  </b>
                  <span>
                    {sonTur
                      ? "Bu sektör ve üslupta havuz bitti."
                      : kalanTur === 1
                        ? "Bir tur daha var."
                        : `${kalanTur} tur daha var.`}
                  </span>
                </p>
              </>
            ) : undefined
          }
          eylem={
            uretim && top3.length > 0 ? (
              <button type="button" className="btn btn-sm ta-uretec-kopya" onClick={onCopy}>
                {copied === "ok" ? (
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                ) : (
                  <Copy size={16} strokeWidth={2.1} aria-hidden="true" />
                )}
                {copied === "ok" ? "Kopyalandı" : "Üç alternatifi kopyala"}
              </button>
            ) : undefined
          }
        >
          {uretim && top3[0] ? (
            /* Anahtar ad: yeni tur yeni düğüm, ad soldan yeniden açılıyor
               (CSS · taUretecAd). Sayı olsaydı Sayac sayardı; ad sayılamıyor,
               karşılığı bu. */
            <span key={top3[0]} className="ta-uretec-ad">
              {top3[0]}
            </span>
          ) : (
            <>
              <span className="ta-bant-bos" aria-hidden="true">
                —
              </span>
              <span className="sr-only">Henüz aday yok.</span>
            </>
          )}
        </Bant>

        {/* Kopyalamanın canlı satırı ve pano izni yoksa yedek metin. Bant
            koyu, bu ikisi beyaz panelde: uzun metin gece zeminde okunmuyordu
            ve kutunun kendisi bir form alanı. */}
        <p className="ta-uretec-kopya-s" role="status" aria-live="polite">
          {copied === "ok" && "Üç alternatif panoya kopyalandı."}
          {copied === "fail" && "Pano kullanılamadı; metin aşağıda, elle kopyalayabilirsiniz."}
        </p>
        {copied === "fail" && (
          <label className="ta-uretec-yedek">
            <span className="sr-only">Kopyalanacak metin</span>
            <textarea readOnly rows={9} value={fallback} />
          </label>
        )}
      </Tezgah>

      {/* ============================================================ LİSTE
          Eski gece "aday tahtası"nın yeri. Artık AÇIK zeminde ve tezgâhın
          DIŞINDA: dilde sayfanın tek koyu yüzeyi bant, ve "nasıl çıktı"
          panelinin (KurumlarVergisi · Satirlar) durduğu yer de burası.
          Kâğıt panel + beyaz kartlar, dökümün kâğıt paneliyle aynı ölçü. */}
      {uretim && names.length > 0 && (
        <section className="ta-uretec-liste" aria-labelledby={`${uid}-liste`}>
          <div className="ta-uretec-liste-h">
            <IkonDisk boy="m">
              <ListOrdered size={18} strokeWidth={1.9} />
            </IkonDisk>
            <span className="ta-uretec-liste-b">
              <h2 id={`${uid}-liste`} className="ta-uretec-liste-t">
                Adaylar
              </h2>
              <span className="ta-uretec-liste-m">
                {names.length} aday ·{" "}
                {CH_SORGU_ACIK
                  ? "her adayın alan adını ve İngiltere şirket kaydını sorabilirsiniz"
                  : "her adayın alan adını sorabilirsiniz"}
              </span>
            </span>
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
                Alan adının boş görünmesi, adın şirket adı olarak onaylanacağı anlamına gelmiyor:
                ikisi ayrı kütük, ayrı kural.
              </span>
            </li>
          </ul>
        </section>
      )}

      {/* Kural dipnotu. Kaynak çipi YOK: kelime listeleri bu deponun kendi
          verisi (names.ts), gösterilecek bir otorite adresi yok ve
          uydurulmadı. */}
      <Kural ikon={<Merge size={18} strokeWidth={1.9} />} baslik="Birleştirme kuralı">
        {uslupGorunur && tone ? (
          <>
            <b>{USLUP_BY_KEY[tone].label}:</b> {USLUP_BY_KEY[tone].hint}. {USLUP_KURAL[tone]}
          </>
        ) : (
          "Adaylar kelimenizle sabit listelerden gelen bir sözcüğün birleşimi. Üslup birleşmenin biçimini, sektör sözcüğün hangi listeden geleceğini belirliyor."
        )}
      </Kural>

      {/* Kapanış. Soldaki not KurumlarVergisi'ndeki tahmin ibaresinin karşılığı
          değil, bu aracın kendi bağlamı: üç bayrak + "neden üç ad" cümlesi.
          Müsaitlik uyarısı buraya YAZILMADI, çünkü kabuğun "Bu araç ne değil"
          satırı onu zaten aynı sayfada söylüyor (catalog.ts · isNot) ve eski
          hâlin şikâyeti tam olarak aynı cümlenin iki kez yazılmasıydı. */}
      <Dip
        not={
          BASVURU_CUMLE && (
            <>
              <span className="ta-uretec-bayraklar" aria-hidden="true">
                {BASVURU.map((c) => (
                  <BayrakDisk key={c} ulke={c} boy="xs" />
                ))}
              </span>{" "}
              {BASVURU_CUMLE}
            </>
          )
        }
      >
        <AskCta />
      </Dip>

      {/* Aracın kendi açılırları. Kabuğun "Bu araç ne değil" satırı hemen
          altta ve iki liste tek liste gibi birleşiyor. */}
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
          çıkıyor. Her tur en çok {PER_ROUND} aday veriyor; tekrar eden aday düştüğü için daha az
          da olabilir. Havuz bitince düğme kalkıyor; başka aday için sektörü ya da üslubu
          değiştirmek gerekiyor. Finans ve sigorta sektör olarak sunulmuyor: o işlerde ada girecek
          makul sözcükler tescil otoritelerinin kısıtlı kelime listelerine takılıyor, araç yalnız
          elenecek adaylar verirdi.
        </Derin>
      </DerinListe>
    </>
  );
}

/* ================================================================ ADAY ====
   Listenin bir kartı: sıra diski + ad + (ilk üçte) tercih rozeti, altında iki
   denetim satırı — alan adı ve şirket kaydı. İki satır aynı kalıpta (disk +
   ad + alt satır + sağda düğme): kart "bu adla iki şey sorabilirsiniz" diyor
   ve ikisini aynı ağırlıkta söylüyor.

   12.09.2026: kart GECE zeminden AÇIK zemine geçti (dilde tek koyu yüzey
   bant). Renkler yeniden ölçüldü, gerekçeleri CSS'te satır satır.

   Sıra diski SÜS (aria-hidden): sıra <ol>'ün kendisinde, ekran okuyucu
   "liste, 6 öğe, 1" diye okuyor.

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
        <IkonDisk boy="m">
          <span className="ta-uretec-no">{pad(sira + 1)}</span>
        </IkonDisk>
        <span className="ta-uretec-aday-t">{ad}</span>
        {ust && <span className="ta-uretec-rozet">tercih {sira + 1}</span>}
      </div>

      <div className="ta-uretec-kontrol">
        <div className="ta-uretec-kt">
          <IkonDisk boy="s">
            <Globe size={14} strokeWidth={1.9} />
          </IkonDisk>
          <span className="ta-uretec-kt-b">
            <span className="ta-uretec-kt-t">Alan adı</span>{" "}
            <span className="ta-uretec-kt-a">
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
          <div className="ta-uretec-kt">
            <BayrakDisk ulke="ingiltere" boy="s" />
            <span className="ta-uretec-kt-b">
              <span className="ta-uretec-kt-t">Companies House</span>{" "}
              <span className="ta-uretec-kt-a">İngiltere şirket kaydı</span>
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
